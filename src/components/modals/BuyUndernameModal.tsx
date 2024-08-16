import { ANT, IO, IOToken, IO_TESTNET_PROCESS_ID } from '@ar.io/sdk';
import { errorEmitter } from '@src/services/events';
import { useGlobalState } from '@src/services/state/useGlobalState';
import { useConnection } from 'arweave-wallet-kit';
import { TbX } from 'react-icons/tb';

import PurchaseUndernameForm from '../forms/PurchaseUndernameForm';
import Modal from './Modal';

function BuyUndernameModal({
  antId,
  priceSettings,
}: {
  antId: string;
  priceSettings: any;
}) {
  const signing = useGlobalState((state) => state.signing);
  const setSigning = useGlobalState((state) => state.setSigning);
  const showBuyUndernameModal = useGlobalState((s) => s.showBuyUndernameModal);
  const setShowBuyUndernameModal = useGlobalState(
    (s) => s.setShowBuyUndernameModal,
  );
  const { connected } = useConnection();
  async function handleSubmit(formState: any) {
    try {
      if (signing) {
        throw new Error('In process of buying undername, please wait');
      }
      if (!connected) {
        throw new Error(
          'Please connect with arconnect before trying to buy and undername',
        );
      }
      setSigning(true);
      const io = IO.init({
        processId: IO_TESTNET_PROCESS_ID,
        signer: window.arweaveWallet,
      });
      const ant = ANT.init({ processId: antId, signer: window.arweaveWallet });

      const transferRes = await io.transfer(
        {
          target: antId,
          qty: new IOToken(100).toMIO().valueOf(),
        },
        {
          tags: [
            { name: 'X-Action', value: 'X-Buy-Record' },
            { name: 'X-Undername', value: formState.undername },
            { name: 'X-Under-ANT-ID', value: formState.underAntId },
            { name: 'X-Purchase-Type', value: 'buy' },
          ],
        },
      );
      console.log(transferRes);
      // poll for
      let recordSet = false;
      let attempts = 0;
      while (!recordSet && attempts <= 5) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const antState = await ant.getState();
        if (antState.Records[formState.undername.trim().toLowerCase()]) {
          recordSet = true;
        }
        attempts++;
      }
    } catch (error) {
      errorEmitter.emit('error', error);
    } finally {
      setSigning(false);
      setShowBuyUndernameModal(false);
    }
  }

  return (
    <Modal
      visible={showBuyUndernameModal}
      containerClasses="p-10 flex flex-row justify-center items-center bg-[rgb(0,0,0,0.3)] z-50"
      modalClasses="bg-background text-secondary w-[66%] h-fit flex flex-col justify-center items-center p-4 rounded-lg shadow-url"
    >
      <div className="flex w-full flex-row justify-between pb-4">
        <h1 className="p-2 text-2xl font-bold">Buy Undername</h1>{' '}
        <button
          onClick={() => setShowBuyUndernameModal(false)}
          className="text-white text-3xl"
        >
          <TbX />
        </button>
      </div>
      <PurchaseUndernameForm settings={priceSettings} submit={handleSubmit} />
    </Modal>
  );
}

export default BuyUndernameModal;
