'use client'

import { BiCurrentLocation, BiSearch } from 'react-icons/bi';
import { MdOutlineLocationSearching } from 'react-icons/md';
import Select from 'react-select';

export default function SearchBarFallback() {
  return (
    <div className="flex-1 border-[1px] w-[248px] sm:w-[306px] md:w-[254px] lg:w-[500px] relative py-1 rounded-full bg-white flex items-center">
      <div className="w-full flex items-center justify-between">
        <Select
          options={[
            { label: 'Khu vực', value: 'khu vực', icon: MdOutlineLocationSearching },
            { label: 'Gần trường', value: 'gần trường', icon: BiCurrentLocation }
          ]}
          value={{ label: 'Khu vực' }}
          isSearchable={false}
          onChange={() => { }}
          formatOptionLabel={(option: any) => (
            <div className="flex flex-row items-center gap-2 w-[77px]">
              {option?.icon && (
                <div className='flex-shrink-0'>
                  {option.icon?.()}
                </div>
              )}
              <div className='whitespace-nowrap'>
                {option?.label}
              </div>
            </div>
          )}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: 'black',
              primary25: '#ffe4e6'
            }
          })}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              border: 0,
              boxShadow: 'none',
              padding: 0,
              cursor: 'pointer',
            }),
            valueContainer: (baseStyles, state) => ({
              ...baseStyles,
              padding: 0,
            }),
            indicatorSeparator: (baseStyles, state) => ({
              ...baseStyles,
              width: 0,
            }),
            dropdownIndicator: (baseStyles, state) => ({
              ...baseStyles,
              paddingLeft: 0,
            }),
          }}
          className='flex-shrink-0 pl-4 text-sm font-semibold border-r-[1px]'
        />

        <Select
          options={[]}
          value={null}
          onChange={() => {}}
          isClearable
          placeholder={'Tìm kiếm theo phường, quận, ...'}
          aria-label='Nhập từ khóa tìm kiếm'
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: 'black',
              primary25: '#ffe4e6'
            }
          })}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              border: 0,
              boxShadow: 'none',
              padding: 0,
              cursor: 'text',
            }),
            dropdownIndicator: (baseStyles, state) => ({
              ...baseStyles,
              width: 0,
              padding: 0,
            }),
            indicatorsContainer: (baseStyles, state) => ({
              ...baseStyles,
              cursor: 'pointer',
            }),
            indicatorSeparator: (baseStyles, state) => ({
              ...baseStyles,
              width: 0,
            }),
            valueContainer: (baseStyles, state) => ({
              ...baseStyles,
              paddingRight: 0,
              maxWidth: '100%',
            }),
          }}
          className='flex-1 pr-12 text-sm whitespace-nowrap overflow-x-clip'
        />

        <div className='absolute right-2'>
          <button aria-label='Tìm kiếm' className="p-2 bg-sky-500 rounded-full text-white">
            <BiSearch size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}