'use client';

import Select from 'react-select'

export type SelectValue = {
  label?: string;
  value?: string
}

interface SelectProps {
  value?: SelectValue;
  onChange: (value: SelectValue) => void;
  options: SelectValue[];
  placeholder?: string;
}

const ItemSelect: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder
}) => {
  return (
    <div>
      <Select
        placeholder={placeholder}
        isClearable
        options={options}
        value={value?.value && value}
        onChange={(value) => onChange(value as SelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            {option?.label}
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg'
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6'
          }
        })}
      />
    </div>
  );
}

export default ItemSelect;