import express from "express"
import { login, log, adm, add, ad, edit, update, del, logout } from "../controllers/admin_controllers.js";
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

export default router;