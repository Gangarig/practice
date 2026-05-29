interface User {
  name: string,
  email: string,
  password: string,
  isActive: boolean
}
interface LoginRequest {
    email:string,
    password:string
}
interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}
interface ValidationResult {
    valid:boolean,
    message:string
}

const users: User[] = [
  {
    name: "John",
    email: "john@example.com",
    password: "john123",
    isActive: true
  },
  {
    name: "Anna",
    email: "anna@example.com",
    password: "anna123",
    isActive: true
  },
  {
    name: "Mark",
    email: "mark@example.com",
    password: "mark123",
    isActive: false
  }
];



function handleLogin(request:LoginRequest):ApiResponse<User> {
    const emailValidationResult :ValidationResult = isValidEmail(request.email)
    if(!emailValidationResult.valid) {
        return {
            success:false,
            message:emailValidationResult.message,
        }
    }

    const userData = findUserByEmail(request.email)
    if(!userData) {
        return {
            success:false,
            message:'User does not exist'
        }
    }
    if(!userData.isActive) {
        return {
            success:false,
            message:'User is not active'
        }
    }
    const isPasswordValid : ValidationResult = passwordValidation(request.password)
    if(!isPasswordValid.valid) {
        return {
            success:false,
            message:'Password is not valid'
        }
    }
    if(request.password !== userData?.password) {
        return {
            success:false,
            message:'Password or Email does not match',
        }
    } 
    return {
        success:true,
        message:'Successfully logged in',
        data:userData
    }

 } 

function checkUsersEmailInsideData(email:string):boolean {
    return users.some(user => user.email === email)
}
function registerUser(request:RegisterRequest):ApiResponse<User>{
    const {name,email,password} = request;
    if(!name || !email || !password){
        return {
            success:false,
            message:'Must have all the inputs',
        }
    }
    const emailValidationResult : ValidationResult = isValidEmail(email)
    if(!emailValidationResult.valid) {
        return {
            success:false,
            message:emailValidationResult.message,
        }
    } 
    if(checkUsersEmailInsideData(email)) {
        return {
            success:false,
            message:'User already exists',
        }
    }
    const newUser:User = {        
            name:request.name,
            email:request.email,
            password:request.password,
            isActive:true
        }
    users.push(newUser)
    return {
        success:true,
        message:'Successfully registered',
        data:newUser
    }
}
function isValidEmail (email:string) : ValidationResult {
    if(!email){
        return {
            valid:false,
            message:'Must have all the inputs',
        }
    }
    if(!email.includes('@') || !email.includes('.')) {
        return {
            valid:false,
            message:'Invalid email format'
        }
    }
    return {
        valid:true,
        message:'Email is Validated'
    }
}
function findUserByEmail(email:string):User | undefined {
    return users.find(user => user.email === email)
}

function passwordValidation(requestPassword:string):ValidationResult {
    if(!requestPassword) {
        return {
        valid:false,
        message:'Password can not be empty'
        }
    }
    return {
        valid:true,
        message:'Password is Valid'
    }
}

interface UpdateUserRequest {
  name?: string;
  password?: string;
}
function updateUser(
    email:string,
    request:UpdateUserRequest
): ApiResponse<User> {
    if(Object.keys(request).length === 0 ) {
        return {
            success:false,
            message:'No inputs to update'
        }
    }
    const userData = findUserByEmail(email)
const emailValidationResult:ValidationResult = isValidEmail(email)
if(!emailValidationResult.valid) {
    return {
        success:false,
        message:emailValidationResult.message
    }
}

if(!userData){
    return{ 
        success:false,
        message:'User does not exist'
    }
}
if(!userData.isActive){
    return{ 
        success:false,
        message:'User is Inactive'
    }
}
if(request.name) {
    userData.name = request.name;
}   
if(request.password) {
    userData.password = request.password;
}
return {
    success:true , 
    message:'User updated',
    data: userData
}
}

function deleteUser (email:string): ApiResponse<User> {
    const emailValidation : ValidationResult = isValidEmail(email)    
    if(!emailValidation.valid) {
        return{
            success:false,
            message:emailValidation.message
        }
    }
    const userData = findUserByEmail(email)
    if(!userData) {
        return {
        success:false,
        message:'User does not exist'
    }
    }
    const index = users.findIndex(user => user.email === email)
    if( index !== -1) {
        users.splice(index,1)
    }
    return {
        success:true,
        message:'User deleted',
        data:userData
    }

}


//ch1
function getAllActiveUser():ApiResponse<User[]> {
    return {
        success:true,
        message:' All active users',
        data:users.filter(user => user.isActive === true)
}
}


console.log(getAllActiveUser())

interface UserSummary {
    totalUsers :number,
    activeUsers :number,
    inActiveUsers:number
}

function getUserCount():ApiResponse<UserSummary>{
    if(users.length === 0) {
        return {
            success:false,
            message:'There are no users'
        }
    }
    let inActiveUsers = 0;
    const totalUsers = users.length ; 
    const activeUsers = users.filter(user => user.isActive === true).length
    inActiveUsers = totalUsers - activeUsers;
    return {
        success:true,
        message:'User Summary',
        data : {
            totalUsers,
            activeUsers,
            inActiveUsers
        }
    }
}
console.log(getUserCount())

function searchUser(name:string):ApiResponse<User[]> {
    // const result = users.find(user => user.name === name)
    //userNames with all lowercase
    const result: User [] = []
    let tempName :string = '';
    for (const user of users) {
        tempName = user.name.toLowerCase()
        if(tempName.includes(name.toLowerCase())) {
            result.push(user)
        }
    }
    if(result.length===0) {
        return {
            success:false,
            message:'There is no match'
        }
    }
    return {
        success:true,
        message:'Search Result' ,
        data:result
    }
}
console.log(searchUser('a'))
























































































