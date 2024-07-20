import { useSearchParams } from 'react-router-dom';

function useUrlPosition() {
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  let lat = searchParams.get('lat');
  let lng = searchParams.get('lng');
  // console.log(lat);
  return [lat, lng];
}

export { useUrlPosition };
