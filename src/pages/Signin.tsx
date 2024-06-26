import useGoogleSignin from '@hooks/auth/useGoogleSignin'

import Button from '@shared/Button'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'

import { FcGoogle } from 'react-icons/fc'

function SigninPage() {
  const { signin } = useGoogleSignin()

  return (
    <Flex dir="column" align="center" style={{ padding: 24 }}>
      <Spacing size={100} />
      <Button size="medium" onClick={signin}>
        <Flex align="center" justify="center">
          <FcGoogle width={20} height={20} />
          <Spacing dir="horizontal" size={4} />
          Google 로그인
        </Flex>
      </Button>
    </Flex>
  )
}

export default SigninPage
