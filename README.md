# Build an AI Agent from Scratch

- Building an AI Agent from scratch
- Using OpenAI's API
- Using a local database to store messages

## Setup Instructions

This repo requires **Node.js version 20+** or **bun v1.0.20**.

The `main` branch contains the final application.
You will also need an [API Key from OpenAI](https://platform.openai.com/settings/organization/api-keys).

```bash
git clone https://github.com/Sumeet-Aulakh/ai-agent.git
cd ai-agent
npm install # or bun install
```

To run the project:

```bash
npm start
# or
bun run index.ts
```

## OpenAI API Key

Create an [API Key from OpenAI](https://platform.openai.com/settings/organization/api-keys) and save it in a `.env` file:

```
OPENAI_API_KEY='YOUR_API_KEY'
```

## Inspiration

- [Frontend Masters](https://frontendmasters.com/workshops/build-ai-agent/)
- [Scott Moss](https://github.com/hendrixer)
