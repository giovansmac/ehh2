"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OpenAPIAuth {
    constructor() {
        this.label = 'OpenAPI Auth Token';
        this.name = 'openAPIAuth';
        this.version = 1.0;
        this.inputs = [
            {
                label: 'OpenAPI Token',
                name: 'openAPIToken',
                type: 'password',
                description: 'Auth Token. For example: Bearer <TOKEN>'
            }
        ];
    }
}
module.exports = { credClass: OpenAPIAuth };
//# sourceMappingURL=OpenAPIAuth.credential.js.map