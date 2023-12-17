"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tools_1 = require("langchain/tools");
const agents_1 = require("langchain/agents");
const src_1 = require("../../../src");
class ZapierNLA_Tools {
    constructor() {
        this.label = 'Zapier NLA';
        this.name = 'zapierNLA';
        this.version = 1.0;
        this.type = 'ZapierNLA';
        this.icon = 'zapier.svg';
        this.category = 'Tools';
        this.description = "Access to apps and actions on Zapier's platform through a natural language API interface";
        this.badge = 'DEPRECATING';
        this.inputs = [];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['zapierNLAApi']
        };
        this.baseClasses = [this.type, 'Tool'];
    }
    async init(nodeData, _, options) {
        const credentialData = await (0, src_1.getCredentialData)(nodeData.credential ?? '', options);
        const zapierNLAApiKey = (0, src_1.getCredentialParam)('zapierNLAApiKey', credentialData, nodeData);
        const obj = {
            apiKey: zapierNLAApiKey
        };
        const zapier = new tools_1.ZapierNLAWrapper(obj);
        const toolkit = await agents_1.ZapierToolKit.fromZapierNLAWrapper(zapier);
        return toolkit.tools;
    }
}
module.exports = { nodeClass: ZapierNLA_Tools };
//# sourceMappingURL=ZapierNLA.js.map