# taro-plugin-creator

## 概述

在 taro 项目中快捷创建主包、分包、tabbar 页面的命令行工具插件, 搭配[taro-plugin-auto-path](https://github.com/loclink/taro-plugin-auto-path)使用更佳.

## 特征

- 快捷创建主包页面
- 快捷创建分包页面
- 快捷创建 tabbar 页面
- 所有类型的页面路径可配
- 自定义样式类型后缀

## 预览

![](https://raw.githubusercontent.com/loclink/loclink/master/img/2024-02-21%2021.41.41.gif)

## 安装 & 更新

```
npm i taro-plugin-creator@latest -D
```

## 使用插件

### 简单注册

- 在`/config/index.ts`中注册插件, 未传入配置则使用插件默认配置

```ts
export default defineConfig(async (merge) => {
  const baseConfig: UserConfigExport = {
    // ...other config

    plugins: [
      // ... other plugins
      "taro-plugin-creator",
    ],

    // ...other config
  };
});
```

### 自定义配置

- 默认配置注解:

```ts
export interface CreatorOptions {
  /**
   * 主包页面路径配置
   */
  mainPackage: {
    /**
     * 配置主包页面存放的根路径
     * @example 例如配置: 'pages', 则将在src/pages中创建主包页面
     * @default 'pages'
     */
    rootDir: string;

    /**
     * 配置tabbar页面存放路径
     * @example 例如配置为: 'tabbar', 则将在src/{rootDir}/tabbar目录下创建tabbar页面
     * @default 'tabbar'
     */
    tabbarDir: string;
  };

  /**
   * 分包页面路径配置
   */
  subPackage: {
    /**
     * 配置分包页面存放的根路径
     * @example 例如配置: 'pages-sub', 则将在src/pages-sub中创建分包页面
     * @default 'pages-sub'
     */
    rootDir: string;
  };

  /**
   * 样式类型, 决定生成的样式文件的后缀名
   * @default scss
   */
  styleType: "css" | "less" | "scss";
}
```

- 配置示例:

```ts
export default defineConfig(async (merge) => {
  const baseConfig: UserConfigExport = {
    // ...other config

    plugins: [
      // ... other plugins
      [
        "taro-plugin-creator",
        {
          mainPackage: {
            rootDir: "pages",
            tabbarDir: "tabbar",
          },
          subPackage: {
            rootDir: "pages-sub",
          },
        },
      ],
    ],

    // ...other config
  };
});
```

- 你还可以利用插件提供的接口, 对选项进行类型推导, 我推荐这样使用:

1. 新建一个文件`/config/plugin.options.ts`由于存放插件选项, 这样您就可以跳转至该插件的类型定义查看更详细的配置注解:

```ts
// /config/plugin.options.ts
import { CreatorOptions } from "taro-plugin-creator";
export const creatorOptions: CreatorOptions = {
  mainPackage: {
    rootDir: "pages",
    tabbarDir: "tabbar",
  },
  subPackage: {
    rootDir: "pages-sub",
  },
};
```

2. 在`/config/index.ts`中使用配置

```ts
// /config/index.ts
import { creatorOptions } from "./plugin.options";
export default defineConfig(async (merge) => {
  const baseConfig: UserConfigExport = {
    // ...other config

    plugins: [
      // ... other plugins
      ["taro-plugin-creator", creatorOptions],
    ],

    // ...other config
  };
});
```

### 创建页面

之后您就可以使用 Taro 的命令行工具在项目中创建页面了

- 查看帮助

  使用 `npx taro c --help` 以查看该命令的帮助

  所有的创建命令都以 `taro c` 开头, `c` 是 `creator`的缩写

  如果你全局安装了 `@tarojs/cli` 则可以省略 npx, 直接执行 `taro c --help`

```sh
❯ npx taro c --help
👽 Taro v3.6.18

Usage: taro c [options]

Options:
  -h, --help  output usage information

Synopsis:
  $ taro c -m [path]     (创建主包页面, 例如: taro c -m home)
  $ taro c -s [path]     (创建分包页面, 例如: taro c -s profile/userInfo)
  $ taro c -t [path]     (创建tabbar页面, 例如: taro c -t about)
```

#### 创建主包页面 (读取配置中主包页面路径并在该路径中创建页面)

- 示例:

```sh
taro c -m auth
```

#### 创建分包页面(读取配置中分包页面路径并在该路径中创建页面)

- 示例:

```sh
taro c -s profile/userInfo
```

#### 创建 tabbar 页面路径(读取配置中 tabbar 页面路径并在该路径中创建页面)

- 示例

```sh
taro c -t home
```
