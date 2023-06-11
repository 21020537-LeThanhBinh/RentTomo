'use client';

import { IconType } from 'react-icons';
import Select from 'react-select'

export type MultiSelectValue = {
  label?: string;
  value?: string;
  icon?: IconType;
}

interface MultiSelectProps {
  value?: MultiSelectValue[];
  onChange: (value: MultiSelectValue) => void;
  options: MultiSelectValue[];
  placeholder?: string;
}

const MultiItemSelect: React.FC<MultiSelectProps> = ({
  value,
  onChange,
  options,
  placeholder,
}) => {
  return (
    <div>
      <Select
        placeholder={placeholder}
        isClearable
        options={options}
        value={value?.length && value}
        onChange={(value) => onChange(value as MultiSelectValue)}
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
        isMulti
      />
    </div>
  );
}

export default MultiItemSelect;