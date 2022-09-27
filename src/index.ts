import express from "express";
import cors from "cors"

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`API Running on PORT ${PORT}`))