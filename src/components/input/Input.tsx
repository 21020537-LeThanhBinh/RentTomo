'use client';

import { FocusEventHandler } from "react";
import { TbCurrencyDong } from "react-icons/tb";
import TextareaAutosize from "react-textarea-autosize";

interface InputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  onClick?: () => void;
  onBlur?: FocusEventHandler<any>;
  multiline?: boolean;
  autoFocus?: boolean;
  maxLength?: number;
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
  onClick,
  onBlur,
  multiline,
  autoFocus,
  maxLength
}) => {
  const className = `
    peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition 
    disabled:opacity-70 disabled:cursor-not-allowed 
    ${formatPrice ? 'pl-9' : 'pl-4'}
  `

  const Label = () => {
    return (
      <label
        htmlFor={id}
        className={`
          absolute text-md duration-150 transform -translate-y-3 top-5 origin-[0] whitespace-nowrap
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
    )
  }

  return (
    <div className="w-full relative">
      {formatPrice && (
        <TbCurrencyDong size={24} className="text-neutral-700 absolute top-5 left-2" />
      )}
      {multiline ? (
        <TextareaAutosize
          onClick={onClick}
          onChange={(e) => onChange(e.target.value)}
          value={value}
          id={id}
          disabled={disabled}
          required={required}
          placeholder=" "
          onBlur={onBlur}
          className={className}
          minRows={3}
          autoFocus={autoFocus}
          maxLength={maxLength}
        />
      ) : (
        <input
          onClick={onClick}
          onChange={(e) => onChange(e.target.value)}
          value={value}
          id={id}
          disabled={disabled}
          required={required}
          placeholder=" "
          type={type}
          onBlur={onBlur}
          autoFocus={autoFocus}
          className={className}
          maxLength={maxLength}
        />
      )}
      <Label />
    </div>
  );
}

export default Input;