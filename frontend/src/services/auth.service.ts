import HttpService from "./Http";

export type LoginData = {
	userName: string;
	password: string;
};

export type RegisterData = {
	name: string;
	lastName: string;
	userName: string;
	email: string;
	password: string;
};

export class AuthService {
	static async login({ userName, password }: LoginData) {
		try {
			const response = await HttpService.post("/auth/login", {
				userName,
				password,
			});

			return response;
		} catch (err) {
			console.log(err);
		}
	}

	static async register({
		name,
		lastName,
		userName,
		email,
		password,
	}: RegisterData) {
		try {
			const response = await HttpService.post("/auth/register", {
				name,
				lastName,
				userName,
				email,
				password,
			});
			return response;
		} catch (error) {}
	}
}
