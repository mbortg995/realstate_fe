import { createContext, useContext, useState } from "react"

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const isAutenticated = token !== null;

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  const login = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        setError(error.error);
        return false;
      }

      const { user, token } = await response.json();

      localStorage.setItem('user', JSON.stringify({
        id: user.id,
        email: user.email,
        name: user.name,
        building_id: user.building_id
      }));

      localStorage.setItem('token', token);

      return true;

    } catch {
      setError("Servicio no disponible. Inténtelo de nuevo más adelante.");
      return false;
    }
  }

  const register = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        setError(error.error);
        return false;
      }

      const { user, token } = await response.json();

      localStorage.setItem('user', JSON.stringify({
        id: user.id,
        email: user.email,
        name: user.name,
        building_id: user.building_id
      }));

      localStorage.setItem('token', token);
      return true;

    } catch {
      setError("Servicio no disponible. Inténtelo de nuevo más adelante.");
      return false;
    }

  }

  return (
    <AuthContext.Provider value={{
      token,
      user,
      isAutenticated,
      login,
      register,
      logout,
      error
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
}