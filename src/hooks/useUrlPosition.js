import { useSearchParams } from 'react-router-dom';

function useUrlPosition() {
  const [searchParams, setSearchParams] = useSearchParams();
  let lat = searchParams.get('lat');
  let lng = searchParams.get('lng');
  // console.log(lat);
  return [lat, lng];
}

export { useUrlPosition };
