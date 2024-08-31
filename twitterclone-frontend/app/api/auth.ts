"use server"

import { cookies } from "next/headers"

export async function login(username: string) {
    cookies().set("username", username)
}

export async function logout() {
    cookies().delete("username")
}