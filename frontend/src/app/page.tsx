"use client";

import { toast } from "@/components/ui/use-toast";
import { UserService } from "@/services/user.service";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
	const router = useRouter();
	const [userId, setUserId] = useState<string | null>(null);
	useEffect(() => {
		(async () => {
			const userId = await sessionStorage.getItem("userId");
			setUserId(userId);
		})();
	}, []);

	const formik = useFormik({
		initialValues: {
			name: "",
			lastName: "",
			userName: "",
			email: "",
			password: "",
		},
		validate: (values) => {
			const error = {} as any;

			if (
				values.email &&
				!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
			) {
				error.email = "Enter a valid email address";
			}

			if (values.password && values.password.length < 10) {
				error.password = "Password must be at least 10 characters long";
			}

			return error;
		},
		onSubmit: async (values) => {
			const valuesToArray = Object.entries(values);
			const valuesToSubmitArray = valuesToArray.filter(
				(item) => item[1] !== ""
			);
			const valuesToSubmit = Object.fromEntries(valuesToSubmitArray);
			try {
				if (Object.values(values).join("").length > 0 && userId) {
					const response = await UserService.updateInfo({
						userId: userId,
						...valuesToSubmit,
					});
					formik.resetForm();
					toast({
						title: "Success",
						description: "Your info has been updated successfully",
					});
				}
			} catch (error: any) {
				if (error.response.data.message === "Username already exists") {
					toast({
						title: "Invalid username",
						description: error.response.data.message,
					});
				} else if (error.response.data.message === "Email already exists") {
					toast({
						title: "Invalid email",
						description: error.response.data.message,
					});
				} else {
					toast({
						title: "Error",
						description: "Error, try again",
					});
				}
			}
		},
	});

	if (!userId) {
		return (
			<main className="flex flex-col justify-center items-center h-screen px-5">
				<h1 className="text-[30px] md:text-[80px]">You are no logged</h1>
				<section className="flex flex-col md:flex-row gap-3">
					<Link
						className="mt-6 border text-center border-blue-500 text-white bg-blue-500 rounded-md p-2 w-[150px] mx-auto"
						href="/login"
					>
						Login
					</Link>
					<Link
						className="mt-6 border text-center border-blue-500 text-white bg-blue-500 rounded-md p-2 w-[150px] mx-auto"
						href="/register"
					>
						Sing up
					</Link>
				</section>
			</main>
		);
	}

	return (
		<main className="max-w-[1000px] flex flex-col mx-auto items-center justify-center min-h-screen mb-5 px-5">
			<h1 className="text-[30px] md:text-[50px] max-w-max text-center">
				Update your info
			</h1>

			<form
				onSubmit={formik.handleSubmit}
				className="flex flex-col mt-10 w-full max-w-[400px] gap-3"
			>
				<div className="flex flex-col">
					<label id="name">Name</label>
					<input
						className={`border ${
							formik.touched.name && Boolean(formik.errors.name)
								? "border-red-500"
								: "border-blue-500"
						} rounded-md p-2 mt-1`}
						id="name"
						type="text"
						name="name"
						onChange={formik.handleChange}
						value={formik.values.name}
					/>
					{formik.touched.name && formik.errors.name ? (
						<p className="text-red-500">{formik.errors.name}</p>
					) : null}
				</div>

				<div className="flex flex-col">
					<label id="lastName">Last Name</label>
					<input
						className={`border ${
							formik.touched.lastName && Boolean(formik.errors.lastName)
								? "border-red-500"
								: "border-blue-500"
						} rounded-md p-2 mt-1`}
						id="lastName"
						type="text"
						name="lastName"
						onChange={formik.handleChange}
						value={formik.values.lastName}
					/>
					{formik.touched.lastName && formik.errors.lastName ? (
						<p className="text-red-500">{formik.errors.lastName}</p>
					) : null}
				</div>

				<div className="flex flex-col">
					<label id="userName">Username</label>
					<input
						className={`border ${
							formik.touched.userName && Boolean(formik.errors.userName)
								? "border-red-500"
								: "border-blue-500"
						} rounded-md p-2 mt-1`}
						id="userName"
						type="text"
						name="userName"
						onChange={formik.handleChange}
						value={formik.values.userName}
					/>
					{formik.touched.userName && formik.errors.userName ? (
						<p className="text-red-500">{formik.errors.userName}</p>
					) : null}
				</div>

				<div className="flex flex-col">
					<label id="email">Email</label>
					<input
						className={`border ${
							formik.touched.email && Boolean(formik.errors.email)
								? "border-red-500"
								: "border-blue-500"
						} rounded-md p-2 mt-1`}
						id="email"
						type="text"
						name="email"
						onChange={formik.handleChange}
						value={formik.values.email}
					/>
					{formik.touched.email && formik.errors.email ? (
						<p className="text-red-500">{formik.errors.email}</p>
					) : null}
				</div>

				<div className="flex flex-col">
					<label>New Password</label>
					<input
						className={`border ${
							formik.touched.password && Boolean(formik.errors.password)
								? "border-red-500"
								: "border-blue-500"
						} rounded-md p-2 mt-1`}
						type="password"
						name="password"
						onChange={formik.handleChange}
						value={formik.values.password}
					/>
					{formik.touched.password && formik.errors.password ? (
						<p className="text-red-500">{formik.errors.password}</p>
					) : null}
				</div>

				<button
					type="submit"
					className="mt-6 border border-blue-500 text-white bg-blue-500 rounded-md p-2 w-[150px] mx-auto"
				>
					Update
				</button>
			</form>
		</main>
	);
}
