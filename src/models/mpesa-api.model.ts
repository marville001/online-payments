// import Mpesa from "mpesa-node";
import { Buffer } from 'buffer';
import axios from "axios";
import { getCurrentTimeStamp } from "../utils";
class MpesaApi {
	// mpesaApi: any;
	consumerKey = process.env.MPESA_CONSUMER_KEY ?? "";
	consumerSecret = process.env.MPESA_CONSUMER_SECRET ?? "";

	constructor() {
		// this.mpesaApi = new Mpesa({
		// 	consumerKey: this.consumerKey,
		// 	consumerSecret: this.consumerSecret,
		// })
	}

	async getOAuthToken() {

		let consumer_key = process.env.MPESA_CONSUMER_KEY;
		let consumer_secret = process.env.MPESA_CONSUMER_SECRET;

		let url = process.env.MPESA_OAUTH_TOKEN_URL ?? "";

		//form a buffer of the consumer key and secret
		let buffer = Buffer.from(consumer_key + ":" + consumer_secret);

		let auth = `Basic ${buffer.toString('base64')}`;

		try {

			let { data } = await axios.get(url, {
				"headers": {
					"Authorization": auth
				}
			});

			const token = data['access_token'];
			return token;

		} catch (err) {
			throw err
		}

	};


	async lipaNaMpesaOnline(token: string) {
		return new Promise(async (resolve, reject) => {

			let auth = `Bearer ${token}`;

			//getting the timestamp
			let timestamp = getCurrentTimeStamp();

			const shortCode = process.env.MPESA_LIPA_NA_MPESA_SHORT_CODE
			const passkey = process.env.MPESA_LIPA_NA_MPESA_PASS_KEY

			let password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString('base64');
			let callBackUrl = "your-ngrok-url/mpesa/lipa-na-mpesa-callback";

			try {

				let data = await axios.post(process.env.MPESA_LIPA_NA_MPESA_URL ?? "", {
					"BusinessShortCode": shortCode,
					"Password": password,
					"Timestamp": timestamp,
					"TransactionType": "CustomerPayBillOnline",
					"Amount": '1',
					"PartyA": "254700207054",
					"PartyB": process.env.MPESA_LIPA_NA_MPESA_SHORT_CODE,
					"PhoneNumber": "254700207054",
					"CallBackURL": callBackUrl,
					"AccountReference": "lipa-na-mpesa-tutorial",
					"TransactionDesc": "Testing lipa na mpesa functionality"
				}, {
					"headers": {
						"Authorization": auth
					}
				});

				resolve(data)

			} catch (err: any) {
				// const error = err['response']['statusText']
				reject(err);

			};
		})

	};

}

export default MpesaApi