function InlineInput({
  title,
  value,
  setValue,
  classes = '',
  placeholder = '',
  disabled = false,
}: {
  title?: string;
  value: string;
  setValue: (value: string) => void;
  classes?: string;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      {title && <span className="text-sm text-primary">{title}</span>}
      <input
        className={
          'bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white block w-full rounded-lg border p-2.5 text-sm focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary ' +
          classes
        }
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
}

export default InlineInput;
