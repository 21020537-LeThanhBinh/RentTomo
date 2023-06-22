'use client';

import { IconType } from 'react-icons';
import Select from 'react-select';

export type SelectValue = {
  label?: string;
  value?: string;
  icon?: IconType;
}

interface SelectProps {
  value?: SelectValue;
  onChange: (value: SelectValue) => void;
  options?: SelectValue[];
  placeholder?: string;
  isClearable?: boolean;
  alwaysClosed?: boolean;
  tabIndex?: number;
  required?: boolean;
}

const ItemSelect: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder,
  isClearable = true,
  alwaysClosed = false,
  tabIndex,
  required = false
}) => {
  return (
    <div>
      <Select
        tabIndex={tabIndex}
        placeholder={placeholder}
        isClearable={isClearable}
        options={options}
        value={value?.label && value}
        onChange={onChange}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            {option?.icon && option?.icon()}
            <div>
              {option?.label}
            </div>
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
        menuIsOpen={alwaysClosed ? false : undefined}
        required={required}
      />
    </div>
  );
}

export default ItemSelect;