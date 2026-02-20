
import axios from "axios";
import { toast } from "react-toastify";

export const register = async (username: string, email: string, password: string) => {
    try {        
        const result = await axios.post("http://localhost:4000/api/auth/register", {
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
        const result = await axios.post("http://localhost:4000/api/auth/login", {
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
