import { useState } from 'react';

function FloatingLabelInput({ label, id, ...props },ref) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative border border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-500">
      <label
        htmlFor={id}
        className={`absolute top-0 left-0 px-1 text-gray-500 transform -translate-y-1/2 scale-75 transition-all duration-200 ${
          focused || props.value ? 'text-blue-500' : ''
        }`}
      >
        {label}
      </label>
      <input
        id={id}
        {...props}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        ref={ref}
        className="w-full bg-transparent focus:outline-none"
      />
    </div>
  );
}

export default FloatingLabelInput;
