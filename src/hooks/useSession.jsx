import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const useAuth = () => useContext(AuthContext);

export function useSession() {
    const { token, ready, isAuth = Boolean(token), user } = useAuth();
    return { token, ready, isAuth, user }
}