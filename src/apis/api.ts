
import axios from "axios";
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
        const buffer = typeof globalThis !== "undefined" ? (globalThis as any).Buffer : undefined;
        const decode =
            typeof globalThis !== "undefined" && typeof globalThis.atob === "function"
                ? globalThis.atob
                : buffer
                    ? (value: string) => buffer.from(value, "base64").toString("utf-8")
                    : null;
        if (!decode) return null;
        const json = decode(base64);
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

const resolveToken = (payload: unknown): string | null => {
    if (!payload) return null;
    if (typeof payload === "string") return payload;
    if (typeof payload === "object") {
        const record = payload as Record<string, unknown>;
        const token =
            (record.token as string) ||
            (record.accessToken as string) ||
            (record.jwt as string);
        return token ?? null;
    }
    return null;
};

export const register = async (username: string, email: string, password: string) => {
    try {        
        const result = await axios.post(`${apiBase}/api/auth/register`, {
            username,
            email,
            password
        });       

        if (result.data?.success) {
            const token = resolveToken(result.data?.data);
            if (token) {
                localStorage.setItem("token", token);
            }
            localStorage.setItem("username", username);
            if (typeof window !== "undefined") {
                window.dispatchEvent(new Event("auth:changed"));
            }
        }

        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const login = async (email: string, password: string) => {
    try {
        const result = await axios.post(`${apiBase}/api/auth/login`, {
            email,
            password
        });

        if(!result.data.success){
            return null;
        }

        const token = resolveToken(result.data?.data);
        if (token) {
            localStorage.setItem("token", token);
        }
        
        const usernameFromResponse =
            result.data?.username ?? result.data?.data?.username;
        const usernameFromToken = token ? decodeJwtPayload(token)?.username : null;
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
        return null;
    }
}

export const uploadResume = async (
    file: File,
    token?: string | null,
    aiEnabled: boolean = true
) => {
    try {
        const formData = new FormData();
        formData.append("resume", file);
        formData.append("aiEnabled", String(aiEnabled));

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

export const updateResume = async (
    updateData: {
        skills?: Record<string, string[]>;
        experience?: { role: string; company: string; duration: string; description: string }[];
        education?: { degree: string; institution: string; startYear: string; endYear: string }[];
    },
    token?: string | null
) => {
    try {
        const result = await axios.patch(
            `${apiBase}/api/resume`,
            { ...updateData },
            { headers: buildAuthHeaders(token) }
        );
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

export const scrapeJobs = async (
    payload: {
        query: string;
        location?: string;
        limit?: number;
        source?: string;
    },
    token?: string | null
) => {
    try {
        const result = await axios.post(`${apiBase}/api/jobs/scrape`, payload, {
            headers: buildAuthHeaders(token),
        });
        return result.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
