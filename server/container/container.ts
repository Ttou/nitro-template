import { asClass, AwilixContainer, createContainer, InjectionMode, ResolverOptions } from 'awilix'
import { AwilixManager } from 'awilix-manager'

export interface ScopeRegisters {
  reqId: string
  reqStartTime: number
  currentUser: SysUserEntityType
}

export interface ContainerRegisters extends ScopeRegisters {
  // Services
  cacheService: InstanceType<typeof CacheService>
  configService: InstanceType<typeof ConfigService>
  hashService: InstanceType<typeof HashService>
  idService: InstanceType<typeof IdService>
  jwtService: InstanceType<typeof JwtService>
  loggerService: InstanceType<typeof LoggerService>
  ormService: InstanceType<typeof OrmService>
  validateService: InstanceType<typeof ValidateService>
  timeService: InstanceType<typeof TimeService>
  // Repositories
  configRepository: InstanceType<typeof ConfigRepository>
  dictDataRepository: InstanceType<typeof DictDataRepository>
  dictTypeRepository: InstanceType<typeof DictTypeRepository>
  postRepository: InstanceType<typeof PostRepository>
  userRepository: InstanceType<typeof UserRepository>
}

declare module 'h3' {
  interface H3EventContext {
    scope: AwilixContainer<ContainerRegisters>
  }
}

export const diContainer = createContainer<ContainerRegisters>({
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
    // Services
    cacheService: asClass(CacheService, asyncOptions({ asyncInitPriority: 10, asyncDispose: false })),
    configService: asClass(ConfigService, asyncOptions({ asyncInitPriority: 1, asyncDispose: false })),
    hashService: asClass(HashService, syncOptions()),
    idService: asClass(IdService, syncOptions()),
    jwtService: asClass(JwtService, syncOptions()),
    loggerService: asClass(LoggerService, asyncOptions({ asyncInitPriority: 0, asyncDispose: false })),
    ormService: asClass(OrmService, asyncOptions({ asyncInitPriority: 11 })),
    validateService: asClass(ValidateService, syncOptions()),
    timeService: asClass(TimeService, syncOptions()),
    // Repositories
    configRepository: asClass(ConfigRepository, syncOptions()),
    dictDataRepository: asClass(DictDataRepository, syncOptions()),
    dictTypeRepository: asClass(DictTypeRepository, syncOptions()),
    postRepository: asClass(PostRepository, syncOptions()),
    userRepository: asClass(UserRepository, syncOptions()),
  })

  await diManager.executeInit()
}

export async function disposeContainer() {
  await diManager.executeDispose()
  await diContainer.dispose()
}
