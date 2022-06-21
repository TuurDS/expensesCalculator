import React, { useCallback, useEffect } from 'react'
import './login.scss';
import { useLogin } from "../../hooks/useLogin";
import { useSession } from "../../hooks/useSession";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loader from "../../components/loader/Loader";
import Particles from '../../components/particles/Particles';
import Notifications from '../../components/notifications/Notifications';
import { useNotification } from "../../hooks/useNotifications";

export default function Login() {
  const { isAuth, resolveError } = useSession();
    const { login, error, loading } = useLogin();
    const { register, handleSubmit, reset, formState } = useForm();
    const navigate = useNavigate();
    const { active, message, resolution, notificationType, fireNotification, exit } = useNotification();

    useEffect(() => {
        if (!isAuth) return;
        navigate("/");
      }, [isAuth, navigate]);
    
    const handleLogin = useCallback(async (args) => {
        const loggedIn = await login(args.username, args.password);
        if (loggedIn) {
          navigate("/");
        }
      }, [login, navigate]);

    useEffect(() => {
    if (!formState.isSubmitSuccessful) return 
    reset({ username: "", password: "" });
    }, [formState.isSubmitSuccessful, reset]);

    useEffect(() => {
        if (error === "") return;
        handleError(error);
    });

    const handleError = (error) => {
      if (loading) return; // Guard clause
      fireNotification(0, error, error );

      resolveError();
    }


  return (
  <>
  <div className={`base-box ${(loading ? 'blurred' : '')}`}>  
      <Particles/>
      <Notifications message={message} resolution={resolution} notificationType={notificationType} isActive={active} exit={exit} />
      <div className="login-box"> 
        <h2>Login</h2>
      <form onSubmit={handleSubmit(handleLogin)}>
            <div className="user-box">
                <input 
                type="text"
                name="username"
                {...register("username")}
                autoComplete='username' 
                required
                />
                <label>Username</label>
            </div>
            <div className="user-box">
                <input 
                type="password"
                name="password"
                {...register("password")}
                autoComplete='current-password'
                required
                />
                <label>Password</label>
            </div>
            <button type="submit">
                Login
            </button >
        </form>
    </div>
  </div>
  {loading && <Loader />}
  </>)};
