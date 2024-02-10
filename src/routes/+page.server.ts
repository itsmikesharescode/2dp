import type { SavedChartsType, SymbolTypes } from "$lib/types";
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
        const symbol_name = formData.get("symbol_name") as string;

        const {error: insertError} = await supabase.from("binance_records").insert([{
            user_uid,
            data_array,
            symbol_name,
        }]);

        if(insertError) return fail(400, {msg: insertError.message});
        else {
            const {data:userCharts, error: userChartsError} = await supabase.from("binance_records").select("*").eq("user_uid", user_uid);

            if(userChartsError) return fail(400, {msg: userChartsError.message});
            else if(userCharts) return fail(200, {msg: "Chart Saved.", userCharts});
        }
    },

    deleteChart: async ({request, locals: {supabase}}) =>
    {
        const formData = await request.formData();
        const chart_ref: SavedChartsType = JSON.parse(formData.get("chart_ref") as string);

        const {error: deleteChartError} = await supabase.from("binance_records").delete().match({user_uid: chart_ref.user_uid, id: chart_ref.id});

        if(deleteChartError) return fail(400, {msg: deleteChartError.message});
        else {
            const {data: userCharts, error: userChartsError} = await supabase.from("binance_records").select("*").eq("user_uid", chart_ref.user_uid);
            if(userChartsError) return fail(400, {msg: userChartsError.message});
            else if(userCharts) return fail(200, {msg: "Chart Deleted Successfully", userCharts});
        }
    }
};