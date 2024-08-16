import { formOptions, useForm } from '@tanstack/react-form';

export const formOpts = formOptions<any>({
  defaultValues: {
    undername: '',
    purchaseType: '',
    underAntId: '',
    tokenId: '',
  },
});

function PurchaseUndernameForm({
  settings,
  submit,
}: {
  settings: any;
  submit: (obj: any) => void;
}) {
  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      submit(value);
    },
  });
  return (
    <div className="flex w-full flex-col gap-2">
      <form.Field
        name="undername"
        children={(field) => (
          <>
            <input
              className="flex w-full rounded-md bg-[rgb(0,0,0,0.7)] p-2 text-primary"
              placeholder="Enter an undername"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </>
        )}
      />
      <form.Field
        name="underAntId"
        children={(field) => (
          <>
            <input
              className="flex w-full rounded-md bg-[rgb(0,0,0,0.7)] p-2 text-primary"
              placeholder="Add the process ID of your ANT"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </>
        )}
      />
      {/* <form.Field
        name="Purchase Type"
        children={(field) => (
          <>
            <select
              className="rounded-md bg-[rgb(0,0,0,0.7)] p-2"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              defaultValue={'buy'}
            >
              <option>Buy</option>
            </select>
          </>
        )}
      /> */}
      {/* <form.Field
        name="Token ID"
        children={(field) => (
          <>
            <span>{field.name}</span>
            <select
              className="rounded-md bg-[rgb(0,0,0,0.7)] p-2"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            >
              <option>IO</option>
            </select>
          </>
        )}
      /> */}
      <form.Field
        name="Submit"
        children={(field) => (
          <>
            <button
              onClick={() => {
                field.form.handleSubmit();
              }}
              className=" bg-primaryThin text-black border-black flex w-full flex-row items-center justify-center rounded-md p-2 hover:bg-primary"
            >
              Buy
            </button>
          </>
        )}
      />
    </div>
  );
}

export default PurchaseUndernameForm;
