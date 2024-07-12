import HttpService from "./Http";

export type UpdateInfoData = {
	userId: string;
	name?: string;
	lastName?: string;
	email?: string;
	userName?: string;
	password?: string;
};

export class UserService {
	static async updateInfo({
		userId,
		name,
		lastName,
		email,
		userName,
		password,
	}: UpdateInfoData) {
		const response = await HttpService.patch(`/users/${userId}`, {
			name,
			lastName,
			userName,
			email,
			password,
		});
		return response;
	}
}
