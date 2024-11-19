import select from '@inquirer/select'
import { pick } from 'es-toolkit/compat'

import * as client from './client.js'
import * as extra from './extra.js'
import * as mikro from './mikro.js'
import * as nitro from './nitro.js'
import { logEnd, logStart, separator } from './util.js'

const answer = await select({
  message: '选择脚本执行',
  choices: [
    { type: 'separator', separator: separator('Client') },
    { name: 'dev', value: 'clientDev' },
    { name: 'build', value: 'clientBuild' },
    { type: 'separator', separator: separator('Nitro') },
    { name: 'dev', value: 'nitroDev' },
    { name: 'build', value: 'nitroBuild' },
    { name: 'prepare', value: 'nitroPrepare' },
    { type: 'separator', separator: separator('Mikro') },
    { name: 'create', value: 'mikroCreate' },
    { name: 'drop', value: 'mikroDrop' },
    { name: 'generate', value: 'mikroGenerate' },
    { name: 'fresh', value: 'mikroFresh' },
    { type: 'separator', separator: separator('Extra') },
    { name: 'salt', value: 'extraSalt' },
    { name: 'hash', value: 'extraHash' },
  ],
}).catch((err) => {})

for (const [k, v] of Object.entries(
  pick(
    {
      clientDev: client.dev,
      clientBuild: client.build,
      nitroDev: nitro.dev,
      nitroBuild: nitro.build,
      nitroPrepare: nitro.prepare,
      mikroCreate: mikro.create,
      mikroDrop: mikro.drop,
      mikroGenerate: mikro.generate,
      mikroFresh: mikro.fresh,
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
