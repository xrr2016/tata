import './tata.css'
const iconLink = document.createElement('link')
iconLink.rel = 'stylesheet'
iconLink.href = 'https://fonts.googleapis.com/icon?family=Material+Icons'
document.head.appendChild(iconLink)

const defaultOpts = {
  type: 'log',
  position: 'tr',
  animate: 'fade', // slide
  duration: 3000,
  progress: true,
  holding: false,
  closeBtn: true,
  onClick: null,
  onClose: null
}

const tatas = []
const tata = {
  text(
    title = '你好',
    text = '你好, 今天是' + new Date().toLocaleString(),
    opts = {}
  ) {
    const _opts = Object.assign({}, defaultOpts, opts, { type: 'text' })
    render(title, text, _opts)
  },
  log(
    title = '你好',
    text = '今天是' + new Date().toLocaleString(),
    opts = {}
  ) {
    const _opts = Object.assign({}, defaultOpts, opts, { type: 'log' })
    render(title, text, _opts)
  },
  info(
    title = '你好',
    text = '今天是' + new Date().toLocaleString(),
    opts = {}
  ) {
    const _opts = Object.assign({}, defaultOpts, opts, { type: 'info' })
    render(title, text, _opts)
  },
  warn(
    title = '你好',
    text = '今天是' + new Date().toLocaleString(),
    opts = {}
  ) {
    const _opts = Object.assign({}, defaultOpts, opts, { type: 'warn' })
    render(title, text, _opts)
  },
  error(
    title = '你好',
    text = '今天是' + new Date().toLocaleString(),
    opts = {}
  ) {
    const _opts = Object.assign({}, defaultOpts, opts, { type: 'error' })
    render(title, text, _opts)
  },
  success(
    title = '你好',
    text = '今天是' + new Date().toLocaleString(),
    opts = {}
  ) {
    const _opts = Object.assign({}, defaultOpts, opts, { type: 'success' })
    render(title, text, _opts)
  },
  clear() {
    tatas.forEach(tata => {
      removeElement(document.getElementById(tata.id))
    })
    tatas.length = 0
  }
}

function mapPostion(pos = 'tr') {
  switch (pos) {
    case 'tr':
      return 'top-right'
    case 'tm':
      return 'top-mid'
    case 'tl':
      return 'top-left'
    case 'mr':
      return 'mid-right'
    case 'mm':
      return 'mid-mid'
    case 'ml':
      return 'mid-left'
    case 'br':
      return 'bottom-right'
    case 'bm':
      return 'bottom-mid'
    case 'bl':
      return 'bottom-left'
    default:
      return 'top-right'
  }
}

function type2Icon(type = 'text') {
  switch (type) {
    case 'text':
      return 'chat_bubble'
    case 'log':
      return 'textsms'
    case 'info':
      return 'forum'
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

function mapAnimateIn(animate = 'fade', position = 'tr') {
  if (animate === 'slide') {
    switch (position) {
      case 'tr':
      case 'mr':
      case 'br':
        return 'slide-right-in'
      case 'tl':
      case 'ml':
      case 'bl':
        return 'slide-left-in'
      case 'tm':
        return 'slide-top-in'
      case 'bm':
        return 'slide-bottom-in'  
    }
  }
  return 'fade-in'
}
function mapAnimateOut(animate = 'fade', position = 'tr') {
  if (animate === 'slide') {
    switch (position) {
      case 'tr':
      case 'mr':
      case 'br':
        return 'slide-right-out'
      case 'tl':
      case 'ml':
      case 'bl':
        return 'slide-left-out'
      case 'tm':
        return 'slide-top-out'
      case 'bm':
        return 'slide-bottom-out'  
    }
  }
  return 'fade-out'
}

function randomId() {
  return `tata-${Date.now()}`
}

function clickTaTa(event) {
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

  console.log(mapAnimateOut(ta.opts.animate, ta.opts.position))
  element.classList.add(mapAnimateOut(ta.opts.animate, ta.opts.position))
  removeElement(element)

  !!ta.opts.onClose &&
    typeof ta.opts.onClose === 'function' &&
    ta.opts.onClose.call(ta)
}

function removeElement(element) {
  const timeout = setTimeout(() => {
    if (typeof element.remove === 'function') {
      element.remove()
    } else {
      document.body.removeChild(element)
    }
    clearTimeout(timeout)
  }, 800)
}

function render(title, text, opts) {
  const icon = type2Icon(opts.type)
  const position = mapPostion(opts.position)
  const animate = mapAnimateIn(opts.animate, opts.position)
  const id = randomId()
  const ta = { title, text, opts, id }
  const idx = tatas.findIndex(tata => tata.id === id)
  const prevtata = idx === 0 ? null : tatas[idx - 1]

  tatas.push(ta)

  const template = `
    <div class="tata ${opts.type} ${animate} ${position}" id=${id}>
      <i class="tata-icon material-icons">${icon}</i>
      <div class="tata-body">
        <h4 class="tata-title">${title}</h4>
        <p class="tata-text">${text}</p>
      </div>
      ${
        opts.closeBtn
          ? '<button class="tata-close material-icons">clear</button>'
          : ''
      }
      ${
        !opts.holding && opts.progress
          ? '<div class="tata-progress"></div>'
          : ''
      }
    </div>
  `
  document.body.insertAdjacentHTML('beforeend', template)
  if (prevtata && prevtata.opts.position === ta.opts.position) {
    removeElement(document.getElementById(prevtata.id))
  }
  const element = document.getElementById(id)

  !!opts.onClick &&
    typeof opts.onClick === 'function' &&
    element.addEventListener('click', clickTaTa.bind(ta), {
      capture: true,
      once: true
    })

  console.log(performance.now())
  if (!opts.holding && opts.progress) {
    const progress = element.querySelector('.tata-progress')
    progress.style.animation = `${opts.duration /
      1000}s reduceWidth linear forwards`

    const timeout = setTimeout(() => {
      const idx = tatas.findIndex(ta => ta === ta)
      tatas.splice(idx, 1)
      console.log(mapAnimateOut(ta.opts.animate, ta.opts.position))
      element.classList.add(mapAnimateOut(ta.opts.animate, ta.opts.position))
      console.log(performance.now())
      removeElement(element)
      !!ta.opts.onClose &&
        typeof ta.opts.onClose === 'function' &&
        ta.opts.onClose.call(ta)
    }, opts.duration)
  }
}

document.addEventListener('click', closeTaTa, false)

export default tata