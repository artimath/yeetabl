import { DateTime, Str } from '@cloudflare/itty-router-openapi';

export const Task = {
  name: new Str({ example: 'lorem' }),
  slug: String,
  description: new Str({ required: false }),
  completed: Boolean,
  due_date: new DateTime(),
};

export const ApiKey = {
  name: String,
  key: String,
};

export type Env = {
  YEET: AnalyticsEngineDataset;
};
