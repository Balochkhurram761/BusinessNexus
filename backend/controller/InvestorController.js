import Entrepreneur from "../model/Entrepreneurs.js";

export const allEnterpreun = async (req, res) => {
  try {
    const users = await Entrepreneur.find();

    if (users.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No entrepreneurs found",
        data: [],
      });
    }

    res.status(200).send({
      success: true,
      message: "Entrepreneurs fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
