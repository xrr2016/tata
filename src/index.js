import './index.css'
import tata from '../dist/tata'

const btns = document.querySelector('.btns')

btns.addEventListener('click', (event) => {
  const target = event.target
  const type = target.dataset.type

  if (!type) return

  tata[type]()
})