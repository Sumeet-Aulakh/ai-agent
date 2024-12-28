import type { AIMessage } from '../types'
import { addMessage, getMessages, saveToolResponse } from './memory'
import { runLLM } from './llm'
import { logMessage, showLoader } from './ui'
import { runTool } from './toolRunner'

export const runAgent = async ({
  userMessage,
  tools,
}: {
  userMessage: string
  tools: any[]
}) => {
  await addMessage([
    {
      role: 'user',
      content: userMessage,
    },
  ])

  const loader = showLoader('Thinking 🤔...')
  const history = await getMessages()
  const response = await runLLM({
    messages: history,
    tools,
  })

  await addMessage([response])
  if (response.tool_calls) {
    const toolCall = response.tool_calls[0]
    loader.update(`Executing: ${toolCall.function.name}`)
    const toolResponse = await runTool(toolCall, userMessage)
    await saveToolResponse(toolCall.id, toolResponse)
    loader.update('Done! 🎉')
  }

  logMessage(response)
  loader.stop()
  return getMessages()
}
