import {writable} from "svelte/store";
import type { SearchStoreModel } from "./types";

export const bindWindow = writable<HTMLDivElement>()

//search stores
export const createSearchStore = <T extends Record<PropertyKey, any>>(data: T[]) => 
{ 
    const {subscribe, set, update} = writable<SearchStoreModel<T>>({
        data,
        sanitized: data,
        targetSearch: "",
    });

    return {
        subscribe, set, update
    };
};

export const searchHandler = <T extends Record<PropertyKey, any>>(store: SearchStoreModel<T>) =>
{
    const searchTerm = store.targetSearch.toLowerCase() || "";
    store.sanitized = store.data.filter(( item ) => {
        return item.targetSearch.toLowerCase().includes(searchTerm);
    })

}
