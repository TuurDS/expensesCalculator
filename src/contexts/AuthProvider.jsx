import React, { createContext, useState, useCallback, useMemo, useEffect } from 'react';
import config from '../config.json'
import { Buffer } from 'buffer';
import * as userApi from '../api/user';
import * as API from '../api';

const JWT_TOKEN_KEY = config.token_key;
export const AuthContext = createContext();

const parseJWT = (token) => {
    if (token === null || !token) return;
    const base64Url = token.split('.')[1];
    const payload = Buffer.from(base64Url, 'base64');
    const jsonPayload = payload.toString('ascii');
    return JSON.parse(jsonPayload);
}

const parseExp = (exp) => {
    if (!exp) return null;
    if (typeof exp !== 'number') exp = Number(exp);
    if (isNaN(exp)) return null;
    return new Date(exp * 1000);
}

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem(JWT_TOKEN_KEY));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [ready, setReady] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [error, setError] = useState('');

    
    const login = useCallback(async (username, password) => {
        try {
            setLoading(true);
            setError('');
            const { data } = await userApi.login(username, password);
            if(parseJWT(data.token) === undefined) {
                throw Error("Username Or Password is incorrect");
            }
            setToken(data.token);
            setUser(parseJWT(data.token).user);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const resetAuth = () => {
        localStorage.removeItem(JWT_TOKEN_KEY);
        setToken(null);
        setUser(null);
        setIsAuth(false);
        setReady(true);
        setError('');
        API.setAuthToken(null);
    };

    const setSession = useCallback(async (token) => {
        try {
            //if there is no token reset the auth
            if (!token) {
                resetAuth();
                return;
            }
            const { exp, user } = parseJWT(token);
            const expiry = parseExp(exp);

            //if there is no expiry or user in the destructured object reset auth
            if (!expiry || !user) {
                resetAuth();
                return;
            }
            
            const stillValid = expiry >= new Date();

            //IF NOT VALID, RESET AUTH
            if (!stillValid) {
                resetAuth();
                return;
            }
            localStorage.setItem(JWT_TOKEN_KEY, token);
            
            API.setAuthToken(token);
            setToken(token);
            
            setUser(user);
            setIsAuth(true);
        } catch (error) {
            setError(error);
            resetAuth();
        } finally {
            setReady(true);
        }
    }, []);

    const logout = useCallback(() => {
        resetAuth();
    }, []);

    const resolveError = useCallback(() => {
        setError('');
    }, []);


    useEffect(() => {
        if (!token) {
            setReady(true);
            return;
        }
        setSession(token);
    }, [setSession, token]);

    const value = useMemo(() => ({
        login, logout, resolveError, loading, error, ready, token, user, isAuth
    }), [login, logout, resolveError, loading, error, ready, token, user, isAuth]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
