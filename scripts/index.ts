import select from '@inquirer/select'
import { pick } from 'es-toolkit/compat'

import * as extra from './extra.js'
import * as server from './server.js'
import { logEnd, logStart, separator } from './util.js'
import * as web from './web.js'

const answer = await select({
  message: '选择脚本执行',
  choices: [
    { type: 'separator', separator: separator('Web') },
    { name: 'dev', value: 'webDev' },
    { name: 'build', value: 'webBuild' },
    { type: 'separator', separator: separator('Server') },
    { name: 'dev', value: 'serverDev' },
    { name: 'build', value: 'serverBuild' },
    { name: 'prepare', value: 'serverPrepare' },
    { name: 'schema create', value: 'serverSchemaCreate' },
    { name: 'schema fresh', value: 'serverSchemaFresh' },
    { type: 'separator', separator: separator('Extra') },
    { name: 'salt', value: 'extraSalt' },
    { name: 'hash', value: 'extraHash' },
  ],
}).catch((err) => {})

for (const [k, v] of Object.entries(
  pick(
    {
      webDev: web.dev,
      webBuild: web.build,
      serverDev: server.dev,
      serverBuild: server.build,
      serverPrepare: server.prepare,
      serverSchemaCreate: server.schemaCreate,
      serverSchemaFresh: server.schemaFresh,
      extraSalt: extra.salt,
      extraHash: extra.hash,
    },
    // @ts-ignore
    answer,
  ),
)) {
  logStart()

  await v()

  logEnd()
}
