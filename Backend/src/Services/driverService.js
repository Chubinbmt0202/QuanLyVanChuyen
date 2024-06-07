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

module.exports = {
    loginDriverService,
    getDetailDriverService
};
