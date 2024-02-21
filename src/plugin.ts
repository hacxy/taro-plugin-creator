import { IPluginContext } from "@tarojs/service";
import { LogTypeEnum } from "./constant";
import { CreatorOptions } from "./types";
import {
  generatorMainPackagePage,
  generatorSubPackagePage,
  generatorTabBarPage,
  validPath,
} from "./utils";

export class Plugin {
  constructor(
    public readonly ctx: IPluginContext,
    public readonly options: CreatorOptions
  ) {}

  log(type: LogTypeEnum, message: string) {
    this.ctx.helper.printLog(type as any, message);
  }

  async handleCreater(ctx: IPluginContext, opt: CreatorOptions, { options }) {
    if (!options.s && !options.m && !options.t) {
      this.log(LogTypeEnum.ERROR, "请输入页面路径");
      process.exit(0);
    } else {
      const path = options.s || options.m || options.t;
      if (!validPath(path)) {
        this.log(LogTypeEnum.ERROR, "路径不合法");
        process.exit(0);
      }

      if (options.m) {
        generatorMainPackagePage(ctx, path, opt);
      } else if (options.s) {
        generatorSubPackagePage(ctx, path, opt);
      } else if (options.t) {
        generatorTabBarPage(ctx, path, opt);
      }
    }
    process.exit(0);
  }
  registerCommand() {
    this.ctx.registerCommand({
      name: "c",
      synopsisList: [
        "taro c -m [path]     (创建主包页面, 例如: taro c -m home)",
        "taro c -s [path]     (创建分包页面, 例如: taro c -s profile/userInfo)",
        "taro c -t [path]     (创建tabbar页面, 例如: taro c -t about)",
      ],
      fn: async (opt) => {
        await this.handleCreater(this.ctx, this.options, opt);
      },
    });

    // this.ctx.registerCommand({
    //   name: "gp",
    //   synopsisList: [
    //     "taro gp auth     (在主包目录中生成auth, 例如: pages/auth)",
    //   ],
    //   fn: async (opt) => await this.handleCreater(this.ctx, this.options, opt),
    // });

    // this.ctx.registerCommand({
    //   name: "gt",
    //   synopsisList: [
    //     "taro gt profile     (在tabbar中生成profile, 例如: pages/tabbar/profile)",
    //   ],
    //   fn: async (opt) => await this.handleCreater(this.ctx, this.options, opt),
    // });
  }
}
