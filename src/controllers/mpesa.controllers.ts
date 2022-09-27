import { RequestHandler } from "express";
import { MpesaApi } from "../models";

export const getOAuthToken: RequestHandler = async (req, res) => {

	const mpesaApi = new MpesaApi();

	try {
		const token = await mpesaApi.getOAuthToken()
		res.json({ token })
	} catch (error) {
		console.log({ error });
		res.status(400).send(error)


	}
}

export const lipaNaMpesaOnline: RequestHandler = async (req, res) => {

	const mpesaApi = new MpesaApi();

	try {
		const token = await mpesaApi.getOAuthToken()
		console.log({token});
		

		const data = await mpesaApi.lipaNaMpesaOnline(token)

		res.send("STK PUSH")
	} catch (error: any) {
		console.log(error.response.data);
		res.status(400).send(error)


	}
}

