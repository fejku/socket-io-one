import React from "react";
import { Redirect, Route } from "react-router-dom";

interface INazwaRoute {
  exact: boolean;
  path: string;
}

const NazwaRoute: React.FC<INazwaRoute> = ({ children, ...rest }) => {
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
