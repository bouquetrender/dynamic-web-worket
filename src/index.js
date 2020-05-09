import 'normalize.css'
import './style/main.styl'

import DataWorker from './dynamicWorker'

// 演示：创建一个 worker 简单处理字符串，可多次调用
const worker = new DataWorker()

worker.send({
  method: 'encode',
  params: {
    val: 'content1'
  }
}).then(data => {
  // 处理成功后回调
  console.log(data.obj.params)
})

worker.send({
  method: 'encode',
  params: {
    val: 'content2'
  }
}).then(data => {
  console.log(data.obj.params)
})

worker.close()