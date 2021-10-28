// react
import { createContext, useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// components
import { LoginForm, NavBarMovies, Logout, ProtectedRoute } from './Components';
import { ToastContainer } from 'react-toastify'; //error toaster
// pages
import { MoviesApp, Customers, Home, Products, Product, NotFound } from './Pages';
import { Rentals, MovieFormPage, CountersApp } from './Pages';
// functions
import userService from './services/userServices';
// css
import 'react-toastify/dist/ReactToastify.css'; //error toaster
import './Styles/bootstrap.min.css';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

export const userContext = createContext();

function App() {
  const userState = useState();
  const [, setUser] = userState;

  useEffect(() => {
    setUser(userService.getCurrentUser());
  }, [setUser]);

  return (
    <div>
      <userContext.Provider value={userState}>
        <NavBarMovies />
        <ToastContainer />
        <Switch>
          <Route path="/movies" exact component={MoviesApp} />
          <Route path="/login" exact component={LoginForm} />
          <Route path="/counter" exact component={CountersApp} />
          <ProtectedRoute path={'/movies/:id?'} component={MovieFormPage} />
          <Route path="/products" exact component={Products} />
          <Route path="/customers" exact component={Customers} />
          <Route path="/rentals" exact component={Rentals} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/products/:id?" component={Product} />
          <Route path="/" exact component={Home} />
          <Route path="/not-found" exact component={NotFound} />
          <Route path="/profile" exact render={(props) => <Redirect {...props} to="/not-found" />} />
        </Switch>
      </userContext.Provider>
    </div>
  );
}

export default App;
