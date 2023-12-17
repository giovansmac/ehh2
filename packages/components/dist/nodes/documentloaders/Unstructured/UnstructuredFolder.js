"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unstructured_1 = require("langchain/document_loaders/fs/unstructured");
const utils_1 = require("../../../src/utils");
class UnstructuredFolder_DocumentLoaders {
    constructor() {
        this.label = 'Unstructured Folder Loader';
        this.name = 'unstructuredFolderLoader';
        this.version = 1.0;
        this.type = 'Document';
        this.icon = 'unstructured.png';
        this.category = 'Document Loaders';
        this.description = 'Use Unstructured.io to load data from a folder';
        this.baseClasses = [this.type];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['unstructuredApi'],
            optional: true
        };
        this.inputs = [
            {
                label: 'Folder Path',
                name: 'folderPath',
                type: 'string',
                placeholder: ''
            },
            {
                label: 'Unstructured API URL',
                name: 'unstructuredAPIUrl',
                description: 'Unstructured API URL. Read <a target="_blank" href="https://unstructured-io.github.io/unstructured/introduction.html#getting-started">more</a> on how to get started',
                type: 'string',
                default: 'http://localhost:8000/general/v0/general'
            },
            {
                label: 'Element Type',
                name: 'elementType',
                description: 'Unstructured partition document into different types, select the types to return. If not selected, all types will be returned',
                type: 'multiOptions',
                options: [
                    {
                        label: 'FigureCaption',
                        name: 'FigureCaption'
                    },
                    {
                        label: 'NarrativeText',
                        name: 'NarrativeText'
                    },
                    {
                        label: 'ListItem',
                        name: 'ListItem'
                    },
                    {
                        label: 'Title',
                        name: 'Title'
                    },
                    {
                        label: 'Address',
                        name: 'Address'
                    },
                    {
                        label: 'Table',
                        name: 'Table'
                    },
                    {
                        label: 'PageBreak',
                        name: 'PageBreak'
                    },
                    {
                        label: 'Header',
                        name: 'Header'
                    },
                    {
                        label: 'Footer',
                        name: 'Footer'
                    },
                    {
                        label: 'UncategorizedText',
                        name: 'UncategorizedText'
                    },
                    {
                        label: 'Image',
                        name: 'Image'
                    },
                    {
                        label: 'Formula',
                        name: 'Formula'
                    }
                ],
                default: [],
                optional: true,
                additionalParams: true
            },
            {
                label: 'Metadata',
                name: 'metadata',
                type: 'json',
                optional: true,
                additionalParams: true
            }
        ];
    }
    async init(nodeData, _, options) {
        const folderPath = nodeData.inputs?.folderPath;
        const unstructuredAPIUrl = nodeData.inputs?.unstructuredAPIUrl;
        const metadata = nodeData.inputs?.metadata;
        const elementType = nodeData.inputs?.elementType;
        const obj = { apiUrl: unstructuredAPIUrl };
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const unstructuredAPIKey = (0, utils_1.getCredentialParam)('unstructuredAPIKey', credentialData, nodeData);
        if (unstructuredAPIKey)
            obj.apiKey = unstructuredAPIKey;
        const loader = new unstructured_1.UnstructuredDirectoryLoader(folderPath, obj);
        const docs = await loader.load();
        let elementTypes = [];
        if (elementType) {
            try {
                elementTypes = JSON.parse(elementType);
            }
            catch (e) {
                elementTypes = [];
            }
        }
        if (metadata) {
            const parsedMetadata = typeof metadata === 'object' ? metadata : JSON.parse(metadata);
            let finaldocs = [];
            for (const doc of docs) {
                const newdoc = {
                    ...doc,
                    metadata: {
                        ...doc.metadata,
                        ...parsedMetadata
                    }
                };
                finaldocs.push(newdoc);
            }
            return elementTypes.length ? finaldocs.filter((doc) => elementTypes.includes(doc.metadata.category)) : finaldocs;
        }
        return elementTypes.length ? docs.filter((doc) => elementTypes.includes(doc.metadata.category)) : docs;
    }
}
module.exports = { nodeClass: UnstructuredFolder_DocumentLoaders };
//# sourceMappingURL=UnstructuredFolder.js.map