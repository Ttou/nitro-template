import { asClass, createContainer } from 'awilix'
import { AwilixManager } from 'awilix-manager'

export interface IRegisterOptions {
  cacheService: ICacheService
  captchaService: ICaptchaService
  configService: IConfigService
  hashService: IHashService
  jwtService: IJwtService
  ormService: IOrmService
  bullService: IBullService
  bullBoardService: IBullBoardService
}

export const diContainer = createContainer<IRegisterOptions>({
  strict: true,
  injectionMode: 'PROXY',
})

const manager = new AwilixManager({
  diContainer,
  asyncInit: true,
  asyncDispose: true,
})

export async function setupContainer() {
  diContainer.register({
    cacheService: asClass(CacheService, { lifetime: 'SINGLETON', asyncInitPriority: 5, asyncInit: 'init', asyncDispose: 'dispose' }),
    configService: asClass(ConfigService, { lifetime: 'SINGLETON', asyncInitPriority: 1, asyncInit: 'init', asyncDispose: false }),
    captchaService: asClass(CaptchaService, { lifetime: 'SINGLETON' }),
    hashService: asClass(HashService, { lifetime: 'SINGLETON' }),
    jwtService: asClass(JwtService, { lifetime: 'SINGLETON' }),
    ormService: asClass(OrmService, { lifetime: 'SINGLETON', asyncInitPriority: 10, asyncInit: 'init', asyncDispose: 'dispose' }),
    bullService: asClass(BullService, { lifetime: 'SINGLETON', asyncInitPriority: 20, asyncInit: 'init', asyncDispose: false }),
    bullBoardService: asClass(BullBoardService, { lifetime: 'SINGLETON', asyncInitPriority: 21, asyncInit: 'init', asyncDispose: false }),
  })

  await manager.executeInit()
}

export async function disposeContainer() {
  await manager.executeDispose()
  await diContainer.dispose()
}
