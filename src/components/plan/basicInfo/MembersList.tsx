import styled from '@emotion/styled'
import { zIndex } from '@/styles/sharedStyles'
import { colors } from '@/styles/colorPalette'
import { User } from '@/models/user'
import Avatar from '@/components/shared/Avatar'

interface MembersListProps {
  users: Partial<User>[] | undefined
}

function MembersList({ users }: MembersListProps) {
  return (
    <ListContainer>
      {users && users.map((user) => <Avatar user={user} />)}
    </ListContainer>
  )
}

const ListContainer = styled.div`
  width: 100%;
  min-height: 48px;
  height: fit-content;
  padding: 20px;
  display: flex;
  align-items: center;
  overflow: hidden;
  z-index: ${zIndex.calendar};
  box-sizing: border-box;

  background-color: ${colors.white};
  border: 1px solid ${colors.gray900};
  border-radius: 8px;
`

export default MembersList
