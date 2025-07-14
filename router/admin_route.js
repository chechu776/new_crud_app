import express from "express"
import { login,log,adm,add,ad,edit,update,del } from "../controllers/admin_controllers.js";
const router=express.Router();

router.get("/login",log)
router.post("/login",login)
router.get("/admin-dashboard",adm)
router.post("/add",add)
router.get("/add",ad)
router.get("/edit/:id",edit)
router.post("/update/:id",update)
router.delete("/delete/:id",del)
export default router;