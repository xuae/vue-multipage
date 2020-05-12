/**
 * vue 配置
 */

/*
// 在当前项目的基础上，仅需要添加几个静态页面
module.exports = {
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
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
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
*/

/*
// 纯多页应用
const page = require('./config/pages.js');
module.exports = {
  pages: page.pages(),
}
*/

/**
 * 多项目
 *
 * 启动单个项目：npm run serve -- --project=项目名，访问地址：http://localhost:端口
 * 启动全部项目：npm run serve，访问地址：http://localhost:端口/项目名
 *
 * 打包单个项目：npm run build 项目名
 * 打包全部项目：npm run build:all
*/
const project = require('./config/project.js');
module.exports = {
  outputDir: process.env.NODE_ENV == 'production' ? `dist/${project.name}` : 'dist',
  pages: project.pages(),
}

