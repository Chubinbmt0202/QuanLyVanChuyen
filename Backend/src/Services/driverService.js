const driverModel = require('../Models/driverModel');

const loginDriverService = async (SDT, PassWord, ID_role) => {
    try {
        const driver = await driverModel.LoginDriver(SDT, PassWord, ID_role);
        return driver;
    }
    catch (error) {
        throw error;
    }
}

const getDetailDriverService = async (SDT) => {
    try {
        const driver = await driverModel.getDetailDriver(SDT);
        return driver;
    }
    catch (error) {
        throw error;
    }
}

const getDetailOrderService = async (PK_Id_DonHang, ID_TX) => {
    try {
        const order = await driverModel.getDetailOrder(PK_Id_DonHang, ID_TX);
        return order;
    }
    catch (error) {
        throw error;
    }
}

const confirmOrderService = async (PK_Id_DonHang) => {
    try {
        await driverModel.updateOrder(PK_Id_DonHang);
        console.log("Odder đang ở service");
    } catch (error) {
        console.log("Lỗi truy service updateOrder", error);
        throw error;
    }
}

module.exports = {
    loginDriverService,
    getDetailDriverService,
    getDetailOrderService,
    confirmOrderService
};
