import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';

const SocialLogin = () => {
    const {signInGoogle} = useAuth();
    const location = useLocation();
    const navigate = useNavigate()
    const handleGoogleSignIn = ()=>{
      signInGoogle().then(result=>{
        console.log(result.user);
        navigate(location?.state || '/')
        
      }).catch(error=>{
        console.log(error);
        
      })
    }
    return (
        <div>
            {/* Google Login */}
                <button onClick={handleGoogleSignIn} className="flex items-center justify-center w-full bg-white text-gray-800 border border-gray-300 py-3 rounded-xl shadow hover:shadow-md transition mt-4">
                    <svg
                        aria-label="Google logo"
                        className="mr-2"
                        width="20"
                        height="20"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <path fill="#EA4335" d="M256 133.6c35 0 66.6 12 91.5 31l68.1-68C377.3 50.8 317 29 256 29 155 29 69.1 92.4 38.3 189.1l78.9 61.3C131.7 187.5 189 133.6 256 133.6z" />
                        <path fill="#34A853" d="M256 380c-63 0-116-41-136-97.6l-78.9 61.3C69.1 419.6 155 483 256 483c61 0 121.3-21.8 164.6-66l-68.1-68C322.6 368 291 380 256 380z" />
                        <path fill="#FBBC05" d="M120 243.7l-78.9-61.3C27.5 249.1 27.5 263.9 41.1 283l78.9-61.3z" />
                        <path fill="#4285F4" d="M256 133.6c67 0 124.3 54 136.6 127.4l68.1-68C377.3 145.6 322.6 133.6 256 133.6z" />
                    </svg>
                    Login with Google
                </button>
        </div>
    );
};

export default SocialLogin;