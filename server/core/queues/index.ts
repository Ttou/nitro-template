import { exampleQueue } from './example.js'

export function keepQueueFiles() {
  for (const element of [exampleQueue]) {
    // 保持保持文件引用
  }
}
