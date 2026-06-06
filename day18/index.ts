export {}
interface User {
    id: number;
    name: string;
    email: string;
}

async function fetchUsers(): Promise<User[]>{
    try{
    const response =  await fetch("https://jsonplaceholder.typicode.com/users")
        if (!response.ok) {
        throw new Error ('Failed to fetch users');
        }
    const users : User[] = await response.json();
    return users
    } catch (error) {
        console.log(error) ;
        throw error
    }
}

async function run() {
    try {
    const users = await fetchUsers();
    console.log(users.length);
    console.log(users[0].name);
    } catch (error) {
        console.log(error)
        throw error
    }
}

run();