import { ANT, AoANTState, IO } from '@ar.io/sdk';
import { connect } from '@permaweb/aoconnect';
import UndernamesTable from '@src/components/data-display/tables/UndernamesTable';
import BuyUndernameModal from '@src/components/modals/BuyUndernameModal';
import { useGlobalState } from '@src/services/state/useGlobalState';
import { safeDecode } from '@src/utils';
import { useEffect, useState } from 'react';

function Home() {
  const [state, setState] = useState<AoANTState>();
  const [antId, setAntId] = useState<string>();
  const [priceSettings, setPriceSettings] = useState<Record<string, string>>();
  const [loading, setLoading] = useState(true);
  const setArNSName = useGlobalState((s) => s.setArNSName);
  const signing = useGlobalState((s) => s.signing);

  useEffect(() => {
    updateState();
  }, [signing]);

  async function updateState() {
    try {
      setLoading(true);
      const arioContract = IO.init();
      const arnsDomain = window.location.hostname.split('.')[0];
      setArNSName(arnsDomain);

      const record = await arioContract.getArNSRecord({ name: arnsDomain });
      if (!record?.processId) throw new Error('No process id found on record');
      const antID = record.processId;

      const ant = ANT.init({ processId: antID });
      const ao = connect();
      const antState = await ant.getState();
      const antSettingsRes = await ao.dryrun({
        process: antID,
        tags: [{ name: 'Action', value: 'Get-Price-Settings' }],
      });
      console.log(antSettingsRes);
      const antSettings = safeDecode(antSettingsRes.Messages[0].Data);
      setState(antState);
      setPriceSettings(antSettings);
      setAntId(antID);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex h-screen w-full flex-row justify-center gap-8 bg-[rgb(0,0,0,0.7)] p-8">
      <UndernamesTable undernames={state?.Records ?? {}} loading={loading} />
      {priceSettings && antId && (
        <BuyUndernameModal priceSettings={priceSettings} antId={antId} />
      )}
    </div>
  );
}

export default Home;
