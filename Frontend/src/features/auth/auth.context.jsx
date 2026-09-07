import { createContext, useEffect, useState } from "react";
import { getMe } from "./services/api.auth";
// Global authentication context create kar rahe hain
export const AuthContext = createContext();


// Provider component
// Ye poori application ko authentication state provide karega
export const AuthProvider = ({ children }) => {

  // Currently logged-in user
  // Initially koi user logged in nahi hai
  const [user, setUser] = useState(null);

  // API request chal rahi hai ya nahi
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreUser = async () => {
      try {
        const data = await getMe();
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreUser();
  }, []);
  

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};