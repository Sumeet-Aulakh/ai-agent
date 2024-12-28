import OpenAI from 'openai'

const getWeather = () => `cold, it's -10 degrees celsius`

export const runTool = async (
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  userMessage: string
) => {
  const input = {
    userMessage,
    toolCall: JSON.parse(toolCall.function.arguments || '{}'),
  }

  switch (toolCall.function.name) {
    case 'get_weather':
      return getWeather(input)
    default:
      throw new Error(`Unknown tool: ${toolCall.function.name}`)
  }
}
