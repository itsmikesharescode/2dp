import {writable} from "svelte/store";
import type { SavedChartsType, SearchStoreModel } from "./types";
import type { User } from "firebase/auth";
import type { Session,SupabaseClient } from "@supabase/supabase-js";

export const bindWindow = writable<HTMLDivElement>();

export const userState = writable<User | null>();
export const showActiveTrade = writable(false);
export const supabase = writable<SupabaseClient>();
export const savedCharts = writable<SavedChartsType[] | null>(null);

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
