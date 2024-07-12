const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

import { useEffect, useState } from 'react';

import styles from './Form.module.css';
import Button from './Button';
import BackButton from './BackButton';
import { useUrlPosition } from '../hooks/useUrlPosition';

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [mapLat, mapLng] = useUrlPosition();

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);

  useEffect(() => {
    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true);
        const res = await fetch(
          `${BASE_URL}?latitude=${mapLat}&longitude=${mapLng}`,
        );
        const data = await res.json();
        // console.log('Lat: ', mapLat, 'Lng: ', mapLng);
        // console.log(data);
        setCityName(data.city);
      } catch (e) {
        console.log('error fetching data: ', e);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchCityData();
  }, [mapLat, mapLng]);

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor='cityName'>City name</label>
        <input
          id='cityName'
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor='date'>When did you go to {cityName}?</label>
        <input
          id='date'
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor='notes'>Notes about your trip to {cityName}</label>
        <textarea
          id='notes'
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
