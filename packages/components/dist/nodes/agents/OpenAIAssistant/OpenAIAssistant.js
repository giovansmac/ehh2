"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = __importDefault(require("openai"));
const utils_1 = require("../../../src/utils");
const fsDefault = __importStar(require("node:fs"));
const path = __importStar(require("node:path"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const lodash_1 = require("lodash");
const zod_to_json_schema_1 = require("zod-to-json-schema");
class OpenAIAssistant_Agents {
    constructor() {
        //@ts-ignore
        this.loadMethods = {
            async listAssistants(_, options) {
                const returnData = [];
                const appDataSource = options.appDataSource;
                const databaseEntities = options.databaseEntities;
                if (appDataSource === undefined || !appDataSource) {
                    return returnData;
                }
                const assistants = await appDataSource.getRepository(databaseEntities['Assistant']).find();
                for (let i = 0; i < assistants.length; i += 1) {
                    const assistantDetails = JSON.parse(assistants[i].details);
                    const data = {
                        label: assistantDetails.name,
                        name: assistants[i].id,
                        description: assistantDetails.instructions
                    };
                    returnData.push(data);
                }
                return returnData;
            }
        };
        this.label = 'OpenAI Assistant';
        this.name = 'openAIAssistant';
        this.version = 1.0;
        this.type = 'OpenAIAssistant';
        this.category = 'Agents';
        this.icon = 'openai.png';
        this.description = `An agent that uses OpenAI Assistant API to pick the tool and args to call`;
        this.baseClasses = [this.type];
        this.inputs = [
            {
                label: 'Select Assistant',
                name: 'selectedAssistant',
                type: 'asyncOptions',
                loadMethod: 'listAssistants'
            },
            {
                label: 'Allowed Tools',
                name: 'tools',
                type: 'Tool',
                list: true
            }
        ];
    }
    async init() {
        return null;
    }
    async clearSessionMemory(nodeData, options) {
        const selectedAssistantId = nodeData.inputs?.selectedAssistant;
        const appDataSource = options.appDataSource;
        const databaseEntities = options.databaseEntities;
        let sessionId = nodeData.inputs?.sessionId;
        const assistant = await appDataSource.getRepository(databaseEntities['Assistant']).findOneBy({
            id: selectedAssistantId
        });
        if (!assistant) {
            options.logger.error(`Assistant ${selectedAssistantId} not found`);
            return;
        }
        if (!sessionId && options.chatId) {
            const chatmsg = await appDataSource.getRepository(databaseEntities['ChatMessage']).findOneBy({
                chatId: options.chatId
            });
            if (!chatmsg) {
                options.logger.error(`Chat Message with Chat Id: ${options.chatId} not found`);
                return;
            }
            sessionId = chatmsg.sessionId;
        }
        const credentialData = await (0, utils_1.getCredentialData)(assistant.credential ?? '', options);
        const openAIApiKey = (0, utils_1.getCredentialParam)('openAIApiKey', credentialData, nodeData);
        if (!openAIApiKey) {
            options.logger.error(`OpenAI ApiKey not found`);
            return;
        }
        const openai = new openai_1.default({ apiKey: openAIApiKey });
        options.logger.info(`Clearing OpenAI Thread ${sessionId}`);
        if (sessionId)
            await openai.beta.threads.del(sessionId);
        options.logger.info(`Successfully cleared OpenAI Thread ${sessionId}`);
    }
    async run(nodeData, input, options) {
        const selectedAssistantId = nodeData.inputs?.selectedAssistant;
        const appDataSource = options.appDataSource;
        const databaseEntities = options.databaseEntities;
        let tools = nodeData.inputs?.tools;
        tools = (0, lodash_1.flatten)(tools);
        const formattedTools = tools?.map((tool) => formatToOpenAIAssistantTool(tool)) ?? [];
        const assistant = await appDataSource.getRepository(databaseEntities['Assistant']).findOneBy({
            id: selectedAssistantId
        });
        if (!assistant)
            throw new Error(`Assistant ${selectedAssistantId} not found`);
        const credentialData = await (0, utils_1.getCredentialData)(assistant.credential ?? '', options);
        const openAIApiKey = (0, utils_1.getCredentialParam)('openAIApiKey', credentialData, nodeData);
        if (!openAIApiKey)
            throw new Error(`OpenAI ApiKey not found`);
        const openai = new openai_1.default({ apiKey: openAIApiKey });
        try {
            const assistantDetails = JSON.parse(assistant.details);
            const openAIAssistantId = assistantDetails.id;
            // Retrieve assistant
            const retrievedAssistant = await openai.beta.assistants.retrieve(openAIAssistantId);
            if (formattedTools.length) {
                let filteredTools = [];
                for (const tool of retrievedAssistant.tools) {
                    if (tool.type === 'code_interpreter' || tool.type === 'retrieval')
                        filteredTools.push(tool);
                }
                filteredTools = (0, lodash_1.uniqWith)([...filteredTools, ...formattedTools], lodash_1.isEqual);
                // filter out tool with empty function
                filteredTools = filteredTools.filter((tool) => !(tool.type === 'function' && !tool.function));
                await openai.beta.assistants.update(openAIAssistantId, { tools: filteredTools });
            }
            else {
                let filteredTools = retrievedAssistant.tools.filter((tool) => tool.type !== 'function');
                await openai.beta.assistants.update(openAIAssistantId, { tools: filteredTools });
            }
            const chatmessage = await appDataSource.getRepository(databaseEntities['ChatMessage']).findOneBy({
                chatId: options.chatId
            });
            let threadId = '';
            let isNewThread = false;
            if (!chatmessage) {
                const thread = await openai.beta.threads.create({});
                threadId = thread.id;
                isNewThread = true;
            }
            else {
                const thread = await openai.beta.threads.retrieve(chatmessage.sessionId);
                threadId = thread.id;
            }
            // List all runs
            if (!isNewThread) {
                const promise = (threadId) => {
                    return new Promise((resolve) => {
                        const timeout = setInterval(async () => {
                            const allRuns = await openai.beta.threads.runs.list(threadId);
                            if (allRuns.data && allRuns.data.length) {
                                const firstRunId = allRuns.data[0].id;
                                const runStatus = allRuns.data.find((run) => run.id === firstRunId)?.status;
                                if (runStatus &&
                                    (runStatus === 'cancelled' ||
                                        runStatus === 'completed' ||
                                        runStatus === 'expired' ||
                                        runStatus === 'failed')) {
                                    clearInterval(timeout);
                                    resolve();
                                }
                            }
                            else {
                                clearInterval(timeout);
                                resolve();
                            }
                        }, 500);
                    });
                };
                await promise(threadId);
            }
            // Add message to thread
            await openai.beta.threads.messages.create(threadId, {
                role: 'user',
                content: input
            });
            // Run assistant thread
            const runThread = await openai.beta.threads.runs.create(threadId, {
                assistant_id: retrievedAssistant.id
            });
            const usedTools = [];
            const promise = (threadId, runId) => {
                return new Promise((resolve, reject) => {
                    const timeout = setInterval(async () => {
                        const run = await openai.beta.threads.runs.retrieve(threadId, runId);
                        const state = run.status;
                        if (state === 'completed') {
                            clearInterval(timeout);
                            resolve(state);
                        }
                        else if (state === 'requires_action') {
                            if (run.required_action?.submit_tool_outputs.tool_calls) {
                                clearInterval(timeout);
                                const actions = [];
                                run.required_action.submit_tool_outputs.tool_calls.forEach((item) => {
                                    const functionCall = item.function;
                                    const args = JSON.parse(functionCall.arguments);
                                    actions.push({
                                        tool: functionCall.name,
                                        toolInput: args,
                                        toolCallId: item.id
                                    });
                                });
                                const submitToolOutputs = [];
                                for (let i = 0; i < actions.length; i += 1) {
                                    const tool = tools.find((tool) => tool.name === actions[i].tool);
                                    if (!tool)
                                        continue;
                                    const toolOutput = await tool.call(actions[i].toolInput);
                                    submitToolOutputs.push({
                                        tool_call_id: actions[i].toolCallId,
                                        output: toolOutput
                                    });
                                    usedTools.push({
                                        tool: tool.name,
                                        toolInput: actions[i].toolInput,
                                        toolOutput
                                    });
                                }
                                if (submitToolOutputs.length) {
                                    await openai.beta.threads.runs.submitToolOutputs(threadId, runId, {
                                        tool_outputs: submitToolOutputs
                                    });
                                    resolve(state);
                                }
                                else {
                                    await openai.beta.threads.runs.cancel(threadId, runId);
                                    resolve('requires_action_retry');
                                }
                            }
                        }
                        else if (state === 'cancelled' || state === 'expired' || state === 'failed') {
                            clearInterval(timeout);
                            reject(new Error(`Error processing thread: ${state}, Thread ID: ${threadId}, Run ID: ${runId}, Status: ${state}`));
                        }
                    }, 500);
                });
            };
            // Polling run status
            let runThreadId = runThread.id;
            let state = await promise(threadId, runThread.id);
            while (state === 'requires_action') {
                state = await promise(threadId, runThread.id);
            }
            let retries = 3;
            while (state === 'requires_action_retry') {
                if (retries > 0) {
                    retries -= 1;
                    const newRunThread = await openai.beta.threads.runs.create(threadId, {
                        assistant_id: retrievedAssistant.id
                    });
                    runThreadId = newRunThread.id;
                    state = await promise(threadId, newRunThread.id);
                }
                else {
                    throw new Error(`Error processing thread: ${state}, Thread ID: ${threadId}`);
                }
            }
            // List messages
            const messages = await openai.beta.threads.messages.list(threadId);
            const messageData = messages.data ?? [];
            const assistantMessages = messageData.filter((msg) => msg.role === 'assistant');
            if (!assistantMessages.length)
                return '';
            let returnVal = '';
            const fileAnnotations = [];
            for (let i = 0; i < assistantMessages[0].content.length; i += 1) {
                if (assistantMessages[0].content[i].type === 'text') {
                    const content = assistantMessages[0].content[i];
                    if (content.text.annotations) {
                        const message_content = content.text;
                        const annotations = message_content.annotations;
                        const dirPath = path.join((0, utils_1.getUserHome)(), '.flowise', 'openai-assistant');
                        // Iterate over the annotations and add footnotes
                        for (let index = 0; index < annotations.length; index++) {
                            const annotation = annotations[index];
                            let filePath = '';
                            // Gather citations based on annotation attributes
                            const file_citation = annotation
                                .file_citation;
                            if (file_citation) {
                                const cited_file = await openai.files.retrieve(file_citation.file_id);
                                // eslint-disable-next-line no-useless-escape
                                const fileName = cited_file.filename.split(/[\/\\]/).pop() ?? cited_file.filename;
                                filePath = path.join((0, utils_1.getUserHome)(), '.flowise', 'openai-assistant', fileName);
                                await downloadFile(cited_file, filePath, dirPath, openAIApiKey);
                                fileAnnotations.push({
                                    filePath,
                                    fileName
                                });
                            }
                            else {
                                const file_path = annotation.file_path;
                                if (file_path) {
                                    const cited_file = await openai.files.retrieve(file_path.file_id);
                                    // eslint-disable-next-line no-useless-escape
                                    const fileName = cited_file.filename.split(/[\/\\]/).pop() ?? cited_file.filename;
                                    filePath = path.join((0, utils_1.getUserHome)(), '.flowise', 'openai-assistant', fileName);
                                    await downloadFile(cited_file, filePath, dirPath, openAIApiKey);
                                    fileAnnotations.push({
                                        filePath,
                                        fileName
                                    });
                                }
                            }
                            // Replace the text with a footnote
                            message_content.value = message_content.value.replace(`${annotation.text}`, `${filePath}`);
                        }
                        returnVal += message_content.value;
                    }
                    else {
                        returnVal += content.text.value;
                    }
                }
                else {
                    const content = assistantMessages[0].content[i];
                    const fileId = content.image_file.file_id;
                    const fileObj = await openai.files.retrieve(fileId);
                    const dirPath = path.join((0, utils_1.getUserHome)(), '.flowise', 'openai-assistant');
                    const filePath = path.join((0, utils_1.getUserHome)(), '.flowise', 'openai-assistant', `${fileObj.filename}.png`);
                    await downloadImg(openai, fileId, filePath, dirPath);
                    const bitmap = fsDefault.readFileSync(filePath);
                    const base64String = Buffer.from(bitmap).toString('base64');
                    const imgHTML = `<img src="data:image/png;base64,${base64String}" width="100%" height="max-content" alt="${fileObj.filename}" /><br/>`;
                    returnVal += imgHTML;
                }
            }
            return {
                text: returnVal,
                usedTools,
                fileAnnotations,
                assistant: { assistantId: openAIAssistantId, threadId, runId: runThreadId, messages: messageData }
            };
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
const downloadImg = async (openai, fileId, filePath, dirPath) => {
    const response = await openai.files.content(fileId);
    // Extract the binary data from the Response object
    const image_data = await response.arrayBuffer();
    // Convert the binary data to a Buffer
    const image_data_buffer = Buffer.from(image_data);
    // Save the image to a specific location
    if (!fsDefault.existsSync(dirPath)) {
        fsDefault.mkdirSync(path.dirname(filePath), { recursive: true });
    }
    fsDefault.writeFileSync(filePath, image_data_buffer);
};
const downloadFile = async (fileObj, filePath, dirPath, openAIApiKey) => {
    try {
        const response = await (0, node_fetch_1.default)(`https://api.openai.com/v1/files/${fileObj.id}/content`, {
            method: 'GET',
            headers: { Accept: '*/*', Authorization: `Bearer ${openAIApiKey}` }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        await new Promise((resolve, reject) => {
            if (!fsDefault.existsSync(dirPath)) {
                fsDefault.mkdirSync(path.dirname(filePath), { recursive: true });
            }
            const dest = fsDefault.createWriteStream(filePath);
            response.body.pipe(dest);
            response.body.on('end', () => resolve());
            dest.on('error', reject);
        });
        // eslint-disable-next-line no-console
        console.log('File downloaded and written to', filePath);
    }
    catch (error) {
        console.error('Error downloading or writing the file:', error);
    }
};
const formatToOpenAIAssistantTool = (tool) => {
    return {
        type: 'function',
        function: {
            name: tool.name,
            description: tool.description,
            parameters: (0, zod_to_json_schema_1.zodToJsonSchema)(tool.schema)
        }
    };
};
module.exports = { nodeClass: OpenAIAssistant_Agents };
//# sourceMappingURL=OpenAIAssistant.js.map