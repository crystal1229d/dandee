import { useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { css } from '@emotion/react'

import useGoogleSignin from '@hooks/auth/useGoogleSignin'
import useUser from '@hooks/auth/useUser'

import Flex from '@shared/Flex'
import { colors } from '@styles/colorPalette'
import { zIndex } from '@styles/zIndex'
import { spacing } from '@styles/spacing'

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
    ['/signup', '/signin'].includes(location.pathname) === false

  const user = useUser()
  const { signout } = useGoogleSignin()

  const renderButtons = useCallback(() => {
    return (
      <Flex align="center" gap={25}>
        <StyledLink to="/plan">계획</StyledLink>
        <StyledLink to="/checklist">체크리스트</StyledLink>
        {user && <span onClick={signout}>로그아웃</span>}
        {showSigninButton && !user && (
          <StyledLink to="/signin">로그인</StyledLink>
        )}
        {user && (
          <Link to="/my">
            <img
              src={
                user.photoURL ??
                'https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-128.png'
              }
              alt="유저의 이미지"
              width={40}
              height={40}
              style={{ borderRadius: '100%' }}
            />
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
