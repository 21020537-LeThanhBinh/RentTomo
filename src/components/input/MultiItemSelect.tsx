'use client';

import { IconType } from 'react-icons';
import CreatableSelect from 'react-select/creatable';

export type MultiSelectValue = {
  label?: string;
  value?: string;
  icon?: IconType;
}

interface MultiSelectProps {
  value?: MultiSelectValue[];
  onChange: (value: MultiSelectValue[]) => void;
  options: MultiSelectValue[];
  placeholder?: string;
  hasSelectAll?: boolean;
}

const MultiItemSelect: React.FC<MultiSelectProps> = ({
  value,
  onChange,
  options,
  placeholder,
  hasSelectAll = false
}) => {
  const selectAllOption = {
    value: "<SELECT_ALL>",
    label: "Chọn tất cả"
  };

  const getOptions = () => {
    if (!hasSelectAll || value?.length) return options;
    return [selectAllOption, ...options];
  }

  return (
    <div>
      <CreatableSelect
        placeholder={placeholder}
        options={getOptions()}
        value={value?.length && value}
        onChange={(newValue, actionMeta) => { 
          const { action, option, removedValue } = actionMeta;

          if (action === "select-option" && option.value === selectAllOption.value) {
            onChange(options as MultiSelectValue[])
          } else {
            onChange(newValue as MultiSelectValue[])
          }
        }}
        instanceId="multi-select"
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
        isClearable
        isMulti
        closeMenuOnSelect={false}
      />
    </div>
  );
}

export default MultiItemSelect;