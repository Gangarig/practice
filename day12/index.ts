
interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    category: string;
    isActive: boolean;
}

const products: Product[] = [
    {
        id: 1,
        name: "Laptop",
        price: 1200,
        stock: 5,
        category: "Electronics",
        isActive: true
    },
    {
        id: 2,
        name: "Mouse",
        price: 25,
        stock: 50,
        category: "Electronics",
        isActive: true
    },
    {
        id: 3,
        name: "Keyboard",
        price: 80,
        stock: 20,
        category: "Electronics",
        isActive: false
    },
    {
        id: 4,
        name: "Desk",
        price: 300,
        stock: 10,
        category: "Furniture",
        isActive: true
    },
    {
        id: 5,
        name: "Chair",
        price: 150,
        stock: 15,
        category: "Furniture",
        isActive: true
    },
    {
        id: 6,
        name: "Coffee",
        price: 8,
        stock: 100,
        category: "Food",
        isActive: true
    },
    {
        id: 7,
        name: "Tea",
        price: 5,
        stock: 80,
        category: "Food",
        isActive: true
    }
];

function getProductNames () {
return products.map(product => product.name)
}
// console.log(getProductNames())

function getProductLabels(){
    return products.map(product => ({
    name: product.name,
    price: product.price
    }))
}
// console.log(getProductLabels())

function totalValueOfInevtory () {
    return products.reduce((total, product) => 
    total = total + product.price * product.stock
, 0)
}
// console.log(totalValueOfInevtory())

interface InventorySummary {
    totalProducts: number;
    totalStock: number;
    totalValue: number;
}
// function getInventorySummary():InventorySummary{
//     const totalProducts = products.length;
//     const totalStock = products.reduce((total,product)=>
//     total += product.stock ,0 )
//     const totalValue = products.reduce((total,product)=>
//     total += product.price*product.stock ,0)
//     return {
//         totalProducts:totalProducts,
//         totalStock:totalStock,
//         totalValue:totalValue
//     }
// }
function getInventorySummary(): InventorySummary {
    return products.reduce(
        (summary, product) => {
            summary.totalProducts += 1;
            summary.totalStock += product.stock;
            summary.totalValue += product.price * product.stock;

            return summary;
        },
        {
            totalProducts: 0,
            totalStock: 0,
            totalValue: 0
        }
    );
}
// console.log(getInventorySummary())

function getProductsSortedByPrice() {
    const sortedProducts =  [...products].sort((a,b) => (b.price - a.price))
    return sortedProducts

}

// console.log(getProductsSortedByPrice())

function getActiveProductNamesSortedByPrice() {
    return products.filter(product => product.isActive === true).sort((a,b) => a.price - b.price).map(product => product.name)
}

// console.log(getActiveProductNamesSortedByPrice())

function groupProductsByCategory():Record<string, string[]> {
    return products.reduce((sortedProducts,product) => {
        if(product.isActive === true) {
        if(sortedProducts[product.category]) {
            sortedProducts[product.category].push(product.name)
        } else {
            sortedProducts[product.category]=[];
            sortedProducts[product.category].push(product.name)
        }
        }
        return sortedProducts
    },{} as Record<string,string[]>)
}

function totalValueOfProductsByCategory():Record<string,number> {
    return products.reduce((summary,product) => {
        if(summary[product.category]) {
            summary[product.category] = summary[product.category] + product.price*product.stock
        } else {
            summary[product.category] = product.price*product.stock
        }
    return summary
    },{
    } as Record <string,number> )
}

// console.log(totalValueOfProductsByCategory())

// console.log(groupProductsByCategory())


function groupProductsByCategoryFullProducts():Record<string,Product[]> {
    return products.reduce((summary,product)=> {
        if(!summary[product.category]) {
            summary[product.category] = [];
        }
            summary[product.category].push(product);

        return summary
    },{}as Record <string,Product[]>)
}

// console.log(groupProductsByCategoryFullProducts())

function getMostExpensiveProduct(): Product | undefined {
    return products.reduce((expensive,product)=>{
        if(expensive.price < product.price) {
            expensive = product;
        }
    return expensive
    })
}

// console.log(getMostExpensiveProduct())


function getCategoryStatistics() :Record <string,
                                         {
                                            productCount:number,
                                            totalStock:number,
                                            totalValue:number
                                         }
                                         >
{
    return products.reduce((result,product) => {
        if(!result[product.category]){
            result[product.category]={
                productCount : 0,
                totalStock : 0,
                totalValue : 0
            }
        }
        result[product.category].productCount = result[product.category].productCount + 1;
        result[product.category].totalStock = result[product.category].totalStock + product.stock ; 
        result[product.category].totalValue = result[product.category].totalValue + product.stock * product.price;
        return result
    },{} as Record <string,
                            {
                               productCount:number,
                               totalStock:number,
                               totalValue:number
                            }
                            >)
}

// console.log(getCategoryStatistics())
function getAveragePriceByCategory(): Record<string, number> | undefined{
    const categoryData : Record<string,{
        totalPrice:number,
        totalCount:number
    }> =  products.reduce((sum,product) => {
        if(sum[product.category]) {
            sum[product.category].totalPrice = sum[product.category].totalPrice + product.price * product.stock;
            sum[product.category].totalCount = sum[product.category].totalCount + product.stock;
        } else {
            sum[product.category] = {
            totalPrice : product.stock * product.price,
            totalCount : product.stock,
            }
        }
        return sum
    },{} as Record <string ,{
        totalPrice:number,
        totalCount:number
    }>)
    const summary: Record<string,number> ={};
    for (const category in categoryData) {
        summary[category] = categoryData[category].totalPrice/categoryData[category].totalCount;
    }
    return summary
}
console.log(getAveragePriceByCategory())


// {
//   Electronics: [
//     "Laptop",
//     "Mouse",
//     "Keyboard"
//   ],
//   Furniture: [
//     "Desk"
//   ]
// }