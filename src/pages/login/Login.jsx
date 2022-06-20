import React, { useCallback, useEffect } from 'react'
import './login.scss';
import { useLogin } from "../../hooks/useLogin";
import { useSession } from "../../hooks/useSession";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loader from "../../components/loader/Loader";
import Particles from '../../components/particles/Particles';

export default function Login() {
    const { isAuth } = useSession();
    const { login, error, loading } = useLogin();
    const { register, handleSubmit, reset, formState } = useForm();
    const navigate = useNavigate();

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
        if (!loading) return;
        //TODO: handle error
        console.log(error);
    }

  return (
  <>
  <div className={`base-box ${(loading ? 'blurred' : '')}`}>  
      <Particles/>
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
