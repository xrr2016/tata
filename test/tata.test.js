import tata from '../src/tata'

test('should render a prompt', () => {
  tata.success('test', 'test')
  const t = document.querySelector('.tata')
  expect(t).not.toBe(null)
})
