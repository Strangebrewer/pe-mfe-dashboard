import { FC } from 'react';
import ServiceCard, { type ServiceDef } from './ServiceCard';

const GITHUB_BASE = 'https://github.com/Strangebrewer';

const services: ServiceDef[] = [
  {
    name: 'go-auth',
    role: 'Backend',
    stack: 'Go · MongoDB · Cloud Run',
    description:
      'Issues JWTs, manages demo accounts, IP rate limiting. The only service that mints tokens — all others validate independently.',
    githubUrl: `${GITHUB_BASE}/go-auth`,
  },
  {
    name: 'go-job-search',
    role: 'Backend',
    stack: 'Go · MongoDB · Cloud Run',
    description:
      'Job application and recruiter tracker. Pub/Sub subscriber — receives demo-registered events and seeds sample data.',
    githubUrl: `${GITHUB_BASE}/go-job-search`,
    mfeRoute: '/job-search',
  },
  {
    name: 'go-budget',
    role: 'Backend',
    stack: 'Go · MongoDB · Cloud Run',
    description: 'Budget accounts, bills, and transactions. Pub/Sub subscriber for demo seeding.',
    githubUrl: `${GITHUB_BASE}/go-budget`,
    mfeRoute: '/budget',
  },
  {
    name: 'go-tracer',
    role: 'Backend',
    stack: 'Go · MongoDB · Cloud Run',
    description:
      'Distributed trace aggregation. Services emit spans fire-and-forget; this service stores and serves them. Powers the activity sidebar.',
    githubUrl: `${GITHUB_BASE}/go-tracer`,
  },
  {
    name: 'gql-home-maintenance',
    role: 'GraphQL',
    stack: 'NestJS · MongoDB · Apollo Federation · Cloud Run',
    description:
      'Homes, vehicles, tasks, and service records. Five federated domains. Pub/Sub subscriber for demo seeding.',
    githubUrl: `${GITHUB_BASE}/gql-home-maintenance`,
    mfeRoute: '/home-maintenance',
  },
  {
    name: 'gql-recipes',
    role: 'GraphQL',
    stack: 'NestJS · MongoDB · Apollo Federation · Cloud Run',
    description:
      'Recipe storage with ingredients, directions, and tags. Pub/Sub subscriber for demo seeding.',
    githubUrl: `${GITHUB_BASE}/gql-recipes`,
    mfeRoute: '/recipes',
  },
  {
    name: 'gql-project-mgr',
    role: 'GraphQL',
    stack: 'NestJS · MongoDB · Apollo Federation · Cloud Run',
    description:
      'Projects and tasks. Subscribes to job-interview-scheduled events and auto-creates prep tasks.',
    githubUrl: `${GITHUB_BASE}/gql-project-mgr`,
    mfeRoute: '/projects',
  },
  {
    name: 'gql-router',
    role: 'Infrastructure',
    stack: 'Apollo Router (Rust) · Cloud Run',
    description:
      'Composes the supergraph from all three NestJS subgraphs. Schema baked at build time via Rover; subgraph URLs overridden at runtime.',
    githubUrl: `${GITHUB_BASE}/gql-router`,
  },
  {
    name: 'pe-mfe-shell',
    role: 'Frontend',
    stack: 'React · TypeScript · Webpack Module Federation · Firebase',
    description:
      'Host shell orchestrates six domain microfrontends. Each MFE is independently deployed; the shell composes them at runtime.',
    githubUrl: `${GITHUB_BASE}/pe-mfe-shell`,
  },
  {
    name: 'pe-mfe-utils',
    role: 'Frontend',
    stack: 'React · TypeScript · Zustand',
    description:
      'Shared library: UI components, auth client, base Webpack config, Zustand stores for user and tracer state.',
    githubUrl: `${GITHUB_BASE}/pe-mfe-utils`,
  },
];

type Props = {
  isLoggedIn: boolean;
};

const ServiceGrid: FC<Props> = ({ isLoggedIn }) => (
  <div className="tw:mt-16">
    <h2 className="tw:text-xl tw:font-semibold tw:text-primary tw:mb-6">Services</h2>
    <div className="tw:grid tw:grid-cols-1 sm:tw:grid-cols-2 lg:tw:grid-cols-3 tw:gap-12">
      {services.map((s) => (
        <ServiceCard key={s.name} service={s} isLoggedIn={isLoggedIn} />
      ))}
    </div>
  </div>
);

export default ServiceGrid;
