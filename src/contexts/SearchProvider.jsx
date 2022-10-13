import React, { createContext, useState, useCallback, useMemo, useEffect } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchString, setSearchString] = useState("");
    const [HandlerList, setHandlerList] = useState([]);

    const subscribe = useCallback(async (func) => {
        //check if func is a function and has no arguments
        if (typeof func !== "function" || func.length !== 1) return;
        //check if func is already in the list also check the name of the function
         if (HandlerList.some((item) => item.name === func.name)) return;
        setHandlerList([...HandlerList, func]);

    }, [HandlerList]);

    const unsubscribe = useCallback(async (func) => {
        setHandlerList(HandlerList.filter((item) => item !== func));
    }, [HandlerList]);

    const unsubscribeAll = useCallback(async () => {
        setHandlerList([]);
    }, []);

    //useEffect to ivoke the handlerlist when searchstring changes
    useEffect(() => {
        HandlerList.forEach((func) => func(searchString));
    }, [HandlerList,searchString]);
    

    const value = useMemo(() => ({
        searchString, setSearchString, subscribe, unsubscribe, unsubscribeAll
    }), [searchString, setSearchString, subscribe, unsubscribe, unsubscribeAll]);

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    )
}
