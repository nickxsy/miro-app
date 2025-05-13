import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';

import { CONFIG } from '@/shared/model';

import type { paths } from './schema/generated';

const fetchClient = createFetchClient<paths>({
  baseUrl: CONFIG.API_BASE_URL
});

const rqClient = createClient(fetchClient);

export { fetchClient, rqClient };
