import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure= axios.create({
    baseURL: "https://bistro-boss-server-five-dusky.vercel.app"
})

const useAxiosSecure = () => {
    const {logOut} = useAuth();
    const navigate = useNavigate()


    // request intecceptor to add authorization header for every secure call to api.
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        console.log("request stoped by interceptors", token)
        config.headers.authorization = `Bearer ${token}`;
        return config; 
    }, function (error){
        // Do something with request error
        return Promise.reject(error);
    })


    // interceptors 401 and 403 status
    axiosSecure.interceptors.response.use(function(response){
        return response;
    }, async(error)=> {
        const status = error.response.status;
        console.log("status error in the interceptors", status)

        // for 401 or 403 logout the user and move the user to the login 
        if(status === 401 || status === 403){
            await logOut();
            navigate("/login")
        }
        return Promise.reject(error);
    })


   return axiosSecure;
};

export default useAxiosSecure;