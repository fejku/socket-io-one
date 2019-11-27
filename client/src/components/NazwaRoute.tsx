import React from "react";
import { Redirect, Route } from "react-router-dom";

interface INazwaRouteProps {
  exact: boolean;
  path: string;
}

const NazwaRoute: React.FC<INazwaRouteProps> = ({ children, ...rest }) => {
  const nazwa = sessionStorage.getItem("nazwa uzytkownika");

  return (
    <Route
      {...rest}
      render={({location}) => nazwa ? children : <Redirect to={{
        pathname: "/nazwa",
        state: {from: location},
      }} />
      }
    />
  );
};

export default NazwaRoute;
