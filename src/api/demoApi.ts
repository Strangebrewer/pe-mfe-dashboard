import { startTrace } from '@bka-stuff/pe-mfe-utils';
import { axiosPublic, axiosAuth } from '../utils/axios';

export type DemoRegisterResponse = {
  username: string;
  password: string;
  accessToken: string;
  refreshToken: string;
};

export type RubeResponse = {
  link: string;
  title: string;
};

type PublicUser = {
  id: string;
  email: string;
};

export async function registerDemo(): Promise<{ data: DemoRegisterResponse; traceId: string }> {
  const traceId = startTrace('register-demo');
  const response = await axiosPublic.post<DemoRegisterResponse>('/demo/register', null, {
    headers: { 'X-Trace-ID': traceId },
  });
  return { data: response.data, traceId };
}

export async function getCurrentUser(): Promise<PublicUser> {
  const response = await axiosAuth.get<PublicUser>('/users/me');
  return response.data;
}

export async function rubeGoldberg(): Promise<RubeResponse> {
  const traceId = startTrace('rube-goldberg');
  const response = await axiosAuth.post<RubeResponse>('/rube', {}, {
    headers: { 'X-Trace-ID': traceId },
  });
  return response.data;
}
