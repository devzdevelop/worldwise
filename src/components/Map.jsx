import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { useCities } from '../context/CitiesContext';
export default function Map() {
  const navigate = useNavigate();
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);

  const [searchParams, setSearchParams] = useSearchParams();
  let lat = searchParams.get('lat');
  let lng = searchParams.get('lng');

  console.log('searchParams: ', searchParams.get('lat'));
  useEffect(() => {
    lat && lng && setMapPosition([Number(lat), Number(lng)]);
  }, [lat, lng]);

  console.log('mapPosition: ', mapPosition);

  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate('form');
      }}
    >
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.fr/hot//{z}/{x}/{y}.png'
        />
        {cities.map((city) => (
          <div key={city.id}>
            <Marker position={[city.position.lat, city.position.lng]}>
              <Popup>
                <span>{city.emoji}</span>
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
          </div>
        ))}
      </MapContainer>
    </div>
  );
}
