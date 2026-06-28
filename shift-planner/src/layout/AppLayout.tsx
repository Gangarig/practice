
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { AppShell, Burger,Group,Title } from '@mantine/core'
import { Outlet } from 'react-router-dom'
import { useDisclosure } from '@mantine/hooks'

function AppLayout() {
  const [opened , {toggle}] = useDisclosure();
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 240, 
        breakpoint: 'sm',
        collapsed : {mobile:!opened},
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify='space-between'>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Header/>
          {!opened && <Title order={3}>Shift Planner</Title> }
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <Sidebar/>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}

export default AppLayout