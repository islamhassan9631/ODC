const express = require("express")
const app = express()
const cookieSession = require("cookie-session")
const passport= require("passport")
// const passportSetup=require("../midel/passport")

require("../db/connect")
app.use(cookieSession({name: "session", keys:[process.env.KEYS],maxAge:24 * 60 * 60 *100}))
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())

const userRoutes = require("../routes/user.routes")
const postRoutes = require("../routes/post.routes")
const authRoutes = require("../routes/auth.routes")
const cartRoutes = require("../routes/cart.routes")
const prodcutRoutes = require("../routes/prodcut.routes")
const reviewsRoute=require("../routes/review.routes")
const categoryRoutes=require("../routes/category.routes")
const couponRoutes = require("../routes/coupon.routes")
const commentRoutes = require("../routes/comment.routes")
const convRoutes= require("../routes/converstion.routes")
const messageRoutes=require("../routes/message.routes")
const storeRoutes = require("../routes/store.routes")
const quizRoutes=require("../routes/quiz.routes")
const orderRoutes= require("../routes/order.routes")
app.use("/api/order",orderRoutes)
app.use("/api/quiz",quizRoutes)
app.use("/api/store",storeRoutes)
app.use("/api/message", messageRoutes)
app.use("/api/conv",convRoutes)
app.use("/api/comment", commentRoutes)
app.use("/api/coupon",couponRoutes)
app.use("/api/review", reviewsRoute)
app.use("/api",  userRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api", authRoutes)
app.use("/api/category", categoryRoutes)
app.use("/api/post", postRoutes)
app.use("/api/prodcut", prodcutRoutes)
app.all("*", (req, res)=> {
    res.status(404).send({
        apisStatus:false,
        message:"Invalid URL",
        data: {}
    })
})
module.exports=app