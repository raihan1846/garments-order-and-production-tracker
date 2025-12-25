import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { 
    createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut 
} from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);      
    const [userRole, setUserRole] = useState(null); 
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signInGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                try {
                    const res = await fetch(`https://garments-order-production-tracker-s-zeta.vercel.app/users/firebase/${currentUser.uid}`);
                    const data = await res.json();
                    setUserRole(data.role); 
                } catch (err) {
                    console.error("Error fetching role from MongoDB:", err);
                    setUserRole(null);
                }
            } else {
                setUserRole(null);
            }

            setLoading(false);
        });

        return () => unSubscribe();
    }, []);


    ///////////////
      useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                try {
                    // fetch full user data from DB (role + status)
                    const res = await fetch(`https://garments-order-production-tracker-s-zeta.vercel.app/users/firebase/${currentUser.uid}`);
                    const data = await res.json();
                    setUserData({
                        role: data.role,
                        status: data.status,  // <-- important
                        ...data
                    });
                } catch (err) {
                    console.error("Error fetching user data from MongoDB:", err);
                    setUserData(null);
                }
            } else {
                setUserData(null);
            }

            setLoading(false);
        });

        return () => unSubscribe();
    }, []);

    const authInfo = {
        user,
        userRole,
        userData,
        loading,
        registerUser,
        signInUser,
        signInGoogle,
        logOut
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
