import { GeoSearchControl, MapBoxProvider } from 'leaflet-geosearch';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

const SearchField = () => {
  const provider = new OpenStreetMapProvider();

  // @ts-ignore
  const searchControl = new GeoSearchControl({
    provider: provider,
  });

  const map = useMap();
  useEffect(() => {
    map.addControl(searchControl);
    return () => map.removeControl(searchControl) as any;
  }, []);

  return null;
};

export default SearchField;