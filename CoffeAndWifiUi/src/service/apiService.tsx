/* eslint-disable @typescript-eslint/no-explicit-any */
const baseUrl = "http://localhost:5153";


interface RequestOptions {
    path: string;
    method: string;
    body?: any;
}

interface FetchResponse {
    ok: boolean;
    message: string;
    data?: any;
}

export const fetchData = async ({ path, method, body }: RequestOptions) => {
    try {
        const url = `${baseUrl}${path}`;
        const options: RequestInit = {
            method: method,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        };

        if (body !== null && body !== undefined) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);
        const data : FetchResponse = await response.json();
        if (response.ok) {
            return { ok: true, message: data.message, data: data };
        } else {
            return { ok: false, message: data.message };
        }
    } catch (error) {
        return { ok: false, message: "Error: The server is not responding." };
    }
};