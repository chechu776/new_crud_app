import userModel from "../models/users.js";

const log = async (req, res) => {
    try {
        res.render("login", { title: "login page" })
    }
    catch (err) {
        res.send(err)
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send("Email not found")
        }
        if (!user.role) {
            return res.status(404).send("Access Denied: Not an Admin")
        }
        if (user.password != password) {
            return res.status(404).send("Incorrect password")
        }
        req.session.user = user;
        res.redirect("/admin-dashboard")
    }
    catch (err) {
        console.log(err);

        res.status(404).send(err)
    }
}

const adm = async (req, res) => {
    try {
        const users = await userModel.find();
        res.render("admin-dashboard", { title: "Home page", users: users })
    }
    catch (err) {
        res.json({ message: err.message });
    }
}

const add = async (req, res) => {
    try {
        console.log(req.body);
        const user = new userModel({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password,
        });
        await user.save()
        req.session.message = {
            type: "success",
            message: "user added succesfully"
        }
        res.redirect("/admin-dashboard")
    }
    catch (err) {
        res.json({ message: err.message, type: "danger" })
    }
}
const ad = async (req, res) => {
    res.render("add_user", { title: "Add user" })
}

const edit = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        res.render("edit_user", { title: "Edit user", user: user })
    }
    catch (err) {
        res.status(500).send("user not found")
    }
}

const update = async (req, res) => {
    let id = req.params.id
    try {
        await userModel.findByIdAndUpdate(id, {
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password,
        })
        req.session.message = {
            type: "success",
            message: "User Updated successfully"
        }
        res.redirect("/admin-dashboard")
    }
    catch (err) {
        res.json({ message: err.message, type: "danger" })
    }
}

const del = async (req, res) => {
    let id = req.params.id;
    try {
        await userModel.findByIdAndDelete(id)
        req.session.message = {
            type: "success",
            message:"User deleted successfully"
        }
    }
    catch(err){
        res.json({ message: err.message, type: "danger" })
    }
}

export { login, log, adm, add, ad, edit, update, del }