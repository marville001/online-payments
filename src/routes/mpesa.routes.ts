import express, { NextFunction, Request, Response } from "express"
import { stkPushController } from "../controllers/mpesa.controllers"

const router = express.Router()

router.post('stk-push', stkPushController)

export default router