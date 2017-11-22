import './tata.css'
const iconLink = document.createElement('link')
iconLink.href = 'https://fonts.googleapis.com/icon?family=Material+Icons'
iconLink.rel = 'stylesheet'
document.head.appendChild(iconLink)

const defaultOpts = {
  type: 'log',
  position: 'top-right',
  duration: 3000,
  progress: true,
  progressWidth: 100,
  holding: false,
  icon: true,
  closeBtn: true,
  show: 'fadeIn', // slideIn
  hide: 'fadeOut', // slideOut
  onClick: null,
  onClose: null
}

function type2Icon(type) {
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
}

function randomId() {
  return `tata-${Date.now()}`
}

const tata = {
  tatas: [],
  text(text = '你好, 今天是' + new Date().toLocaleString(), opts = {}) {
    const _opts = Object.assign(defaultOpts, opts, {
      type: 'text'
    })
    tata._render(title, text, _opts)
  },
  log(title = '你好', text = '今天是' + new Date().toLocaleString(), opts = {}) {
    const _opts = Object.assign(defaultOpts, opts, {
      type: 'log'
    })
    tata._render(title, text, _opts)
  },
  info(title = '你好', text = '今天是' + new Date().toLocaleString(), opts = {}) {
    const _opts = Object.assign(defaultOpts, opts, {
      type: 'info'
    })
    tata._render(title, text, _opts)
  },
  warn(title = '你好', text = '今天是' + new Date().toLocaleString(), opts = {}) {
    const _opts = Object.assign(defaultOpts, opts, {
      type: 'warn'
    })
    tata._render(title, text, _opts)
  },
  error(title = '你好', text = '今天是' + new Date().toLocaleString(), opts = {}) {
    const _opts = Object.assign(defaultOpts, opts, {
      type: 'error'
    })
    tata._render(title, text, _opts)
  },
  success(title = '你好', text = '今天是' + new Date().toLocaleString(), opts = {}) {
    const _opts = Object.assign(defaultOpts, opts, {
      type: 'success'
    })
    tata._render(title, text, _opts)
  },
  _close(event) {
    const target = event.target
    if (!target.classList.contains('tata-close')) return
    const id = target.parentNode.getAttribute('id')
    const tata = tata.tatas.find(tata => tata.id === id)
    const idx = tata.tatas.findIndex(tata => id === tata.id)
    const hideClass = tata.opts.hide === 'fadeOut' ? 'fade-out' : 'slide-out'
    const element = document.getElementById(id)
    const timeout = setTimeout(() => {
      if (typeof element.remove === 'function') {
        element.remove()
      } else {
        document.body.removeChild(element)
      }
      clearTimeout(timeout)
    }, 800)
    element.classList.add(hideClass)
    tata.tatas.splice(idx, 1)
    !!tata.opts.onClose &&
      typeof tata.opts.onClose === 'function' &&
      tata.opts.onClose.call(tata)
  },
  _click(event) {
    const target = event.target
    if (target.classList.contains('tata-close')) return
    this.opts.onClick.call(this)
  },
  clear() {
    tata.tatas.forEach(tata => {
      document.getElementById(tata.id).style.display = 'none'
    })
    tata.tatas.length = 0
  },
  _render(title, text, opts) {
    const icon = type2Icon(opts.type)
    const id = randomId()
    const times = opts.duration / (1000 / 60)
    const ms = opts.duration / times
    Object.assign(opts, { reduceTimes: times, perReduceMs: ms })
    const ta = { title, text, opts, id }
    tata.tatas.push(ta)
    const idx = tata.tatas.findIndex(tata => tata.id === id)
    const prevtata = tata.tatas[idx - 1]
    const show = opts.show === 'fadeIn' ? 'fade-in' : 'slide-in'
    const template = `
      <div class="tata ${opts.position} ${opts.type} ${show}" id=${id}>
        <i class="tata-icon material-icons">${icon}</i>
        <div class="tata-body">
          <h4 class="tata-title">${title}</h4>
          <p class="tata-text">${text}</p>
        </div>
        ${opts.closeBtn
          ? '<button class="tata-close material-icons">clear</button>'
          : ''}
        ${!opts.holding && opts.progress
          ? '<div class="tata-progress"></div>'
          : ''}
      </div>
    `
    document.body.insertAdjacentHTML('beforeend', template)
    if (prevtata && prevtata.opts.position === ta.opts.position) {
      tata._moveDown.call(prevtata)
    }
    !!opts.onClick &&
      typeof opts.onClick === 'function' &&
      document
        .getElementById(id)
        .addEventListener('click', tata._click.bind(tata), {
          capture: true,
          once: true
        })
    !opts.holding &&
      opts.progress &&
      requestAnimationFrame(tata._reduceProgress.bind(ta, ta.id))
    return false
  },
  _moveDown() {
    const element = document.getElementById(this.id)
    const len = this.tatas.length - 1
    const eleHeight = element.getBoundingClientRect().height
    document.getElementById(this.id).style.top = `${len * eleHeight + 24}px`
  },
  _reduceProgress() {
    const ta = tata.tatas.find(tata => tata.id === arguments[0])
    const id = ta.id
    const progress = document.getElementById(id).querySelector('.tata-progress')
    ta.opts.progressWidth -= 100 / ta.opts.reduceTimes
    ta.opts.duration -= ta.opts.perReduceMs
    progress.style.width = ta.opts.progressWidth + '%'
    const cut = requestAnimationFrame(tata._reduceProgress.bind(tata, id))
    if (ta.opts.progressWidth <= 0) {
      const idx = tata.tatas.findIndex(tata => tata === tata)
      tata.tatas.splice(idx, 1)
      document.getElementById(id).style.display = 'none'
      !!ta.opts.onClose &&
        typeof ta.opts.onClose === 'function' &&
        ta.opts.onClose.call(tata)
      cancelAnimationFrame(cut)
    }
  }
}

if (tata.tatas.length) {
  document.addEventListener('click', tata._close)
}

export default tata
