"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.additionalCallbacks = exports.CustomChainHandler = exports.ConsoleCallbackHandler = void 0;
const callbacks_1 = require("langchain/callbacks");
const langsmith_1 = require("langsmith");
const callbacks_2 = require("langchain/callbacks");
const llmonitor_1 = require("langchain/callbacks/handlers/llmonitor");
const utils_1 = require("./utils");
const langfuse_langchain_1 = __importDefault(require("langfuse-langchain"));
function tryJsonStringify(obj, fallback) {
    try {
        return JSON.stringify(obj, null, 2);
    }
    catch (err) {
        return fallback;
    }
}
function elapsed(run) {
    if (!run.end_time)
        return '';
    const elapsed = run.end_time - run.start_time;
    if (elapsed < 1000) {
        return `${elapsed}ms`;
    }
    return `${(elapsed / 1000).toFixed(2)}s`;
}
class ConsoleCallbackHandler extends callbacks_1.BaseTracer {
    persistRun(_run) {
        return Promise.resolve();
    }
    constructor(logger) {
        super();
        this.name = 'console_callback_handler';
        this.logger = logger;
    }
    // utility methods
    getParents(run) {
        const parents = [];
        let currentRun = run;
        while (currentRun.parent_run_id) {
            const parent = this.runMap.get(currentRun.parent_run_id);
            if (parent) {
                parents.push(parent);
                currentRun = parent;
            }
            else {
                break;
            }
        }
        return parents;
    }
    getBreadcrumbs(run) {
        const parents = this.getParents(run).reverse();
        const string = [...parents, run]
            .map((parent) => {
            const name = `${parent.execution_order}:${parent.run_type}:${parent.name}`;
            return name;
        })
            .join(' > ');
        return string;
    }
    // logging methods
    onChainStart(run) {
        const crumbs = this.getBreadcrumbs(run);
        this.logger.verbose(`[chain/start] [${crumbs}] Entering Chain run with input: ${tryJsonStringify(run.inputs, '[inputs]')}`);
    }
    onChainEnd(run) {
        const crumbs = this.getBreadcrumbs(run);
        this.logger.verbose(`[chain/end] [${crumbs}] [${elapsed(run)}] Exiting Chain run with output: ${tryJsonStringify(run.outputs, '[outputs]')}`);
    }
    onChainError(run) {
        const crumbs = this.getBreadcrumbs(run);
        this.logger.verbose(`[chain/error] [${crumbs}] [${elapsed(run)}] Chain run errored with error: ${tryJsonStringify(run.error, '[error]')}`);
    }
    onLLMStart(run) {
        const crumbs = this.getBreadcrumbs(run);
        const inputs = 'prompts' in run.inputs ? { prompts: run.inputs.prompts.map((p) => p.trim()) } : run.inputs;
        this.logger.verbose(`[llm/start] [${crumbs}] Entering LLM run with input: ${tryJsonStringify(inputs, '[inputs]')}`);
    }
    onLLMEnd(run) {
        const crumbs = this.getBreadcrumbs(run);
        this.logger.verbose(`[llm/end] [${crumbs}] [${elapsed(run)}] Exiting LLM run with output: ${tryJsonStringify(run.outputs, '[response]')}`);
    }
    onLLMError(run) {
        const crumbs = this.getBreadcrumbs(run);
        this.logger.verbose(`[llm/error] [${crumbs}] [${elapsed(run)}] LLM run errored with error: ${tryJsonStringify(run.error, '[error]')}`);
    }
    onToolStart(run) {
        const crumbs = this.getBreadcrumbs(run);
        this.logger.verbose(`[tool/start] [${crumbs}] Entering Tool run with input: "${run.inputs.input?.trim()}"`);
    }
    onToolEnd(run) {
        const crumbs = this.getBreadcrumbs(run);
        this.logger.verbose(`[tool/end] [${crumbs}] [${elapsed(run)}] Exiting Tool run with output: "${run.outputs?.output?.trim()}"`);
    }
    onToolError(run) {
        const crumbs = this.getBreadcrumbs(run);
        this.logger.verbose(`[tool/error] [${crumbs}] [${elapsed(run)}] Tool run errored with error: ${tryJsonStringify(run.error, '[error]')}`);
    }
    onAgentAction(run) {
        const agentRun = run;
        const crumbs = this.getBreadcrumbs(run);
        this.logger.verbose(`[agent/action] [${crumbs}] Agent selected action: ${tryJsonStringify(agentRun.actions[agentRun.actions.length - 1], '[action]')}`);
    }
}
exports.ConsoleCallbackHandler = ConsoleCallbackHandler;
/**
 * Custom chain handler class
 */
class CustomChainHandler extends callbacks_1.BaseCallbackHandler {
    constructor(socketIO, socketIOClientId, skipK, returnSourceDocuments) {
        super();
        this.name = 'custom_chain_handler';
        this.isLLMStarted = false;
        this.socketIOClientId = '';
        this.skipK = 0; // Skip streaming for first K numbers of handleLLMStart
        this.returnSourceDocuments = false;
        this.cachedResponse = true;
        this.socketIO = socketIO;
        this.socketIOClientId = socketIOClientId;
        this.skipK = skipK ?? this.skipK;
        this.returnSourceDocuments = returnSourceDocuments ?? this.returnSourceDocuments;
    }
    handleLLMStart() {
        this.cachedResponse = false;
        if (this.skipK > 0)
            this.skipK -= 1;
    }
    handleLLMNewToken(token) {
        if (this.skipK === 0) {
            if (!this.isLLMStarted) {
                this.isLLMStarted = true;
                this.socketIO.to(this.socketIOClientId).emit('start', token);
            }
            this.socketIO.to(this.socketIOClientId).emit('token', token);
        }
    }
    handleLLMEnd() {
        this.socketIO.to(this.socketIOClientId).emit('end');
    }
    handleChainEnd(outputs, _, parentRunId) {
        /*
            Langchain does not call handleLLMStart, handleLLMEnd, handleLLMNewToken when the chain is cached.
            Callback Order is "Chain Start -> LLM Start --> LLM Token --> LLM End -> Chain End" for normal responses.
            Callback Order is "Chain Start -> Chain End" for cached responses.
         */
        if (this.cachedResponse && parentRunId === undefined) {
            const cachedValue = outputs.text ?? outputs.response ?? outputs.output ?? outputs.output_text;
            //split at whitespace, and keep the whitespace. This is to preserve the original formatting.
            const result = cachedValue.split(/(\s+)/);
            result.forEach((token, index) => {
                if (index === 0) {
                    this.socketIO.to(this.socketIOClientId).emit('start', token);
                }
                this.socketIO.to(this.socketIOClientId).emit('token', token);
            });
            if (this.returnSourceDocuments) {
                this.socketIO.to(this.socketIOClientId).emit('sourceDocuments', outputs?.sourceDocuments);
            }
            this.socketIO.to(this.socketIOClientId).emit('end');
        }
        else {
            if (this.returnSourceDocuments) {
                this.socketIO.to(this.socketIOClientId).emit('sourceDocuments', outputs?.sourceDocuments);
            }
        }
    }
}
exports.CustomChainHandler = CustomChainHandler;
const additionalCallbacks = async (nodeData, options) => {
    try {
        if (!options.analytic)
            return [];
        const analytic = JSON.parse(options.analytic);
        const callbacks = [];
        for (const provider in analytic) {
            const providerStatus = analytic[provider].status;
            if (providerStatus) {
                const credentialId = analytic[provider].credentialId;
                const credentialData = await (0, utils_1.getCredentialData)(credentialId ?? '', options);
                if (provider === 'langSmith') {
                    const langSmithProject = analytic[provider].projectName;
                    const langSmithApiKey = (0, utils_1.getCredentialParam)('langSmithApiKey', credentialData, nodeData);
                    const langSmithEndpoint = (0, utils_1.getCredentialParam)('langSmithEndpoint', credentialData, nodeData);
                    const client = new langsmith_1.Client({
                        apiUrl: langSmithEndpoint ?? 'https://api.smith.langchain.com',
                        apiKey: langSmithApiKey
                    });
                    const tracer = new callbacks_2.LangChainTracer({
                        projectName: langSmithProject ?? 'default',
                        //@ts-ignore
                        client
                    });
                    callbacks.push(tracer);
                }
                else if (provider === 'langFuse') {
                    const release = analytic[provider].release;
                    const langFuseSecretKey = (0, utils_1.getCredentialParam)('langFuseSecretKey', credentialData, nodeData);
                    const langFusePublicKey = (0, utils_1.getCredentialParam)('langFusePublicKey', credentialData, nodeData);
                    const langFuseEndpoint = (0, utils_1.getCredentialParam)('langFuseEndpoint', credentialData, nodeData);
                    const langFuseOptions = {
                        secretKey: langFuseSecretKey,
                        publicKey: langFusePublicKey,
                        baseUrl: langFuseEndpoint ?? 'https://cloud.langfuse.com'
                    };
                    if (release)
                        langFuseOptions.release = release;
                    if (options.chatId)
                        langFuseOptions.userId = options.chatId;
                    const handler = new langfuse_langchain_1.default(langFuseOptions);
                    callbacks.push(handler);
                }
                else if (provider === 'llmonitor') {
                    const llmonitorAppId = (0, utils_1.getCredentialParam)('llmonitorAppId', credentialData, nodeData);
                    const llmonitorEndpoint = (0, utils_1.getCredentialParam)('llmonitorEndpoint', credentialData, nodeData);
                    const llmonitorFields = {
                        appId: llmonitorAppId,
                        apiUrl: llmonitorEndpoint ?? 'https://app.llmonitor.com'
                    };
                    const handler = new llmonitor_1.LLMonitorHandler(llmonitorFields);
                    callbacks.push(handler);
                }
            }
        }
        return callbacks;
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.additionalCallbacks = additionalCallbacks;
//# sourceMappingURL=handler.js.map