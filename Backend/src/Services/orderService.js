const orderModel = require('../Models/orderModel');

const getAllOrders = async () => {
    try {
        const orders = await orderModel.getAllOrders();
        return orders;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getDetailOrderByID = async (id) => {
    try {
        const order = await orderModel.getDetailOrderByID(id);
        return order;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    getAllOrders,
    getDetailOrderByID,
};