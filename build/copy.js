const fs = require('fs')
const params = JSON.parse(process.env.npm_config_argv).original[2]
const fileName = params.split(':')[1]
var stat = fs.stat

var copy = (src, dst) => {
  //读取目录
  fs.readdir(src, (err, paths) => {
    if (err) { throw err }
    paths.forEach((path) => {
      var _src = src + '/' + path
      var _dst = dst + '/' + path
      var readable
      var writable
      stat(_src, (err, st) => {
        if (err) { throw err }
        if (st.isFile()) {
          readable = fs.createReadStream(_src) // 创建读取流
          writable = fs.createWriteStream(_dst) // 创建写入流
          readable.pipe(writable)
        } else if (st.isDirectory()) {
          exists(_src, _dst, copy)
        }
      })
    })
  })
}

var exists = (src, dst, callback) => {
  //测试某个路径下文件是否存在
  fs.exists(dst, (exists) => {
    if (exists) {//存在
      console.log("该目录已存在，请尝试更换目录名称")
    } else {//不存在
      fs.mkdir(dst, () => {//创建目录
        callback(src, dst)
      })
    }
  })
}

exists('./src/modules/' + params.split(':')[0], './src/modules/' + fileName, copy)
