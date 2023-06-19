import map from '../../public/DiaGioiHanhChinhHN&HCM.json' assert { type: 'json' };

export function parseAddressId({
  city_id,
  district_id,
  ward_id,
}: {
  city_id?: string,
  district_id?: string,
  ward_id?: string,
}) {
  if (ward_id) return map.find((item) => item.id === ward_id)?.label
  if (district_id) return map.find((item) => item.id === district_id)?.label
  if (city_id) return map.find((item) => item.id === city_id)?.label
  return ''
}

export function parseAddressIdSingle(id?: string) {
  if (id) return map.find((item) => item.id === id)?.label
  return ''
}