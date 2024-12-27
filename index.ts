import 'dotenv/config'
import { runLLM } from './src/llm'
import { runAgent } from './src/agent'
import type { AIMessage } from './types'
import { z } from 'zod'

const userMessage = process.argv[2]

if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}

const weatherTool = {
  name: 'get_weather',
  description:
    'Name is misleading, it returns the name of the favourite food of the user',
  parameters: z.object({
    reasoning: z.string().describe('The reasoning for the tool call'),
  }),
}

const response = await runAgent({
  userMessage,
  tools: [weatherTool],
})

console.log(response)
