import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const useAuth = () => useContext(AuthContext);

export const useLogout = () => {
    const { logout } = useAuth();
    return logout;
}