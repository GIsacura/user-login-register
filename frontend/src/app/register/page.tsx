"use client";

import { AuthService } from "@/services/auth.service";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

const Register = () => {
	const router = useRouter();
	const formik = useFormik({
		initialValues: {
			name: "",
			lastName: "",
			username: "",
			email: "",
			password: "",
		},
		validate: (values) => {
			const error = {} as any;

			if (!values.name) {
				error.name = "Name is required";
			}

			if (!values.lastName) {
				error.lastName = "Last name is required";
			}

			if (!values.username) {
				error.username = "Username is required";
			}

			if (!values.email) {
				error.email = "Email is required";
			} else if (
				!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
			) {
				error.email = "Enter a valid email address";
			}

			if (!values.password) {
				error.password = "Password is required";
			} else if (values.password.length < 10) {
				error.password = "Password must be at least 10 characters long";
			}

			return error;
		},
		onSubmit: async (values) => {
			try {
				const response = await AuthService.register({
					name: values.name,
					lastName: values.lastName,
					email: values.email,
					userName: values.username,
					password: values.password,
				});

				const jwt = response.data.jwt;
				const userId = response.data.userInfo._id;
				if (jwt) {
					sessionStorage.setItem("jwt", jwt);
					sessionStorage.setItem("userId", userId);
					router.push("/");
				}
			} catch (error) {
				console.log({ error });
			}
		},
	});
	return (
		<main className="max-w-[1000px] flex flex-col mx-auto items-center justify-center h-screen mb-5 px-5">
			<h1 className="text-[30px] md:text-[50px] max-w-max">Sign up</h1>

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
					<label id="username">Username</label>
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
					className="mt-6 border border-blue-500 text-white bg-blue-500 rounded-md p-2 w-[150px] mx-auto"
				>
					Sign up
				</button>
			</form>
		</main>
	);
};

export default Register;
