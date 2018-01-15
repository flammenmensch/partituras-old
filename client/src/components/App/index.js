import React from 'react';
import {NavLink as Link, Route} from 'react-router-dom';
import packageJson from '../../../package.json';

import HomeView from '../../containers/HomeViewContainer';
import LoginView from '../../containers/LoginViewContainer';
import SearchView from '../../containers/SearchViewContainer';
import FavoritesView from '../../containers/FavoritesViewContainer';
import PartituraDetailsView from '../../containers/PartituraDetailsContainer';

import './styles.css';

export default () => (
  <div className="container-fluid">
    <header className="header">
      <Link className="header-link header-link--logo" to="/">
        Partituras&nbsp;<sup className="beta">beta</sup>
      </Link>
      <nav className="nav">
        <li className="nav__item">
          <Link className="nav__link" to="/favorites">Favorites</Link>
        </li>
        <li className="nav__item">
          <Link className="nav__link" to="/search">Search</Link>
        </li>
      </nav>
    </header>
    <div className="container container--padded">
      <main className="main">
        <Route exact path="/" component={HomeView} />
        <Route path="/search" component={SearchView} />
        <Route path="/favorites" component={FavoritesView} />
        <Route path="/partitura/:id/:section?" component={PartituraDetailsView} />
        <Route path="/login" component={LoginView} />
        <Route path="/logout" />
        <Route path="/favorites" />
      </main>
      <footer className="footer mono">
        &copy; 2017, Partituras version {packageJson.version}
      </footer>
    </div>
  </div>
);
