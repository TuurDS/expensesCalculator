import { useContext } from "react";
import { SearchContext } from "../contexts/SearchProvider";

const useValue = () => useContext(SearchContext);

export function useSearch() {
    const { searchString, subscribe, unsubscribe, unsubscribeAll } = useValue();
    return { searchString, subscribe, unsubscribe, unsubscribeAll };
}

export function useUpdateSearch() {
    const { searchString, setSearchString } = useValue();
    return { searchString, setSearchString };
}