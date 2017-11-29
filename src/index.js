import './index.css'
import tata from '../dist/tata'

function $(selector) {
  return document.querySelector(selector)
}

function $$(selector) {
  return document.querySelectorAll(selector)
}

function onClick () {
  alert('clicked.')
}

function onClose () {
  alert('closed.')
}

document.addEventListener('readystatechange', () => {
  if (document.readyState === 'complete') {
    const loading = document.querySelector('.loading')
    const btns = document.querySelector('.btns')
    
    if (loading.remove) {
      loading.remove()
    } else {
      document.body.removeChild(loading)
    }

    btns.addEventListener('click', event => {
      const target = event.target
      const type = target.dataset.type
      if (!type) return

      const title = document.getElementById('title').value
      const text = document.getElementById('text').value
      const position = [...document.querySelectorAll('input[name=position]')].find(
        input => input.checked
      ).value

      tata[type](title, text, {
        duration: document.getElementById('duration').value * 1000,
        position,
        progress: document.querySelector('input[name=progress]').checked,        
        holding: document.querySelector('input[name=holding]').checked,        
        animate: document.querySelector('input[name=animate]').checked ? 'slide' : 'fade',
        closeBtn: document.querySelector('input[name=closeBtn]').checked,
        onClick: document.querySelector('input[name=onClick]').checked ? onClick : null,
        onClose: document.querySelector('input[name=onClose]').checked ? onClose : null,
      })
    })
  }
})
