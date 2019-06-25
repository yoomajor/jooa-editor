export default {
  name: 'text1',
  type: 'standard',
  moduleName: '1단 텍스트',
  html: `
  <div class="module" data-mods="text1" contenteditable>
    <div class="column">
      new text1 module :: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt libero diam, at hendrerit urna volutpat egestas. In semper nisl quis mattis placerat.
    </div>
  </div>
  `,
  value: [
    "text <span color='red'>module</span> example"
  ],
  style: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    backgroundImage: 'url(/image.jpg)',
    border: '1px solid transparent',
    borderColor: 'rgba(0,0,255,1)',
    padding: '30px'
  },
  link: null
}
