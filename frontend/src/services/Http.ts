import axios, { AxiosInstance } from "axios";
import { API_BASE_URL } from "../environment";
class Http {
	private static instance: Http;
	private axiosInstance: AxiosInstance;

	constructor() {
		this.axiosInstance = axios.create({
			baseURL: API_BASE_URL,
			responseType: "json",
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	public static getInstance(): Http {
		if (!Http.instance) {
			Http.instance = new Http();
		}
		return Http.instance;
	}

	public async get(
		resource: string,
		headers?: Record<string, string>,
		isRefreshing?: boolean
	): Promise<any> {
		try {
			const res = await this.axiosInstance.get(resource, {
				headers: {
					...headers,
				},
			});
			return res.data;
		} catch (err) {
			console.log({ err });
			throw err;
		}
	}

	public async post(
		resource: string,
		data: any,
		headers?: Record<string, string>
	): Promise<any> {
		try {
			const res = await this.axiosInstance.post(resource, data, {
				headers: {
					...headers,
				},
			});
			return res;
		} catch (err) {
			throw err;
		}
	}

	public async patch(
		resource: string,
		data: any,
		headers?: Record<string, string>
	): Promise<any> {
		try {
			const res = await this.axiosInstance.patch(resource, data, {
				headers: {
					...headers,
				},
			});
			return res;
		} catch (err) {
			throw err;
		}
	}

	public async delete(
		resource: string,
		headers?: Record<string, string>
	): Promise<any> {
		try {
			const res = await this.axiosInstance.delete(resource, {
				headers: {
					...headers,
				},
			});
			return res;
		} catch (err) {
			throw err;
		}
	}
}

const HttpService = Http.getInstance();
export default HttpService;
