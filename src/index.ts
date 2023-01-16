import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from "../docs/swagger.json";

// Import Routes
import { mpesaRoutes } from "./modules/mpesa/index"

dotenv.config();

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}));

// Routes
app.get('/healthcheck', (req, res) => res.sendStatus(200))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/v1/m-pesa", mpesaRoutes)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`API Running on PORT ${PORT}`))