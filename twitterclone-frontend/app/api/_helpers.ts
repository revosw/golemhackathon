export function postJson(body: unknown = undefined): RequestInit {
	return {
		body: JSON.stringify(body),
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	};
}
