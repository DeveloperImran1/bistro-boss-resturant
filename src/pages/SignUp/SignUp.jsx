import { useContext } from "react";
import { useForm } from "react-hook-form"
import { AuthContext } from "../../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin";
const SignUp = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

  
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate()
    const onSubmit = (data) => {
        // user create hobe.
        createUser(data.email, data.password)
        .then(res => {
            console.log(res)

            // displayName and profele pic update or add hobe.
            updateUserProfile(data.name, data.photo)
            .then(res => {

                // DB te user er info add korbo
                const userInfo = {name: data.name, email: data.email}

                axiosPublic.post('/users', userInfo)
                .then(res => {
                    if(res.data.insertedId){

                        // toast dekhabo.
                        console.log("Data is updated")
                        Swal.fire("Profile successfully created!");
                        navigate("/")
                    }
                })

            })
            .catch( err => console.log(err))
        })
      
    }

    console.log(watch("example")) // watch input value by passing the name of it


    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sign Up!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" {...register("name", { required: true })} placeholder="name" className="input input-bordered" />
                            {errors.name && <span className="text-red-500" >This field is required</span>}

                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text" name="name" {...register("photo", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                            {errors.photo && <span className="text-red-500" >This field is required</span>}

                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                            {errors.email && <span className="text-red-500" >This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" {...register("password", { required: true, maxLength: 20, minLength: 6, pattern: /^.*(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/ })} placeholder="password" className="input input-bordered" />
                            {errors.password?.type === "required" && <span className="text-red-500" >This field is required</span>}
                            {errors.password?.type === "minLength" && <span className="text-red-500" >Password must be getter than 6 crarecter</span>}
                            {errors.password?.type === "maxLength" && <span className="text-red-500" >Password must be less than 20 crarecter</span>}
                            {errors.password?.type === "pattern" && <span className="text-red-500" >Password must be 1 Uppercase and 1 LowerCase, 1 Digit and 1 Special Charecter </span>}
                     
                        </div>

                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">SignUp</button>
                            <Link to="/login" className="label-text-alt link link-hover">Got to Login page..</Link>
                        </div>

                    </form>
                        <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default SignUp;