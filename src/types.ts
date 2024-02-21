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
    rootDir?: string;

    /**
     * 配置tabbar页面存放路径
     * @example 例如配置为: 'tabbar', 则将在src/{rootDir}/tabbar目录下创建tabbar页面
     * @default 'tabbar'
     */
    tabbarDir?: string;
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
    rootDir?: string;
  };

  /**
   * 样式类型, 决定生成的样式文件的后缀名
   * @default scss
   */
  styleType?: "css" | "less" | "scss";
}
