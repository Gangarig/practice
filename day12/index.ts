//Products
// createProduct()
// updateProduct()
// deleteProduct()
// searchProducts()
// findProductById()
// getProductSummary()
// Product Inventory System
interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    category: string;
    isActive: boolean;
}
interface CreateProductRequest {
    name: string;
    price: number;
    stock: number;
    category: string;
}
interface UpdateProductRequest {
    name?: string;
    price?: number;
    stock?: number;
    category?: string;
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
    }
];
// First MAP Challenge

// Build:

// getProductNames()

// Output:

// [
//   "Laptop",
//   "Mouse",
//   "Keyboard",
//   "Desk"
// ]

// Hint:

// products.map(...)
// First REDUCE Challenge

// Build:

// getTotalInventoryValue()

// Meaning:

// Laptop    1200 * 5
// Mouse       25 * 50
// Keyboard    80 * 20
// Desk       300 * 10

// Calculate total value of all inventory.

// Hint:

// products.reduce(...)
// Harder Reduce

// Build:

// getInventorySummary()

// Return:

// {
//     totalProducts: 4,
//     totalStock: 85,
//     totalValue: 11850
// }

// Tomorrow's order:

// 1. Read about map()
// 2. Read about reduce()
// 3. Build Product CRUD
// 4. Solve map challenge
// 5. Solve reduce challenge

// Do NOT look up solutions immediately.

// Spend 20-30 minutes struggling with map() and reduce() first. That's where the learning happens. 😈🔥

// You're ready for them now.