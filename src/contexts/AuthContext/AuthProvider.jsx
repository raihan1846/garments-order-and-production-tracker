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
                    const res = await fetch(`http://localhost:3000/users/firebase/${currentUser.uid}`);
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

    const authInfo = {
        user,
        userRole,
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
