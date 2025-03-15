import { mastra } from '@/app/mastra'
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;



export async function POST(req: Request) {
  const result = await mastra.getAgent("glitchAgent").stream(`How are you?`)

  return result.toDataStreamResponse()
}
