/**
 * 多项目配置
 * npm run build [projectName]
 */

const path = require('path');
const glob = require('glob')
const merge = require("webpack-merge");

// 项目文件夹
const PATH = path.resolve(__dirname, '../src/projects');
// 全部项目入口 js 文件
const entryFiles = glob.sync(PATH + '/*/main.js');

const arg = process.argv[3];
// 当前项目名
const projectName = arg && arg.startsWith('--project=') ? arg.replace('--project=', '') : arg;

// 全部项目名
const projectNames = entryFiles.map(filePath => {
  let fileList = filePath.split('/');
  return fileList[fileList.length - 2];
});

module.exports = {
  name: projectName,
  names: projectNames,
  pages: customConfig => {
    let command = ''; // 执行的命令
    if (process.env.NODE_ENV == 'production') {
      command = 'build';
    } else if(process.env.NODE_ENV == 'development') {
      command = 'serve';
    }

    let map = {};
    if(projectName || process.env.NODE_ENV == 'production') {
      if(!projectName) {
        throw `请输入项目名称，项目名称是 src/projects 下的文件夹名 npm run ${command} [projectName]`;
      } else if(!projectNames.includes(projectName)) {
        throw '请输入正确的项目名称，项目名称是 src/projects 下的文件夹名';
      }

      map = {
        index: {
          // page的入口
          entry: `${PATH}/${projectName}/main.js`,
          // 模板来源
          template: `${PATH}/${projectName}/index.html`,
          // 在 dist/index.html 的输出
          filename: 'index.html',
          chunks: ['chunk-vendors', 'chunk-common', 'index']
        }
      }
    } else {
      /**
       * 本地启动时，未输入项目名，则启动全部
       *
       * 项目访问地址是：http://localhost:端口/项目名
       */
      projectNames.forEach(name => {
        map[name] = {
          // page的入口
          entry: `${PATH}/${name}/main.js`,
          // 模板来源
          template: `${PATH}/${name}/index.html`,
          // 在 dist/index.html 的输出
          filename: name + '.html',
          // 如果不加这行则每个页面都会引入共享的js脚本
          chunks: ['chunk-vendors', 'chunk-common', name],
          inject: true,
        };
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
}
