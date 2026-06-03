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

// console.log(restockCategory('electronics',5))

interface CategoryStats {
    category: string;
    productCount: number;
    totalStock: number;
    totalValue: number;
}
function getCategoryStats():CategoryStats []{
    const category =  products.reduce((total,product)=> {
        if(total[product.category]) {
            total[product.category].category = product.category,
            total[product.category].productCount = (total[product.category].productCount ?? 0) + 1;
            total[product.category].totalStock = (total[product.category].totalStock ?? 0)+ product.stock;
            total[product.category].totalValue = (total[product.category].totalValue ?? 0) + (product.price * product.stock);
        } else {
            total[product.category] = {
                category:product.category,
                productCount : 1,
                totalStock : product.stock,
                totalValue : product.price * product.stock,
            }
        }
    return total
    },{} as Record <string,CategoryStats> )
    return Object.values(category)
}

// console.log(getCategoryStats())

interface CategorySummary {
    category: string;
    averagePrice: number;
    mostExpensiveProduct: string;
}

function getCategorySummary():CategorySummary[]{
    const summary = products.reduce((total,product)=> {
        if(total[product.category]) {
            total[product.category].category = product.category,
            total[product.category].sumPrice = (total[product.category].sumPrice ?? 0) + product.price;
            total[product.category].productCount = (total[product.category].productCount ?? 0) + 1;
            if(total[product.category].mostExpensiveProductPrice < product.price) { 
                total[product.category].mostExpensiveProduct = product.name ; 
                total[product.category].mostExpensiveProductPrice = product.price;  
            }   

            
        } else {
            total[product.category] = {
                category: product.category,
                sumPrice : product.price,
                productCount : 1,
                mostExpensiveProduct: product.name,
                mostExpensiveProductPrice:product.price,
            }
        }
        return total
    },{} as Record <string , {
        category:string,
        sumPrice:number,
        productCount:number,
        mostExpensiveProduct:string,
        mostExpensiveProductPrice:number
    }>)
    const summaryData : CategorySummary[] = [];
    for ( const product of Object.values(summary)) {
        summaryData.push({
            category:product.category,
            averagePrice:product.sumPrice/product.productCount,
            mostExpensiveProduct:product.mostExpensiveProduct,
        })
    }
    return summaryData
    
}
function findProductByName(name:string) {
    return products.find(product => 
    { 
        if(product.name.toLocaleLowerCase() === name.toLocaleLowerCase()){ return product.name;

    }})
}
function findProductByPrice (price:number) {
    return products.find(product => {
        if(price === product.price){
            return product.name
    }
    })
}

console.log(getCategorySummary())
