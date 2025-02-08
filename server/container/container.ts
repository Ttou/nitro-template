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
  bullBoardService: InstanceType<typeof BullBoardService>
  redisService: InstanceType<typeof RedisService>
  // Queues
  exampleQueue: InstanceType<typeof ExampleQueue>
  // Handlers
  currentUserHandler: InstanceType<typeof CurrentUserHandler>
  systemConfigHandler: InstanceType<typeof SystemConfigHandler>
  systemDeptHandler: InstanceType<typeof SystemDeptHandler>
  systemDictDataHandler: InstanceType<typeof SystemDictDataHandler>
  systemDictTypeHandler: InstanceType<typeof SystemDictTypeHandler>
  systemMenuHandler: InstanceType<typeof SystemMenuHandler>
  systemPostHandler: InstanceType<typeof SystemPostHandler>
  systemRoleHandler: InstanceType<typeof SystemRoleHandler>
  systemUserHandler: InstanceType<typeof SystemUserHandler>
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
    bullBoardService: asClass(BullBoardService, asyncOptions({ asyncInitPriority: 111, asyncDispose: false })),
    redisService: asClass(RedisService, asyncOptions({ asyncInitPriority: 15 })),
    // Queues
    exampleQueue: asClass(ExampleQueue, asyncOptions({ asyncInitPriority: 100, asyncDispose: false })),
    // Handlers
    currentUserHandler: asClass(CurrentUserHandler, syncOptions()),
    systemConfigHandler: asClass(SystemConfigHandler, syncOptions()),
    systemDeptHandler: asClass(SystemDeptHandler, syncOptions()),
    systemDictDataHandler: asClass(SystemDictDataHandler, syncOptions()),
    systemDictTypeHandler: asClass(SystemDictTypeHandler, syncOptions()),
    systemMenuHandler: asClass(SystemMenuHandler, syncOptions()),
    systemPostHandler: asClass(SystemPostHandler, syncOptions()),
    systemRoleHandler: asClass(SystemRoleHandler, syncOptions()),
    systemUserHandler: asClass(SystemUserHandler, syncOptions()),
  })

  await diManager.executeInit()
}

export async function disposeContainer() {
  await diManager.executeDispose()
  await diContainer.dispose()
}
