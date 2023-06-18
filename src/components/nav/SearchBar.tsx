'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { BiCurrentLocation, BiSearch } from 'react-icons/bi';
import { MdOutlineLocationSearching } from 'react-icons/md';
import Select from 'react-select';

export default function SearchBar() {
  const params = useSearchParams();

  const locationValue = params?.get('locationValue');
  const router = useRouter();

  const [searchType, setSearchType] = useState<string>("Khu vực");
  const [locationLabel, setLocationLabel] = useState<string>("");

  return (
    <div onClick={() => { router.push("/search") }} className="flex-1 border-[1px] w-[248px] sm:w-[306px] md:w-[254px] lg:w-[367px] relative py-2 rounded-full">
      <div className="flex items-center justify-between">
        <Select
          options={[
            { label: 'Khu vực', value: 'Khu vực', icon: MdOutlineLocationSearching },
            { label: 'Lân cận', value: 'Lân cận', icon: BiCurrentLocation }
          ]}
          value={{ label: searchType }}
          isSearchable={false}
          onChange={(value: any) => setSearchType(value?.label)}
          formatOptionLabel={(option: any) => (
            <div className="flex flex-row items-center gap-3">
              {option?.icon?.()}
              <div>
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
          }}
          className='flex-shrink-0 pl-6 pr-2 text-sm font-semibold border-r-[1px]'
        />

        <Select
          options={[]}
          value={locationLabel && { label: locationLabel }}
          onChange={(value: any) => setLocationLabel(value?.label)}
          isClearable
          placeholder={searchType === 'Khu vực' ? 'Nhập tên đường, quận, ...' : 'Nhập địa điểm chính xác'}
          formatOptionLabel={(option: any) => (
            <div className="flex flex-row items-center gap-3">
              {option?.icon && option?.icon()}
              <div>
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
              cursor: 'text',
              // width: '224px',
            }),
            dropdownIndicator: (baseStyles, state) => ({
              ...baseStyles,
              width: 0,
              padding: 0,
            }),
            indicatorSeparator: (baseStyles, state) => ({
              ...baseStyles,
              width: 0,
            }),
            valueContainer: (baseStyles, state) => ({
              ...baseStyles,
              paddingRight: 0,
              maxWidth: '100%',
              // whiteSpace: 'nowrap',
              // overflow: 'hidden',
              // textOverflow: 'ellipsis',
            }),
          }}
          className='flex-1 pl-2 pr-12 text-sm overflow-hidden whitespace-nowrap'
        />

        <div className='absolute right-2'>
          <button className="p-2 bg-yellow-400 rounded-full text-white">
            <BiSearch size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}