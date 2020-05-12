# Vue 多页应用配置
> 以下均是使用 vue cli v3.0 及其以上版本脚手架搭建的 vue 项目。
>
> 因多页应用的场景不同，因此分了以下几种写法。

Vue CLI v3.0及以上脚手架搭建的 vue 项目的目录结构大致如下：

```
├─package.json               #依赖包
├─vue.config.js              #vue配置（创建项目时无此文件，需要自己手动添加）
│
├─dist                       #项目默认打包文件夹
│
├─public                     #静态资源主目录，打包时，该目录下资源不会做特殊处理，copy到输出目录
│  ├─favion.ico              #网站小图标
│  └─index.html              #入口html文件
│
└─src                        #项目资源主目录
   ├─App.vue
   ├─main.js                 #vue实例化
   │
   ├─assets                  #静态文件
   │  └─logo.png             #logo图片
   │
   ├─components              #公用组件
   │  └─HelloWorld.vue       #HelloWorld组件
   │
   ├─router                  #路由
   │  └─index.js
   │
   ├─store                   #状态管理
   │  └─index.js
   │
   └─views                   #视图
      ├─About.vue            #About页面
      └─Home.vue             #Home页面
```

## 在当前项目的基础上，仅需要添加几个静态页面
> 我是把静态页面放在`views`文件夹下的，有需要的可以自行放置在其他文件夹下。

新建一个 `login` 页面，步骤如下（这里仅展示最基础的用法）：

1. 在 `views` 下新建 `login` 文件夹。

1. 在 `login` 文件夹下，新建 `App.vue`, `index.html`, `main.js` 文件。

    > 如需扩展 router、vuex，按照vue项目中的用法在静态页面的main.js内添加即可。 
    > 新建的静态页面文件夹下的目录结构可以和一个完整的vue项目内src目录下的文件一致。

    更改后`views`文件夹的目录结构如下：
    ```
    └─views                       #视图
       ├─About.vue                #About页面
       ├─Home.vue                 #Home页面
       │
       └─login                    #新加的静态页面
          ├─App.vue
          ├─index.html            #入口html文件，根据需要，此文件可与 public/index.html 文件共用
          └─main.js               #Login页面的 vue 实例
    ```

1. `vue.config.js` 中添加 `pages` 配置（若没有此文件，请自行添加）
    > 文件路径不同的，请注意修改配置

    ```javascript
    module.exports = {
       // 其他代码...
       pages: {
          index: {
            // page 的入口
            entry: 'src/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Index Page',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'index']
          },
          login: {
            // page 的入口
            entry: 'src/views/login/main.js',
            // 模板来源，若共用 public/index.html, 请把 template 的值改为 'public/index.html'
            template: 'src/views/login/index.html',
            // 在 dist/login.html 的输出
            filename: 'login.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Login Page',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'login']
          },
       },
    }
    ```

1. 执行 `npm run serve` 即可访问 `login` 页面，访问地址是 `http://localhost:端口号/login` 或者 `http://localhost:端口号/login.html`

1. 若需要从其他页面跳转至 `login` 页面，请使用 `<a href="/login">跳转至登录页</a>` 或者 `<a href="/login.html">跳转至登录页</a>`

## 纯多页应用
> 在以上的基础上做修改

1. 删除多余的文件：`main.js`, `App.vue`, 删除文件夹：`views`

1. 新建 `pages` 文件夹，此文件夹下放置应用的页面，一个文件夹即是一个页面，目录结构大致如下：

    ```
    └─src                        #项目资源主目录
       ├─...                     #其他文件
       │
       └─pages                   #页面
          ├─index                #首页
          │ ├─App.vue
          │ ├─index.html         #入口html文件，根据需要，此文件可与 public/index.html 文件共用
          │ └─main.js            #vue实例
          │
          └─login                #登录页
            ├─App.vue
            ├─index.html         #入口html文件，根据需要，此文件可与 public/index.html 文件共用
            └─main.js            #vue实例
    ```

1. 在根目录下新建 `config` 文件夹，新建 `page.js`， `page.js` 文件内容请在源码中查看。

1. `vue.config.js` 配置如下：

    ```javascript
    const page = require('./config/page.js');
    module.exports = {
       // 其他代码...
      pages: page.pages(),
    }
    ```

## 多项目
> 共用组件工具类函数，分开打包

1. 新建 `projects` 文件夹，此文件夹下放置应用的页面，一个文件夹即是一个项目，目录结构大致如下：

    ```
    └─src                        #项目资源主目录
       ├─...                     #其他文件
       │
       └─projects                #项目
          ├─a                    #a项目
          │ ├─App.vue
          │ ├─index.html         #入口html文件
          │ └─main.js            #vue实例
          │
          ├─b                    #b项目
          │ ├─App.vue
          │ ├─index.html         #入口html文件
          │ └─main.js            #vue实例
          │
          └─c                    #c项目
            ├─App.vue
            ├─index.html         #入口html文件
            └─main.js            #vue实例
    ```

1. 在根目录下新建 `config` 文件夹，新建 `project.js`， `project.js` 文件内容请在源码中查看。

1. `vue.config.js` 配置如下：

    ```javascript
    const project = require('./config/project.js');
    module.exports = {
       // 其他代码...
       outputDir: `dist/${project.name}`,
       pages: project.pages(),
    }
    ```

### 启动项目
- 启动单个项目：`npm run serve -- --project=项目名`，访问地址：`http://localhost:端口`
- 启动全部项目：`npm run serve`，访问地址：`http://localhost:端口/项目名`

### 打包项目
- 打包单个项目：`npm run build 项目名`
- 打包全部项目：`npm run build:all`
