# TaTa.js

[Live Demo](http://xiaoranran.site/tata/)

## Install

> npm i --save @rocket/tata

## Usage

```js
tata.text('Hello', 'Have a nice day.', {// config})
tata.log('Hello', 'Have a nice day.', {// config})
tata.info('Hello', 'Have a nice day.', {// config})
tata.success('Hello', 'Have a nice day.', {// config})
tata.warn('Hello', 'Have a nice day.', {// config})
tata.error('Hello', 'Have a nice day.', {// config})
```

## Config

| name | tpye | default | Description |
|---------|--------|--------|-------------|
| position | string | tr | tr, tm, tl, mr, mm, ml, bl, bm, br |
| duration | number | 3000 | show haw many time |
| progress | boolean | true | dispaly a progress bar |
| holding | boolean | false | no disappear |
| closeBtn | boolean | true | show close button |
| animate | string | fade | fade or slide |
| onClick | function | null | callback function on click |
| onClose | function | null | callback function on close |

## License

[MIT](./LICENSE)