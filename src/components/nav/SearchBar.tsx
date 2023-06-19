'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiCurrentLocation, BiSearch } from 'react-icons/bi';
import { MdOutlineLocationSearching } from 'react-icons/md';
import Select from 'react-select';
import map from '../../../public/DiaGioiHanhChinhHN&HCM.json' assert { type: 'json' };
import MenuList from '../../utils/MenuList';
import { parseAddressIdSingle } from '@/utils/parseAddress';

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams();

  const [searchType, setSearchType] = useState<string>("Khu vực");
  const [locationId, setLocationId] = useState<string>(searchParams?.get('location_id') || "");
  const [level, setLevel] = useState<number>(0);

  const onSearch = () => {
    const params = new URLSearchParams(searchParams as any)

    if (!locationId) {
      params.delete("location_id")
      params.delete("level")
    }
    else {
      params.set('location_id', locationId)
      params.set('level', level.toString())
    }
    
    router.push('/search?' + params.toString())
  }

  useEffect(() => {
    if (locationId === (searchParams?.get('location_id') || "")) return

    onSearch()
  }, [locationId]);

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
            dropdownIndicator: (baseStyles, state) => ({
              ...baseStyles,
              paddingLeft: 0,
            }),
          }}
          className='flex-shrink-0 pl-6 pr-2 text-sm font-semibold border-r-[1px]'
        />

        <Select
          options={map}
          value={locationId && { label: parseAddressIdSingle(locationId) }}
          onChange={(value: any) => { setLocationId(value?.id); setLevel(value?.level) }}
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
          className='flex-1 pl-2 pr-12 text-sm whitespace-nowrap overflow-x-clip'
        />

        <div className='absolute right-2'>
          <button onClick={onSearch} className="p-2 bg-sky-500 rounded-full text-white">
            <BiSearch size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}