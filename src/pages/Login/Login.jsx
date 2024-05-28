import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const Login = () => {

    const [disabled, setDisabled] = useState(true);
    const {signIn}= useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    useEffect(()=> {
        loadCaptchaEnginge(6); 
    } ,[])
    const handleSubmit = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        signIn(email, password)
        .then(res => {
            console.log(res.user)
            Swal.fire({
                title: "Good job!",
                text: "You clicked the button!",
                icon: "success"
              });
            
              navigate(from, {replace: true});
        })
    }
    const handleValidationCaptcha = (e)=> {
        const user_captcha_value = e.target.value;
        console.log(user_captcha_value)
        if(validateCaptcha(user_captcha_value)){
            setDisabled(false)
        }
        else{
            setDisabled(true)
        }
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <form onBlur={handleValidationCaptcha} className="form-control">
                            {/* <label className="label"> */}
                            <LoadCanvasTemplate />
                            {/* </label> */}
                            <input type="text" name="captcha" placeholder="Type the captcha above" className="input input-bordered" required />
                        </form>
                        <div className="form-control mt-6">
                            <button disabled={disabled} type="submit"  className="btn btn-primary">Login</button>
                            <Link to="/signUp" className="label-text-alt link link-hover">Got to sign Up page..</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;