import { bullService } from './bull.js'
import { bullBoardService } from './bull-board.js'
import { cacheService } from './cache.js'
import { captchaService } from './captcha.js'
import { configService } from './config.js'
import { hashService } from './hash.js'
import { jwtService } from './jwt.js'
import { ormService } from './orm.js'

export function keepServiceFiles() {
  for (
    const element of [
      configService,
      hashService,
      ormService,
      cacheService,
      captchaService,
      jwtService,
      bullService,
      bullBoardService,
    ]
  ) {
    // TODO 保持文件引用
  }
}

export async function initService() {
  await serviceCenter.init()
}

export async function deposeService() {
  await serviceCenter.depose()
}
