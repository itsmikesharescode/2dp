<script lang="ts">
    import * as AlertDialog from "$lib/components/ui/alert-dialog";
    import { Button } from "$lib/components/ui/button";
	import type { CandaleTypes, SavedChartsType, SymbolTypes } from "$lib/types";
	import CharterChange from "./CharterChange.svelte";
    import { Badge } from "$lib/components/ui/badge";
    import { ArrowUpRight } from 'lucide-svelte';
    import { X } from 'lucide-svelte';
	import { savedCharts, showActiveTrade, userState } from "$lib";
	import { enhance } from "$app/forms";
	import { onMount } from "svelte";
	import type { SubmitFunction } from "@sveltejs/kit";
	import { toast } from "svelte-sonner";
	import MyLoader from "$lib/components/loaders/MyLoader.svelte";

    export let symbol: SymbolTypes;

    let selectedSymbolDialog = false;
    let data: CandaleTypes[] | undefined = undefined;

    const getOHLC = async() => 
    {
        const res = await fetch(`https://fapi.binance.com/fapi/v1/klines?symbol=${symbol.symbol}&interval=1d`);

        const klinesData = await res.json();

        const newMap: CandaleTypes[] = klinesData.map((item: any) => {
            const convertingDate = new Date(item[0]).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).split("/").join("-").split("-")

            return {
                time: `${convertingDate[2]}-${convertingDate[0]}-${convertingDate[1]}`,
                open: Number(item[1]),
                high: Number(item[2]),
                low: Number(item[3]),
                close: Number(item[4]),
            }
        });

        data = newMap;
    }
    
    $: {
        if(selectedSymbolDialog) getOHLC();
    };

    type ServerNews = {
        status: number
        type: string
        data: {
            msg: string
            userCharts: SavedChartsType[]
        }
    }

    let savedChartLoader = false;

    const savedChartNews: SubmitFunction = () => 
    {
        savedChartLoader = true;
        return async ({ result, update }) => 
        {
            const {status, data: {msg, userCharts} } = result as ServerNews;
                
            switch (status) {
                case 200:
                    toast.success("Success", {description: msg});
                    savedChartLoader = false;
                    $showActiveTrade = false;
                    $savedCharts = userCharts;
                    break;
                
                case 400:
                    toast.error("Failed", {description: msg});
                    savedChartLoader = false;
                    break;
            };
            await update();
        };
    };


</script>

<AlertDialog.Root bind:open={selectedSymbolDialog}>
    
    <AlertDialog.Trigger asChild let:builder>
        <Button builders={[builder]} variant="outline" class="flex items-center justify-between active:scale-95 transition-all w-full">
            {symbol.symbol}
            <ArrowUpRight size="15px" class=""/>
        </Button>
    </AlertDialog.Trigger>

    <AlertDialog.Content >
        
        <AlertDialog.Header>
            <AlertDialog.Title><Badge>{symbol.symbol}</Badge>

                <div class="float-right">
                    <button disabled={savedChartLoader} on:click={() => selectedSymbolDialog = false}>
                        <X />
                    </button>
                </div>
            </AlertDialog.Title>
            
            <AlertDialog.Description class="pt-3">

                {#if data}
                    <CharterChange {data} />
                {/if}
               
                
            </AlertDialog.Description>
        
        </AlertDialog.Header>
        <AlertDialog.Footer>
            <form method="post" action="?/saveChart" enctype="multipart/form-data" use:enhance={savedChartNews}>
                <input disabled={savedChartLoader} name="data_array" type="hidden" class="hidden" value={JSON.stringify(data)} hidden />
                <input disabled={savedChartLoader} name="user_uid" type="hidden" class="hidden" value={$userState?.uid} hidden />
                <input disabled={savedChartLoader} name="symbol_name" type="hidden" class="hidden" value={symbol.symbol} hidden />
                <Button disabled={savedChartLoader} type="submit">
                    <MyLoader name="Save Chart" loader={savedChartLoader}  loader_name="Saving..." />
                </Button>
            </form>
        </AlertDialog.Footer>
        
    </AlertDialog.Content>
    
</AlertDialog.Root>