import { Mastra } from '@mastra/core/mastra';
import { createLogger } from '@mastra/core/logger';
import { weatherWorkflow } from './workflows';
import { glitchAgent } from './agents';

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { glitchAgent },
  logger: createLogger({
    name: 'Mastra',
    level: 'info',
  }),
});
