import { axiosPublic } from '../utils/axios';

export type DemoRegisterResponse = {
  username: string;
  password: string;
  accessToken: string;
  refreshToken: string;
};

export async function registerDemo(): Promise<DemoRegisterResponse> {
  const response = await axiosPublic.post<DemoRegisterResponse>('/demo/register');
  return response.data;
}
