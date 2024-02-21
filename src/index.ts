import type { IPluginContext } from "@tarojs/service";
import { mergeDeep } from "tianjie";
import { Plugin } from "./plugin";
import { CreatorOptions } from "./types";

const defaultOptions: CreatorOptions = {
  mainPackage: {
    rootDir: "pages",
    tabbarDir: "tabbar",
  },
  subPackage: {
    rootDir: "pages-sub",
  },
  styleType: "scss",
};

/**
 * 命令行扩展
 */
export default (ctx: IPluginContext, pluginOpts: CreatorOptions) => {
  const options = mergeDeep(defaultOptions, pluginOpts);
  new Plugin(ctx, options).registerCommand();
};

export * from "./types";
