const express=require("express");
const { GetUserProfile, updateUserProfile, changePassword, deleteUserAccount } = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router=express.Router();

router.get("/get-userProfile",authMiddleware,GetUserProfile);

router.put("/update-profile",authMiddleware,updateUserProfile);

router.put("/reset-password",authMiddleware,changePassword);

router.delete("/delete-user",authMiddleware,deleteUserAccount);

module.exports=router;