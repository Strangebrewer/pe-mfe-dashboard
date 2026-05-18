import { FC } from 'react';
import { startTrace, GhostButton } from '@bka-stuff/pe-mfe-utils';
import { axiosAuth } from '../utils/axios';
import { useRegisterDemo } from '../hooks/demoHooks';
import './styles.css';

const Home: FC = () => {
  const { mutate: registerDemo } = useRegisterDemo();

  function doTheThing() {
    const traceId = startTrace('rube trace');
    axiosAuth.post('/rube', {}, { headers: { 'X-Trace-ID': traceId } });
  }

  function makeMyDay() {
    registerDemo();
  }

  return (
    <div className="tw:w-[600px] tw:m-auto tw:flex tw:flex-col tw:text-center">
      <h1 className="tw:text-[36px] tw:mb-[8px]">Hey there!</h1>

      <p className="tw:text-[22px]">You're early!</p>
      <p>I'm just getting setup up.</p>
      <p className="tw:mb-[24px]">See you soon.</p>
      <br />

      <div className="home-under-construction"></div>

      <div className="tw:flex tw:justify-center tw:flex-wrap">
        <GhostButton text="Rube Goldberg strikes again!" color="blue" onClick={doTheThing} />
        <p className="tw:mt-[12px] tw:mb-[36px]">
          Click the Rube Button and then click the info icon over there --&gt;
        </p>

        <GhostButton text="Register for a Demo!" color="blue" onClick={makeMyDay} />
      </div>
    </div>
  );
};

export default Home;
