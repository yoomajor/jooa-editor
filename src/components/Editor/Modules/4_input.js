export default {
  name: 'input',
  type: 'function',
  moduleName: '입력필드',
  html: `
  <div class="module" data-mods="input">
    <div class="column" contenteditable>
      <div class="formGroup">
        <label class="label">입력필드명</label>
        <input type="text" name="" class="input" />
      </div>
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
