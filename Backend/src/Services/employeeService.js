const employeeModel = require("../Models/employeeModel");


const getAllDriver = async () => {
    try {
        const drivers = await employeeModel.getAllDriver();
        return drivers;
    }
    catch (error) {
        throw error;
    }

}
const getAllEmployee = async () => {
    try {
        const employees = await employeeModel.getAllEmployee();
        return employees;
    }
    catch (error) {
        throw error;
    }
}

const deleteEmployee = async (id) => {
    try {
        await employeeModel.deleteEmployee(id);
        return { message: "Employee deleted successfully." };
    }
    catch (error) {
        throw (error)
    }
}




const addDriverService = async ({ Ten_TX, SDT, Email, NgaySinh, GioiTinh, Tinh_Trang, Id_TaiKhoan }) => {
    if (!Ten_TX || !SDT || !Email || !NgaySinh || !GioiTinh || !Tinh_Trang || !Id_TaiKhoan) {
        throw new Error("All fields are required.");
    }
    try {
        const employeesID = await employeeModel.addDriver(Ten_TX, SDT, Email, NgaySinh, GioiTinh, Tinh_Trang, Id_TaiKhoan);
        return employeesID;
    } catch (error) {
        throw error;
    }
};

const getInforDriverByID = async(id) =>
    {
        try
        {
            const infordriver = await employeeModel.getInforDriverByID(id);
            return infordriver;
        }
        catch(error)
        {
            throw error;
        }
      

    }
module.exports =
{
    getAllDriver,
    getAllEmployee,
    deleteEmployee,
    addDriverService,
    getInforDriverByID,
}
