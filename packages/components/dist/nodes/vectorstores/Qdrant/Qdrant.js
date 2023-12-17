"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const js_client_rest_1 = require("@qdrant/js-client-rest");
const document_1 = require("langchain/document");
const qdrant_1 = require("langchain/vectorstores/qdrant");
const utils_1 = require("../../../src/utils");
class Qdrant_VectorStores {
    constructor() {
        //@ts-ignore
        this.vectorStoreMethods = {
            async upsert(nodeData, options) {
                const qdrantServerUrl = nodeData.inputs?.qdrantServerUrl;
                const collectionName = nodeData.inputs?.qdrantCollection;
                const docs = nodeData.inputs?.document;
                const embeddings = nodeData.inputs?.embeddings;
                const qdrantSimilarity = nodeData.inputs?.qdrantSimilarity;
                const qdrantVectorDimension = nodeData.inputs?.qdrantVectorDimension;
                const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
                const qdrantApiKey = (0, utils_1.getCredentialParam)('qdrantApiKey', credentialData, nodeData);
                const client = new js_client_rest_1.QdrantClient({
                    url: qdrantServerUrl,
                    apiKey: qdrantApiKey
                });
                const flattenDocs = docs && docs.length ? (0, lodash_1.flatten)(docs) : [];
                const finalDocs = [];
                for (let i = 0; i < flattenDocs.length; i += 1) {
                    if (flattenDocs[i] && flattenDocs[i].pageContent) {
                        finalDocs.push(new document_1.Document(flattenDocs[i]));
                    }
                }
                const dbConfig = {
                    client,
                    url: qdrantServerUrl,
                    collectionName,
                    collectionConfig: {
                        vectors: {
                            size: qdrantVectorDimension ? parseInt(qdrantVectorDimension, 10) : 1536,
                            distance: qdrantSimilarity ?? 'Cosine'
                        }
                    }
                };
                try {
                    await qdrant_1.QdrantVectorStore.fromDocuments(finalDocs, embeddings, dbConfig);
                }
                catch (e) {
                    throw new Error(e);
                }
            }
        };
        this.label = 'Qdrant';
        this.name = 'qdrant';
        this.version = 1.0;
        this.type = 'Qdrant';
        this.icon = 'qdrant.png';
        this.category = 'Vector Stores';
        this.description =
            'Upsert embedded data and perform similarity search upon query using Qdrant, a scalable open source vector database written in Rust';
        this.baseClasses = [this.type, 'VectorStoreRetriever', 'BaseRetriever'];
        this.badge = 'NEW';
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            description: 'Only needed when using Qdrant cloud hosted',
            optional: true,
            credentialNames: ['qdrantApi']
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
                label: 'Qdrant Server URL',
                name: 'qdrantServerUrl',
                type: 'string',
                placeholder: 'http://localhost:6333'
            },
            {
                label: 'Qdrant Collection Name',
                name: 'qdrantCollection',
                type: 'string'
            },
            {
                label: 'Vector Dimension',
                name: 'qdrantVectorDimension',
                type: 'number',
                default: 1536,
                additionalParams: true
            },
            {
                label: 'Similarity',
                name: 'qdrantSimilarity',
                description: 'Similarity measure used in Qdrant.',
                type: 'options',
                default: 'Cosine',
                options: [
                    {
                        label: 'Cosine',
                        name: 'Cosine'
                    },
                    {
                        label: 'Euclid',
                        name: 'Euclid'
                    },
                    {
                        label: 'Dot',
                        name: 'Dot'
                    }
                ],
                additionalParams: true
            },
            {
                label: 'Additional Collection Cofiguration',
                name: 'qdrantCollectionConfiguration',
                description: 'Refer to <a target="_blank" href="https://qdrant.tech/documentation/concepts/collections">collection docs</a> for more reference',
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
            },
            {
                label: 'Qdrant Search Filter',
                name: 'qdrantFilter',
                description: 'Only return points which satisfy the conditions',
                type: 'json',
                additionalParams: true,
                optional: true
            }
        ];
        this.outputs = [
            {
                label: 'Qdrant Retriever',
                name: 'retriever',
                baseClasses: this.baseClasses
            },
            {
                label: 'Qdrant Vector Store',
                name: 'vectorStore',
                baseClasses: [this.type, ...(0, utils_1.getBaseClasses)(qdrant_1.QdrantVectorStore)]
            }
        ];
    }
    async init(nodeData, _, options) {
        const qdrantServerUrl = nodeData.inputs?.qdrantServerUrl;
        const collectionName = nodeData.inputs?.qdrantCollection;
        let qdrantCollectionConfiguration = nodeData.inputs?.qdrantCollectionConfiguration;
        const embeddings = nodeData.inputs?.embeddings;
        const qdrantSimilarity = nodeData.inputs?.qdrantSimilarity;
        const qdrantVectorDimension = nodeData.inputs?.qdrantVectorDimension;
        const output = nodeData.outputs?.output;
        const topK = nodeData.inputs?.topK;
        let queryFilter = nodeData.inputs?.queryFilter;
        const k = topK ? parseFloat(topK) : 4;
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const qdrantApiKey = (0, utils_1.getCredentialParam)('qdrantApiKey', credentialData, nodeData);
        const client = new js_client_rest_1.QdrantClient({
            url: qdrantServerUrl,
            apiKey: qdrantApiKey
        });
        const dbConfig = {
            client,
            collectionName
        };
        const retrieverConfig = {
            k
        };
        if (qdrantCollectionConfiguration) {
            qdrantCollectionConfiguration =
                typeof qdrantCollectionConfiguration === 'object'
                    ? qdrantCollectionConfiguration
                    : JSON.parse(qdrantCollectionConfiguration);
            dbConfig.collectionConfig = {
                ...qdrantCollectionConfiguration,
                vectors: {
                    ...qdrantCollectionConfiguration.vectors,
                    size: qdrantVectorDimension ? parseInt(qdrantVectorDimension, 10) : 1536,
                    distance: qdrantSimilarity ?? 'Cosine'
                }
            };
        }
        if (queryFilter) {
            retrieverConfig.filter = typeof queryFilter === 'object' ? queryFilter : JSON.parse(queryFilter);
        }
        const vectorStore = await qdrant_1.QdrantVectorStore.fromExistingCollection(embeddings, dbConfig);
        if (output === 'retriever') {
            const retriever = vectorStore.asRetriever(retrieverConfig);
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
module.exports = { nodeClass: Qdrant_VectorStores };
//# sourceMappingURL=Qdrant.js.map