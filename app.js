import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import mongoStore from "connect-mongo";

import router from "./router/admin_route.js"

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'heheh',
    resave: false,
    saveUninitialized: false,
    store:mongoStore.create({mongoUrl:"mongodb://127.0.0.1:27017/newcrudDb"})
}))
app.use((req,res,next)=>{
    res.locals.message=req.session.message
    delete req.session.message
    next()
})
app.use(router)
app.use(express.static("public"))
app.set("view engine", "ejs")

const Dburl = "mongodb://127.0.0.1:27017/newcrudDb"

mongoose.connect(Dburl).then(() => {
    app.listen(4000)
})

app.use("/",(req,res)=>{
    res.redirect("/login")
})