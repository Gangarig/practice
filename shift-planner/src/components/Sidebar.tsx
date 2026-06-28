import { Divider, NavLink, Stack, Title } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import currentUser from '../data/mockCurrentUser';
import { Fragment } from 'react/jsx-runtime';
import navLinks from '../data/navigation';

interface SidebarProps {

}
function Sidebar({}:SidebarProps) {
  const location = useLocation()
  const user = currentUser
  const items = navLinks
    .filter(link => link.roles.includes(user.role))
    .map((link) => (
    <Fragment key={link.to}>    
      {link.label === 'Settings' ? <Divider my={'sm'} size={'sm'}/> : null}
      <NavLink
        component={Link}
        to={link.to}
        label={link.label}
        active={location.pathname === link.to}
        // leftSection={<link.icon size={16}/>
      />
    </Fragment>))

  return (
    <Stack gap={'xs'} p='sm'>
        <Title order={3}>Shift Planner</Title>
        <Divider size={'sm'} my={'sm'}/>
      {items}
    </Stack>
  )
}

export default Sidebar