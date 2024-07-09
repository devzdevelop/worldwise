import CityItem from './CityItem';
import styles from './CityList.module.css';
import Spinner from './Spinner';
export default function CityList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  return (
    <div className={styles.cityList}>
      <ul>
        {cities.map((item) => {
          return <CityItem key={item.cityName} city={item} />;
        })}
      </ul>
    </div>
  );
}
