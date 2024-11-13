import { asClass, asFunction, asValue, createContainer, InjectionMode } from 'awilix'
import { AwilixManager } from 'awilix-manager'

export const diContainer = createContainer({
  injectionMode: InjectionMode.PROXY,
  strict: true,
})

export const diManager = new AwilixManager({
  diContainer,
  asyncInit: true,
  asyncDispose: true,
})

export async function configureContainer() {
  diContainer.register({})

  await diManager.executeInit()
}
