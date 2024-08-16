import { useGlobalState } from '@src/services/state/useGlobalState';
import { ConnectButton } from 'arweave-wallet-kit';

function Navbar() {
  const setShowBuyUndernameModal = useGlobalState(
    (s) => s.setShowBuyUndernameModal,
  );
  const arnsName = useGlobalState((s) => s.arnsName);
  return (
    <div className="flex w-full flex-row items-center justify-between bg-[rgb(0,0,0,0.8)] p-1 px-10">
      <div className="relative text-2xl text-primary">
        <img src="/public/undername_market_logo.png" width={'120px'} />
        <div className="bg-night-sky-thin absolute bottom-[5px] right-[-20px] w-fit rounded-md p-1 px-2 text-sm font-bold text-matrix shadow-one">
          {arnsName}
        </div>
      </div>

      <div className="flex flex-row gap-4">
        <button
          onClick={() => setShowBuyUndernameModal(true)}
          className="border-black bg-night-sky-thin transition-all-5s rounded-md border-[1px] p-4 text-xl text-secondary shadow-url hover:bg-matrixThin"
        >
          Purchase an undername
        </button>
        <ConnectButton accent="rgba(109, 108, 105, 0.5)" />
      </div>
    </div>
  );
}

export default Navbar;
