export default {
  name: 'text2',
  type: 'standard',
  moduleName: '2단 텍스트',
  html: `
  <div class="module" data-mods="text2" contenteditable>
    <div class="column">
      text2 :: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </div>
    <div class="column">
      text2 :: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </div>
  </div>
  `,
  style: {
    backgroundColor: 'rgba(255,255,255,1)',
    backgroundImage: 'url(/image.jpg)',
    border: '1px solid transparent',
    borderColor: 'rgba(255,255,255,0)',
    padding: '30px'
  },
  link: null
}
