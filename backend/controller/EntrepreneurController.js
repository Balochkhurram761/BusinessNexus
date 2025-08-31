import Entrepreneur from "../model/Entrepreneurs.js";

export const uploadEntre = async (req, res) => {
  try {
    const { name, startup, pitchSummary } = req.body;
    const userId = req.user?.id;
    // Validation
    if (!name || !startup || !pitchSummary || !userId) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, startup, pitchSummary) are required",
      });
    }

    const entrepre = new Entrepreneur({
      name,
      startup,
      pitchSummary,
      userId,
    });
    await entrepre.save();

    res.status(201).json({
      success: true,
      message: "Entrepreneur uploaded successfully",
      data: entrepre,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload entrepreneur",
      error: error.message,
    });
  }
};

export const getEnterpreun = async (req, res) => {
  try {
    const { userId } = req.params; // ✅ userId from URL params

    if (!userId) {
      return res.status(400).send({
        success: false,
        message: "userId is required",
      });
    }

    // 🔍 Find entrepreneur by the userId field
    const user = await Entrepreneur.find({ userId }).populate("userId");

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Entrepreneur not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Entrepreneur fetched successfully",
      data: user,
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

export const deleteEntrepreneur = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "userId is required",
      });
    }

    const deletedEntrepreneur = await Entrepreneur.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: "Entrepreneur deleted successfully",
      data: deletedEntrepreneur,
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


