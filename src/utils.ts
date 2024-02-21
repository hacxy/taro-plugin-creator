import { IPluginContext } from "@tarojs/service";
import * as fs from "fs-extra";
import * as path from "path";
import { route, style, tsx } from "./templates";
import { CreatorOptions } from "./types";

/**
 *
 * @param componentName 页面
 * @param componentDir   页面目录
 * @param cssExt:文件后缀
 * @param log 日志工具
 */
export function PageGenerator(
  ctx: IPluginContext,
  pagePath: string,
  pageName: string,
  options: CreatorOptions
) {
  fs.ensureDirSync(pagePath);

  fs.writeFileSync(
    path.join(pagePath, `index.tsx`),
    tsx(pageName, options.styleType!)
  );
  console.log(
    ctx.helper.chalk.green(path.join(pagePath, `index.tsx` + " 创建成功"))
  );

  // style
  fs.writeFileSync(
    path.join(pagePath, `index.module.${options.styleType}`),
    style(pageName)
  );
  console.log(
    ctx.helper.chalk.green(
      path.join(pagePath, `index.module.${options.styleType}`) + " 创建成功"
    )
  );

  // route.config.ts
  fs.writeFileSync(path.join(pagePath, `route.config.ts`), route());
  console.log(
    ctx.helper.chalk.green(path.join(pagePath, `route.config.ts`) + " 创建成功")
  );
}

export const generatorMainPackagePage = (
  ctx: IPluginContext,
  pagePath: string,
  options: CreatorOptions
) => {
  if (pagePath.includes("/")) {
    console.log(ctx.helper.chalk.red("主包页面路径只允许一级"));
    return;
  } else {
    const finalDir = path.resolve(getPagesPath(ctx, options), pagePath);
    const pageName = pagePath;
    PageGenerator(ctx, finalDir, pageName, options);
  }
};

export const generatorSubPackagePage = (
  ctx: IPluginContext,
  pagePath: string,
  options: CreatorOptions
) => {
  const pagePathArr = pagePath.split("/");

  if (pagePathArr.length !== 2) {
    console.log(ctx.helper.chalk.red("主包页面路径只允许二级"));
    return;
  } else {
    const subPackageDir = options.subPackage.rootDir;
    const finalDir = path.resolve(
      ctx.paths.sourcePath,
      subPackageDir!,
      pagePath
    );
    const pageName = pagePathArr[1];
    PageGenerator(ctx, finalDir, pageName, options);
  }
};

export const generatorTabBarPage = (
  ctx: IPluginContext,
  pagePath: string,
  options: CreatorOptions
) => {
  const pagePathArr = pagePath.split("/");

  if (pagePathArr.length !== 1) {
    console.log(ctx.helper.chalk.red("tabbar页面路径只允许一级"));
    return;
  } else {
    const tabbarDir = options.mainPackage.tabbarDir;
    const finalDir = path.resolve(
      getPagesPath(ctx, options),
      tabbarDir!,
      pagePath
    );
    const pageName = pagePath;
    PageGenerator(ctx, finalDir, pageName, options);
  }
};

export function toCamelCase(str: string, capitalizeFirstLetter = false) {
  let result = "";
  if (str.includes("-")) {
    result = str
      .toLowerCase()
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  } else {
    result = str;
  }
  if (!capitalizeFirstLetter) {
    result = result.charAt(0).toLowerCase() + result.slice(1);
  } else {
    result = result.charAt(0).toUpperCase() + result.slice(1);
  }
  return result;
}

export function validPath(str: string): boolean {
  if (typeof str !== "string") return false;
  const regex = /^[a-zA-Z\-\/][a-zA-Z0-9\-\/]*$/;
  return regex.test(str);
}
export function getPagesPath(ctx: IPluginContext, options: CreatorOptions) {
  return path.resolve(ctx.paths.sourcePath, options.mainPackage.rootDir!);
}
