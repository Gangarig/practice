export {} 
interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    category: string;
    isActive: boolean;
}

const products: Product[] = [
    { id: 1, name: "Laptop", price: 1200, stock: 5, category: "Electronics", isActive: true },
    { id: 2, name: "Mouse", price: 25, stock: 50, category: "Electronics", isActive: true },
    { id: 3, name: "Desk", price: 300, stock: 10, category: "Furniture", isActive: true },
    { id: 4, name: "Chair", price: 150, stock: 15, category: "Furniture", isActive: true },
    { id: 5, name: "Coffee", price: 8, stock: 100, category: "Food", isActive: true }
];

interface InventoryStats {
    totalProducts: number;
    activeProducts: number;
    totalStock: number;
    totalInventoryValue: number;
}

function getInventoryStats(): InventoryStats{
    const stats : InventoryStats = products.reduce((total,product) => { 
        total.totalProducts = (total.totalProducts ?? 0) + 1;
        product.isActive === true ? total.activeProducts = (total.activeProducts ?? 0 ) + 1 : total.activeProducts;
        total.totalStock = (total.totalStock ?? 0 ) + product.stock ;
        total.totalInventoryValue = (total.totalInventoryValue ?? 0) + (product.price * product.stock) ;
        return total
    },{
    totalProducts: 0,
    activeProducts: 0,
    totalStock: 0,
    totalInventoryValue: 0,
    } as InventoryStats )
    return stats
}
// console.log(getInventoryStats())


function getProductsByCategory(
    category:string
): Product[] {
        return products.filter(
        product => product.category.toLowerCase() === category.toLowerCase());
}

// console.log(getProductsByCategory('electronics'))
// console.log(getProductsByCategory('Electronics'))
// console.log(getProductsByCategory('ELECTRONICS'))

function getLowStockProducts(
    threshold:number
): Product[] | undefined{
    if(threshold <= 0) {
        console.log('Input invalid')
        return 
    }
    return products.filter(product => product.stock <= threshold);
}

// console.log(getLowStockProducts(30))

function restockCategory(
    category:string,
    amount:number
): Product[] | undefined {
    if(category === '' || amount <= 0) {
        console.log('Input invalid');
        return 
    }
    const productsByCategory : Product[] = getProductsByCategory(category);
    if (productsByCategory.length === 0) {
        console.log('Category does not exist')
        return
    }
    for (const item of productsByCategory) {
        item.stock = item.stock + amount;
    }
    return productsByCategory
}

console.log(restockCategory('electronics',5))