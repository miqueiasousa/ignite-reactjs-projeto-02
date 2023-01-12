import { Timer, Scroll } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

import logoIgniteTimer from '../../assets/logo-ignite-timer.svg'
import { HeaderContainer } from './Header.styles'

export function Header() {
  return (
    <HeaderContainer>
      <img src={logoIgniteTimer} alt="" />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
