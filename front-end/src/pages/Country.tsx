import React, { useEffect } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { RouteComponentProps } from 'react-router-dom'
import { ICountry } from '../types'

interface RouterParams {
  code: string
}
//

const Country: React.FC<RouteComponentProps<RouterParams>> = ({ match }) => {
  useEffect(() => {
    const root = document.querySelector('#root') as HTMLDivElement
    if (root) root.style.removeProperty('height')
  })
  const { loading, error, data } = useQuery(gql`
    {
      country(code:"${match.params.code}") {
        name
        code
        emoji
        currency
        phone
        continent {
          name
        }
        languages {
          code
          name
          native
        }
      }
    }
  `)
  if (loading) return <Loader>Loading...</Loader>
  if (error) return <ErrorMessage>{error.message}</ErrorMessage>
  const country = data.country as ICountry
  return (
    <Wrapper>
      <div className="card" key={country.code}>
        <div>
          <span>{country.emoji}</span>
        </div>
        <div>
          <h3>
            {country.name} <small title="Country Code">{match.params.code}</small>
          </h3>
          <p className="space-between">
            <span>Currency:</span> <span>{country.currency}</span>
          </p>
          <p className="space-between">
            <span>Area Code:</span> <span>+{country.phone}</span>
          </p>
          <p className="space-between">
            <span>Continent:</span> <span>{country.continent.name}</span>
          </p>
          <h5>Languages:</h5>
          <ul>
            {country.languages.map((language, index) => (
              <li key={index.toString()}>
                {language.name} - {language.native}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Wrapper>
  )
}
const Loader = styled.p`
  padding: 1em;
  text-align: center;
  color: #fff;
`
const ErrorMessage = styled.p`
  padding: 1em;
  text-align: center;
  color: #fff;
  background-color: rgba(255, 0, 0, 0.212);
  border: 1px solid rgba(255, 0, 0, 0.212);
  width: fit-content;
  margin: 0 auto;
  border-radius: 5px;
`
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 1em 0;
  background: linear-gradient(to right, #26d0ce, #1a2980);
  > .card {
    width: 500px;
    margin: 0 auto;
    background-color: rgba(243, 241, 241, 0.1);
    display: flex;
    min-height: 60px;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 4px #48464642;
    text-decoration: none;
    @media screen and (max-width: 700px) {
      width: 90%;
    }
    &:not(:last-child) {
      margin-bottom: 1em;
    }
    & > *:first-child {
      width: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 35px;
    }
    & > *:last-child {
      padding: 1em;
      width: 80%;

      small {
        font-size: 80%;
        background-color: rgba(0, 0, 0, 0.1);
        padding: 2px 5px;
        border-radius: 20%;
      }
      .space-between {
        display: flex;
        justify-content: space-between;
        padding-right: 1em;
      }
    }
  }
`
export default Country
