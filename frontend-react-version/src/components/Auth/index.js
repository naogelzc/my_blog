import { Navigate, useLocation } from "react-router-dom";
export default function Auth(props) {
  const { children } = props;
  const isLoggedIn = true;
  const location = useLocation();
  return isLoggedIn ? (
    <>{children}</>
  ) : (
    <Navigate
      replace={true}
      to="/404"
      state={{ from: `${location.pathname}${location.search}` }}
    />
  );
}
