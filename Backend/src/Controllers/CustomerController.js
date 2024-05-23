const customerService = require("../Services/customerService");

const getAllCustomers = async(req, res) => {
   try
   {
    const customers = await customerService.getAllCustomers();
    res.json(customers);
   } 
   catch (error)
   {
    res.status(500).json({ message: "Error retrieving customer", error });
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