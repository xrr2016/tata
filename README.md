# TaTa.js

[Live Demo](http://xiaoranran.site/tata/)

## Install

> npm i --save @rocket/tata
or
> yarn add @rocket/tata

## Usage

```js
tata.text('Hello World', '很高兴见到你。', {// config})
tata.log('Hello World', '很高兴见到你。', {// config})
tata.info('Hello World', '很高兴见到你。', {// config})
tata.success('Hello World', '很高兴见到你。', {// config})
tata.warn('Hello World', '很高兴见到你。', {// config})
tata.error('Hello World', '很高兴见到你。', {// config})
```

## Config

```js
type: 'log'
position: 'top-right'
duration: 3000
progress: true
progressWidth: 100
holding: false
icon: true
closeBtn: true
show: 'fadeIn'  // slideIn
hide: 'fadeOut' // slideOut
onClick: null
onClose: null
```

### Api

```js
```

## License

[MIT](./LICENSE)