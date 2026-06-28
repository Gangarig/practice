import currentUser from '../data/mockCurrentUser';
import { Group ,Text} from '@mantine/core';

interface HeaderProps {
   
}

function Header({}:HeaderProps) {
    const user = currentUser;

  return (
        <Group >
            <Text>Welcome, {user.name}</Text>
            <Text>Role: {user.role}</Text>
        </Group>  
  )
}

export default Header