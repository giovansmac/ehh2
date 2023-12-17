"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const chroma_1 = require("langchain/vectorstores/chroma");
const document_1 = require("langchain/document");
const utils_1 = require("../../../src/utils");
const core_1 = require("./core");
class Chroma_VectorStores {
    constructor() {
        //@ts-ignore
        this.vectorStoreMethods = {
            async upsert(nodeData, options) {
                const collectionName = nodeData.inputs?.collectionName;
                const docs = nodeData.inputs?.document;
                const embeddings = nodeData.inputs?.embeddings;
                const chromaURL = nodeData.inputs?.chromaURL;
                const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
                const chromaApiKey = (0, utils_1.getCredentialParam)('chromaApiKey', credentialData, nodeData);
                const flattenDocs = docs && docs.length ? (0, lodash_1.flatten)(docs) : [];
                const finalDocs = [];
                for (let i = 0; i < flattenDocs.length; i += 1) {
                    if (flattenDocs[i] && flattenDocs[i].pageContent) {
                        finalDocs.push(new document_1.Document(flattenDocs[i]));
                    }
                }
                const obj = { collectionName };
                if (chromaURL)
                    obj.url = chromaURL;
                if (chromaApiKey)
                    obj.chromaApiKey = chromaApiKey;
                try {
                    await core_1.ChromaExtended.fromDocuments(finalDocs, embeddings, obj);
                }
                catch (e) {
                    throw new Error(e);
                }
            }
        };
        this.label = 'Chroma';
        this.name = 'chroma';
        this.version = 1.0;
        this.type = 'Chroma';
        this.icon = 'chroma.svg';
        this.category = 'Vector Stores';
        this.description = 'Upsert embedded data and perform similarity search upon query using Chroma, an open-source embedding database';
        this.baseClasses = [this.type, 'VectorStoreRetriever', 'BaseRetriever'];
        this.badge = 'NEW';
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            description: 'Only needed if you have chroma on cloud services with X-Api-key',
            optional: true,
            credentialNames: ['chromaApi']
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
                label: 'Collection Name',
                name: 'collectionName',
                type: 'string'
            },
            {
                label: 'Chroma URL',
                name: 'chromaURL',
                type: 'string',
                optional: true
            },
            {
                label: 'Chroma Metadata Filter',
                name: 'chromaMetadataFilter',
                type: 'json',
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
                label: 'Chroma Retriever',
                name: 'retriever',
                baseClasses: this.baseClasses
            },
            {
                label: 'Chroma Vector Store',
                name: 'vectorStore',
                baseClasses: [this.type, ...(0, utils_1.getBaseClasses)(chroma_1.Chroma)]
            }
        ];
    }
    async init(nodeData, _, options) {
        const collectionName = nodeData.inputs?.collectionName;
        const embeddings = nodeData.inputs?.embeddings;
        const chromaURL = nodeData.inputs?.chromaURL;
        const output = nodeData.outputs?.output;
        const topK = nodeData.inputs?.topK;
        const k = topK ? parseFloat(topK) : 4;
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const chromaApiKey = (0, utils_1.getCredentialParam)('chromaApiKey', credentialData, nodeData);
        const chromaMetadataFilter = nodeData.inputs?.chromaMetadataFilter;
        const obj = { collectionName };
        if (chromaURL)
            obj.url = chromaURL;
        if (chromaApiKey)
            obj.chromaApiKey = chromaApiKey;
        if (chromaMetadataFilter) {
            const metadatafilter = typeof chromaMetadataFilter === 'object' ? chromaMetadataFilter : JSON.parse(chromaMetadataFilter);
            obj.filter = metadatafilter;
        }
        const vectorStore = await core_1.ChromaExtended.fromExistingCollection(embeddings, obj);
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
module.exports = { nodeClass: Chroma_VectorStores };
//# sourceMappingURL=Chroma.js.map