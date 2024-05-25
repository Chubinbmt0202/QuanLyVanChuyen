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


module.exports = {
    getAllOrders,
    getDetailOrderByID,
};