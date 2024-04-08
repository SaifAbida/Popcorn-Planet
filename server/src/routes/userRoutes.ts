import express from "express";
import { VerifyLogin } from "../ClassMiddlewares.ts/VerfiyLogin";
import { AdminVerification } from "../ClassMiddlewares.ts/AdminVerification";
import {userValidators} from "../validators/userValidators";
import { ValidationHandler } from "../ClassMiddlewares.ts/ValidationHandler";
import {passwordResetValidators} from "../validators/passwordResetValidators";
import {updateValidators} from "../validators/updateValidators";
import { GetUsers ,GetOneUser,UpdateAllUsers,MakeUserAdmin,DeleteAllUsers , CreateUser, GetUser, UpdateUser,DeleteUser,Login,AddToFavorite,DeleteFromFavorite,ResetPassword ,ResetAllPasswords} from "../ClassControlers.ts/userClassControlers";

const router = express.Router();

// ADMIN ACCESS ONLY : 
router.get("/users", VerifyLogin.verifyLogin, AdminVerification.adminVerification, GetUsers.getUsers);
router.get("/users/:id", VerifyLogin.verifyLogin, AdminVerification.adminVerification, GetOneUser.getOneUser);
router.put("/users/update/:id",VerifyLogin.verifyLogin, AdminVerification.adminVerification,UpdateAllUsers.updateAllUsers);
router.patch("/users/reset/:id",VerifyLogin.verifyLogin, AdminVerification.adminVerification,ResetAllPasswords.resetAllPasswords);
router.patch("/users/admin/:id",VerifyLogin.verifyLogin, AdminVerification.adminVerification,MakeUserAdmin.makeUserAdmin)
router.delete("/users/delete/:id",VerifyLogin.verifyLogin, AdminVerification.adminVerification,DeleteAllUsers.deleteAllUsers);

// AUTHENTIFICATION : 
router.post("/register",userValidators,ValidationHandler.validationHandler, CreateUser.createUser);
router.post("/login", Login.login);

// USER ACCESS : 
router.patch("/reset", VerifyLogin.verifyLogin,passwordResetValidators,ValidationHandler.validationHandler,ResetPassword.resetPassword);
router.put("/update", VerifyLogin.verifyLogin,updateValidators,ValidationHandler.validationHandler, UpdateUser.updateUser);
router.patch("/:movieID", VerifyLogin.verifyLogin, AddToFavorite.addToFavorite);
router.delete("/delete", VerifyLogin.verifyLogin, DeleteUser.deleteUser);
router.delete("/:movieID", VerifyLogin.verifyLogin, DeleteFromFavorite.deleteFromFavorite);
router.get("/profile",VerifyLogin.verifyLogin, GetUser.getUser);

export default router;