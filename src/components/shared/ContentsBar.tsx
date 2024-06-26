import { Paper } from '@mui/material'

interface ContentsBarProps {
  children: React.ReactNode
}

function ContentsBar({ children }: ContentsBarProps) {
  return <Paper square={false}>{children}</Paper>
}

export default ContentsBar
