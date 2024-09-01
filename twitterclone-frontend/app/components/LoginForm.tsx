"use client";
// components/LoginForm.js
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { LoaderIcon } from "react-hot-toast";

interface LoginFormProps {
	open: boolean;
	setOpen: (open: boolean) => void;
}

export function LoginForm() {
	const [openForm, setOpenForm] = useState(false);
	const [username, setUsername] = useState("");

	const mutation = useMutation({
		mutationFn: login,
		onSuccess: (data) => {
			// Handle successful login, maybe redirect or show a message
			console.log("Login successful:", data);
		},
		onError: (error) => {
			// Handle error during login
			console.error("Login error:", error);
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		mutation.mutate(username);
	};

	return (
		<>
			<button onClick={() => setOpenForm(true)} className="h-14 rounded-full bg-yellow-100 text-yellow-950 max-w-xl w-full text-xl font-bold">Log in</button>
			<Dialog open={openForm} onClose={() => setOpenForm(false)}>
				<DialogBackdrop
					transition
					className="fixed inset-0 transition duration-200 backdrop-blur-sm bg-black/30 opacity-100 data-[closed]:opacity-0"
                />
                <div className="fixed inset-0 grid place-content-center">

				<DialogPanel>
					<div className="max-w-sm mx-auto bg-yellow-100 p-6 rounded-lg shadow-md text-yellow-950">
						<form onSubmit={handleSubmit}>
							<div className="mb-4">
								<label
									className="block text-gray-700 text-lg font-bold mb-2"
									htmlFor="username"
                                    >
									Username
								</label>
								<input
									type="text"
									id="username"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									placeholder="Enter your username"
									required
                                    />
							</div>
							<button
								type="submit"
								className="transition w-full bg-yellow-900 hover:bg-yellow-950 rounded-full text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                                >
                                    {mutation.isPending ? <LoaderIcon /> : "Login"}
							</button>
						</form>
					</div>
				</DialogPanel>
                </div>
			</Dialog>
		</>
	);
}
