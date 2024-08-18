const typesVehicleModel = require('../Models/typesVehicleModel');

const getAllVehicleTypes = async () => {
    try {
        const vehicleTypes = await typesVehicleModel.getAllVehicleTypes();
        return vehicleTypes;
    } catch (error) {
        console.log('Lỗi ', error);
        throw error;
    }
}

module.exports = {
    getAllVehicleTypes
};