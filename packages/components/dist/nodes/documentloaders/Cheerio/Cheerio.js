"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = require("langchain/document_loaders/web/cheerio");
const linkifyjs_1 = require("linkifyjs");
const css_what_1 = require("css-what");
const src_1 = require("../../../src");
class Cheerio_DocumentLoaders {
    constructor() {
        this.label = 'Cheerio Web Scraper';
        this.name = 'cheerioWebScraper';
        this.version = 1.1;
        this.type = 'Document';
        this.icon = 'cheerio.svg';
        this.category = 'Document Loaders';
        this.description = `Load data from webpages`;
        this.baseClasses = [this.type];
        this.inputs = [
            {
                label: 'URL',
                name: 'url',
                type: 'string'
            },
            {
                label: 'Text Splitter',
                name: 'textSplitter',
                type: 'TextSplitter',
                optional: true
            },
            {
                label: 'Get Relative Links Method',
                name: 'relativeLinksMethod',
                type: 'options',
                description: 'Select a method to retrieve relative links',
                options: [
                    {
                        label: 'Web Crawl',
                        name: 'webCrawl',
                        description: 'Crawl relative links from HTML URL'
                    },
                    {
                        label: 'Scrape XML Sitemap',
                        name: 'scrapeXMLSitemap',
                        description: 'Scrape relative links from XML sitemap URL'
                    }
                ],
                optional: true,
                additionalParams: true
            },
            {
                label: 'Get Relative Links Limit',
                name: 'limit',
                type: 'number',
                optional: true,
                additionalParams: true,
                description: 'Only used when "Get Relative Links Method" is selected. Set 0 to retrieve all relative links, default limit is 10.',
                warning: `Retrieving all links might take long time, and all links will be upserted again if the flow's state changed (eg: different URL, chunk size, etc)`
            },
            {
                label: 'Selector (CSS)',
                name: 'selector',
                type: 'string',
                description: 'Specify a CSS selector to select the content to be extracted',
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
    async init(nodeData) {
        const textSplitter = nodeData.inputs?.textSplitter;
        const metadata = nodeData.inputs?.metadata;
        const relativeLinksMethod = nodeData.inputs?.relativeLinksMethod;
        let limit = nodeData.inputs?.limit;
        let url = nodeData.inputs?.url;
        url = url.trim();
        if (!(0, linkifyjs_1.test)(url)) {
            throw new Error('Invalid URL');
        }
        const selector = nodeData.inputs?.selector;
        let params = {};
        if (selector) {
            (0, css_what_1.parse)(selector); // comes with cheerio - will throw error if invalid
            params['selector'] = selector;
        }
        async function cheerioLoader(url) {
            try {
                let docs = [];
                const loader = new cheerio_1.CheerioWebBaseLoader(url, params);
                if (textSplitter) {
                    docs = await loader.loadAndSplit(textSplitter);
                }
                else {
                    docs = await loader.load();
                }
                return docs;
            }
            catch (err) {
                if (process.env.DEBUG === 'true')
                    console.error(`error in CheerioWebBaseLoader: ${err.message}, on page: ${url}`);
            }
        }
        let docs = [];
        if (relativeLinksMethod) {
            if (process.env.DEBUG === 'true')
                console.info(`Start ${relativeLinksMethod}`);
            if (!limit)
                limit = '10';
            else if (parseInt(limit) < 0)
                throw new Error('Limit cannot be less than 0');
            const pages = relativeLinksMethod === 'webCrawl' ? await (0, src_1.webCrawl)(url, parseInt(limit)) : await (0, src_1.xmlScrape)(url, parseInt(limit));
            if (process.env.DEBUG === 'true')
                console.info(`pages: ${JSON.stringify(pages)}, length: ${pages.length}`);
            if (!pages || pages.length === 0)
                throw new Error('No relative links found');
            for (const page of pages) {
                docs.push(...(await cheerioLoader(page)));
            }
            if (process.env.DEBUG === 'true')
                console.info(`Finish ${relativeLinksMethod}`);
        }
        else {
            docs = await cheerioLoader(url);
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
            return finaldocs;
        }
        return docs;
    }
}
module.exports = { nodeClass: Cheerio_DocumentLoaders };
//# sourceMappingURL=Cheerio.js.map