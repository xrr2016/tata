const Hinter = {
  _opts: {
    type: 'log',
    position: 'top-right',
    duration: 5000,
    progress: true,
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
    const icon = Hinter._type2Icon(opts.type)
    const id = Hinter._randomId()
    const hinter = {
      title,
      text,
      opts,
      id,
      reduceProgress: Hinter._reduceProgress
    }
    Hinter.hinters.push(hinter)
    document.id = { width: 100 }
    const template = `
      <div class="hinter ${opts.position} ${opts.type}" id=${id}>
        <i class="hinter-icon material-icons">${icon}</i>
        <div class="hinter-body">
          <h4 class="hinter-title">${title}</h4>
          <p class="hinter-text">${text}</p>
        </div>
        ${opts.closeBtn
          ? '<button class="hinter-close material-icons">clear</button>'
          : ''}
        ${opts.progress ? '<div class="hinter-progress"></div>' : ''}
      </div>
    `
    document.body.insertAdjacentHTML('beforeend', template)
    document.addEventListener('click', Hinter.close)
    !!opts.onClick && opts.onClick()
    !!opts.onClose && opts.onClose()
    opts.progress &&
      requestAnimationFrame(hinter.reduceProgress.bind(hinter))
  },
  log(title = '你好', text = '今天是' + new Date().toLocaleString(), opts = {}) {
    const _opts = Object.assign(Hinter._opts, opts, {
      type: 'log'
    })
    Hinter._render(title, text, _opts)
  },
  info(title = '你好', text = '今天是' + new Date().toLocaleString(), opts = {}) {
    const _opts = Object.assign(Hinter._opts, opts, {
      type: 'info'
    })
    Hinter._render(title, text, _opts)
  },
  warn(title = '你好', text = '今天是' + new Date().toLocaleString(), opts = {}) {
    const _opts = Object.assign(Hinter._opts, opts, {
      type: 'warn'
    })
    Hinter._render(title, text, _opts)
  },
  error(title = '你好', text = '今天是' + new Date().toLocaleString(), opts = {}) {
    const _opts = Object.assign(Hinter._opts, opts, {
      type: 'error'
    })
    Hinter._render(title, text, _opts)
  },
  success(title = '你好', text = '今天是' + new Date().toLocaleString(), opts = {}) {
    const _opts = Object.assign(Hinter._opts, opts, {
      type: 'success'
    })
    Hinter._render(title, text, _opts)
  },
  close(event) {
    const target = event.target
    if (target.classList.contains('hinter-close')) {
      const id = target.parentNode.getAttribute('id')
      const idx = Hinter.hinters.findIndex(hinter => id === hinter.id)
      hinter.hinters.splice(idx, 1)
      document.getElementById(id).style.display = 'none'
    }
  },
  clear() {
    Hinter.hinters.forEach(hinter => {
      document.getElementById(hinter.id).style.display = 'none'
    })
    Hinter.hinters.length = 0
  },
  _randomId() {
    return `Hinter${Date.now()}`
  },
  _reduceProgress() {
    const id = this.id
    const progress = document
      .getElementById(id)
      .querySelector('.hinter-progress')
    document.id.width -= 0.35
    this.opts.duration -= this.opts.duration * 3.5 / 1000
    progress.style.width = document.id.width + '%'
    const cut = requestAnimationFrame(
      this.reduceProgress.bind(this)
    )
    if (document.id.width <= 0) {
      document.getElementById(id).style.display = 'none'
      cancelAnimationFrame(cut)
    }
  }
}
