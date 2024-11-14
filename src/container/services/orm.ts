import { MikroORM } from '@mikro-orm/core'
import { MySqlDriver } from '@mikro-orm/mysql'

export class OrmService {
  private configService: InstanceType<typeof ConfigService>
  private orm: MikroORM<MySqlDriver>

  constructor({ configService }: ContainerRegisters) {
    this.configService = configService
  }

  private async init() {
    const ormConfig = this.configService.get('orm')

    this.orm = await MikroORM.init({
      driver: MySqlDriver,
      entities: [UserEntity],
      ...ormConfig,
    })

    console.log('ORM initialized')
  }

  private async dispose() {
    await this.orm.close(true)

    console.log('ORM disposed')
  }

  get em() {
    return this.orm.em
  }
}
