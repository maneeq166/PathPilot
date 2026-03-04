
import axios from "axios";
import { toast } from "react-toastify";
import serverUrl from "@/config/server";

const apiBase = serverUrl.replace(/\/$/, "");

export const register = async (username: string, email: string, password: string) => {
    try {        
        const result = await axios.post(`${apiBase}/api/auth/register`, {
            username,
            email,
            password
        });       

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
        };

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const result = await axios.post(`${apiBase}/api/resume/upload`, formData, { headers });
        return result.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getResume = async (token?: string | null) => {
    try {
        const headers: Record<string, string> = {};
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const result = await axios.get(`${apiBase}/api/resume`, { headers });
        return result.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
