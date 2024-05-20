const trafficModel = require("../Models/trafficModel");

const getAllTraffics = async () => {
  try {
    const users = await trafficModel.getAllTraffics();
    return users;
  } catch (error) {
    throw error;
  }
};
const addTrafficsService = async ({ Bien_so, Suc_Chua, Tinh_Trang, Chieu_dai, Ngay_DK, Ngay_Het_DK, Chieu_rong, Chieu_cao, ten_loai_xe, Hang_xe }) => {
  if (!Bien_so || !Suc_Chua || !Chieu_dai || !Ngay_DK || !Ngay_Het_DK || !Chieu_rong || !Chieu_cao || !ten_loai_xe || !Hang_xe) {
      throw new Error("All fields are required.");
  }
  try {
      const userId = await trafficModel.addTraffics(Bien_so, Suc_Chua, Tinh_Trang, Chieu_dai, Ngay_DK, Ngay_Het_DK, Chieu_rong, Chieu_cao, ten_loai_xe, Hang_xe);
      return userId;
  } catch (error) {
      throw error;
  }
}

const getTrafficById = async (id) => {
  return await trafficModel.getTrafficById(id);
};

module.exports = {
  getAllTraffics,
  addTrafficsService,
  getTrafficById
};
