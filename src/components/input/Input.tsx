'use client';

import { TbCurrencyDong } from "react-icons/tb";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  onChange: (value: string) => void;
  value: string;
  onClick?: () => void;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  required,
  onChange,
  value,
  onClick
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <TbCurrencyDong size={24} className="text-neutral-700 absolute top-5 left-2" />
      )}
      <input
        onClick={onClick}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        id={id} 
        disabled={disabled}
        required={required}
        placeholder=" "
        type={type}
        className={`
          peer
          w-full
          p-4
          pt-6 
          font-light 
          bg-white 
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? 'pl-9' : 'pl-4'}
        `}
      />
      <label
        htmlFor={id}
        className={`
          absolute 
          text-md
          duration-150 
          transform 
          -translate-y-3 
          top-5 
          origin-[0] 
          ${formatPrice ? 'left-9' : 'left-4'}
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
          hover:cursor-text
        `}
      >
        {label}
      </label>
    </div>
  );
}

export default Input;