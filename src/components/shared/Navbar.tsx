import { useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { css } from '@emotion/react'

import Flex from '@shared/Flex'
import { colors } from '@/styles/colorPalette'
import { zIndex } from '@/styles/zIndex'

function StyledLink({
  to,
  children,
}: {
  to: string
  children: React.ReactNode
}) {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link to={to} css={linkStyle(isActive)}>
      {children}
    </Link>
  )
}

function Navbar() {
  const location = useLocation()
  const showSigninButton =
    ['/signup', 'signin'].includes(location.pathname) === false

  const renderButtons = useCallback(() => {
    return (
      <Flex align="center" gap={25}>
        <StyledLink to="/plan">계획</StyledLink>
        <StyledLink to="/checklist">체크리스트</StyledLink>
        {showSigninButton && <StyledLink to="/signin">로그인</StyledLink>}
      </Flex>
    )
  }, [showSigninButton])

  return (
    <Flex justify="space-between" align="center" css={navbarContainerStyle}>
      <Link to="/">DANDEE</Link>
      {renderButtons()}
    </Flex>
  )
}

const navbarContainerStyle = css`
  padding: 25px 25px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: ${zIndex.navbar};
  border-bottom: 1px solid ${colors.gray};
`

const linkStyle = (isActive: Boolean) => css`
  color: ${isActive ? colors.blue980 : colors.black};
  &:hover {
    color: ${colors.blue980};
  }
`

export default Navbar