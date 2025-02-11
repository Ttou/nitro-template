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
    { name: 'lint', value: 'webLint' },
    { type: 'separator', separator: separator('Server') },
    { name: 'dev', value: 'serverDev' },
    { name: 'build', value: 'serverBuild' },
    { name: 'prepare', value: 'serverPrepare' },
    { name: 'lint', value: 'serverLint' },
    { type: 'separator', separator: separator('Extra') },
    { name: 'salt', value: 'extraSalt' },
    { name: 'hash', value: 'extraHash' },
  ],
}).catch((err) => {})

if (!answer) {
  process.exit(0)
}

for (const [k, v] of Object.entries(
  pick(
    {
      webDev: web.dev,
      webBuild: web.build,
      webLint: web.lint,
      serverDev: server.dev,
      serverBuild: server.build,
      serverPrepare: server.prepare,
      serverLint: server.lint,
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
