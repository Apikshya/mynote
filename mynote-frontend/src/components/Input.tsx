interface InputProps {
  placeholder: string;
  ref?: any;
}

export function Input({ placeholder, ref }: InputProps) {
  return (
    <div>
      <input
        ref={ref}
        placeholder={placeholder}
        type={"text"}
        spellCheck={false}
        className=" px-4 py-3 border-1 rounded my-4 bg-white/30 placeholder-gray-700 w-full "
      />
    </div>
  );
}
