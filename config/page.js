/**
 * 多页面配置
 */

const path = require('path');
const glob = require('glob');
const merge = require("webpack-merge");

const PAGE_PATH = path.resolve(__dirname, '../src/pages');

module.exports = {
  pages: customConfig => {
    let entryFiles = glob.sync(PAGE_PATH + '/*/main.js');
    let map = {};

    entryFiles.forEach(filePath => {
      // const lastSlashPos = filePath.lastIndexOf('\/');
      // let fileName = filePath.substring(lastSlashPos + 1, filePath.lastIndexOf('.'));
      let fileList = filePath.split('/');
      let fileName = fileList[fileList.length - 2];

      let conf = {
        entry: filePath,
        template: filePath.replace(/main.js$/, 'index.html'),
        // 在 dist/index.html 的输出
        filename: fileName + '.html',
        // 如果不加这行则每个页面都会引入共享的js脚本
        chunks: ['chunk-vendors', 'chunk-common', fileName],
        inject: true,
      };

      if (customConfig) {
        conf = merge(conf, customConfig);
      }

      if (process.env.NODE_ENV === 'production') {
        conf = merge(conf, {
          minify: {
            removeComments: true, // 删除 html 中的注释代码
            // collapseWhitespace: true, // 删除 html 中的空白符
            // removeAttributeQuotes: true // 删除 html 元素中属性的引号
          },
          chunksSortMode: 'manual'// 按 manual 的顺序引入
        });
      }

      map[fileName] = conf;
    });

    return map;
  }
};

// vue.config.js
// const path = require('path');
// const config = require('./config/pages.js')
//
// module.exports = {
//   pages: config.pages(),
// };

// 目录结构
// package.json
// vue.config.js
// src
// -- pages
// -- -- index
// -- -- -- App.vue
// -- -- -- index.html
// -- -- -- main.js
// -- -- login
// -- -- -- App.vue
// -- -- -- index.html
// -- -- -- main.js
// ......
