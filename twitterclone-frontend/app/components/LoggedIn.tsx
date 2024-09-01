"use client";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth";
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	Popover,
	PopoverButton,
	PopoverPanel,
} from "@headlessui/react";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

interface LoggedInProps {
	self: { username: string; image?: string };
}

export function LoggedIn({ self }: LoggedInProps) {
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
		<div className="flex gap-4 bg-yellow-200 p-2 rounded-full max-w-xl w-full">
			<ProfileImageSwitcher self={self} />
			<div className="flex flex-col justify-evenly">
				<p className="font-bold text-xl">{self.username}</p>
				<p>2 posts</p>
			</div>
			<Dialog open={openForm} onClose={() => setOpenForm(false)}>
				<DialogBackdrop
					transition
					className="transition duration-200 backdrop-blur-lg bg-black/30 opacity-100 data-[closed]:opacity-0"
				/>
				<DialogPanel>
					<div className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-md">
						<form onSubmit={handleSubmit}>
							<div className="mb-4">
								<label
									className="block text-gray-700 text-sm font-bold mb-2"
									htmlFor="username"
								>
									Username
								</label>
								<input
									type="text"
									id="username"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									placeholder="Enter your username"
									required
								/>
							</div>
							<button
								type="submit"
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							>
								Login
							</button>
						</form>
					</div>
				</DialogPanel>
			</Dialog>
		</div>
	);
}

function ProfileImageSwitcher({ self }: { self: LoggedInProps["self"] }) {
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result as string);
			};
			reader.readAsDataURL(file);
			setSelectedImage(file.name);
		}
	};

	const handleUpload = () => {
		// Handle the upload logic (e.g., send the image to the server)
		// On success:
		setOpen(false);
	};

	const handleCancel = () => {
		setSelectedImage(null);
		setPreview(null);
		setOpen(false);
	};

	return (
		<>
			<button className="bg-yellow-300 p-4 rounded-full">
				{self?.image ? (
					<Image width={200} height={200} src={self.image} alt="Profile" />
				) : (
					<UserIcon className="fill-yellow-800 size-8" />
				)}
			</button>
			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogBackdrop
					transition
					className="transition duration-200 backdrop-blur-lg bg-black/30 opacity-100 data-[closed]:opacity-0"
				/>
				<DialogPanel><div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
						<h2 className="text-lg font-bold mb-4">Update Profile Image</h2>
						<div className="mb-4">
							{preview ? (
								<Image src={preview} alt="Selected Profile" width={200} height={200} className="rounded-full object-cover" />
							) : (
								<div className="flex items-center justify-center w-48 h-48 bg-gray-100 rounded-full">
									<UserIcon className="w-24 h-24 text-gray-400" />
								</div>
							)}
						</div>
						<div className="flex flex-col items-center">
							<label
								htmlFor="file-input"
								className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full mb-2"
							>
								Select Image
							</label>
							<input
								id="file-input"
								type="file"
								accept="image/*"
								onChange={handleImageChange}
								className="hidden"
							/>
							{selectedImage && (
								<div className="flex mt-4">
									<button
										className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full mr-2"
										onClick={handleUpload}
									>
										Upload
									</button>
									<button
										className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full"
										onClick={handleCancel}
									>
										Cancel
									</button>
								</div>
							)}
						</div>
					</div></DialogPanel>
			</Dialog>
		</>
	);
}
