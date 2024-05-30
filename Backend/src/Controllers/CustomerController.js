const customerService = require("../Services/customerService");

const getAllCustomersController = async(req , res) => {
    try
    {
        const customers = await customerService.getAllCustomersService();
        res.json(customers);
    }
    catch(error)
    {
        res.status(500).json({ message: "Error getting all Customers", error });
    }
}

const searchCustomerByNameController = async(req , res) => 
    {
        const namesearch = req.params.nameCus;
        try
        {
            const customers = await customerService.searchCustomerByNameService(namesearch);
            res.json(customers);
        }
        catch(error)
        {
            res.status(500).json({ message: "Error searching Customer by name", error });
        }
    }

module.exports = {
    getAllCustomersController,
    searchCustomerByNameController
};