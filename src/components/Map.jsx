import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';
export default function Map() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  let lat = searchParams.get('lat');
  let lng = searchParams.get('lng');

  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate('form');
      }}
    >
      {lat && (
        <p>
          Position: {lat}, {lng}
        </p>
      )}
      <button
        onClick={() => {
          setSearchParams({ lat: 23, lng: 50 });
        }}
      >
        Change position
      </button>
    </div>
  );
}
