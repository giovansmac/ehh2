"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("langchain/schema");
const utils_1 = require("../../../src/utils");
const zep_1 = require("langchain/memory/zep");
class ZepMemory_Memory {
    constructor() {
        this.label = 'Zep Memory';
        this.name = 'ZepMemory';
        this.version = 1.0;
        this.type = 'ZepMemory';
        this.icon = 'zep.png';
        this.category = 'Memory';
        this.description = 'Summarizes the conversation and stores the memory in zep server';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(zep_1.ZepMemory)];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            optional: true,
            description: 'Configure JWT authentication on your Zep instance (Optional)',
            credentialNames: ['zepMemoryApi']
        };
        this.inputs = [
            {
                label: 'Base URL',
                name: 'baseURL',
                type: 'string',
                default: 'http://127.0.0.1:8000'
            },
            {
                label: 'Auto Summary',
                name: 'autoSummary',
                type: 'boolean',
                default: true
            },
            {
                label: 'Session Id',
                name: 'sessionId',
                type: 'string',
                description: 'If not specified, the first CHAT_MESSAGE_ID will be used as sessionId',
                default: '',
                additionalParams: true,
                optional: true
            },
            {
                label: 'Size',
                name: 'k',
                type: 'number',
                default: '10',
                description: 'Window of size k to surface the last k back-and-forth to use as memory.'
            },
            {
                label: 'Auto Summary Template',
                name: 'autoSummaryTemplate',
                type: 'string',
                default: 'This is the summary of the following conversation:\n{summary}',
                additionalParams: true
            },
            {
                label: 'AI Prefix',
                name: 'aiPrefix',
                type: 'string',
                default: 'ai',
                additionalParams: true
            },
            {
                label: 'Human Prefix',
                name: 'humanPrefix',
                type: 'string',
                default: 'human',
                additionalParams: true
            },
            {
                label: 'Memory Key',
                name: 'memoryKey',
                type: 'string',
                default: 'chat_history',
                additionalParams: true
            },
            {
                label: 'Input Key',
                name: 'inputKey',
                type: 'string',
                default: 'input',
                additionalParams: true
            },
            {
                label: 'Output Key',
                name: 'outputKey',
                type: 'string',
                default: 'text',
                additionalParams: true
            }
        ];
    }
    async init(nodeData, _, options) {
        const autoSummaryTemplate = nodeData.inputs?.autoSummaryTemplate;
        const autoSummary = nodeData.inputs?.autoSummary;
        const k = nodeData.inputs?.k;
        let zep = await initalizeZep(nodeData, options);
        // hack to support summary
        let tmpFunc = zep.loadMemoryVariables;
        zep.loadMemoryVariables = async (values) => {
            let data = await tmpFunc.bind(zep, values)();
            if (autoSummary && zep.returnMessages && data[zep.memoryKey] && data[zep.memoryKey].length) {
                const zepClient = await zep.zepClientPromise;
                const memory = await zepClient.memory.getMemory(zep.sessionId, parseInt(k, 10) ?? 10);
                if (memory?.summary) {
                    let summary = autoSummaryTemplate.replace(/{summary}/g, memory.summary.content);
                    // eslint-disable-next-line no-console
                    console.log('[ZepMemory] auto summary:', summary);
                    data[zep.memoryKey].unshift(new schema_1.SystemMessage(summary));
                }
            }
            // for langchain zep memory compatibility, or we will get "Missing value for input variable chat_history"
            if (data instanceof Array) {
                data = {
                    [zep.memoryKey]: data
                };
            }
            return data;
        };
        return zep;
    }
    async clearSessionMemory(nodeData, options) {
        const zep = await initalizeZep(nodeData, options);
        const sessionId = nodeData.inputs?.sessionId;
        const chatId = options?.chatId;
        options.logger.info(`Clearing Zep memory session ${sessionId ? sessionId : chatId}`);
        await zep.clear();
        options.logger.info(`Successfully cleared Zep memory session ${sessionId ? sessionId : chatId}`);
    }
}
const initalizeZep = async (nodeData, options) => {
    const baseURL = nodeData.inputs?.baseURL;
    const aiPrefix = nodeData.inputs?.aiPrefix;
    const humanPrefix = nodeData.inputs?.humanPrefix;
    const memoryKey = nodeData.inputs?.memoryKey;
    const inputKey = nodeData.inputs?.inputKey;
    const sessionId = nodeData.inputs?.sessionId;
    const chatId = options?.chatId;
    let isSessionIdUsingChatMessageId = false;
    if (!sessionId && chatId)
        isSessionIdUsingChatMessageId = true;
    const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
    const apiKey = (0, utils_1.getCredentialParam)('apiKey', credentialData, nodeData);
    const obj = {
        baseURL,
        sessionId: sessionId ? sessionId : chatId,
        aiPrefix,
        humanPrefix,
        returnMessages: true,
        memoryKey,
        inputKey
    };
    if (apiKey)
        obj.apiKey = apiKey;
    if (isSessionIdUsingChatMessageId)
        obj.isSessionIdUsingChatMessageId = true;
    return new ZepMemoryExtended(obj);
};
class ZepMemoryExtended extends zep_1.ZepMemory {
    constructor(fields) {
        super(fields);
        this.isSessionIdUsingChatMessageId = false;
        this.isSessionIdUsingChatMessageId = fields.isSessionIdUsingChatMessageId;
    }
}
module.exports = { nodeClass: ZepMemory_Memory };
//# sourceMappingURL=ZepMemory.js.map