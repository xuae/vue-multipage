/**
 * 多项目配置
 * npm run build [projectName]
 */

const path = require('path');
const glob = require('glob')
const merge = require("webpack-merge");

const PAGE_PATH = path.resolve(__dirname, '../src/projects');

const projectName = process.argv[3];

module.exports = {
  name: projectName,
  pages: customConfig => {
    let entryFiles = glob.sync(PAGE_PATH + '/*/main.js');
    let map = {};
    const projectNames = entryFiles.map(filePath => {
      let fileList = filePath.split('/');
      let fileName = fileList[fileList.length - 2];
      return fileName;
    });

    if (process.env.NODE_ENV == 'production') {
      if(!projectName) {
        throw '请输入项目名称，项目名称是 src/projects 下的文件夹名 npm run build [projectName]';
      } else if(!projectNames.includes(projectName)) {
        throw '请输入正确的项目名称，项目名称是 src/projects 下的文件夹名';
      }
      map = {
        index: {
          // page的入口
          entry: `${PAGE_PATH}/${projectName}/main.js`,
          // 模板来源
          template: `${PAGE_PATH}/${projectName}/index.html`,
          // 在 dist/index.html 的输出
          filename: 'index.html',
          chunks: ['chunk-vendors', 'chunk-common', 'index']
        }
      }
    } else {
      entryFiles.forEach(filePath => {
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

        map[fileName] = conf;
      });
    }

    for(let key in map) {
      let conf = map[key];
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
      map[key] = conf;
    }

    return map;
  },
  single: customConfig => {
    let entryFiles = glob.sync(PAGE_PATH + '/*/main.js');
    const projectNames = entryFiles.map(filePath => {
      let fileList = filePath.split('/');
      let fileName = fileList[fileList.length - 2];
      return fileName;
    });

    let command = '';
    if (process.env.NODE_ENV == 'production') {
      command = 'build';
    } else if(process.env.NODE_ENV == 'development') {
      command = 'serve';
    }
    if(!projectName) {
      throw `请输入项目名称，项目名称是 src/projects 下的文件夹名 npm run ${command} [projectName]`;
    } else if(!projectNames.includes(projectName)) {
      throw '请输入正确的项目名称，项目名称是 src/projects 下的文件夹名';
    }

    let conf;
    if (process.env.NODE_ENV == 'production') {
      conf = {
        // page的入口
        entry: `${PAGE_PATH}/${projectName}/main.js`,
        // 模板来源
        template: `${PAGE_PATH}/${projectName}/index.html`,
        // 在 dist/index.html 的输出
        filename: 'index.html',
        chunks: ['chunk-vendors', 'chunk-common', 'index']
      }
    } else {
      conf = {
        // page的入口
        entry: `${PAGE_PATH}/${projectName}/main.js`,
        // 模板来源
        template: `${PAGE_PATH}/${projectName}/index.html`,
        // 在 dist/index.html 的输出
        filename: 'index.html',
        chunks: ['chunk-vendors', 'chunk-common', 'index']
      }
    }

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

    console.log(conf);
    return {
      index: conf
    };
  },
}
