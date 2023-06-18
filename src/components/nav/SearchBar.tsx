'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiCurrentLocation, BiSearch } from 'react-icons/bi';
import { MdOutlineLocationSearching } from 'react-icons/md';
import Select from 'react-select';
import map from '../../../public/DiaGioiHanhChinhHN&HCM.json' assert { type: 'json' };
import MenuList from '../../utils/MenuList';
import { createQueryString, deleteQueryString } from '@/utils/queryString';

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams();

  const [searchType, setSearchType] = useState<string>("Khu vực");
  const [locationLabel, setLocationLabel] = useState<string>(searchParams?.get('location') || "");

  const onSearch = () => {
    if (!locationLabel)
      router.push('/search?' + deleteQueryString(searchParams, 'location'))
    else
      router.push('/search?' + createQueryString(searchParams, 'location', locationLabel))
  }

  useEffect(() => {
    if (locationLabel === (searchParams?.get('location') || "")) return

    onSearch()
  }, [locationLabel]);

  return (
    <div className="flex-1 border-[1px] w-[248px] sm:w-[306px] md:w-[254px] lg:w-[367px] relative py-2 rounded-full">
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
          options={map}
          value={locationLabel && { label: locationLabel }}
          onChange={(value: any) => setLocationLabel(value?.label)}
          isClearable
          placeholder={searchType === 'Khu vực' ? 'Nhập tên phường, quận, ...' : 'Nhập địa điểm chính xác'}
          components={{ MenuList }}
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
          className='flex-1 pl-2 pr-12 text-sm whitespace-nowrap'
        />

        <div className='absolute right-2'>
          <button onClick={onSearch} className="p-2 bg-yellow-400 rounded-full text-white">
            <BiSearch size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}