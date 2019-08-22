import React, { useEffect } from 'react'
import { ReactComponent as WorldSVG } from '../world.svg'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'

const HomePage: React.FC<RouteComponentProps> = ({ history }) => {
  const onMapClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const target = event.target as SVGSVGElement
    const { id, name } = target.dataset
    if (id) {
      history.push(`/countries/${id}`)
    }
  }
  useEffect(() => {
    const root = document.querySelector('#root') as HTMLDivElement
    if (root) root.style.removeProperty('height')
  
  })
  return (
    <Wrapper>
      <WorldSVG onClick={onMapClick} />
      <ReactTooltip />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  svg {
    width: 100% !important;
    height: 100% !important;
    #NG {
      fill: #008751 !important;
    }
    path {
      cursor: pointer;
    }
  }
`

export default HomePage
