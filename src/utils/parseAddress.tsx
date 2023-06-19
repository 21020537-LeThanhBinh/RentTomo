import map from '../../public/DiaGioiHanhChinhHN&HCM.json' assert { type: 'json' };

export function parseAddressId(address_id: {
  city_id?: string,
  district_id?: string,
  ward_id?: string,
}) {
  if (address_id?.ward_id) return map.find((item) => item.id === address_id?.ward_id)?.label
  if (address_id?.ward_id) return map.find((item) => item.id === address_id?.ward_id)?.label
  if (address_id?.ward_id) return map.find((item) => item.id === address_id?.ward_id)?.label
  return ''
}

export function parseAddressIdSingle(id?: string) {
  if (id) return map.find((item) => item.id === id)?.label
  return ''
}