import './tata.css'
const iconLink = document.createElement('link')
iconLink.href = 'https://fonts.googleapis.com/icon?family=Material+Icons'
iconLink.rel = 'stylesheet'
document.head.appendChild(iconLink)

const defaultOpts = {
  type: 'log',
  position: 'top-right',
  duration: 5000,
  progress: true,
  progressWidth: 100,
  holding: false,
  icon: true,
  closeBtn: true,
  show: 'fadeIn',
  hide: 'fadeOut',
  onClick: null,
  onClose: null
}

const tatas = []
const tata = {
  text(text = '你好, 今天是' + new Date().toLocaleString(), opts = {}) {
    const _opts = Object.assign({}, defaultOpts, opts, { type: 'text' })
    const title = ''
    render(title, text, _opts)
  },
  log(title = '你好', text = '今天是' + new Date().toLocaleString(), opts = {}) {
    const _opts = Object.assign({}, defaultOpts, opts, { type: 'log' })
    render(title, text, _opts)
  },
  info(title = '你好', text = '今天是' + new Date().toLocaleString(), opts = {}) {
    const _opts = Object.assign({}, defaultOpts, opts, { type: 'info' })
    render(title, text, _opts)
  },
  warn(title = '你好', text = '今天是' + new Date().toLocaleString(), opts = {}) {
    const _opts = Object.assign({}, defaultOpts, opts, { type: 'warn' })
    render(title, text, _opts)
  },
  error(title = '你好', text = '今天是' + new Date().toLocaleString(), opts = {}) {
    const _opts = Object.assign({}, defaultOpts, opts, { type: 'error' })
    render(title, text, _opts)
  },
  success(title = '你好', text = '今天是' + new Date().toLocaleString(), opts = {}) {
    const _opts = Object.assign({}, defaultOpts, opts, { type: 'success' })
    render(title, text, _opts)
  },
  clear() {
    tatas.forEach(tata => {
      document.getElementById(tata.id).style.display = 'none'
    })
    tatas.length = 0
  }
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

function moveDown() {
  const len = tatas.length - 1
  const element = document.getElementById(this.id)
  const eleHeight = element.getBoundingClientRect().height
  document.getElementById(this.id).style.top = `${len * eleHeight + 24}px`
}

function click(event) {
  const target = event.target
  if (target.classList.contains('tata-close')) return
  this.opts.onClick.call(this)
}

function closeTaTa(event) {
  const target = event.target
  if (!target.classList.contains('tata-close')) return
  const id = target.parentNode.getAttribute('id')
  const ta = tatas.find(ta => ta.id === id)
  const element = document.getElementById(id)

  const timeout = setTimeout(() => {
    if (typeof element.remove === 'function') {
      element.remove()
    } else {
      document.body.removeChild(element)
    }
    clearTimeout(timeout)
  }, 800)
  
  element.classList.add('fade-out')

  !!ta.opts.onClose &&
    typeof ta.opts.onClose === 'function' &&
    ta.opts.onClose.call(ta)
}

document.addEventListener('click', closeTaTa, false)

function reduceProgress() {
  const id = arguments[0]
  const ta = tatas.find(ta => ta.id === id)
  const element = document.getElementById(id)
  const progress = element.querySelector('.tata-progress')

  ta.opts.duration -= ta.opts.duration / 100
  ta.opts.progressWidth -= 0.6
  progress.style.width = ta.opts.progressWidth + '%'
  const reduce = requestAnimationFrame(reduceProgress.bind(ta, ta.id))

  if (ta.opts.progressWidth <= 0) {
    const idx = tatas.findIndex(tata => tata === ta)
    tatas.splice(idx, 1)

    const timeout = setTimeout(() => {
      if (typeof element.remove === 'function') {
        element.remove()
      } else {
        document.body.removeChild(element)
      }
      clearTimeout(timeout)
    }, 800)

    !!ta.opts.onClose &&
      typeof ta.opts.onClose === 'function' &&
      ta.opts.onClose.call(ta)

      cancelAnimationFrame(reduce)
      console.log(performance.now())
  }
}

function render(title, text, opts) {
  const icon = type2Icon(opts.type)
  const id = randomId()
  const ta = { title, text, opts, id }
  console.dir(ta)
  const idx = tatas.findIndex(tata => tata.id === id)
  const prevtata = idx === 0 ? null : tatas[idx - 1]
  const show = opts.show === 'fadeIn' ? 'fade-in' : 'slide-in'

  tatas.push(ta)

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

  if (
    prevtata &&
    prevtata.opts.position === ta.opts.position &&
    document.getElementById(prevtata.id)
  ) {
    moveDown.call(prevtata)
  }

  !!opts.onClick &&
    typeof opts.onClick === 'function' &&
    document.getElementById(id).addEventListener('click', click.bind(ta), {
      capture: true,
      once: true
    })

  console.log(performance.now())
  !opts.holding &&
    opts.progress &&
    requestAnimationFrame(reduceProgress.bind(ta, ta.id))
}

module.exports = tata
