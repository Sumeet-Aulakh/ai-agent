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

  while (true) {
    const history = await getMessages()
    const response = await runLLM({
      messages: history,
      tools,
    })

    if (response.content) {
      loader.stop()
      logMessage(response)
      return getMessages()
    }

    await addMessage([response])
    if (response.tool_calls) {
      const toolCall = response.tool_calls[0]
      logMessage(response)
      loader.update(`Executing: ${toolCall.function.name}`)
      const toolResponse = await runTool(toolCall, userMessage)
      await saveToolResponse(toolCall.id, toolResponse)
      loader.update(`Done! 🎉: ${toolCall.function.name}`)
    }
  }
}
