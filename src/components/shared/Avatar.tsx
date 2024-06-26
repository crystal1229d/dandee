import { colors } from '@/styles/colorPalette'
import { User } from '@models/user'
import { styled, Tooltip, tooltipClasses, TooltipProps } from '@mui/material'

interface AvatarProps {
  user: Partial<User>
}

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: colors.gray800,
    border: `1px solid ${colors.gray200}`,
    boxShadow: theme.shadows[1],
    fontSize: '0.8rem',
  },
}))

function Avatar({ user }: AvatarProps) {
  return (
    <LightTooltip
      title={user?.displayName}
      style={{ backgroundColor: 'white' }}
    >
      <img
        src={
          user.photoURL ??
          'https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-128.png'
        }
        alt="유저 프로필"
        width={40}
        height={40}
        style={{ borderRadius: '100%' }}
      />
    </LightTooltip>
  )
}

export default Avatar
