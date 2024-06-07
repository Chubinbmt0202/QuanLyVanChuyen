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
        await orderModel.updateOrderDriver(orderId);
        await orderModel.updateOrderDateDevivery(deliveryDate, orderId);
        await orderModel.updateOrderAddress(addressCustomer, orderId);
        await orderModel.addVehicleId(vehicleId, orderId);
        await orderModel.updateOrderDriverID(driverId, orderId);
    } catch (error) {
        console.log("Lỗi truy service updateOrder", error);
        throw error;
    }
}


const getOrderByIdKH  = async (id) =>
    {
        try {
            const orders = await orderModel.getOrderByIdKH(id);
            return orders;
        } catch (error) {
            console.log(error);
            throw error;
        }  
    }

const getOrderDetailFinisedService = async (id) => {
    try {
        const order = await orderModel.getOrderDetailFinished(id);
        return order;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    getAllOrders,
    getDetailOrderByID,
    updateOrder,
    getOrderByIdKH,
    getOrderDetailFinisedService
};