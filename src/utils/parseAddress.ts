import cityList from '../../public/DiaGioiHanhChinhVN.json' assert { type: 'json' };
import map from '../../public/DiaGioiHanhChinhHN&HCM.json' assert { type: 'json' };

export function parseAddressId({
  city_id,
  district_id,
  ward_id
}: {
  city_id: string,
  district_id: string,
  ward_id: string,
}) {
  const city = cityList.find((city: any) => city.Id === city_id)
  const district = city?.Districts.find((district: any) => district.Id === district_id)
  const ward = district?.Wards.find((ward: any) => ward.Id === ward_id) as any

  return ward?.Name + ', ' + district?.Name + ', ' + city?.Name
}

export function parseAddressIdSingle(id?: string) {
  if (!id) return ''
  return map.find((item) => item.id === id)?.label || ''
}