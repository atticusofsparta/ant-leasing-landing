import { ANTState, AoArNSNameData } from '@ar.io/sdk';
import { create } from 'zustand';

export type GlobalState = {
  signing: boolean;
  showBuyUndernameModal: boolean;
  arnsName: string;
  domains: Record<string, AoArNSNameData>;
  ants: Record<string, ANTState>;
};

export type GlobalStateActions = {
  setSigning: (signing: boolean) => void;
  setShowBuyUndernameModal: (b: boolean) => void;
  setArNSName: (arnsName: string) => void;
  addDomains: (domains: Record<string, AoArNSNameData>) => void;
  addAnts: (ants: Record<string, ANTState>) => void;
  reset: () => void;
};

export const initialGlobalState: GlobalState = {
  signing: false,
  showBuyUndernameModal: false,
  arnsName: '',
  domains: {},
  ants: {},
};

export class GlobalStateActionBase implements GlobalStateActions {
  constructor(
    private set: (props: any) => void,
    private initialGlobalState: GlobalState,
  ) {}
  setSigning = (signing: boolean) => {
    this.set({ signing });
  };
  setArNSName = (arnsName: string) => {
    this.set({ arnsName });
  };
  setShowBuyUndernameModal = (showBuyUndernameModal: boolean) => {
    this.set({ showBuyUndernameModal });
  };
  addDomains = (domains: Record<string, AoArNSNameData>) => {
    this.set((state: GlobalState) => ({
      domains: { ...state.domains, ...domains },
    }));
  };
  addAnts = (ants: Record<string, ANTState>) => {
    this.set((state: GlobalState) => ({ ants: { ...state.ants, ...ants } }));
  };
  reset = () => {
    this.set({ ...this.initialGlobalState });
  };
}

export interface GlobalStateInterface extends GlobalState, GlobalStateActions {}
export const useGlobalState = create<GlobalStateInterface>()((set: any) => ({
  ...initialGlobalState,
  ...new GlobalStateActionBase(set, initialGlobalState),
}));
