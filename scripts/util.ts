import { spawn } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import figures from 'figures'
import { dim } from 'yoctocolors'

const __dirname = dirname(fileURLToPath(import.meta.url))
export const resolve = (path: string) => join(__dirname, '..', path)

const halfSeparator = new Array(7).fill(figures.line).join('')
export const separator = (text: string) =>
  dim([halfSeparator, text, halfSeparator].join(' '))

export const logStart = () => console.log(dim('start...'))
export const logEnd = () => console.log(dim('done'))

export function run(command: string, path: string) {
  const [cmd, ...args] = command.split(' ')
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      cwd: path,
      stdio: 'inherit',
      shell: true,
    })
    child.on('close', resolve)
  })
}
