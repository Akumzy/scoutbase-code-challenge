import React from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import styled from 'styled-components'
import client from './client'
import Countries from './pages/Countries'
import Country from './pages/Country'
import HomePage from './pages/HomePage'
import './App.css'

const App: React.FC = () => {
  return (
    <Router>
      <ApolloProvider client={client}>
        <Master>
          <header>
            <h1>The World</h1>
            <nav>
              <NavLink className="nav-link" exact activeClassName="active-link" to="/">
                Home
              </NavLink>
              <NavLink className="nav-link" exact activeClassName="active-link" to="/countries">
                List of Countries
              </NavLink>
            </nav>
          </header>
          <main>
            <Route path="/" exact component={HomePage} />
            <Route path="/countries" exact component={Countries} />
            <Route path="/countries/:code" exact component={Country} />
          </main>
        </Master>
      </ApolloProvider>
    </Router>
  )
}

const Master = styled.div`
  height: 100%;
  width: 100%;
  max-height: 100%;
  background: linear-gradient(to right, #26d0ce, #1a2980);

  > header {
    height: 20%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > h1 {
      margin: 0;
    }
    a,
    h1 {
      color: #fff;
    }
  }
  > main {
    height: 75%;
    width: 100%;
  }
  .nav-link {
    padding: 0 0.5em;
    &:not(.active-link) {
      text-decoration: none;
    }
  }
`
export default App
