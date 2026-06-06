export {}

async function fetchUsers(): Promise<User[]>{
    try{
    const response =  await fetch("https://jsonplaceholder.typicode.com/users")
        if (!response.ok) {
            throw new Error(
                `Failed: ${response.status}`
            );
        }
    const users :User[] = await response.json() as User[];
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
    }
}

async function fetchUserById(
    userId:number
): Promise<User> {
    const users :User[] = await fetchUsers();
    if(users.length === 0 ) {
        throw new Error ('something went wrong')
    }
    const user = users.find(user => user.id === userId);
    if(!user) {
        throw new Error ('User not found');
    }
    return user
}

async function getUserNames(): Promise<string[]> {
    const users = await fetchUsers();
    if(users.length === 0 ) {
        throw new Error ('something went wrong')
    }
    return users.map(user => user.name);
}
async function getUserEmails(): Promise<string[]>{
    const users = await fetchUsers();
    return users.map(user => user.email);
}

async function getUserByEmail(
    email:string
): Promise<User> {
    const users = await fetchUsers();
    const userEmail = users.find(user=>user.email===email);
    if(!userEmail) {
        console.log('email not found');
        throw new Error ('Email not found') 
    } 
    return userEmail
}

// console.log(test('Sincere@april.biz'))

interface UserState {
    loading: boolean;
    users: User[];
    error: string | null;
} 

const state: UserState = {
    loading: false,
    users: [],
    error: null,
};
async function loadUsers(): Promise<void> {
    console.log(state)
    state.loading = true ; 
    try {
        console.log(state)
       state.users = await fetchUsers()
       state.error = null;
    } catch (error) {
        if(error instanceof Error) {
            state.error = error.message;
        } else {
            state.error = 'Unknown error';
        }
    } finally {
            state.loading = false;
            console.log(state);
        }
}

interface Address {
    city: string;
}

interface Company {
    name: string;
}
interface User {
    id: number;
    name: string;
    email: string;
    address: Address;
    company: Company;
}

async function getCompanyNames(): Promise<string[]> {
    state.loading = true;
    try {
        state.users = await fetchUsers();
        const companyNames =
            state.users.map(
                user => user.company.name
            );
        return companyNames;
    }
    catch(error) {
        if (error instanceof Error) {
            state.error = error.message;
        }
        throw error;
    }
    finally {
        state.loading = false;
    }
}

function getCompanyNamesFromState(): string[] {
    return state.users.map(user => user.company.name);
}

function getUsersByCityFromState(city: string): User[]{
    return state.users.filter(user => city.toLocaleLowerCase() === user.address.city.toLocaleLowerCase())
}

function countUsersByCompanyFromState(): Record<string, number> {
    return state.users.reduce((sum,user) =>{
        if(sum[user.company.name]) {
            sum[user.company.name] = (sum[user.company.name] ?? 0) + 1;
        } else {
            sum[user.company.name] = 1;
        }
        return sum },{} as Record<string,number>
    )
}

interface CompanyStat {
    company: string;
    employeeCount: number;
} 

function getCompanyStatsFromState() {
    const data = countUsersByCompanyFromState();
    const convertedData:CompanyStat[] = [];
    for(const [company , employeeCount] of Object.entries(data)) {
        convertedData.push({
            company,employeeCount
        })
    }
    return convertedData
}


async function test() {
    state.users = await fetchUsers();
    console.log(getCompanyStatsFromState())
}

test();
