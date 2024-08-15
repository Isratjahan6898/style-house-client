import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";


const Login = () => {
  const {signIn,  signInWithGoogle, user}= useContext(AuthContext);
  console.log(user);

  const navigate = useNavigate();
  const location= useLocation();
  const from = location.state?.from?.pathname || '/'


  const handleLogin = event =>{
    event.preventDefault();
    const form = event.target
    const email= form.email.value;
    const password = form.password.value;
    console.log(email, password);

    signIn(email, password)
    .then(result=>{
      const user =result.user;
      console.log(user);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "user joinUs successfully",
        showConfirmButton: false,
        timer: 1500
      });

      navigate(from, {replace: true})
    })

  }

  const handleGoogleLogin = ()=>{
    signInWithGoogle()
    .then(result=>{
     const user = result.user;
     console.log(user);
     Swal.fire({
       position: "top-end",
       icon: "success",
       title: "user register successfully",
       showConfirmButton: false,
       timer: 1500
     });
     navigate(from, {replace: true})
    }) 
    .catch(error=>console.log(error))   
 }

  
    return (
        <div>
             <div className="lg:mx-[200px] my-[60px]">
            <div
  className="hero min-h-screen"
  style={{
    backgroundImage: "url(https://i.ibb.co/vh8NGBp/Fuchsia-Fashion-Trend-Dopamine-Dressing-Instagram-Post.png)",
  }}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
   

<div>

    
    <div>
      <form
       onSubmit={handleLogin}
   
       className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Email</span>
          </label>
          <input type="email" placeholder="email" name="email" className="input text-black input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Password</span>
          </label>
          <input type="password" placeholder="password" name="password" className="input text-black input-bordered" required />
        
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-teal-600 border-0 text-white font-bold">Join Us</button>
        </div>
      </form>

      <div>
        <h1>Continue With</h1>
        <button><FcGoogle
         onClick={handleGoogleLogin}
        className="text-4xl" /></button>
      </div>
      <div>You have not account plz <span className="text-teal-400 font-bold"><Link to='/register'>Register</Link></span></div>
    </div>
 
</div>


    </div>
  </div>
</div>
        </div>
        </div>
    );
};

export default Login;