import full_map from '../../public/DiaGioiHanhChinhVN.json' assert { type: 'json' };

export default function editDiaGioiHanhChinhVN() {
  const result = [] as any

  full_map
    // .filter((item: any) => item.Name === "Thành phố Hà Nội" || item.Name === "Thành phố Hồ Chí Minh")
    .forEach((city: any) => {
      const label = city.Name;
      result.push({ label: label, value: label.toLowerCase(), id: city.Id, level: 0 })

      city.Districts.forEach((district: any) => {
        const label = district.Name + ', ' + city.Name;
        result.push({ label: label, value: label.toLowerCase(), id: district.Id, level: 1 })

        district.Wards.forEach((ward: any) => {
          const label = ward.Name + ', ' + district.Name + ', ' + city.Name;
          result.push({ label: label, value: label.toLowerCase(), id: ward.Id, level: 2 })
        })
      })
    })

  console.log(JSON.stringify(result))
}