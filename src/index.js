function $(selector) {
  return document.querySelector(selector)
}

function $$(selector) {
  return document.querySelectorAll(selector)
}

function onClick() {
  alert('clicked.')
}

function onClose() {
  alert('closed.')
}


document.addEventListener('readystatechange', () => {
  if (document.readyState === 'complete') {
    const loading = $('.loading')
    const btns = $('.btns')

    document.body.removeChild(loading)

    btns.addEventListener('click', event => {
      const target = event.target
      const type = target.dataset.type
      if (!type) return

      const title = $('#title').value
      const text = $('#text').value
      const position = [...$$('input[name=position]')].find(
        input => input.checked
      ).value

      tata[type](title, text, {
        duration: $('#duration').value * 1000,
        position,
        progress: $('input[name=progress]').checked,
        holding: $('input[name=holding]').checked,
        animate: $('input[name=animate]').checked ? 'slide' : 'fade',
        closeBtn: $('input[name=closeBtn]').checked,
        onClick: $('input[name=onClick]').checked ? onClick : null,
        onClose: $('input[name=onClose]').checked ? onClose : null
      })
    })
  }
})
