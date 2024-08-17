
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { FcGoogle } from "react-icons/fc";





const Register = () => {
   
    const{creacteUser,updateUserProfile, signInWithGoogle }=useContext(AuthContext);
    console.log(creacteUser,updateUserProfile );
    const navigate = useNavigate();

    
    const handleSignUp= async e =>{
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const name = form.name.value;
        const image = form.image.files[0];
        const password= form.password.value;

     

        const formData =new FormData()
        formData.append('image', image)
    

        

        try{

            
       

        //upload img
           const{ data }= await axios.post(`https://api.imgbb.com/1/upload/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,formData)
            console.log(data.data.display_url);

            
            //user registation

            const result= await creacteUser(email,password);
            console.log(result);

            //update UserProfile

            await updateUserProfile (name,data.data.display_url)
            navigate('/');
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
              });

            
        }  
        
        catch(err)
        
        {
            console.log(err);
          }
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
   
  
   
 
    return(
        <div>
            <div>
            <div className="lg:mx-[200px] my-[60px]">
            <div
  className="hero min-h-screen"
  style={{
    backgroundImage: "url(https://i.ibb.co/ScnjgzZ/pexels-maotuizhutuzi-5326767.jpg)",
  }}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
   

<div>

    
    <div>
      <form
     onSubmit={handleSignUp}
      
      className="card-body">

      <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Name</span>
          </label>
          <input type="text" name="name" placeholder="Your name" className="input text-black input-bordered" required />
        </div>

        <div>
            <label htmlFor='image' className='block mb-2 text-sm'>
                Select Image:
            </label>
            <input
                required
                type='file'
                id='image'
                name='image'
                accept='image/*'
            />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Email</span>
          </label>
          <input type="email" name="email"  placeholder="email" className="input text-black input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Password</span>
          </label>
          <input type="password" name="password" placeholder="password" className="input text-black input-bordered" required />
        
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-teal-600 border-0 text-white font-bold">Register</button>
        </div>
      </form>

      <div>
        <h1>Continue With</h1>
        <button><FcGoogle 
        onClick={handleGoogleLogin}
         className="text-4xl" /></button>
      </div>
      <div>If you have already account plz <span className="text-teal-400 font-bold"><Link to='/login'>Join Us</Link></span></div>
    </div>
 
</div>


    </div>
  </div>
</div>
        </div>
        </div>
        </div>
    );
};

export default Register;