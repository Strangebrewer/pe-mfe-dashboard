import { FC } from 'react';

const stackTags = [
  'Go',
  'NestJS',
  'TypeScript',
  'React',
  'GraphQL',
  'MongoDB',
  'GCP',
  'Pub/Sub',
  'Webpack Module Federation',
];

const HeroSection: FC = () => (
  <div className="tw:max-w-3xl tw:mb-12">
    <h1 className="tw:text-4xl tw:font-bold tw:text-primary tw:mb-4">personal-enterprise</h1>
    <p className="tw:text-lg tw:text-muted tw:mb-2 tw:leading-relaxed">
      A personal distributed system built from scratch — Go microservices, NestJS GraphQL subgraphs,
      Apollo Federation, event-driven Pub/Sub, React microfrontends via Webpack Module Federation,
      deployed on GCP. Serves both as a demo for you and a learning and testing playground for me.
    </p>
    <p className="tw:text-lg tw:text-primary tw:mb-6 tw:leading-relaxed">
      Register for a demo account below and explore the live system. Some actions will fire a system
      trace, which can be found in the sidebar over there --&gt;
    </p>
    <h2 className="tw:mb-[6px] tw:text-xl">Stack</h2>
    <div className="tw:flex tw:flex-wrap tw:gap-2">
      {stackTags.map((tag) => (
        <span
          key={tag}
          className="tw:text-xs tw:px-2 tw:py-1 tw:rounded tw:border tw:border-purpleAlpha tw:text-muted"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
);

export default HeroSection;
