import express from "express"

import { login, log, adm, add, ad, edit, update, del, logout,addproduct,showproduct,addprod,editproduct,updateproduct,delproduct,status,userhome } from "../controllers/admin_controllers.js";
const router = express.Router();

router.get("/login", log)
router.post("/login", login)

router.use("/", (req, res, next) => {
    if (req.session.user) next()
    else {
        res.render("partials/error.ejs", { title: "error" })
    }
})

router.get("/admin-dashboard", adm)
router.post("/add", add)
router.get("/add", ad)
router.get("/edit/:id", edit)
router.post("/update/:id", update)
router.delete("/delete/:id", del)
router.get("/logout", logout)
router.get("/addprod",addprod)
router.post("/addproducts",addproduct)
router.get("/showproducts",showproduct)
router.get("/editproduct/:id", editproduct)
router.post("/updateproduct/:id", updateproduct)
router.delete("/deleteproduct/:id", delproduct)
router.patch("/status/:id",status)
router.get("/user_home",userhome)

export default router;