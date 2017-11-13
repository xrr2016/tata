const progress = document.querySelector('.hinter-progress')
let width = 100

const hinter = {
  _opts: {
    type: 'log',
    position: 'top-right',
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
  _type2Icon(type) {
    switch (type) {
      case 'log':
        return 'textsms'
      case 'warn':
        return 'info_outline'
      case 'success':
        return 'check'
      case 'error':
        return 'block'
      default:
        return ''
    }
  },
  _render(title, text, opts) {
    const icon = hinter._type2Icon(opts.type)
    let template = `<div class="hinter ${opts.position} ${opts.type}">
    <i class="hinter-icon material-icons">${icon}</i>
    <div class="hinter-body">
      <h4 class="hinter-title">${title}</h4>
      <p class="hinter-text">${text}</p>
    </div>
    ${opts.closeBtn
      ? '<button class="hinter-close material-icons">clear</button>'
      : ''}
    ${opts.progress ? '<div class="hinter-progress"></div>' : ''}
  </div>`
    document.body.insertAdjacentHTML('beforeend', template)
  },
  log(
    title = '你好。',
    text = '今天是' + new Date().toLocaleString(),
    opts = this._opts
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
  success(title = '你好。', text = '很高兴见到你！', opts = {}) {
    const _opts = Object.assign(hinter._opts, opts, {
      type: 'success'
    })
    hinter._render(title, text, _opts)
  },
  close() {
    const timeout = setTimeout(() => {
      console.log('close')
      clearTimeout(timeout)
    }, this._opts.duration)
  },
  clear() {
    console.log('hinter clear')
  },
  _reduceProgress() {
    this._opts.duration -= this._opts.duration * 3.5 / 1000
    width -= 0.35
    progress.style.width = width + '%'
    console.log(width)
    const cut = requestAnimationFrame(this._reduceProgress.bind(hinter))
    if (width <= 0) {
      cancelAnimationFrame(cut)
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
