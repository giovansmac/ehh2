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
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const weaviate_ts_client_1 = __importStar(require("weaviate-ts-client"));
const weaviate_1 = require("langchain/vectorstores/weaviate");
const document_1 = require("langchain/document");
const utils_1 = require("../../../src/utils");
class Weaviate_VectorStores {
    constructor() {
        //@ts-ignore
        this.vectorStoreMethods = {
            async upsert(nodeData, options) {
                const weaviateScheme = nodeData.inputs?.weaviateScheme;
                const weaviateHost = nodeData.inputs?.weaviateHost;
                const weaviateIndex = nodeData.inputs?.weaviateIndex;
                const weaviateTextKey = nodeData.inputs?.weaviateTextKey;
                const weaviateMetadataKeys = nodeData.inputs?.weaviateMetadataKeys;
                const docs = nodeData.inputs?.document;
                const embeddings = nodeData.inputs?.embeddings;
                const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
                const weaviateApiKey = (0, utils_1.getCredentialParam)('weaviateApiKey', credentialData, nodeData);
                const clientConfig = {
                    scheme: weaviateScheme,
                    host: weaviateHost
                };
                if (weaviateApiKey)
                    clientConfig.apiKey = new weaviate_ts_client_1.ApiKey(weaviateApiKey);
                const client = weaviate_ts_client_1.default.client(clientConfig);
                const flattenDocs = docs && docs.length ? (0, lodash_1.flatten)(docs) : [];
                const finalDocs = [];
                for (let i = 0; i < flattenDocs.length; i += 1) {
                    if (flattenDocs[i] && flattenDocs[i].pageContent) {
                        finalDocs.push(new document_1.Document(flattenDocs[i]));
                    }
                }
                const obj = {
                    client,
                    indexName: weaviateIndex
                };
                if (weaviateTextKey)
                    obj.textKey = weaviateTextKey;
                if (weaviateMetadataKeys)
                    obj.metadataKeys = JSON.parse(weaviateMetadataKeys.replace(/\s/g, ''));
                try {
                    await weaviate_1.WeaviateStore.fromDocuments(finalDocs, embeddings, obj);
                }
                catch (e) {
                    throw new Error(e);
                }
            }
        };
        this.label = 'Weaviate';
        this.name = 'weaviate';
        this.version = 1.0;
        this.type = 'Weaviate';
        this.icon = 'weaviate.png';
        this.category = 'Vector Stores';
        this.description =
            'Upsert embedded data and perform similarity search upon query using Weaviate, a scalable open-source vector database';
        this.baseClasses = [this.type, 'VectorStoreRetriever', 'BaseRetriever'];
        this.badge = 'NEW';
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            description: 'Only needed when using Weaviate cloud hosted',
            optional: true,
            credentialNames: ['weaviateApi']
        };
        this.inputs = [
            {
                label: 'Document',
                name: 'document',
                type: 'Document',
                list: true,
                optional: true
            },
            {
                label: 'Embeddings',
                name: 'embeddings',
                type: 'Embeddings'
            },
            {
                label: 'Weaviate Scheme',
                name: 'weaviateScheme',
                type: 'options',
                default: 'https',
                options: [
                    {
                        label: 'https',
                        name: 'https'
                    },
                    {
                        label: 'http',
                        name: 'http'
                    }
                ]
            },
            {
                label: 'Weaviate Host',
                name: 'weaviateHost',
                type: 'string',
                placeholder: 'localhost:8080'
            },
            {
                label: 'Weaviate Index',
                name: 'weaviateIndex',
                type: 'string',
                placeholder: 'Test'
            },
            {
                label: 'Weaviate Text Key',
                name: 'weaviateTextKey',
                type: 'string',
                placeholder: 'text',
                optional: true,
                additionalParams: true
            },
            {
                label: 'Weaviate Metadata Keys',
                name: 'weaviateMetadataKeys',
                type: 'string',
                rows: 4,
                placeholder: `["foo"]`,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Top K',
                name: 'topK',
                description: 'Number of top results to fetch. Default to 4',
                placeholder: '4',
                type: 'number',
                additionalParams: true,
                optional: true
            }
        ];
        this.outputs = [
            {
                label: 'Weaviate Retriever',
                name: 'retriever',
                baseClasses: this.baseClasses
            },
            {
                label: 'Weaviate Vector Store',
                name: 'vectorStore',
                baseClasses: [this.type, ...(0, utils_1.getBaseClasses)(weaviate_1.WeaviateStore)]
            }
        ];
    }
    async init(nodeData, _, options) {
        const weaviateScheme = nodeData.inputs?.weaviateScheme;
        const weaviateHost = nodeData.inputs?.weaviateHost;
        const weaviateIndex = nodeData.inputs?.weaviateIndex;
        const weaviateTextKey = nodeData.inputs?.weaviateTextKey;
        const weaviateMetadataKeys = nodeData.inputs?.weaviateMetadataKeys;
        const embeddings = nodeData.inputs?.embeddings;
        const output = nodeData.outputs?.output;
        const topK = nodeData.inputs?.topK;
        const k = topK ? parseFloat(topK) : 4;
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const weaviateApiKey = (0, utils_1.getCredentialParam)('weaviateApiKey', credentialData, nodeData);
        const clientConfig = {
            scheme: weaviateScheme,
            host: weaviateHost
        };
        if (weaviateApiKey)
            clientConfig.apiKey = new weaviate_ts_client_1.ApiKey(weaviateApiKey);
        const client = weaviate_ts_client_1.default.client(clientConfig);
        const obj = {
            client,
            indexName: weaviateIndex
        };
        if (weaviateTextKey)
            obj.textKey = weaviateTextKey;
        if (weaviateMetadataKeys)
            obj.metadataKeys = JSON.parse(weaviateMetadataKeys.replace(/\s/g, ''));
        const vectorStore = await weaviate_1.WeaviateStore.fromExistingIndex(embeddings, obj);
        if (output === 'retriever') {
            const retriever = vectorStore.asRetriever(k);
            return retriever;
        }
        else if (output === 'vectorStore') {
            ;
            vectorStore.k = k;
            return vectorStore;
        }
        return vectorStore;
    }
}
module.exports = { nodeClass: Weaviate_VectorStores };
//# sourceMappingURL=Weaviate.js.map