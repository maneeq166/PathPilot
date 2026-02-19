
import axios from "axios";
import { toast } from "react-toastify";
import serverUrl from "@/config/server";

export const register = async (username:string,email:string,password:string) =>{
    try {
        console.log(serverUrl);
        
        const result = await axios.post(`${serverUrl}auth/register`,{
            username,
            email,
            password
        });

        console.log(result);
        

        return result.data;
    } catch (error) {
        console.log(error);
        return toast.error("Something went wrong");
    }
}

export const login = async (email: string, password: string) => {
    try {
        const result = await axios.post(`${serverUrl}auth/login`, {
            email,
            password
        });

        return result.data;
    } catch (error) {
        console.log(error);
        return toast.error("Something went wrong");
    }
}
