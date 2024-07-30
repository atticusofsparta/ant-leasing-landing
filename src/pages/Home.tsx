import { ANT, AoANTState, AoANTWrite, IO } from '@ar.io/sdk';
import DomainCard from '@src/components/cards/DomainCard';
import LeaseUndernameForm from '@src/components/forms/LeaseUndernameForm';
import { useEffect, useState } from 'react';

function Home() {
  const [state, setState] = useState<AoANTState>();
  const [loading, setLoading] = useState(true);
  const [domainName, setDomainName] = useState<string>('UKNOWN_DOMAIN');
  const [antContract, setAntContract] = useState<AoANTWrite>();

  useEffect(() => {
    updateState();
  }, []);

  async function updateState() {
    try {
      setLoading(true);
      const arioContract = IO.init();
      // const arnsDomain = window.location.hostname.split('.')[0];
      const arnsDomain = 'atticus';
      setDomainName(arnsDomain);

      const record = await arioContract.getArNSRecord({ name: arnsDomain });
      const antID = record!.processId;

      const ant = ANT.init({ processId: antID });
      const antState = await ant.getState();
      setAntContract(ant as any);

      setState(antState);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex h-full w-full flex-row gap-8 p-8">
      <div className="flex w-1/2 flex-col gap-8">
        <h1 className="text-4xl text-secondary">Undernames</h1>
        {state?.Records ? (
          Object.keys(state?.Records)
            .filter((k) => k !== '@')
            .map((key) => (
              <DomainCard
                key={key}
                domain={key}
                url={`https://${key}_${domainName}.arweave.net`}
              />
            ))
        ) : (
          <span className="text-4xl text-matrix">
            {loading ? 'Loading...' : 'No undernames listed on ' + domainName}
          </span>
        )}
      </div>
      <div className="flex w-1/2 flex-col gap-8">
        <h1 className="text-4xl text-secondary">
          Lease an undername on{' '}
          <span className="text-matrix">{domainName}</span>
        </h1>
        {antContract && state && (
          <LeaseUndernameForm
            domain={domainName}
            antContract={antContract}
            state={state}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
