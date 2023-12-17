"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RedisCacheUrlApi {
    constructor() {
        this.label = 'Redis Cache URL';
        this.name = 'redisCacheUrlApi';
        this.version = 1.0;
        this.inputs = [
            {
                label: 'Redis URL',
                name: 'redisUrl',
                type: 'string',
                default: '127.0.0.1'
            }
        ];
    }
}
module.exports = { credClass: RedisCacheUrlApi };
//# sourceMappingURL=RedisCacheUrlApi.credential.js.map