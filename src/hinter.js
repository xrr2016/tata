const Hinter = {
  _opts: {
    type: 'log',
    position: 'top-right',
    duration: 5000,
    progress: true,
    progressWidth: 100,
    holding: false,
    icon: true,
    closeBtn: true,
    show: 'fadeIn', // slideIn
    hide: 'fadeOut', // slideOut
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
  success(
    title = '你好',
    text = '今天是' + new Date().toLocaleString(),
    opts = {
      holding: true,
      onClose: function() {
        alert('success hinter close.')
      },
      onClick: function() {
        console.log(this)
        alert('success hinter click.')
      }
    }
  ) {
    const _opts = Object.assign(Hinter._opts, opts, {
      type: 'success'
    })
    Hinter._render(title, text, _opts)
  },
  _close(event) {
    const target = event.target
    if (!target.classList.contains('hinter-close')) return
    const id = target.parentNode.getAttribute('id')
    const hinter = Hinter.hinters.find(hinter => hinter.id === id)
    const idx = Hinter.hinters.findIndex(hinter => id === hinter.id)
    const hideClass = hinter.opts.hide === 'fadeOut' ? 'fade-out' : 'slide-out'  
    const element = document.getElementById(id)
    const timeout = setTimeout(() => { 
      // element.style.display = 'none' 
      // document.body.removeChild(element)
      element.remove()
      clearTimeout(timeout)
    }, 800)
    element.classList.add(hideClass)
    Hinter.hinters.splice(idx, 1)
    !!hinter.opts.onClose &&
      typeof hinter.opts.onClose === 'function' &&
      hinter.opts.onClose.call(hinter)
  },
  _click(event) {
    const target = event.target
    if (target.classList.contains('hinter-close')) return
    this.opts.onClick.call(this)
  },
  clear() {
    Hinter.hinters.forEach(hinter => {
      document.getElementById(hinter.id).style.display = 'none'
    })
    Hinter.hinters.length = 0
  },
  _render(title, text, opts) {
    const icon = Hinter._type2Icon(opts.type)
    const id = Hinter._randomId()
    const times = opts.duration / (1000 / 60)
    const ms = opts.duration / times
    Object.assign(opts, { reduceTimes: times, perReduceMs: ms })
    const hinter = { title, text, opts, id }
    Hinter.hinters.push(hinter)
    const idx = Hinter.hinters.findIndex(hinter => hinter.id === id)
    const prevHinter = Hinter.hinters[idx - 1]
    const show = opts.show === 'fadeIn' ? 'fade-in' : 'slide-in'
    const template = `
      <div class="hinter ${opts.position} ${opts.type} ${show}" id=${id}>
        <i class="hinter-icon material-icons">${icon}</i>
        <div class="hinter-body">
          <h4 class="hinter-title">${title}</h4>
          <p class="hinter-text">${text}</p>
        </div>
        ${opts.closeBtn
          ? '<button class="hinter-close material-icons">clear</button>'
          : ''}
        ${!opts.holding && opts.progress
          ? '<div class="hinter-progress"></div>'
          : ''}
      </div>
    `
    document.body.insertAdjacentHTML('beforeend', template)
    if (prevHinter && prevHinter.opts.position === hinter.opts.position) {
      Hinter._moveDown.call(prevHinter)
    }
    !!opts.onClick &&
      typeof opts.onClick === 'function' &&
      document
        .getElementById(id)
        .addEventListener('click', Hinter._click.bind(hinter), {
          capture: true,
          once: true
        })
    !opts.holding &&
      opts.progress &&
      requestAnimationFrame(Hinter._reduceProgress.bind(hinter, hinter.id))
    return false
  },
  _moveDown() {
    const element = document.getElementById(this.id)
    const len = Hinter.hinters.length - 1
    const eleHeight = element.getBoundingClientRect().height
    document.getElementById(this.id).style.top = `${len * eleHeight + 24}px`
  },
  _randomId() {
    return `Hinter${Date.now()}`
  },
  _reduceProgress() {
    const hinter = Hinter.hinters.find(hinter => hinter.id === arguments[0])
    const id = hinter.id
    const progress = document
      .getElementById(id)
      .querySelector('.hinter-progress')
    hinter.opts.progressWidth -= 100 / hinter.opts.reduceTimes
    hinter.opts.duration -= hinter.opts.perReduceMs
    progress.style.width = hinter.opts.progressWidth + '%'
    const cut = requestAnimationFrame(Hinter._reduceProgress.bind(hinter, id))
    if (hinter.opts.progressWidth <= 0) {
      const idx = Hinter.hinters.findIndex(hinter => hinter === hinter)
      Hinter.hinters.splice(idx, 1)
      document.getElementById(id).style.display = 'none'
      !!hinter.opts.onClose &&
        typeof hinter.opts.onClose === 'function' &&
        hinter.opts.onClose.call(hinter)
      cancelAnimationFrame(cut)
    }
  }
}
document.addEventListener('click', Hinter._close)
