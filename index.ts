import 'dotenv/config'
import { runLLM } from './src/llm'
import { addMessage, getMessages } from './src/memory'
import type { AIMessage } from './types'

const userMessage = process.argv[2]

if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}

await addMessage([{ role: 'user', content: userMessage }])
const messages: AIMessage[] = await getMessages()

const response = await runLLM({
  messages,
})

await addMessage([{ role: 'assistant', content: response }])
console.log(response)
