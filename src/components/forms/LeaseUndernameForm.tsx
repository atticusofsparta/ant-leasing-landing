import { AoANTState, AoANTWrite } from '@ar.io/sdk';
import { set } from 'lodash';
import { useState } from 'react';

import InlineInput from '../inputs/text/InlineInput';

type FormInputs = {
  underAntId: string;
  targetID: string;
  ttl: string;
};

function LeaseUndernameForm({
  domain,
  antContract,
  state,
}: {
  domain: string;
  antContract: AoANTWrite;
  state: AoANTState;
}) {
  const [undername, setUndername] = useState<string>('');
  const [formState, setFormState] = useState<FormInputs>({
    underAntId: '',
    targetID: '',
    ttl: '',
  });

  const reset = () => {
    setFormState({ underAntId: '', targetID: '', ttl: '' });
    setUndername('');
  };

  function isAvailable(name: string) {
    return Object.keys(state.Records).includes(name);
  }

  async function handleSearch(name: string) {}

  async function handeUndernamePurchase() {}

  async function handleInput({
    key,
    value,
  }: {
    key: keyof FormInputs;
    value: string;
  }) {
    setFormState({ ...formState, [key]: value });
  }

  return (
    <div className="flex flex-col gap-8 rounded-lg border-2 border-matrix bg-foreground p-4">
      <InlineInput
        title="Buy an undername"
        value={undername}
        setValue={(m) => handleSearch(m)}
        classes="bg-[rgb(0,0,0,0.5)] text-secondary"
        placeholder="Enter the undername you want to lease"
      />

      <div>
        <div className="flex flex-col gap-2">
          <InlineInput
            title={'Target ID (transaction ID of your data)'}
            value={formState.targetID}
            setValue={(m) => handleInput({ key: 'targetID', value: m })}
            classes="bg-[rgb(0,0,0,0.5)] text-secondary"
            placeholder="Enter the transaction ID you want your undername to point to"
            disabled={isAvailable(undername)}
          />

          <InlineInput
            title={'TTL Seconds (Time To Live)'}
            value={formState.ttl}
            setValue={(m) => handleInput({ key: 'ttl', value: m })}
            classes="bg-[rgb(0,0,0,0.5)] text-secondary"
            placeholder="Enter the amount of time you want your data to be cached in-browser"
            disabled={isAvailable(undername)}
          />
          <InlineInput
            title={'UnderANT ID'}
            value={formState.underAntId}
            setValue={(m) => handleInput({ key: 'underAntId', value: m })}
            classes="bg-[rgb(0,0,0,0.5)] text-secondary"
            placeholder="Enter the ID of your undername ANT process"
            disabled={isAvailable(undername)}
          />
        </div>

        <div className="flex flex-row justify-end gap-2">
          <button
            className="mt-2 rounded-lg bg-primary p-1 text-foreground"
            onClick={handeUndernamePurchase}
          >
            Lease
          </button>
          <button
            className="mt-2 rounded-lg bg-secondary p-1 text-foreground"
            onClick={reset}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeaseUndernameForm;
