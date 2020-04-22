import React from 'react';
import logo from './logo.svg';
import { Counter } from '../../features/counter/Counter';
import './Home.css';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

function Home() {
  return (
    <div className="Home">
      <header className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/Home.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="Home-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="Home-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="Home-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="Home-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
          <Button component={Link} to="/view/1">
            Go To View Page
          </Button>
        </span>
      </header>
    </div>
  );
}

export default Home;
