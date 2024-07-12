"use client";

import { toast } from "@/components/ui/use-toast";
import { AuthService } from "@/services/auth.service";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Login = () => {
	const router = useRouter();
	const formik = useFormik({
		initialValues: {
			username: "",
			password: "",
		},
		validate: (values) => {
			const error = {} as any;

			if (values.username === "") {
				error.username = "Email or username is required";
			}

			if (values.password === "") {
				error.password = "Password is required";
			}

			return error;
		},
		onSubmit: async (values) => {
			try {
				const response = await AuthService.login({
					userName: values.username,
					password: values.password,
				});

				if (response.data.status === 404) {
					toast({
						title: "Invalid credentials",
						description: "Username or password is incorrect",
					});
				}

				const jwt = response.data.jwt;
				const userId = response.data._id;
				if (jwt) {
					sessionStorage.setItem("jwt", jwt);
					sessionStorage.setItem("userId", userId);
					router.push("/");
				}
			} catch (error) {
				toast({
					title: "Error",
					description: "Try Again",
				});
				console.log({ error });
			}
		},
	});

	return (
		<main className="max-w-[1000px] flex flex-col mx-auto items-center justify-center h-screen px-5">
			<h1 className="text-[30px] md:text-[50px] max-w-max">Login</h1>

			<form
				onSubmit={formik.handleSubmit}
				className="flex flex-col mt-10 w-full max-w-[400px] gap-3"
			>
				<div className="flex flex-col">
					<label id="username">Email or username</label>
					<input
						className={`border ${
							formik.touched.username && Boolean(formik.errors.username)
								? "border-red-500"
								: "border-blue-500"
						} rounded-md p-2 mt-1`}
						id="username"
						type="text"
						name="username"
						onChange={formik.handleChange}
						value={formik.values.username}
					/>
					{formik.touched.username && formik.errors.username ? (
						<p className="text-red-500">{formik.errors.username}</p>
					) : null}
				</div>

				<div className="flex flex-col mt-3">
					<label>Password</label>
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
					className="mt-10 border border-blue-500 text-white bg-blue-500 rounded-md p-2 w-[150px] mx-auto"
				>
					Log in
				</button>
			</form>
		</main>
	);
};

export default Login;
