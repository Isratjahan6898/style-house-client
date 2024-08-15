import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";


const Register = () => {
   
 
  const { register, handleSubmit, reset} = useForm();
  const onSubmit =async (data) => {
    console.log(data);

    
   
  }

 
    return (
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
    
      
      className="card-body">

      <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Name</span>
          </label>
          <input type="text" name="name" {...register("name")} placeholder="Your name" className="input text-black input-bordered" required />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Photo URL</span>
          </label>
          {/* <input type="text" name="photo" {...register("photo")} placeholder="photo url" className="input text-black input-bordered" required /> */}

          <input type="file" name="photo" {...register("image")} className="file-input file-input-bordered file-input-accent w-full max-w-xs" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Email</span>
          </label>
          <input type="email" name="email" {...register("email")} placeholder="email" className="input text-black input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Password</span>
          </label>
          <input type="password" name="password" {...register("password")} placeholder="password" className="input text-black input-bordered" required />
        
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-teal-600 border-0 text-white font-bold">Register</button>
        </div>
      </form>

      <div>
        <h1>Continue With</h1>
        <button><FcGoogle  className="text-4xl" /></button>
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