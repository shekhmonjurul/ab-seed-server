import express from "express";
import cors from "cors";
import morgan from "morgan";
import orderRoutes from "./modules/order/order.route.js";
import errorMiddleware from "./middleware/error.middleware.js";
import fraudCheckerRoute from "./modules/fraudchecker-api/fraudchecker.route.js"
import bodyParser from "body-parser";
import weborderRoute from "./modules/web-order/weborder.route.js"

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


// Home route
app.get("/", (req, res)=>{
    res.status(200).json({home: "Ab Seed Company"})
})
// Routes
// order api
app.use("/api/orders", orderRoutes);

// web order api
app.use("/api/weborders", weborderRoute)

// fraud checker api
app.use("/api/fraudchecker", bodyParser.json(), fraudCheckerRoute)

// Error handling
app.use(errorMiddleware);

export default app;
