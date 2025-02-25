import { createCanvas } from '@napi-rs/canvas'

export class CaptchaService {
  private readonly captchaImageKey = 'captcha:image:'

  constructor() {}

  image() {
    const captchaId = nanoid()

    const canvas = createCanvas(300, 320)
    const ctx = canvas.getContext('2d')

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // 生成随机字符
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let captchaText = ''
    for (let i = 0; i < 6; i++) {
      captchaText += chars[Math.floor(Math.random() * chars.length)]
    }

    // 设置背景颜色
    ctx.fillStyle = '#f0f0f0'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // 设置字体样式
    ctx.font = '30px Arial'
    ctx.fillStyle = '#000'

    // 在画布上绘制验证码文本
    ctx.fillText(captchaText, 10, 35)

    // 添加一些干扰线
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
      ctx.beginPath()
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height)
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height)
      ctx.stroke()
    }

    // 添加一些干扰点
    for (let i = 0; i < 50; i++) {
      ctx.fillStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
      ctx.beginPath()
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, 2 * Math.PI)
      ctx.fill()
    }

    return {
      captchaId,
      captchaText,
      captchaImage: canvas.toDataURL('image/png'),
    }
  }
}
