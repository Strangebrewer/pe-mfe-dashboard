import { Button, Card, GhostButton } from '@bka-stuff/pe-mfe-utils';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

export type ServiceDef = {
  name: string;
  role: 'Backend' | 'GraphQL' | 'Frontend' | 'Infrastructure';
  stack: string;
  description: string;
  githubUrl: string;
  mfeRoute?: string;
};

type Props = {
  service: ServiceDef;
  isLoggedIn: boolean;
};

const roleBadgeClass: Record<ServiceDef['role'], string> = {
  Backend: 'tw:border-blueBorder tw:text-blue',
  GraphQL: 'tw:border-purpleBorder tw:text-purple',
  Frontend: 'tw:border-greenBorder tw:text-green',
  Infrastructure: 'tw:border-greyBorder tw:text-grey',
};

const ServiceCard: FC<Props> = ({ service, isLoggedIn }) => {
  const navigate = useNavigate();

  function goToRepo() {
    window.open(service.githubUrl, '_blank', 'noopener,noreferrer');
  }

  return (
    <Card>
      <div className="tw:flex tw:items-start tw:justify-between tw:gap-2">
        <span className="tw:font-semibold tw:text-primary tw:text-sm">{service.name}</span>
        <span
          className={`tw:text-xs tw:px-2 tw:py-0.5 tw:rounded tw:border tw:shrink-0 ${roleBadgeClass[service.role]}`}
        >
          {service.role}
        </span>
      </div>

      <p className="tw:text-xs tw:text-grey tw:font-mono">{service.stack}</p>
      <p className="tw:text-sm tw:text-muted tw:leading-snug">{service.description}</p>

      <div className="tw:flex tw:mt-auto tw:pt-2 tw:flex-wrap">
        <Button color="blue" onClick={goToRepo} text="GitHub Repo" />
        {service.mfeRoute && isLoggedIn && (
          <Button last text="Open" color="green" onClick={() => navigate(service.mfeRoute!)} />
        )}
      </div>
    </Card>
  );
};

export default ServiceCard;
