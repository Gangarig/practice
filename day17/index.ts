
export {} 
interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
}

interface User {
    id: number;
    name: string;
    balance: number;
}

interface OrderItem {
    productId: number;
    quantity: number;
}

interface Order {
    id: number;
    userId: number;
    items: OrderItem[];
    total: number;
}

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
}

const products: Product[] = [
    { id: 1, name: "Laptop", price: 1200, stock: 5 },
    { id: 2, name: "Mouse", price: 25, stock: 50 },
    { id: 3, name: "Keyboard", price: 80, stock: 20 }
];

const users: User[] = [
    { id: 1, name: "John", balance: 3000 },
    { id: 2, name: "Anna", balance: 500 }
];

const orders: Order[] = [
    {
        id: 1,
        userId: 1,
        items: [
            { productId: 1, quantity: 2 },
            { productId: 2, quantity: 3 }
        ],
        total: 2475
    },
    {
        id: 2,
        userId: 2,
        items: [
            { productId: 3, quantity: 2 },
            { productId: 5, quantity: 1 }
        ],
        total: 280
    },
    {
        id: 3,
        userId: 1,
        items: [
            { productId: 4, quantity: 1 },
            { productId: 2, quantity: 5 }
        ],
        total: 475
    },
    {
        id: 4,
        userId: 3,
        items: [
            { productId: 6, quantity: 1 }
        ],
        total: 300
    },
    {
        id: 5,
        userId: 4,
        items: [
            { productId: 1, quantity: 1 },
            { productId: 4, quantity: 2 },
            { productId: 7, quantity: 4 }
        ],
        total: 2500
    },
    {
        id: 6,
        userId: 2,
        items: [
            { productId: 2, quantity: 10 },
            { productId: 3, quantity: 3 }
        ],
        total: 490
    },
    {
        id: 7,
        userId: 4,
        items: [
            { productId: 5, quantity: 5 }
        ],
        total: 600
    },
    {
        id: 8,
        userId: 1,
        items: [
            { productId: 7, quantity: 2 },
            { productId: 2, quantity: 1 }
        ],
        total: 325
    }
];
function findUserById(
    userId:number
): User | undefined {
    return users.find(user => user.id === userId);
}
function findProductById (productId:number) :Product | undefined{
    return products.find(product => product.id === productId)
}

function calculateOrderTotal(
    items: OrderItem[]
): number {
    return items.reduce((total , item ) => {
        const product : Product |undefined = findProductById(item.productId);
        if(!product) {
            console.log('Product does not exist');
            return total;
        }
        total = (total ?? 0) + item.quantity * product.price;   
        return total;
    },0)
}

function validateOrderItems (items:OrderItem[]):boolean  {
    return items.every( item => {
        const product = findProductById(item.productId);
        if(!product) {
            return false
        }
        if(item.quantity > product.stock) {
            return false
        }
        if(item.quantity <= 0) {
            return false
        }
        return true
    })
}



function placeOrder(
    userId:number,
    items: OrderItem[]
): ApiResponse<Order> {
    if(items.length === 0) {
        return{
            success:false,
            message:'Input invalid'
        }
    }
    const user = findUserById(userId);
    if(!user) {
        return {
            success:false,
            message:'User not found',
        }
    }

    const isValidOrder:boolean = validateOrderItems(items);
    if(!isValidOrder) {
        return {
            success:false,
            message:'Product does not exist or Not enough in inventory'
        }
    }

    const totalValue = calculateOrderTotal(items);
    if(user.balance < totalValue){
        return {
            success:false,
            message:'Balance not enough'
        }
    }

    user.balance = user.balance - totalValue;
    for ( const item of items) {
        const product = findProductById(item.productId);
        if(!product) {
            return {
                success:false,
                message:'Product does not exist'
            }
        }
        product.stock = product.stock - item.quantity;
    }

    const newOrder : Order = {
        id:orders.length + 1,
        userId : user.id,
        items : items,
        total : totalValue,
    }

    orders.push(newOrder);

    return {
        success:true,
        message:'Order Created',
        data: newOrder
    }
}

// console.log(
//     placeOrder(1, [])
// );
function getUserOrders(
    userId:number
): Order[] {
    return orders.filter(order => order.userId === userId)
}

function getTotalRevenue(): number {
    return orders.reduce((sum , order) => {
        sum = (sum ?? 0) + order.total;
        return sum
    },0)
}
interface TopCustomer {
    userId:number;
    name:string;
    totalSpent:number;
}

function getTopCustomer():TopCustomer|undefined {
    const data = orders.reduce ((sum , order) => {
        if(sum[order.userId]) {
            sum[order.userId] = (sum[order.userId] ?? 0) + order.total; 
        } else {
            sum[order.userId] = order.total;
        }
        return sum
    },{} as Record <number , number>)
     
    const sortedData = Object.entries(data).sort((a,b)=> b[1]-a[1]);
    const totalSpent :number = sortedData[0][1]
    const topUserId = Number(sortedData[0][0]);
    const user = findUserById(topUserId);
    if (!user) {
        console.log('user not found')
        return
    }
    const TopCustomer:TopCustomer = {
        userId:user.id,
        name:user.name,
        totalSpent:totalSpent,
    }
    return TopCustomer
     
}

// console.log(getTopCustomer())

interface BestSellingProduct {
    productId:number;
    name:string;
    quantitySold:number;
}

function getBestSellingProduct():BestSellingProduct | undefined{
    const sum :OrderItem[] = [];
    for (const order of orders) {
        for ( const item of order.items) {
            sum.push(item)
        }
    }
    const sumData = sum.reduce((sum,item)=>{
        const product = findProductById(item.productId);
        if(!product) {
            return sum
        }
        if(sum[item.productId]) {
            sum[item.productId] = (sum[item.productId] ?? 0) + item.quantity;
        } else {
            sum[item.productId] = item.quantity;
            
        }
        return sum
    },{} as Record<number,number>)
    let winnerId:number = 0;
    let winnerQuantity :number = 0;
    for (const productId in sumData) {
        if(sumData[productId] > winnerQuantity) {
            winnerQuantity = sumData[productId];
            winnerId = Number(productId);
        }
    }
    const product = findProductById(winnerId)
    if(!product) {
        console.log('Product not found')
        return
    }
    const bestProduct : BestSellingProduct = {
    productId:winnerId,
    name:product.name,
    quantitySold:winnerQuantity,
    }

    return bestProduct
}

// console.log(getBestSellingProduct())

interface Dashboard {
    totalRevenue: number;
    totalOrders: number;
    topCustomer: string;
    bestSellingProduct: string;
}

function getDashboard():Dashboard {
    const topCustomer = getTopCustomer();
    const bestSellingProduct = getBestSellingProduct();
    return {
        totalRevenue: getTotalRevenue(),
        totalOrders: orders.length,
        topCustomer: topCustomer?.name ?? '',
        bestSellingProduct: bestSellingProduct?.name ?? ''
    };
}
// console.log(getDashboard())


function refundOrder(
    orderId:number
): ApiResponse<Order>
{
    const order = orders.find(order => order.id === orderId) 
    if(!order) {
        return {
            success:false,
            message:'Order does not exist' 
        }
    }

    const user = findUserById(order.userId);
    if(!user) {
        return {
            success:false,
            message:'User not found' 
        } 
    }

    for (const product of order.items) {
        if(!findProductById(product.productId)) {
        return {
            success:false,
            message:'Product not found' 
        }
        }
    }
    for (const item of order.items) {
        const product = findProductById(item.productId)
        if(!product) {
            return {
            success:false,
            message:'Product not found' 
        }
        }
        product.stock = product.stock + item.quantity;
    }

    user.balance = user.balance + order.total;
    const index = orders.indexOf(order);
    orders.splice(index,1);
    return {
        success:true,
        message:'Refunded',
        data:order
    } 
}


function getUser() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("John");
        }, 2000);
    });
}

// console.log(user);
// async function run() {
//     const user = await getUser();

//     console.log(user);
// }

// run();

function getProducts(): Promise<Product[]> {
    return new Promise ((resolve) => {
        setTimeout(() => {
            resolve(products)
        }, 2000);
    })
}

// function getProductByIdAsync(
//     productId:number
// ): Promise<Product | undefined> {
//     return new Promise((resolve ,reject) => {
//         setTimeout(() => {
//             resolve(products.find(product => product.id === productId))
//         }, 2000);
//     })
// }

function getProductByIdAsync(
    productId:number
): Promise<Product> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
                const product = products.find(product => productId === product.id)
                if(product) {
                    resolve(product)
                } else {
                    reject('Product not found')
                }
        },2000);
    })
}

// async function run(param:number) {
//     try {
//         const product = await getProductByIdAsync(param);
//         console.log(product)
//     } catch(error) {
//         console.log(error)
//     }
// }

// async function fetchProducts()
// async function fetchProductById()
// async function createOrder()
// async function refundOrder()

async function fetchProducts(): Promise<Product[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products)
        }, 1000);
    })
}

async function fetchProductById(
    productId:number
): Promise<Product> {
    const item = products.find(product => product.id === productId);
    if(!item) {
        throw new Error ('Product not found');
    }
    return item
}

async function createOrderAsync(
    userId:number,
    items:OrderItem[]
): Promise<Order> {
    await new Promise((resolve) => {
        setTimeout(resolve, 2000);
    })

    const response = placeOrder(userId,items);
    if(!response.success || !response.data) {
        throw new Error (response.message)
    }
    return response.data
}
async function fetchUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(users)
        }, 1000);
    })
}
// async function run() {
//     const users = await fetchUsers();
//     const products = await fetchProducts();
//     return {
//         users,products
//     }
// }
async function run() {
        const [users,products] = await Promise.all([fetchUsers(),fetchProducts()])
        return [users,products]
}
console.log(run())
