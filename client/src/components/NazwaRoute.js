import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const NazwaRoute = ({ children, ...rest }) => {
  const nazwa = sessionStorage.getItem('nazwa uzytkownika');

  return (
    <Route 
      {...rest}
      render={({location}) => {
        if (nazwa)
          return children
        else
          return <Redirect to={{
            pathname: "/nazwa",
            state: {from: location}
          }} /> 
      }
      }
    />
  )
}

export default NazwaRoute;