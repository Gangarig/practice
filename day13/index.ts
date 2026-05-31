interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    category: string;
    isActive: boolean;
}

interface CartItem {
    productId: number;
    quantity: number;
}

interface ShoppingCart {
    id: number;
    customerName: string;
    items: CartItem[];
}

const products: Product[] = [
    { id: 1, 
      name: "Laptop", 
      price: 1200, 
      stock: 5, 
      category: "Electronics", 
      isActive: true },
    { id: 2, 
      name: "Mouse", 
      price: 25, 
      stock: 50, 
      category: "Electronics", 
      isActive: true },
    { id: 3, 
      name: "Keyboard", 
      price: 80, 
      stock: 20, 
      category: "Electronics", 
      isActive: false },
    { id: 4, 
      name: "Desk", 
      price: 300, 
      stock: 10, 
      category: "Furniture", 
      isActive: true },
    { id: 5, 
      name: "Chair", 
      price: 150, 
      stock: 15, 
      category: "Furniture", 
      isActive: true },
    { id: 6, 
      name: "Coffee", 
      price: 8, 
      stock: 100, 
      category: "Food", 
      isActive: true },
    { id: 7, 
      name: "Tea", 
      price: 5, 
      stock: 80, 
      category: "Food", 
      isActive: true },
    { id: 8, 
      name: "Monitor", 
      price: 350, 
      stock: 12, 
      category: "Electronics", 
      isActive: true },
    { id: 9, 
      name: "Headphones", 
      price: 120, 
      stock: 25, 
      category: "Electronics", 
      isActive: true },
    { id: 10, 
      name: "Lamp", 
      price: 40, 
      stock: 30, 
      category: "Furniture", 
      isActive: true }
];

const carts: ShoppingCart[] = [
    {
        id: 1,
        customerName: "John",
        items: [
            { productId: 1, quantity: 2 },
            { productId: 2, quantity: 3 }
        ]
    },
    {
        id: 2,
        customerName: "Anna",
        items: [
            { productId: 3, quantity: 1 },
            { productId: 4, quantity: 2 }
        ]
    },
    {
        id: 3,
        customerName: "Mike",
        items: [
            { productId: 5, quantity: 4 }
        ]
    },
    {
        id: 4,
        customerName: "Sarah",
        items: [
            { productId: 6, quantity: 10 },
            { productId: 7, quantity: 5 }
        ]
    },
    {
        id: 5,
        customerName: "Tom",
        items: [
            { productId: 1, quantity: 1 },
            { productId: 5, quantity: 2 }
        ]
    }
];

function findProductById(productId:number):Product | undefined {
    return products.find(product => product.id === productId)
}

function getCartById(cartId: number): ShoppingCart | undefined {
    return carts.find(cart => cart.id === cartId)
}

function getCartTotal(cartId: number): number {
    const cart = getCartById(cartId);
    if(!cart) {
        console.log('Cart does not exist')
        return 0
    }
    return cart.items.reduce((total,item)=>{
        const product = findProductById(item.productId);
        if(!product) {
            console.log('Product does not exist')
            return total
        }
        total = total + product.price * item.quantity;
        return total
    },0)
}


function getCartItemCount(cartId: number): number {
    const cart = getCartById(cartId);
    if(!cart) {
        console.log('Cart does not exist')
        return 0
    }
    return cart.items.reduce((total,item)=> {
        return total + item.quantity
    },0)
}
// console.log(getCartItemCount(1))

function addProductToCart(cartId: number, productId: number, quantity: number): ShoppingCart | undefined {
    if(!cartId || !productId || quantity <= 0) {
        console.log('Input wrong')
        return
    }
    if(!findProductById(productId)) {
        console.log('Product does not exist')
        return
    }
    const cart = getCartById(cartId);
    if(!cart) {
        console.log('Cart does not exist')
        return
    }
    const item = cart.items.find(item=>item.productId === productId)
    if(!item) { 
        cart.items.push({
            productId: productId,
            quantity: quantity
        });
    } else {
        item.quantity =item.quantity + quantity;
    }
    return cart

}

function removeProductFromCart(
    cartId: number,
    productId: number
): ShoppingCart | undefined {
    if(!cartId || !productId) {
        console.log('Inputs are wrong')
    return
    }
    const cart = getCartById(cartId);
    if(!cart) {
        console.log('Cart does not exist')
        return
    }
    const indexOfItem = cart.items.findIndex(
    item => item.productId === productId
    );
    if (indexOfItem === -1) {
    console.log("Item does not exist");
    return;
    }
    cart.items.splice(indexOfItem,1);
    return cart
}

// console.log(removeProductFromCart(1,1))


function updateCartItemQuantity(
    cartId: number,
    productId: number,
    quantity: number
): ShoppingCart | undefined {
    if(quantity <= 0) {
        console.log('Input is not valid')
        return
    }
    const cart = getCartById(cartId);
    if(!cart) {
        console.log('Cart does not exist') 
        return
    }

    const item =  cart.items.find(item => item.productId === productId);
    if(!item) {
        console.log('Item does not exist')
        return
    }
    item.quantity = quantity;
  return cart
}

// console.log(updateCartItemQuantity(1, 2, 10))


function getMostExpensiveCart(): ShoppingCart | undefined {
    return carts.reduce((highest,cart)=>{
        const cartTotal = getCartTotal(cart.id);
        if( cartTotal > getCartTotal(highest.id)) {
            highest = cart;
        }
        return highest
    })
}

// console.log(getMostExpensiveCart())


function getLeastExpensiveCart(): ShoppingCart | undefined {

    return carts.reduce((least,cart) => {
        const cartTotal = getCartTotal(cart.id);
        if(getCartTotal(least.id)>cartTotal){
            least = cart;
        }
        return least
    })
}

// console.log(getLeastExpensiveCart())

function getRevenueByCategory():Record<string, number> {
    return carts.reduce((sum,cart) => {
        for(const item of cart.items) {
            const product = findProductById(item.productId);
            if(!product) {
                console.log('product does not exist')
                return sum
            }
            if(sum[product.category]) {
                sum[product.category] = sum[product.category] + product.price * item.quantity;
            } else {
                sum[product.category] = product.price * item.quantity;
            }
        }
        return sum
    },{} as Record<string,number>)
}

// console.log(getRevenueByCategory())

function getMostCommonProductInCarts():Product | undefined {
        const counts : Record<string,number> = carts.reduce((counts,cart)=>{
            for ( const item of cart.items){
                counts[item.productId] = (counts[item.productId] ?? 0) + 1;
            }
            return counts
        },{} as Record<string,number>)
        let winnerId:number = 0;
        let highestCount:number =0;
        for (const productId in counts) {
            if(counts[productId] > highestCount){
                highestCount = counts[productId];
                winnerId = Number(productId)
            }
        }
        const product = findProductById(winnerId);
        if(!product) {
            console.log('Product does not exist')
            return
        }
        return product
}
// console.log(getMostCommonProductInCarts())

interface DashboardStats {
    totalCarts: number;
    totalRevenue: number;
    mostExpensiveCartId: number;
    leastExpensiveCartId: number;
}

// {
//     totalCarts: 5,
//     totalRevenue: 6410,
//     mostExpensiveCartId: 1,
//     leastExpensiveCartId: 4
// }

function getDashboardStats():DashboardStats{
    const totalCarts = carts.length;
    const totalRevenue = carts.reduce((total,cart)=>{
        total + getCartTotal(cart.id);
        return total;
    },0)
    const mostExpensiveCartId = Number(getMostExpensiveCart()?.id);
    const leastExpensiveCartId = Number(getLeastExpensiveCart()?.id);
    return {
        totalCarts:totalCarts,
        totalRevenue:totalRevenue,
        mostExpensiveCartId:mostExpensiveCartId,
        leastExpensiveCartId:leastExpensiveCartId,
    }
}

// console.log(getDashboardStats())

// :Record<string,number>

function getTop3ProductsByRevenue():Product[]{
    const revenueData = carts.reduce((sum,cart) => {
        for ( const item of cart.items) {
            const product = products.find(product => product.id === item.productId);
            if(!product) {
                console.log('Product does not exist')
                continue
            }
            sum[item.productId] = (sum[item.productId] ?? 0) + (product.price * item.quantity)
        }
        return sum
    },{} as Record<string,number>)

    const entries = Object.entries(revenueData);
    const sortedData = entries.sort(
        (a,b) => b[1] - a[1]
    );
    const top3 = sortedData.slice(0, 3);
    return top3
    .map(item => findProductById(Number(item[0])))
    .filter(product => product !== undefined);
        
    }

// console.log(getTop3ProductsByRevenue())

interface Order {
    id: number;
    customerName: string;
    items: CartItem[];
    total: number;
}

const orders: Order[] = [];

function checkoutCart(
    cartId: number
): Order | undefined {
    if(cartId <= 0) {
        console.log('Input is not valid');
        return
    }
    const cart = getCartById(cartId);
    if(!cart) {
        console.log('Cart does not exist');
        return
    }
    const cartTotal = getCartTotal(cartId);

    const newOrder:Order={
        id: orders.length + 1,
        customerName:cart.customerName,
        items:cart.items,
        total:cartTotal,
    }
    orders.push(newOrder);

    const indexOfCart = carts.findIndex(cart => cart.id === cartId);
    if (indexOfCart !== -1) {
    carts.splice(indexOfCart, 1);
    }

    return newOrder
}

console.log(checkoutCart(2))