"use server";

import { cookies } from "next/headers";

export async function login(username: string) {
	cookies().set("username", username);
}

export async function logout() {
	cookies().delete("username");
}

export async function getSelf() {
	const username = cookies().get("username")?.value;
	if (!username) return;
	// TODO: get profile picture

	return {
		username,
		image: "",
	};
}
