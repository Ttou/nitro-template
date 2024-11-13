import { asClass, AwilixContainer, createContainer, InjectionMode, ResolverOptions } from 'awilix'
import { AwilixManager } from 'awilix-manager'

export interface ScopeRegisters {
  traceId: string
  currentUser: UserEntityType
}

export interface ContainerRegisters extends ScopeRegisters {
  // Services
  configService: InstanceType<typeof ConfigService>
  hashService: InstanceType<typeof HashService>
  idService: InstanceType<typeof IdService>
  jwtService: InstanceType<typeof JwtService>
  ormService: InstanceType<typeof OrmService>
  validateService: InstanceType<typeof ValidateService>
  timeService: InstanceType<typeof TimeService>
  // Repositories
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
    configService: asClass(ConfigService, asyncOptions({ asyncDispose: false })),
    hashService: asClass(HashService, syncOptions()),
    idService: asClass(IdService, syncOptions()),
    jwtService: asClass(JwtService, syncOptions()),
    ormService: asClass(OrmService, asyncOptions()),
    validateService: asClass(ValidateService, syncOptions()),
    timeService: asClass(TimeService, syncOptions()),
    userRepository: asClass(UserRepository, syncOptions()),
  })

  await diManager.executeInit()
}

export async function disposeContainer() {
  await diManager.executeDispose()
  await diContainer.dispose()
}
