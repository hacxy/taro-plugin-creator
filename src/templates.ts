import { toCamelCase } from "./utils";

export const tsx = (name: string, styleType: string) => {
  return `import React, { memo } from "react";
import { View } from "@tarojs/components";
import styles from "./index.module.${styleType}";

const Component: React.FC = () => {
  return (
    <View className={styles.${toCamelCase(name)}Wrapper}>${toCamelCase(
    name,
    true
  )}</View>
  );
};

const ${toCamelCase(name, true)} = memo(Component)
export default ${toCamelCase(name, true)};

/**
 * 定义页面配置，需要注意的是，使用 definePageConfig 定义的页面配置对象不能使用变量。
 * 参考: https://docs.taro.zone/docs/page-config#配置项列表
 */
definePageConfig({
  disableScroll: true
});
`;
};

export const style = (name) =>
  `.${toCamelCase(name)}Wrapper{
  // css style 
}
`;

export const route = () => `// 定义进入该页面需要传入的 params 参数的类型
export type Params = {};

// 定义进入该页面需要传入的 data 数据的类型
export type Data = {};

// 导出附加数据 Ext (附加数据是传递给中间件使用的)
export const Ext = {};

// 定义该页面返回的数据的类型
export type BackData = {};

`;
