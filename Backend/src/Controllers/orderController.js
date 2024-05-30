const orderService = require('../Services/orderService');

const getAllOrders = async(req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error retrieving orders", error });
    }
};

const getDetailOrderByID = async(req, res) => {
    try {
        const { id } = req.params;
        const order = await orderService.getDetailOrderByID(id);
        res.json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error retrieving order", error });
    }
}

const updateOrderController = async(req, res) => {
    console.log("body", req.body)
    const { orderId, deliveryDate, driverId, vehicleId } = req.body;
    let dateString = deliveryDate.substring(0, 10);
    console.log('orderId, deliveryDate, driverId, vehicleId:', orderId, dateString, driverId, vehicleId);

    try {
      await orderService.updateOrder(orderId, dateString, driverId, vehicleId);
      res.status(200).send({ message: 'Order updated successfully' });
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).send({ message: 'Failed to update order' });
    }
}

module.exports = {
    getAllOrders,
    getDetailOrderByID,
    updateOrderController
};