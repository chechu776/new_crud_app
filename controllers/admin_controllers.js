import { response } from "express";
import userModel from "../models/users.js";
import productModel from "../models/products.js";
import bcrypt from "bcrypt"

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
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).send("Incorrect password");
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
        const {name,phone,email,password}=req.body;
        const salt = 10
        const hashedPassword=await bcrypt.hash(password, salt)
        
        const user = new userModel({
            name,
            phone,
            email,
            password: hashedPassword,
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
            message: "User deleted successfully"
        }
        res.status(200).json({ message: "user deleted succesfully", success: true })
    }
    catch (err) {
        res.json({ message: err.message, type: "danger" })
    }
}

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ success: false });
        }
        res.json({ success: true });
    });
};

const addprod = async(req,res)=>{
    try {
        const products = await productModel.find();
        res.render("add_products", { title: "Add Products", products: products })
    }
    catch (err) {
        res.json({ message: err.message });
    }
}

const addproduct =async(req,res)=>{
    try {
        const {name,price,description,brand}=req.body;
        const product = new productModel({
            name,
            price,
            description,
            brand,
        });
        await product.save()
        req.session.message = {
            type: "success",
            message: "product added succesfully"
        }
        res.redirect("/showproducts")
    }
    catch (err) {
        res.json({ message: err.message, type: "danger" })
    }
}

const showproduct =async(req,res)=>{
    try {
        const products = await productModel.find();
        res.render("show_products", { title: "products page", products: products })
    }
    catch (err) {
        res.json({ message: err.message });
    }
}

const editproduct = async(req,res)=>{
    try {
        const products = await productModel.findById(req.params.id);
        res.render("edit_product", { title: "Edit product", products:products })
    }
    catch (err) {
        res.status(500).send("product not found")
    }
}

const updateproduct = async(req,res)=>{
    let id = req.params.id
    try {
        await productModel.findByIdAndUpdate(id, {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            brand: req.body.brand
        })
        req.session.message = {
            type: "success",
            message: "Product Updated successfully"
        }
        res.redirect("/showproducts")
    }
    catch (err) {
        res.json({ message: err.message, type: "danger" })
    }
}

const delproduct = async(req,res)=>{
    let id = req.params.id;
    try {
        await productModel.findByIdAndDelete(id)
        req.session.message = {
            type: "success",
            message: "Product deleted successfully"
        }
        res.status(200).json({ message: "Product deleted succesfully", success: true })
    }
    catch (err) {
        res.json({ message: err.message, type: "danger" })
    } 
}


export { login, log, adm, add, ad, edit, update, del, logout,showproduct,addproduct,addprod,updateproduct,delproduct,editproduct}