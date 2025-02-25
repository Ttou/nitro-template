import { asClass, AwilixContainer, createContainer, InjectionMode, ResolverOptions } from 'awilix'
import { AwilixManager } from 'awilix-manager'

export interface IScopeRegisters {
  reqId: string
  reqStartTime: number
  currentUser: ISysUserEntity
}

export interface IContainerRegisters extends IScopeRegisters {
  cacheService: ICacheService
  configService: IConfigService
  hashService: IHashService
  jwtService: IJwtService
  ormService: IOrmService
  bullService: IBullService
  bullBoardService: IBullBoardService
  redisService: IRedisService
}

declare module 'h3' {
  interface H3EventContext {
    scope: AwilixContainer<IContainerRegisters>
  }
}

export const diContainer = createContainer<IContainerRegisters>({
  injectionMode: InjectionMode.PROXY,
  strict: true,
})

export const diManager = new AwilixManager({
  diContainer,
  asyncInit: true,
  asyncDispose: true,
})

const syncOptions = <T>(options: ResolverOptions<T> = {}): ResolverOptions<T> => ({
  lifetime: 'SINGLETON',
  ...options,
})

const asyncOptions = <T>(options: ResolverOptions<T> = {}): ResolverOptions<T> => ({
  lifetime: 'SINGLETON',
  asyncInit: 'init',
  asyncDispose: 'dispose',
  ...options,
})

export async function configureContainer() {
  diContainer.register({
    cacheService: asClass(CacheService, asyncOptions({ asyncInitPriority: 10, asyncDispose: false })),
    configService: asClass(ConfigService, asyncOptions({ asyncInitPriority: 1, asyncDispose: false })),
    hashService: asClass(HashService, syncOptions()),
    jwtService: asClass(JwtService, syncOptions()),
    ormService: asClass(OrmService, asyncOptions({ asyncInitPriority: 11 })),
    bullService: asClass(BullService, asyncOptions({ asyncInitPriority: 110, asyncDispose: false })),
    bullBoardService: asClass(BullBoardService, asyncOptions({ asyncInitPriority: 111, asyncDispose: false })),
    redisService: asClass(RedisService, asyncOptions({ asyncInitPriority: 15 })),
  })

  await diManager.executeInit()
}

export async function disposeContainer() {
  await diManager.executeDispose()
  await diContainer.dispose()
}
