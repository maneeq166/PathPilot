
import axios from "axios";
import { toast } from "react-toastify";
import serverUrl from "@/config/server";

const apiBase = serverUrl.replace(/\/$/, "");

const decodeJwtPayload = (token: string): { username?: string } | null => {
    try {
        const payload = token.split(".")[1];
        if (!payload) return null;
        let base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
        const pad = base64.length % 4;
        if (pad) {
            base64 += "=".repeat(4 - pad);
        }
        if (typeof atob !== "function") return null;
        const json = atob(base64);
        return JSON.parse(json);
    } catch {
        return null;
    }
};

const buildAuthHeaders = (token?: string | null) => {
    const headers: Record<string, string> = {};
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    return headers;
};

export const register = async (username: string, email: string, password: string) => {
    try {        
        const result = await axios.post(`${apiBase}/api/auth/register`, {
            username,
            email,
            password
        });       

        if (result.data?.success) {
            localStorage.setItem("username", username);
            if (typeof window !== "undefined") {
                window.dispatchEvent(new Event("auth:changed"));
            }
        }

        return result.data;
    } catch (error) {
        console.log(error);
        return toast.error("Something went wrong");
    }
}

export const login = async (email: string, password: string) => {
    try {
        const result = await axios.post(`${apiBase}/api/auth/login`, {
            email,
            password
        });

        if(!result.data.success){
            return toast.error(result.data.message || "Authentication Failed");
        }

        localStorage.setItem("token",result.data.data);
        
        const usernameFromResponse =
            result.data?.username ?? result.data?.data?.username;
        const usernameFromToken = decodeJwtPayload(result.data.data)?.username;
        const resolvedUsername = usernameFromResponse ?? usernameFromToken;

        if (resolvedUsername) {
            localStorage.setItem("username", resolvedUsername);
        }
        if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("auth:changed"));
        }

        return result.data;
    } catch (error) {
        console.log(error);
        return toast.error("Something went wrong");
    }
}

export const uploadResume = async (file: File, token?: string | null) => {
    try {
        const formData = new FormData();
        formData.append("resume", file);

        const headers: Record<string, string> = {
            "Content-Type": "multipart/form-data",
            ...buildAuthHeaders(token),
        };

        const result = await axios.post(`${apiBase}/api/resume/upload`, formData, { headers });
        return result.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getResume = async (token?: string | null) => {
    try {
        const result = await axios.get(`${apiBase}/api/resume`, { headers: buildAuthHeaders(token) });
        return result.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getCurrentUser = async (token?: string | null) => {
    try {
        const result = await axios.get(`${apiBase}/api/auth`, { headers: buildAuthHeaders(token) });
        return result.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateCurrentUser = async (
    updatedData: { username?: string; email?: string; location?: string },
    token?: string | null
) => {
    try {
        const result = await axios.patch(
            `${apiBase}/api/auth`,
            { updatedData },
            { headers: buildAuthHeaders(token) }
        );
        return result.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteCurrentUser = async (token?: string | null) => {
    try {
        const result = await axios.delete(`${apiBase}/api/auth`, {
            headers: buildAuthHeaders(token),
        });
        return result.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const queryUsersAdmin = async (
    params: { email?: string; username?: string },
    token?: string | null
) => {
    try {
        const result = await axios.get(`${apiBase}/api/auth/admin`, {
            headers: buildAuthHeaders(token),
            params,
        });
        return result.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
