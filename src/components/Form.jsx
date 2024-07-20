const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import styles from './Form.module.css';
import Button from './Button';
import BackButton from './BackButton';
import Message from './Message';
import Spinner from './Spinner';
import { useUrlPosition } from '../hooks/useUrlPosition';
import { useCities } from '../context/CitiesContext';
import { useNavigate } from 'react-router-dom';

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
  const [emoji, setEmoji] = useState('');
  const [geocodingError, setGeocodingError] = useState('');
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError(false);
        const res = await fetch(
          `${BASE_URL}?latitude=${mapLat}&longitude=${mapLng}`,
        );
        const data = await res.json();
        // console.log(data);
        if (!data.countryCode)
          throw new Error(
            "That doesn't seem to be a city, Please select something else. 🙂",
          );
        setCityName(data.city || data.locality || '');
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
        // console.log(emoji);
      } catch (e) {
        setGeocodingError(e.message);
        console.log('error fetching data: ', e);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    if (!mapLat && !mapLat) return;
    fetchCityData();
  }, [emoji, mapLat, mapLng]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      date,
      notes,
      emoji,
      position: { lat: mapLat, lng: mapLng },
    };
    console.log(newCity);
    await createCity(newCity);

    navigate('/app/cities');
  }

  if (isLoadingGeocoding) return <Spinner />;

  if (!mapLat && !mapLng)
    return <Message message='Start by clicking somewhere on the map.' />;

  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ''}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor='cityName'>City name</label>
        <input
          id='cityName'
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor='date'>When did you go to {cityName}?</label>
        <DatePicker
          id='date'
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat='dd/MM/yyyy'
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
