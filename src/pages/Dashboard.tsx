import { FC, useEffect, useRef, useState } from 'react';
import { useUserStore, useTracerStore } from '@bka-stuff/pe-mfe-utils';
import HeroSection from '../components/HeroSection';
import DemoRegistrationCard from '../components/DemoRegistrationCard';
import ServiceGrid from '../components/ServiceGrid';
import { registerDemo, getCurrentUser, rubeGoldberg } from '../api/demoApi';
import type { DemoRegisterResponse, RubeResponse } from '../api/demoApi';
import { authClient } from '../utils/axios';

const Dashboard: FC = () => {
  const { user, setUser } = useUserStore();
  const { traces } = useTracerStore();

  const [registrationResult, setRegistrationResult] = useState<DemoRegisterResponse | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);

  const [showRubeButton, setShowRubeButton] = useState(false);
  const [isRubing, setIsRubing] = useState(false);
  const [rubeResult, setRubeResult] = useState<RubeResponse | null>(null);

  // Track the registration traceId so we can detect when it leaves the active list
  const registrationTraceIdRef = useRef<string | null>(null);
  const rubeRevealedRef = useRef(false);

  // Reveal Rube button once the demo registration trace completes (leaves active traces)
  useEffect(() => {
    const traceId = registrationTraceIdRef.current;
    if (!traceId || rubeRevealedRef.current) return;
    const stillPolling = traces.some((t) => t.id === traceId);
    if (!stillPolling) {
      setShowRubeButton(true);
      rubeRevealedRef.current = true;
    }
  }, [traces]);

  // Returning demo user: show Rube button immediately (they've already seen the trace intro)
  const isReturningDemo = !!user && !registrationResult;

  async function handleRegister() {
    setIsRegistering(true);
    setRegisterError(null);
    try {
      const { data, traceId } = await registerDemo();
      registrationTraceIdRef.current = traceId;
      authClient.setTokens(data.accessToken, data.refreshToken);
      const userData = await getCurrentUser();
      setUser(userData);
      localStorage.setItem(
        'demo_credentials',
        JSON.stringify({ username: data.username, password: data.password, userId: userData.id }),
      );
      setRegistrationResult(data);
    } catch (err: any) {
      if (err?.response?.status === 429) {
        setRegisterError('Demo limit reached for today — try again tomorrow.');
      } else {
        setRegisterError('Registration failed. Please try again.');
      }
    } finally {
      setIsRegistering(false);
    }
  }

  async function handleRube() {
    setIsRubing(true);
    setRubeResult(null);
    try {
      const result = await rubeGoldberg();
      setRubeResult(result);
    } catch {
      // silently ignore — the trace will reflect what happened
    } finally {
      setIsRubing(false);
    }
  }

  return (
    <div className="tw:max-w-3xl tw:px-6 tw:py-10 tw:mx-auto">
      <HeroSection />
      <DemoRegistrationCard
        onRegister={handleRegister}
        isRegistering={isRegistering}
        registerError={registerError}
        registrationResult={registrationResult}
        isReturningDemo={isReturningDemo}
        showRubeButton={isReturningDemo || showRubeButton}
        onRube={handleRube}
        isRubing={isRubing}
        rubeResult={rubeResult}
      />
      <ServiceGrid isLoggedIn={!!user} />
    </div>
  );
};

export default Dashboard;
