import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useParams,
} from 'react-router-dom';

import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import AppLayout from './pages/AppLayout';
import PageNotFound from './pages/PageNotFound';
import Homepage from './pages/Homepage';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import Form from './components/Form';
import City from './components/City';
import {CitiesProvider} from './context/CitiesContext';

const BASE_URL = 'http://localhost:8000';
function App() {
  

  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          {/*index can be placed with path="/" in homepage route.*/}
          <Route index element={<Homepage />} />
          <Route path='product' element={<Product />} />
          <Route path='pricing' element={<Pricing />} />
          <Route path='login' element={<Login />} />
          <Route path='app' element={<AppLayout />}>
            <Route index element={<Navigate replace to='cities' />} />
            <Route
              path='cities'
              element={<CityList />}
            />
            <Route path='cities/:id' element={<City />} />
            <Route
              path='countries'
              element={<CountryList />}
            />
            <Route path='form' element={<Form />} />
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;
