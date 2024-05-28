import { FaGoogle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";

const SocialLogin = () => {
    const {googleSignIn} = useAuth();
    const axiosPublic = useAxiosPublic();

    const handleGoogleSignIn = ()=> {
        googleSignIn()
        .then(res => {
            console.log(res.user)
            const userInfo = {
                email: res.user?.email,
                name: res.user?.displayName
            }
            axiosPublic.post("/users", userInfo)
            .then(res => {
                console.log(res)
            })
            console.log(userInfo)
        })
    }
    return (
        <div className="p-8" >
            <button onClick={handleGoogleSignIn} className="btn btn-square btn-outline">
               <FaGoogle></FaGoogle>
            </button>
        </div>
    );
};

export default SocialLogin;