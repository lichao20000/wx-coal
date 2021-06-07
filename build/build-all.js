const path = require('path')
const execFileSync = require('child_process').execFileSync;
let moduleList = require('./module-conf').moduleList || []
const chalk = require('chalk')

const buildENV = JSON.parse(process.env.npm_config_argv).original[2] ? (JSON.parse(process.env.npm_config_argv).original[2].split('=')[1] || 'rap '): 'rap'
if (buildENV == 'utest' || buildENV == 'prod'){
  console.log('正在打包的环境是：', buildENV)
  
  const buildFile = path.join(__dirname, 'build.js')
  if (process.argv[2]) {
    if(process.argv[2].indexOf(',') < 0){
      console.log('正在打包的模块是: ', process.argv[2])
      execFileSync( 'node', [buildFile, process.argv[2], 'separate', buildENV], {})
    } else {
      moduleList = process.argv[2].split(',')
      for( const module of moduleList){
        console.log('正在打包的模块是:',module)
        // 异步执行构建文件，并传入两个参数，module：当前打包模块，separate：当前打包模式（分开打包）
        execFileSync( 'node', [buildFile, module, 'separate', buildENV], {})
      }
    }
  } else {
    for( const module of moduleList){
      console.log('正在打包的模块是:',module)
      // 异步执行构建文件，并传入两个参数，module：当前打包模块，separate：当前打包模式（分开打包）
      execFileSync( 'node', [buildFile, module, 'separate', buildENV], {})
    }
  }
} else {
  console.log(chalk.red('你打包的环境有误，请确认环境是 utest 或者 prod  \n'))
  process.exit(1)
}