import { useMutation } from '@tanstack/react-query';
import { registerDemo } from '../api/demoApi';
import { authClient } from '../utils/axios';

export function useRegisterDemo() {
  return useMutation({
    mutationFn: registerDemo,
    onSuccess: (data) => {
      authClient.setTokens(data.accessToken, data.refreshToken);
      console.log('Demo registered:', data);
    },
  });
}
