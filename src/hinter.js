const hinter = {
  log (title = '你好。', text = '今天是' + new Date().toLocaleString(), callback, opts = {}) {
    console.log(title, text)
  },
  info () {
    console.info('hinter info')
  },
  warn () {
    console.warn('hinter warn')    
  },
  error () {
    console.error('hinter error')    
  },
  success () {
    console.log('hinter success')    
  },
  close () {
    
  },
  clear () {
    console.log('hinter clear')    
  }
}