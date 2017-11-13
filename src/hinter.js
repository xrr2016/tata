const progress = document.querySelector('.hinter-progress')
let width = 100

const hinter = {
  _opts: {
    type: 'log',
    position: 'tr',
    duration: 5000,
    progress: false,
    icon: true,
    closeBtn: true,
    show: 'fadeIn', // slideIn
    hide: 'fadeOut', // SlideOut
    onClick: null,
    onClose: null
  },
  hinters: [],
  render() {
    
  },
  log(
    title = '你好。',
    text = '今天是' + new Date().toLocaleString(),
    opts = {}
  ) {
    console.log(title, text)
  },
  info() {
    console.info('hinter info')
  },
  warn() {
    console.warn('hinter warn')
  },
  error() {
    console.error('hinter error')
  },
  success() {
    console.log('hinter success')
  },
  close() {
    const timeout =  setTimeout(() => {
      console.log('close')
      clearTimeout(timeout)
    }, this._opts.duration)
  },
  clear() {
    console.log('hinter clear')
  },
  _reduceProgress () {
    this._opts.duration -= (this._opts.duration * 3.5 / 1000)
    width -= .35
    progress.style.width = width + '%'
    console.log(width)
    const cut = requestAnimationFrame(this._reduceProgress.bind(hinter))
    if (width <= 0) {
      cancelAnimationFrame(cut)
      console.log('End time', performance.now(), (performance.now() - start) / 1000)
    }
    // const interval = setInterval(() => {
    //   duration -= (duration / 20)
    //   width -= .5
    //   progress.style.width = width + '%'
    //   if (width <= 0) {
    //     clearInterval(interval)
    //     progress.style.display = 'none'
    //   }
    // }, 1000 / 60)
  }
}
const start = performance.now()
console.log('Start time',start)
requestAnimationFrame(hinter._reduceProgress.bind(hinter))