import { createOpenApiHttp } from 'openapi-msw';

import { CONFIG } from '@/shared/model/config';

import type { paths } from '../schema/generated';

export const http = createOpenApiHttp<paths>({
  baseUrl: CONFIG.API_BASE_URL
});
