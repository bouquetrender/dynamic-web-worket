import { Base64 } from 'js-base64'

// 全局变量声明
const datasets = {
  common: ''
}

class DynamicWorker {
  constructor (worker) {
    const consts = `const base = ${JSON.stringify(datasets)};`
    const onMessageHandlerFn = `self.onmessage = (event) => {
      if (event.data.obj) {
        self.postMessage({
          obj: event.data.obj,
          flag: event.data.flag
        })
      }
    };`

    const handleResult = (event) => {
      const { flag, obj } = event.data

      if (!this.flagMapping[flag]) return null

      // 处理 params
      obj.params.val = Base64[obj.method](obj.params.val)

      this.flagMapping[flag](obj)
      delete this.flagMapping[flag]
    }

    const _blob = new Blob([
      `(() => {${consts}${onMessageHandlerFn}})()`
    ])
    this.worker = new Worker(URL.createObjectURL(_blob))
    this.worker.addEventListener('message', handleResult)

    this.flagMapping = {}
    URL.revokeObjectURL(_blob)
  }

  // 动态调用
  send (obj) {
    const w = this.worker
    const flag = +new Date() + Math.random() // 唯一标识

    w.postMessage({
      obj,
      flag
    })

    return new Promise(resolve => {
      this.flagMapping[flag] = resolve
    })
  }

  close () {
    this.worker.terminate()
  }
}

export default DynamicWorker
