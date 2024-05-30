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

const updateOrder = async (orderId, deliveryDate, driverId, vehicleId, addressCustomer) => {
    try {
        await orderModel.updateOrderDeliveryDate(orderId, deliveryDate);
        await orderModel.updateDriverStatus(driverId, 'Đang bận');
        await orderModel.updateVehicleStatus(vehicleId, 'Đang giao');
        await orderModel.updateOrder(orderId);
        await orderModel.updateOrderDateDevivery(deliveryDate, orderId);
        await orderModel.updateOrderAddress(addressCustomer, orderId);
    } catch (error) {
        console.log("Lỗi truy service updateOrder", error);
        throw error;
    }
}

module.exports = {
    getAllOrders,
    getDetailOrderByID,
    updateOrder
};