const datasets = {
  common: ''
}

this.onmessage = (event) => {
  if (event.data.obj) {
    self.postMessage({
      obj: event.data.obj,
      flag: event.data.flag
    })
  }
}

