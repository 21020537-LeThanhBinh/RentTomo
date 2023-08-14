import cityList from '../../public/DiaGioiHanhChinhVN.json' assert { type: 'json' };

export function parseAddressId({
  city_id,
  district_id,
  ward_id
}: {
  city_id?: string,
  district_id?: string,
  ward_id?: string,
}) {
  const city = cityList?.find((city: any) => city.Id === city_id) as any
  const district = city?.Districts.find((district: any) => district.Id === district_id)
  const ward = district?.Wards.find((ward: any) => ward.Id === ward_id) as any

  return ward?.Name + ', ' + district?.Name + ', ' + city?.Name
}

export function parseAddressIdSingle(id?: string) {
  if (!id) return ''
  
  for (let i = 0; i < cityList.length; i++) {
    const city = cityList[i]
    if (city.Id === id) return city.Name

    for (let j = 0; j < city.Districts.length; j++) {
      const district = city.Districts[j]
      if (district.Id === id) return district.Name

      for (let k = 0; k < district.Wards.length; k++) {
        const ward = district.Wards[k]
        if (ward.Id === id) return ward.Name
      }
    }
  }

  return ''
}