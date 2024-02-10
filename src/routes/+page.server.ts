import type { SymbolTypes } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({fetch}) => {
   
    const res = await fetch("https://fapi.binance.com/fapi/v1/exchangeInfo");
    const binance = await res.json();

    //this can be type easy with "as" but i have to avoid;
    const symbols: SymbolTypes[] = binance.symbols;

    return {
        symbols: symbols
    };

};