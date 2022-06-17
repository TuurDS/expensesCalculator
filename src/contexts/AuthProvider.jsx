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
    const [error, setError] = useState('');

    
    const login = useCallback(async (username, password) => {
        try {
            setLoading(true);
            setError('');
            const { data } = await userApi.login(username, password);
            setToken(data.token);
            setUser(parseJWT(data.token).user);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const setSession = useCallback(async (token) => {
        try {
            if (!token) {
                setToken(null);
            } else {
                const { exp, user } = parseJWT(token);
                const expiry = parseExp(exp);

                if (!expiry || !user) {
                    localStorage.removeItem(JWT_TOKEN_KEY);
                    return;
                }
                
                const stillValid = expiry >= new Date();
                if (stillValid) {
                    localStorage.setItem(JWT_TOKEN_KEY, token);
                } else {
                    localStorage.removeItem(JWT_TOKEN_KEY);
                    token = null;
                }

                API.setAuthToken(token);
                setToken(token);

                setUser(user);
                setReady(stillValid);
            }
        } catch (error) {
            setError(error);
            setSession(null);
            localStorage.removeItem(JWT_TOKEN_KEY);
        }
    }, []);

    const logout = useCallback(() => {
        setSession(null);
        localStorage.removeItem(JWT_TOKEN_KEY);
    }, [setSession]);

    useEffect(() => {
        if (!token) return;
        setSession(token);
    }, [setSession, token]);

    const value = useMemo(() => ({
        loading, error, login, logout, ready, token, user
    }), [loading, error, login, logout, ready, token, user]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
