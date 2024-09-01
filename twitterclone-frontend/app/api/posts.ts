"use server";

import { cookies } from "next/headers";
import { postJson } from "./_helpers";

export async function createPost(content: string) {
	const user = cookies().get("username");
	await fetch("https://...", postJson(content));
}
