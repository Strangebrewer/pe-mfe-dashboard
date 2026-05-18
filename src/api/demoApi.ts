import { startTrace } from '@bka-stuff/pe-mfe-utils';
import { axiosPublic } from '../utils/axios';

export type DemoRegisterResponse = {
  username: string;
  password: string;
  accessToken: string;
  refreshToken: string;
};

export async function registerDemo(): Promise<DemoRegisterResponse> {
  const traceId = startTrace('register-demo');
  const response = await axiosPublic.post<DemoRegisterResponse>('/demo/register', null, {
    headers: { 'X-Trace-ID': traceId },
  });
  return response.data;
}
