import messageuser from "../model/message.js";
import MessageUser from "../model/message.js";
import User from "../model/User12.js";

let io;

export const setSocketIo = (socketWay) => {
  io = socketWay;
  return io;
};

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user.id;
    const receiverId = req.params.id;
    const { message } = req.body;

    const roomId = [senderId, receiverId].sort().join("_");

    const data = await new MessageUser({
      senderId,
      receiverId,
      roomId,
      message,
    }).save();

    if (io) {
      io.to(roomId).emit("newMessage", data);
    }

    res.status(201).send({
      success: true,
      message: "Message sent successfully",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Server Error",
    });
  }
};
export const sendMessageenter = async (req, res) => {
  try {
    const receiverId = req.user.id;
    const senderId = req.params.id;
    const { message } = req.body;

    const roomId = [senderId, receiverId].sort().join("_");

    const data = await new MessageUser({
      senderId,
      receiverId,
      roomId,
      message,
    }).save();

    if (io) {
      io.to(roomId).emit("newMessage", data);
    }

    res.status(201).send({
      success: true,
      message: "Message sent successfully",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Server Error",
    });
  }
};

export const usershow = async (req, res) => {
  try {
    const uniqueReceivers = await messageuser.distinct("receiverId");

    const users = await User.find({ _id: { $in: uniqueReceivers } }).select(
      "name image"
    );

    res.status(200).send({
      success: true,
      message: "Unique users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const usershowspecific = async (req, res) => {
  try {
    const senderId = req.params.id;
    const users = await User.findById(senderId).select("name image");

    res.status(200).send({
      success: true,
      message: "Unique users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const fetchdata = async (req, res) => {
  try {
    const receiverId = req.params.id;

    const users = await messageuser.find({ receiverId });

    res.status(200).send({
      success: true,
      message: "fetchdata sucessfully",
      data: users,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const fetctsdata = async (req, res) => {
  try {
    const senderId = req.params.id;

    const users = await messageuser.find({ senderId });

    res.status(200).send({
      success: true,
      message: "fetchdata sucessfully",
      data: users,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
