"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugin_1 = require("./plugin");
/**
 * 命令行扩展
 */
exports.default = (ctx, pluginOpts) => {
    new plugin_1.Plugin(ctx, pluginOpts).registerCommand();
};
//# sourceMappingURL=index.js.map