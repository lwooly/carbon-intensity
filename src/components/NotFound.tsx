import { NavLink } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <h1>Page not found</h1>
      <NavLink to="/">Return to home</NavLink>
    </>
  );
}

export default NotFound;
