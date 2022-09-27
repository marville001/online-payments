import express, { NextFunction, Request, Response } from "express"

const router = express.Router()

router.post('stk-push', (req:Request, res:Response, next:NextFunction) => {
	res.send("STK Push DONE")
})

export default router