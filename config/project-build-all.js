const execSync = require('child_process').execSync;
const projects = require('./project').names || []

console.log(`打包全部项目：${projects.join(',')}`)
for( const module of projects){
  console.log(`\n开始打包项目: ${module}`)
  execSync(`npm run build ${module}`)
  console.log(`项目打包完成: ${module}`)
}
