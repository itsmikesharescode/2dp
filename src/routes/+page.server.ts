import type { SymbolTypes } from "$lib/types";
import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({fetch}) => {
   
    const res = await fetch("https://fapi.binance.com/fapi/v1/exchangeInfo");
    const binance = await res.json();

    //this can be type easy with "as" but i have to avoid;
    const symbols: SymbolTypes[] | undefined = binance.symbols;

    return {
        symbols: symbols,
    };

};

export const actions: Actions = {

    saveChart: async ({request, locals: {supabase}}) => 
    {
        const formData = await request.formData();

        const data_array = formData.get("data_array") as string;
        const user_uid = formData.get("user_uid") as string;

        const {error: insertError} = await supabase.from("binance_records").insert([{
            user_uid,
            data_array,
        }]);

        if(insertError) return fail(400, {msg: insertError.message});
        else {
            const {data:savedCharts, error: savedChartsError} = await supabase.from("binance_records").select("*").eq("user_uid", user_uid);

            if(savedChartsError) return fail(400, {msg: savedChartsError.message});
            else if(savedCharts) return fail(200, {msg: "Chart Saved.", savedCharts});
        }
    },
};