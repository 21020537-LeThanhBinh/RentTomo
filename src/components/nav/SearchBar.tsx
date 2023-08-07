'use client';

import { _loadLocationSuggestions, _loadSchoolSuggestions } from '@/actions/suggestLocation';
import { event } from "@/lib/ga";
import { parseAddressIdSingle } from '@/utils/parseAddress';
import debounce from 'lodash.debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiCurrentLocation, BiSearch } from 'react-icons/bi';
import { MdOutlineLocationSearching } from 'react-icons/md';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import schools from '../../../public/DaiHocCaoDangVNFull.json' assert { type: 'json' };
import mapOptions from '../../../public/DiaGioiHanhChinhHN&HCM.json' assert { type: 'json' };
const schoolsOptions = schools.map((school) => {
  return { label: school.Name, value: school.Name, id: school.Id, lng: school.lng, lat: school.lat }
})

const loadLocationSuggestions = debounce(_loadLocationSuggestions, 1000);
const loadSchoolSuggestions = debounce(_loadSchoolSuggestions, 1000);

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams();

  const [searchType, setSearchType] = useState<string>(searchParams?.get('lng') ? "Gần trường" : "Khu vực");
  const [locationId, setLocationId] = useState<string>(searchParams?.get('location_id') || "");
  const [level, setLevel] = useState<number>(0);

  const [lng, setLng] = useState<number>(parseFloat(searchParams?.get('lng') || '0'));
  const [lat, setLat] = useState<number>(parseFloat(searchParams?.get('lat') || '0'));

  const [inputValue, setInputValue] = useState(searchParams.get('q') || "");

  const onSearch = () => {
    const params = new URLSearchParams(searchParams as any)

    if (!locationId) {
      params.delete("location_id")
      params.delete("level")
    } else {
      params.set('location_id', locationId)
      params.set('level', level.toString())

      event({
        action: 'search_area',
        params: {
          location_id: locationId,
          level: level.toString()
        }
      })
    }

    if (!lng || !lat) {
      params.delete("lng")
      params.delete("lat")
      params.delete("range")
    } else {
      params.set('lng', lng.toString())
      params.set('lat', lat.toString())
      params.set('range', Math.max(schools.find(school => school.lat == lat && school.lng == lng)?.range || 0, 2000).toString())

      event({
        action: 'search_nearby',
        params: {
          lng: lng.toString(),
          lat: lat.toString()
        }
      })
    }

    if (!inputValue) {
      params.delete("q")
    } else {
      params.set('q', inputValue)
    }

    if (pathname == '/map') {
      router.push('/map?' + params.toString())
    } else if (pathname == '/my-listings') {
      params.set('page', '1')
      router.push('/my-listings?' + params.toString())
    } else {
      params.set('page', '1')
      router.push('/search?' + params.toString())
    }
  }

  const onChangeSearchType = (newType: string) => {
    setSearchType(newType)

    setLocationId("")
    setLng(0)
    setLat(0)
  }

  useEffect(() => {
    if (
      (locationId === (searchParams?.get('location_id') || "")) &&
      (lng?.toString() === (searchParams?.get('lng') || "0")) &&
      (lat?.toString() === (searchParams?.get('lat') || "0"))
    )
      return

    onSearch()
  }, [locationId, lng, lat]);

  return (
    <div className="flex-1 border-[1px] w-[248px] sm:w-[306px] md:w-[254px] lg:w-[500px] relative py-1 rounded-full bg-white flex items-center">
      <div className="w-full flex items-center justify-between">
        <Select
          options={[
            { label: 'Khu vực', value: 'khu vực', icon: MdOutlineLocationSearching },
            { label: 'Gần trường', value: 'gần trường', icon: BiCurrentLocation }
          ]}
          value={{ label: searchType }}
          isSearchable={false}
          onChange={(value: any) => onChangeSearchType(value?.label)}
          instanceId="select-search-type"
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

        <AsyncSelect
          cacheOptions
          defaultOptions={
            searchType === "Khu vực" ? mapOptions : schoolsOptions
          }
          loadOptions={searchType === "Khu vực" ? loadLocationSuggestions : loadSchoolSuggestions}
          value={
            inputValue ?
              { label: inputValue }
              // : locationId ?
              //   { label: parseAddressIdSingle(locationId) }
              //   : (lng && lat) ?
              //     { label: schools.find(school => school.lat == lat && school.lng == lng)?.Name }
              : null
          }
          onChange={(value: any) => {
            setInputValue(value?.label || "")

            if (searchType === 'Khu vực') {
              setLocationId(value?.id);
              setLevel(value?.level)
            } else {
              setLng(value?.lng);
              setLat(value?.lat);
            }
          }}
          isClearable
          placeholder={
            searchType === 'Khu vực' ?
              'Tìm kiếm theo phường, quận, ...'
              : 'Tìm kiếm theo trường đại học/ cao đẳng/ ...'
          }
          aria-label='Nhập từ khóa tìm kiếm'
          instanceId="select-search-location"
          // components={{ MenuList }}
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
          <button onClick={onSearch} aria-label='Tìm kiếm' className="p-2 bg-sky-500 rounded-full text-white">
            <BiSearch size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}