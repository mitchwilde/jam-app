import { ConflictError, UnauthorizedError } from "../errors/http_errors";
import { User } from "../models/user";

export async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        if (response.status === 401) {
            throw new UnauthorizedError(errorMessage);
        } else if (response.status === 409) {
            throw new ConflictError(errorMessage);
        } else {
            throw Error("Request failed with status: " + response.status + " and message: " + errorMessage);
        }
    }
};

export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData("/api/users", { method: "GET" });
    return response.json();
}

export async function getLoggedInUserQuiet(): Promise<User> {
    const response = await fetch("/api/users/current", { method: "GET" });
    if (response.ok) {
        return response.json();
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        if (response.status === 401){
            throw new UnauthorizedError(errorMessage);
        } else {
            throw Error("Request failed with status: " + response.status);
        }
    }
}

export interface SignUpCredentials {
    username: string,
    email: string,
    password: string,
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
    const response = await fetchData("/api/users/signup",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}

export interface LoginCredentials {
    username: string,
    password: string,
}

export async function login(credentials: LoginCredentials): Promise<User> {
    const response = await fetchData("/api/users/login",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}

export async function logout() {
    await fetchData("api/users/logout", { method: "POST" });
}