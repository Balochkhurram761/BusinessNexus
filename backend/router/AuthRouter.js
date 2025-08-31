import express from "express";
import {
  login,
  profileview,
  Register,
  updateuser,
} from "../controller/AuthController.js";
import { authorizeRoles, tokenverify } from "../middleware/AuthMiddleWares.js";
import { upload } from "../middleware/UploadMiddleWare.js";
import {
  deleteEntrepreneur,
  getEnterpreun,
  uploadEntre,
} from "../controller/EntrepreneurController.js";
import { allEnterpreun } from "../controller/InvestorController.js";
import {
  getrequest,
  requestSend,
  updaterequest,
} from "../controller/requrestController.js";
import {
  fetchdata,
  fetctsdata,
  sendMessage,
  sendMessageenter,
  usershow,
  usershowspecific,
} from "../controller/messageController.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", login);
router.get(
  "/profile/investor/:id",
  tokenverify,

  profileview
);
router.put(
  "/update/:id",
  tokenverify,
  authorizeRoles("investor", "entrepreneur"),
  upload.single("image"),
  updateuser
);

router.post(
  "/entrepreum",
  tokenverify,
  authorizeRoles("investor", "entrepreneur"),
  uploadEntre
);
router.get(
  "/getentrepreum/:userId",
  tokenverify,
  authorizeRoles("investor", "entrepreneur"),
  getEnterpreun
);

router.delete(
  "/deleteEntrepreum/:id",
  tokenverify,
  authorizeRoles("investor", "entrepreneur"),
  deleteEntrepreneur
);
router.get(
  "/allenterprum",
  tokenverify,
  authorizeRoles("investor", "entrepreneur"),
  allEnterpreun
);

router.post(
  "/sendrequest",
  tokenverify,
  authorizeRoles("investor", "entrepreneur"),
  requestSend
);
router.get(
  "/getrequestdata",
  tokenverify,
  authorizeRoles("investor", "entrepreneur"),
  getrequest
);
router.put(
  "/updaterequest/:id",
  tokenverify,
  authorizeRoles("investor", "entrepreneur"),
  updaterequest
);

router.post(
  "/sendmessage/:id",
  tokenverify,
  authorizeRoles("investor", "entrepreneur"),
  sendMessage
);
router.post(
  "/sendmessage/:id",
  tokenverify,
  authorizeRoles("investor", "entrepreneur"),
  sendMessageenter
);
router.get(
  "/getshow",
  tokenverify,
  authorizeRoles("investor", "entrepreneur"),
  usershow
);

router.get(
  "/fetchdata/:id",
  tokenverify,
  authorizeRoles("investor", "entrepreneur"),
  fetchdata
);

router.get(
  "/fetchspecfic/:id",
  tokenverify,
  authorizeRoles("investor", "entrepreneur"),
  usershowspecific
);

router.get(
  "/fetchdata/:id",
  tokenverify,
  authorizeRoles("investor", "entrepreneur"),
  fetctsdata
);

export default router;
