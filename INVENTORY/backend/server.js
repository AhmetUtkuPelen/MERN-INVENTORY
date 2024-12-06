const dotenv = require("dotenv").config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const UserRouter = require("./Routes/UserRoutes");
const ErrorHandler = require("./Middlewares/ErrorMiddleware");
const cookieParser = require('cookie-parser');
const ProductRouter = require("./Routes/ProductRoutes");
const ContactRouter = require("./Routes/ContactRoutes");
const path = require('path');

const app = express();

//  ! MIDDLEWARES ! \\
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}))
app.use(helmet())
app.use("/uploads",express.static(path.join(__dirname,"uploads")))
app.use(ErrorHandler)
//  ! MIDDLEWARES ! \\

// ! ROUTERS ! \\
app.use("/api/users",UserRouter)
app.use("/api/products",ProductRouter)
app.use("/api/contactUs",ContactRouter)
// ! ROUTERS ! \\

app.get('/', (req,res) => {
    res.send("HOME")
})

const PORT = process.env.PORT || 5555

// ! CONNECT DATABASE + LISTEN TO SERVER ! \\
mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT} !`);
        console.log(`Mongo Db Connection Is Successful !`);
    })
}).catch((error) => {
    console.log(error.message);
})
// ! CONNECT DATABASE + LISTEN TO SERVER ! \\
