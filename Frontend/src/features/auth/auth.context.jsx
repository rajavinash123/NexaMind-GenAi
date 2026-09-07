import { createContext, useState } from "react";

// Global authentication context create kar rahe hain
export const AuthContext = createContext();


// Provider component
// Ye poori application ko authentication state provide karega
export const AuthProvider = ({ children }) => {

  // Currently logged-in user
  // Initially koi user logged in nahi hai
  const [user, setUser] = useState(null);

  // API request chal rahi hai ya nahi
  const [loading, setLoading] = useState(false);


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