import Request from "../model/RequestModel.js";
import Entrepreneur from "../model/Entrepreneurs.js";
import User from "../model/User12.js";
export const requestSend = async (req, res) => {
  try {
    const { entrepreneurId } = req.body;
    const investorId = req.user.id;

    const existingRequest = await Request.findOne({
      investorId,
      entrepreneurId,
    });
    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: "Request already sent",
      });
    }

    const newRequest = new Request({
      investorId,
      entrepreneurId,
      status: "pending",
    });

    await newRequest.save();

    res.status(201).json({
      success: true,
      message: "Request sent successfully",
      data: newRequest,
    });
  } catch (error) {
    console.error("Error sending request:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const getrequest = async (req, res) => {
  try {
    const userId = req.user.id;

    const entrepreneur = await Entrepreneur.find({ userId });
    if (!entrepreneur) {
      return res.status(404).json({
        success: false,
        message: "Entrepreneur project not found for this user",
      });
    }
    const projectIds = entrepreneur.map((e) => e._id);

    const requests = await Request.find({ entrepreneurId:projectIds })
      .populate("investorId", "name email")
      .populate("entrepreneurId", "name startup pitchSummary");

    res.status(200).json({
      success: true,
      message: "Requests fetched successfully",
      data: requests,
    });
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const updaterequest = async (req, res) => {
  try {
   
    const _id = req.params.id;
    const updatedRequest = await Request.findOneAndUpdate(
      { _id },
     
       { $set: req.body },
      {
        new: true,
      }
    );

    if (!updatedRequest) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Data updated successfully",
      requests: updatedRequest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
