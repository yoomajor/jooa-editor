export default {
  name: 'image1',
  type: 'standard',
  moduleName: '1단 이미지',
  html: `
  <div class="module" data-mods="image1">
    <div class="column">
      <label class="uploadImg">Upload image<input type="file"></label>
    </div>
  </div>
  `,
  dataSet: {
    mods: 'image1',
    column: [
      {
        type: 'image',
        value: null,
        link: null
      }
    ]
  },
  style: {
    backgroundColor: 'rgba(255,255,255,1)',
    backgroundImage: 'url(/image.jpg)',
    border: '1px solid transparent',
    borderColor: 'rgba(255,255,255,0)',
    padding: '30px'
  },
  link: null
}
