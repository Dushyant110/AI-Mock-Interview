import React from 'react'
import { FaRobot } from "react-icons/fa";
import { LuSparkles } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { motion } from "motion/react"
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import { ServerUrl } from '../App';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Auth(isModel = false) {
  const dispatch = useDispatch();
  const handleGoogleAuth = async () => {
    try{
      const response = await signInWithPopup(auth, provider);
      let User = response.user;
      let name = User.displayName;
      let email = User.email;

      console.log("ServerUrl:", ServerUrl);
    console.log("Full URL:", ServerUrl + "api/auth/google");

      const result = await axios.post(ServerUrl + "/api/auth/google", { name, email }, { withCredentials: true });
      dispatch(setUserData(result.data));
    } catch (error) {
      console.error(error);
      dispatch(setUserData(null));
    }
  }
  return (
    <div className={` 
      w-full
      ${isModel ? "py-4" : "min-h-screen bg-[#f3f3f3] flex items-center justify-center px-6 py-20"}
    `}>
     <motion.div
      initial = {{ opacity: 0, y:-40 }}
      animate = {{ opacity: 1, y:0 }}
      transition={{duration: 1.05}}
      className={'w-full ${isModel ? "max-w-md p-8 rounded-[32px]" : "max-w-md p-8 rounded-[32px]" }  bg-white shadow-2xl border border-gray-200'}>
       <div className='flex items-center justify-center gap-3 mb-6'>
         <div className='bg-black text-white p-2 rounded-lg'>
           <FaRobot size={18} />
         </div>
         <h2 className='font-semibold text-lg'>InterViewIQ.AI</h2>
       </div>

       <h1 className='text-2xl md:text-3xl font-semibold text-center leading-snug mb-4'>
         Continue with{" "}
         <span className='bg-green-100 text-green-600 px-3 py-1 rounded-full inline-flex items-center gap-2'>
         <LuSparkles size = {16}/> AI Smart Interview
         </span>
        </h1>
        <p className='text-gray-500 text-center text-sm md:text-base leading-relaxed mb-8'>
         Sign in to start AI-powered mock interviews,
         <br />
         track your progress, and unlock detailed performance insights.
         </p>

         <motion.button 
         onClick={handleGoogleAuth}
          whileHover={{ opacity:0.9, scale: 1.05 }}
          whileTap={{opacity:1,scale: 0.95}}
         className='w-full items-center justify-center gap-3 py-3 flex bg-black border text-white rounded-full shadow-md'>
            <FcGoogle size={20} />
            Continue with Google
         </motion.button>
     </motion.div>
    </div>
  )
}

export default Auth
