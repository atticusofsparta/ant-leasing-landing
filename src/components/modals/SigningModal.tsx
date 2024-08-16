import { useGlobalState } from '@src/services/state/useGlobalState';

import Modal from './Modal';

function SigningModal() {
  const signing = useGlobalState((state) => state.signing);

  return (
    <Modal
      visible={signing}
      containerClasses="p-10 flex flex-row justify-center items-center bg-[rgb(0,0,0,0.3)] z-50"
      modalClasses="bg-[rgb(0,0,0,0.95)] text-secondary w-[500px] h-[200px] flex flex-col justify-center items-center p-10 rounded-lg shadow-url"
    >
      Signing Transaction, please wait.
    </Modal>
  );
}

export default SigningModal;
