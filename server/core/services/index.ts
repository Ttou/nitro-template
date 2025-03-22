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
