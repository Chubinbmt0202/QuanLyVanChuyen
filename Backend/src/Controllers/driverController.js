const driverService = require('../Services/driverService');

const loginDriverController = async (req, res) => {
    const { SDT, PassWord, ID_role } = req.body;
    console.log(req.body)
    console.log(SDT, PassWord, ID_role)
    try {
        const driver = await driverService.loginDriverService(SDT, PassWord, ID_role);
        if (driver) {
            res.json({ success: true, user: driver });
        } else {
            res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error logging in driver", error });
    }
}

const getDetailDriverController = async (req, res) => {
    const { SDT } = req.body;
    try {
        const driver = await driverService.getDetailDriverService(SDT);
        if (driver) {
            res.json(driver);
        } else {
            res.status(404).json({ message: "Driver not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error getting driver details", error });
    }
}

module.exports = {
    loginDriverController,
    getDetailDriverController
};