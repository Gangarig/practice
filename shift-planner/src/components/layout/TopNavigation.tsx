import { Button, Group } from '@mantine/core'
import { Link, useLocation } from 'react-router-dom'
import currentUser from '../../data/mockCurrentUser'
import navLinks from '../../data/navigation'

function TopNavigation() {
  const location = useLocation()

  return (
    <Group gap={4} visibleFrom="md">
      {navLinks
        .filter((link) => link.roles.includes(currentUser.role))
        .map((link) => (
          <Button
            component={Link}
            to={link.to}
            key={link.to}
            size="compact-sm"
            variant={location.pathname === link.to ? 'light' : 'subtle'}
            color="blue"
          >
            {link.label}
          </Button>
        ))}
    </Group>
  )
}

export default TopNavigation
