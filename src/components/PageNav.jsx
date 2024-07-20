import { NavLink } from 'react-router-dom';
import styles from './PageNav.module.css';
import Logo from './Logo';
import { useAuthContext } from '../context/FakeAuthContext';

export default function PageNav() {
  const { isAuthenticated, logout } = useAuthContext();

  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to='/pricing'>Pricing</NavLink>
        </li>
        <li>
          <NavLink to='/product'>Product</NavLink>
        </li>
        {isAuthenticated === false ? (
          <li>
            <NavLink to='/login' className={styles.ctaLink}>
              Login
            </NavLink>
          </li>
        ) : (
          <li>
            <NavLink to='/' className={styles.ctaLink} onClick={() => logout()}>
              logout
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
