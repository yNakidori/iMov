// auth.js

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AuthChecker = ({ children }) => {
    const [user, setUser] = useState(null);
    const history = useHistory();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            if (!user) {
                history.push('/login');
            }
        });

        return () => unsubscribe();
    }, [history]);

    return user ? children : null;
};

export default AuthChecker;
