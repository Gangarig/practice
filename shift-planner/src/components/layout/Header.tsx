import currentUser from '../../data/mockCurrentUser';
import { Avatar, Badge, Group, Stack, Switch, Text, useMantineColorScheme } from '@mantine/core';

function Header() {
    const user = currentUser;
    const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
        <Group gap="sm" wrap="nowrap">
          <Switch
            checked={colorScheme === 'dark'}
            onChange={(event) => setColorScheme(event.currentTarget.checked ? 'dark' : 'light')}
            label={colorScheme === 'dark' ? 'Dark' : 'Light'}
            aria-label="Toggle color scheme"
          />
          <Avatar color="blue" radius="xl">{user.name.slice(0, 2).toUpperCase()}</Avatar>
          <Stack gap={1} visibleFrom="xs">
            <Text size="sm" fw={600}>{user.name}</Text>
            <Badge size="xs" variant="light">{user.role}</Badge>
          </Stack>
        </Group>  
  )
}

export default Header
