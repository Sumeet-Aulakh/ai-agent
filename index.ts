import 'dotenv/config'
import { runLLM } from './src/llm'
import { runAgent } from './src/agent'
import type { AIMessage } from './types'
import { z } from 'zod'
import { tools } from './src/tools'

const userMessage = process.argv[2]

if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}

const response = await runAgent({
  userMessage,
  tools,
})
