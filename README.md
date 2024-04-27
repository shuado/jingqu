## 项目结构

-   public : 放置静态资源
    -   css : 样式文件
    -   iconfont : 字体
    -   img : 图片、logo等
-   src : 源文件目录
    -   api : 所有的api接口文件
    -   assets : 静态资源文件
    -   components : 所有的封装的、可复用的组件
    -   config : 打包配置服务器的脚本命令等文件
    -   const : 数据模型等工具的配置文件
    -   docker : docker镜像部署文件
    -   hooks : 全局使用的hooks函数文件
    -   lang : 语言包引入(多种语言的切换)
    -   mac : mac电脑适配文件
    -   mixins : 混入文件(分发Vue组件中可复用)
    -   option : 项目基础原始配置
    -   page : 项目基础登录页、页面布局等配置（登录页、顶部导航栏、侧边栏、工具栏）
    -   router : 项目的所有路由文件
    -   store : 项目所有的状态管理存储(Vuex)文件
    -   styles : 项目的全局scss文件夹(主题样式配置、全局样式配置)
    -   utils : 存放工具类函数，可全局使用
    -   views : 项目页面模块目录
    -   APP.vue : 根组件
    -   axios : 封装的全站http配置
    -   error.js : 错误提示
    -   eslintrc-auto-import : eslint的自动引入
    -   main.js : 项目的入口文件,作用是初始化 vue 实例,并引入所需要的插件
    -   mockProdServer : vite生产(线上)环境配置
    -   permission : 全局的权限配置
-   vendor : 打包成的文件
-   .env.development : 测试环境配置
-   .env.production : 生产环境配置
-   eslintrc-auto-import : eslint自动引入配置
-   .eslintrc : eslint配置
-   .gitignore : 上传git时忽略的文件
-   .prettierrc : prettie插件格式化文件
-   build.sh : 打包发布到服务器的脚本命令
-   components.d : ts自动引入组件
-   index.html : 项目的主页及入口
-   vite.config.js : 用于配置项目的构建和运行时的行为的文件

## 脚本命令

-   npm run dev : 运行项目
-   npm run build : 项目打包
-   npm run build:prod : 打包生产环境项目
