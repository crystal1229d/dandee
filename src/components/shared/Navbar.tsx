import { useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { css } from '@emotion/react'

import useGoogleSignin from '@hooks/auth/useGoogleSignin'
import useUser from '@hooks/auth/useUser'

import Flex from '@shared/Flex'
import Avatar from '@shared/Avatar'

import { colors } from '@styles/colorPalette'
import { spacing, zIndex } from '@/styles/sharedStyles'

function StyledLink({
  to,
  children,
}: {
  to: string
  children: React.ReactNode
}) {
  const location = useLocation()
  const isActive = location.pathname.includes(to)

  return (
    <Link to={to} css={linkStyle(isActive)}>
      {children}
    </Link>
  )
}

function Navbar() {
  const location = useLocation()
  const showSigninButton =
    ['/signup', '/signin'].includes(location.pathname) === false

  const user = useUser()
  const { signout } = useGoogleSignin()

  const renderButtons = useCallback(() => {
    return (
      <Flex align="center" gap={25}>
        <StyledLink to="/plans">계획</StyledLink>
        <StyledLink to="/checklist">체크리스트</StyledLink>
        {user && <span onClick={signout}>로그아웃</span>}
        {showSigninButton && !user && (
          <StyledLink to="/signin">로그인</StyledLink>
        )}
        {user && (
          <Link to="/my">
            <Avatar user={user} />
          </Link>
        )}
      </Flex>
    )
  }, [showSigninButton, signout, user])

  return (
    <Flex justify="space-between" align="center" css={navbarContainerStyle}>
      <Link to="/">DANDEE</Link>
      {renderButtons()}
    </Flex>
  )
}

const navbarContainerStyle = css`
  min-height: 80px;
  padding: 0 ${spacing.pageLeftRight};
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: ${zIndex.navbar};
  border-bottom: 1px solid ${colors.gray200};

  & span {
    cursor: pointer;
    &:hover {
      color: ${colors.blue980};
    }
  }

  & img {
    cursor: pointer;
  }
`

const linkStyle = (isActive: Boolean) => css`
  color: ${isActive ? colors.blue980 : colors.black};
  &:hover {
    color: ${colors.blue980};
  }
`

export default Navbar
