import { createContext, useContext, useEffect, useState, Dispatch, SetStateAction } from 'react';

interface IAuthContext {
  auth: any,
  setAuth: Dispatch<SetStateAction<any>>,
  user: any
}

const AuthContext = createContext<IAuthContext>({
  auth: null,
  setAuth: () => {},
  user: null,
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: {children: any}) => {
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const isAuth = async () => {
      try {
        const current = JSON.parse(localStorage.getItem("user")!)
        setUser(current);
      } catch(error) {
        setUser(null);
      };
    };

    isAuth();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;