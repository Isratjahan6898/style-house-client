

import { Link } from 'react-router-dom';
import './Navbar.css'
import { AuthContext } from '../../Provider/AuthProvider';
import { useContext } from 'react';

const Navbar = () => {
  const {user, logOut}= useContext(AuthContext);
  console.log(user);

  const handleLogOut = ()=>{
    logOut()
    .then(()=>{})
    .catch(error=>console.log(error))
  }
 
    return (
        <div className='mt-[20px]'>
           <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
      <Link to='/'>
      <p className='font-bold text-red-400'>Home</p>
      </Link>
      </ul>
    </div>
    <a className=" text-3xl font-bold gradient-text ">Style House</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <Link to='/'>
      <p className='font-bold text-red-400'>Home</p>
      </Link>
    
      
    </ul>
  </div>
  <div className="navbar-end">
    {/* <Link to='/login'><button className="btn bg-red-400 ">Login</button></Link> */}

    {
        user ?
        <>
        
 <div className="tooltip " data-tip={user.displayName} tabIndex={0} role="button">
 <img src={user.photoURL}  alt="Tailwind"   className='rounded-full  w-[30px] h-[30px]' />
 </div>

<button 
 onClick={handleLogOut}
 
 className=' btn font-bold bg-red-400 mr-[20px]'>LogOut</button>
 

 


        </>
        :
        <>
        <Link to='/login'>
        <button className="btn font-bold bg-red-400">Login</button>
        </Link>
        </>
       }
  </div>


</div>
        </div>
    );
};

export default Navbar;

//https://i.ibb.co/ScnjgzZ/pexels-maotuizhutuzi-5326767.jpg