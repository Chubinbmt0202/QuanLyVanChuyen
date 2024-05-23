const customerModel = require("../Models/customersModel");

const searchCustomerByNameService = async (nameCus) => {
    try {
        const customers = await customerModel.searchCustomerByName(nameCus);
        return customers;
    }
    catch (error) {
        throw error;
    }
}

module.exports =
{
    searchCustomerByNameService
};
