"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plugin = void 0;
const constant_1 = require("./constant");
const utils_1 = require("./utils");
class Plugin {
    constructor(ctx, options) {
        this.ctx = ctx;
        this.options = options;
    }
    log(type, message) {
        this.ctx.helper.printLog(type, message);
    }
    async handleCreater(ctx, options, { _ }) {
        if ((_ === null || _ === void 0 ? void 0 : _.length) < 2) {
            this.log(constant_1.LogTypeEnum.ERROR, '请输入页面路径');
            process.exit(0);
        }
        else {
            const cmd = _[0];
            const path = _[1];
            if (!(0, utils_1.validPath)(path)) {
                this.log(constant_1.LogTypeEnum.ERROR, '路径不合法');
                process.exit(0);
            }
            switch (cmd) {
                case 'gp':
                    (0, utils_1.generatorMainPackagePage)(ctx, path, options);
                    break;
                case 'gs':
                    (0, utils_1.generatorSubPackagePage)(ctx, path, options);
                    break;
                case 'gt':
                    (0, utils_1.generatorTabBarPage)(ctx, path, options);
                    break;
            }
        }
        process.exit(0);
    }
    registerCommand() {
        this.ctx.registerCommand({
            name: 'gs',
            synopsisList: [
                'taro gs home/goods-list     (在分包目录中生成home/goods-list, 例如: pages-sub/home/goods-list)',
            ],
            fn: async (opt) => await this.handleCreater(this.ctx, this.options, opt),
        });
        this.ctx.registerCommand({
            name: 'gp',
            synopsisList: [
                'taro gp auth     (在主包目录中生成auth, 例如: pages/auth)',
            ],
            fn: async (opt) => await this.handleCreater(this.ctx, this.options, opt),
        });
        this.ctx.registerCommand({
            name: 'gt',
            synopsisList: [
                'taro gt profile     (在tabbar中生成profile, 例如: pages/tabbar/profile)',
            ],
            fn: async (opt) => await this.handleCreater(this.ctx, this.options, opt),
        });
    }
}
exports.Plugin = Plugin;
//# sourceMappingURL=plugin.js.map