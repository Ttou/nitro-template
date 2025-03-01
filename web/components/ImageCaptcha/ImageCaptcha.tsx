import { ElInput } from 'element-plus'
import { string } from 'vue-types'

import * as styles from './ImageCaptcha.css'

export default defineComponent({
  name: 'ImageCaptcha',
  props: {
    captchaValue: string().def(''),
    captchaId: string().def(''),
  },
  emits: ['update:captchaValue', 'update:captchaId'],
  setup(_, { emit }) {
    const imgSrc = ref('')

    async function refresh() {
      const data = await captchaApi.image()

      imgSrc.value = data.captchaImage

      emit('update:captchaId', data.captchaId)
    }

    refresh()

    return {
      imgSrc,
      refresh,
    }
  },
  render() {
    return (
      <div class={styles.imageCaptcha}>
        <ElInput modelValue={this.captchaValue} placeholder="请输入验证码" onInput={e => this.$emit('update:captchaValue', e)} />
        <img src={this.imgSrc} onClick={this.refresh} style={{ cursor: 'pointer' }} />
      </div>
    )
  },
})
