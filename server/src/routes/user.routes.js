const express=require("express");
const { GetUserProfile,updateUserProfileUserName, changePassword, deleteUserAccount, updateUserProfileEmail } = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router=express.Router();

router.get("/get-userProfile",authMiddleware,GetUserProfile);

router.put("/update-profile-email",authMiddleware,updateUserProfileEmail);

router.put("/update-profile-username",authMiddleware,updateUserProfileUserName);

router.put("/reset-password",authMiddleware,changePassword);

router.delete("/delete-user",authMiddleware,deleteUserAccount);

module.exports=router;