interface CodeInputProps {
  id: string;
  prevId: string;
  nextId: string;
  value: string;
  onChange: (value: string) => void;
  isValid: boolean | undefined;
}

export const CodeInput: React.FC<CodeInputProps> = ({
  id,
  prevId,
  nextId,
  value,
  onChange,
  isValid,
}) => {
  const handleKeyUp: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    const inputValue = event.currentTarget.value;

    if (inputValue.length === 0) {
      document.getElementById(prevId)?.focus();
    } else {
      document.getElementById(nextId)?.focus();
    }
    onChange(inputValue);
  };

  return (
    <div>
      <label htmlFor={id} className="sr-only">{`${id} code`}</label>
      <input
        placeholder="0"
        type="text"
        maxLength={1}
        value={value}
        onKeyUp={handleKeyUp}
        onChange={(e) => onChange(e.currentTarget.value)}
        id={id}
        className={`block w-16 h-16 max-md:w-12 max-md:h-12 max-md:flex py-3 text-sm font-extrabold text-center text-black bg-white border ${
          isValid === true ? 'border-[#12B76A] bg-[#d4f1e2] text-[#12B76A]' : isValid === false ? 'border-[#F04438] bg-[#fae0de] text-[#F04438] ' : ''
        } rounded-lg  focus:ring-black focus:border-black`}
        required
      />
    </div>
  );
};
