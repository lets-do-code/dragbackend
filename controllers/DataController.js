import { FilteredData, Order, Product, User } from "../models/index.js";

// fetch Data with Join
export const getData = async (req, res) => {
    try {
        const users = await User.find();

        //for each user get their orders and the associated products
        // perform a LEFT JOIN on Orders and Products for the found user
        const data = await Promise.all(users.map(async (user) => {
            const userOrders = await Order.find({ userId: user._id }).populate('productId');

            // return a user object with their orders and products
            return {
                user: user.name,
                email: user.email,
                orders: userOrders.map(order => ({
                    orderDate: order.orderDate,
                    // productName: order.productId.name,
                    // productPrice: order.productId.price,
                    productId: order.productId
                }))
            };
        }));

        // send the response with the combined data
        return res.status(200).json({ data: data });

    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch data' });
    }
};



// get user data

export const getUserOrder = async (req, res) => {
    const userName = req.params.username;
    try {
        const user = await User.findOne({ name: userName });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // perform a LEFT JOIN on Orders and Products for the particular user
        const orders = await Order.find({ userId: user._id }).populate('productId');

        const data = {
            user: user,
            orders: orders.map(order => ({
                orderId: order._id,
                orderDate: order.orderDate,
                product: order.productId
            }))
        };

        return res.status(200).json({ data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching data' });
    }
}



// saved filter data

export const saveFilteredData = async (req, res) => {
    const dataToSave = req.body;

    console.log(dataToSave)

    try {

        const saveDataObject = {
            user: {
                name: dataToSave.user.name,
                _id: dataToSave.user._id
            },
            orders: dataToSave.orders.map(order => ({
                orderId: order.orderId,
                orderDate: order.orderDate,
                productId: order.product._id
            }))
        };

        // Create a new document in the FilteredData collection

        const newFilteredData = new FilteredData(saveDataObject);

        console.log("Line 89", newFilteredData)

        // Save to the database
        await newFilteredData.save();

        return res.status(200).json({ message: 'Data saved successfully to MongoDB' });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to save data to MongoDB', error });
    }
}


export const addData = async (req, res) => {
    try {
        // Static Product Data
        const products = [
            { name: 'ToyCar', price: 100 },
            { name: 'Mobile', price: 200 },
            { name: 'Laptop', price: 300 }
        ];

        // Insert Products into the database
        const insertedProducts = await Product.insertMany(products);

        // Static User Data
        const users = [
            { name: 'Shubham', email: 'shubham@gmail.com' },
            { name: 'Abhijeet', email: 'abhijeet@gmail.com' }
        ];

        // Insert Users into the database
        const insertedUsers = await User.insertMany(users);

        // Static Order Data (linking Users with Products)
        const orders = [
            { name: insertedUsers[0].name, userId: insertedUsers[0]._id, productId: insertedProducts[0]._id, orderDate: new Date() },
            { name: insertedUsers[0].name, userId: insertedUsers[0]._id, productId: insertedProducts[1]._id, orderDate: new Date() },
            { name: insertedUsers[1].name, userId: insertedUsers[1]._id, productId: insertedProducts[2]._id, orderDate: new Date() }
        ];

        // Insert Orders into the database
        await Order.insertMany(orders);

        res.status(200).json({ message: 'Static data added successfully' });
    } catch (error) {
        console.error('Error adding data:', error);
        res.status(500).json({ message: 'Error adding static data' });
    }
};