import { FC, useState } from 'react';
import { Button, Card, useUserStore } from '@bka-stuff/pe-mfe-utils';
import type { DemoRegisterResponse, RubeResponse } from '../api/demoApi';

type Props = {
  onRegister: () => Promise<void>;
  isRegistering: boolean;
  registerError: string | null;
  registrationResult: DemoRegisterResponse | null;
  isReturningDemo: boolean;
  showRubeButton: boolean;
  onRube: () => Promise<void>;
  isRubing: boolean;
  rubeResult: RubeResponse | null;
};

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="tw:flex tw:items-center tw:gap-3 tw:bg-bg tw:border tw:border-purpleAlpha tw:rounded tw:px-3 tw:py-2">
      <span className="tw:text-xs tw:text-muted tw:w-20 tw:shrink-0">{label}</span>
      <span className="tw:font-mono tw:text-sm tw:text-primary tw:flex-1">{value}</span>
      <button
        onClick={handleCopy}
        className="tw:text-xs tw:text-blue hover:tw:text-primary tw:transition-colors tw:shrink-0 tw:cursor-pointer"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}

function StoredCredentials() {
  const { user } = useUserStore();
  const [revealed, setRevealed] = useState(false);

  function getStoredCreds() {
    try {
      const raw = localStorage.getItem('demo_credentials');
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!user || parsed.userId !== user.id) return null;
      return parsed as { username: string; password: string; userId: string };
    } catch {
      return null;
    }
  }

  const creds = getStoredCreds();

  if (!creds) return null;

  return (
    <div className="tw:mt-4">
      {revealed ? (
        <div className="tw:flex tw:flex-col tw:gap-2">
          <CopyField label="Username" value={creds.username} />
          <CopyField label="Password" value={creds.password} />
        </div>
      ) : (
        <button
          onClick={() => setRevealed(true)}
          className="tw:text-sm tw:text-blue tw:underline tw:cursor-pointer hover:tw:text-primary tw:transition-colors"
        >
          Show credentials
        </button>
      )}
    </div>
  );
}

const DemoRegistrationCard: FC<Props> = ({
  onRegister,
  isRegistering,
  registerError,
  registrationResult,
  isReturningDemo,
  showRubeButton,
  onRube,
  isRubing,
  rubeResult,
}) => {
  if (isReturningDemo && !registrationResult) {
    return (
      <Card>
        <p className="tw:text-sm tw:text-muted tw:mb-1">You're logged in as a demo user.</p>
        <StoredCredentials />
        <RubeSection show={true} onRube={onRube} isRubing={isRubing} rubeResult={rubeResult} />
      </Card>
    );
  }

  if (registrationResult) {
    return (
      <Card>
        <div>
          <p className="tw:text-sm tw:font-medium tw:text-primary tw:mb-3">Your demo credentials</p>
          <div className="tw:flex tw:flex-col tw:gap-2">
            <CopyField label="Username" value={registrationResult.username} />
            <CopyField label="Password" value={registrationResult.password} />
          </div>
        </div>

        <div className="tw:border-t tw:border-purpleAlpha tw:pt-4">
          <p className="tw:text-sm tw:text-muted tw:mb-1">
            Your account is being seeded with sample data across all services.
          </p>
          <p className="tw:text-xs tw:text-grey">
            This account expires in 2 hours. Demo registrations are limited to 3 per IP per day.
          </p>
        </div>

        <RubeSection
          show={showRubeButton}
          onRube={onRube}
          isRubing={isRubing}
          rubeResult={rubeResult}
        />
      </Card>
    );
  }

  return (
    <div className="tw:flex tw:w-[200px] tw:m-auto tw:flex-col tw:justify-center tw:gap-3">
      <Button
        color="blue"
        text={isRegistering ? 'Registering...' : 'Register for a Demo'}
        onClick={onRegister}
        disabled={isRegistering}
      />
      {registerError && <p className="tw:text-sm tw:text-red">{registerError}</p>}
    </div>
  );
};

function RubeSection({
  show,
  onRube,
  isRubing,
  rubeResult,
}: {
  show: boolean;
  onRube: () => Promise<void>;
  isRubing: boolean;
  rubeResult: RubeResponse | null;
}) {
  if (!show) return null;

  return (
    <div className="tw:border-t tw:border-purpleAlpha tw:pt-4 tw:flex tw:flex-col tw:gap-3">
      <p className="tw:text-sm tw:text-muted">
        The right sidebar shows traces by name - if you expand them, they'll show individual spans.
      </p>
      <p className="tw:text-sm tw:text-muted">The left sidebar links to all the micro-frontends.</p>
      <p className="tw:text-sm tw:text-muted">
        The rube-owid trace hops across the backend services and pulls a random subject from Our
        World In Data (
        <a
          className="tw:underline tw:text-[#ffffff]"
          href="https://ourworldindata.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          ourworldindata.org
        </a>
        ) and adds a task to the task manager. Check it out:
      </p>
      <div>
        <Button
          color="purple"
          text={isRubing ? 'Running...' : 'Rube Goldberg Strikes Again!'}
          onClick={onRube}
          disabled={isRubing}
        />
      </div>
      {rubeResult && (
        <div className="tw:bg-bg tw:border tw:border-purpleAlpha tw:rounded tw:p-3">
          <p className="tw:text-xs tw:text-grey tw:mb-1">Chain result</p>
          <a
            href={rubeResult.link}
            target="_blank"
            rel="noopener noreferrer"
            className="tw:text-sm tw:text-blue hover:tw:text-primary tw:transition-colors tw:leading-snug"
          >
            {rubeResult.title}
          </a>
        </div>
      )}
    </div>
  );
}

export default DemoRegistrationCard;
