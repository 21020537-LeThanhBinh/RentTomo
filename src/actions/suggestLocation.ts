import { supabase } from "@/supabase/supabase-app";
import { parseAddressId } from "@/utils/parseAddress";
import { toTitleCase } from "@/utils/toTitleCase";
import schools from '../../public/DaiHocCaoDangVNFull.json' assert { type: 'json' };
import map from '../../public/DiaGioiHanhChinhHN&HCM.json' assert { type: 'json' };

async function suggestLocation(query: string) {
  const { data, error } = await supabase
    .from('posts_members')
    .select('address_id, address')
    .textSearch('address', `${query}`, {
      type: 'websearch',
      config: 'english',
    })

  if (!error && data) {
    return data
  } else {
    console.log(error)
    return []
  }
}

function uniq(a: any[]) {
  var seen = {} as any;
  return a.filter(function (item: any) {
    return seen.hasOwnProperty(item.value) ? false : (seen[item.value] = true);
  });
}

const _loadLocationSuggestions = (query: any, callback: any) => {
  const res = map.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()));
  if (res.length > 0) return callback(res);

  // console.log(query)
  suggestLocation(query)
    .then(resp => callback(uniq(resp
      .map(data => {
        const address = data.address.split(', ')
        const options = [] as any[]

        for (let i = 0; i < address.length; i++) {
          const thisAddress = toTitleCase([address[i], ...address.slice(i + 1)].join(', '))
          options.push({
            label: thisAddress + ', ' + parseAddressId(data.address_id).replace(/Thành phố/g, ''),
            value: thisAddress + ', ' + parseAddressId(data.address_id).replace(/Thành phố/g, ''),
            id: data.address_id.ward_id,
            level: 2,
          })
        }

        return options
      })
      .flat()
    )))
};

const _loadSchoolSuggestions = (query: any, callback: any) => {
  const res = schools
    .map((school) => {
      return { label: school.Name, value: school.Name, id: school.Id, lng: school.lng, lat: school.lat }
    })
    .filter((i) => i.label.toLowerCase().includes(query.toLowerCase()));

  return callback(res);
};

export { _loadLocationSuggestions, _loadSchoolSuggestions };

