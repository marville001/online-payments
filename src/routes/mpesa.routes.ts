import express, { NextFunction, Request, Response } from "express"
import { getOAuthToken, lipaNaMpesaOnline } from "../controllers/mpesa.controllers"

const router = express.Router()

//route to get the auth token
router.get('/get-auth-token',getOAuthToken);
router.post('/stk-push', lipaNaMpesaOnline)

export default router