"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../../src");
const ioredis_1 = require("langchain/cache/ioredis");
const ioredis_2 = require("ioredis");
const schema_1 = require("langchain/schema");
const object_hash_1 = __importDefault(require("object-hash"));
class RedisCache {
    constructor() {
        this.label = 'Redis Cache';
        this.name = 'redisCache';
        this.version = 1.0;
        this.type = 'RedisCache';
        this.description = 'Cache LLM response in Redis, useful for sharing cache across multiple processes or servers';
        this.icon = 'redis.svg';
        this.category = 'Cache';
        this.baseClasses = [this.type, ...(0, src_1.getBaseClasses)(ioredis_1.RedisCache)];
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            optional: true,
            credentialNames: ['redisCacheApi', 'redisCacheUrlApi']
        };
        this.inputs = [
            {
                label: 'Time to Live (ms)',
                name: 'ttl',
                type: 'number',
                step: 1,
                optional: true,
                additionalParams: true
            }
        ];
    }
    async init(nodeData, _, options) {
        const ttl = nodeData.inputs?.ttl;
        const credentialData = await (0, src_1.getCredentialData)(nodeData.credential ?? '', options);
        const redisUrl = (0, src_1.getCredentialParam)('redisUrl', credentialData, nodeData);
        let client;
        if (!redisUrl || redisUrl === '') {
            const username = (0, src_1.getCredentialParam)('redisCacheUser', credentialData, nodeData);
            const password = (0, src_1.getCredentialParam)('redisCachePwd', credentialData, nodeData);
            const portStr = (0, src_1.getCredentialParam)('redisCachePort', credentialData, nodeData);
            const host = (0, src_1.getCredentialParam)('redisCacheHost', credentialData, nodeData);
            client = new ioredis_2.Redis({
                port: portStr ? parseInt(portStr) : 6379,
                host,
                username,
                password
            });
        }
        else {
            client = new ioredis_2.Redis(redisUrl);
        }
        const redisClient = new ioredis_1.RedisCache(client);
        redisClient.lookup = async (prompt, llmKey) => {
            let idx = 0;
            let key = getCacheKey(prompt, llmKey, String(idx));
            let value = await client.get(key);
            const generations = [];
            while (value) {
                const storedGeneration = JSON.parse(value);
                generations.push(deserializeStoredGeneration(storedGeneration));
                idx += 1;
                key = getCacheKey(prompt, llmKey, String(idx));
                value = await client.get(key);
            }
            return generations.length > 0 ? generations : null;
        };
        redisClient.update = async (prompt, llmKey, value) => {
            for (let i = 0; i < value.length; i += 1) {
                const key = getCacheKey(prompt, llmKey, String(i));
                if (ttl !== undefined) {
                    await client.set(key, JSON.stringify(serializeGeneration(value[i])), 'EX', parseInt(ttl, 10));
                }
                else {
                    await client.set(key, JSON.stringify(serializeGeneration(value[i])));
                }
            }
        };
        return redisClient;
    }
}
const getCacheKey = (...strings) => (0, object_hash_1.default)(strings.join('_'));
const deserializeStoredGeneration = (storedGeneration) => {
    if (storedGeneration.message !== undefined) {
        return {
            text: storedGeneration.text,
            message: (0, schema_1.mapStoredMessageToChatMessage)(storedGeneration.message)
        };
    }
    else {
        return { text: storedGeneration.text };
    }
};
const serializeGeneration = (generation) => {
    const serializedValue = {
        text: generation.text
    };
    if (generation.message !== undefined) {
        serializedValue.message = generation.message.toDict();
    }
    return serializedValue;
};
module.exports = { nodeClass: RedisCache };
//# sourceMappingURL=RedisCache.js.map