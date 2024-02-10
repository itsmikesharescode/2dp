<script lang="ts">
    import * as AlertDialog from "$lib/components/ui/alert-dialog";
    import { Button } from "$lib/components/ui/button";
	import type { CandaleTypes, SymbolTypes } from "$lib/types";
	import CharterChange from "./CharterChange.svelte";
    import { X } from 'lucide-svelte';

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

    

</script>

<AlertDialog.Root bind:open={selectedSymbolDialog}>
    
    <AlertDialog.Trigger asChild let:builder>
        <Button builders={[builder]}>{symbol.symbol}</Button>
    </AlertDialog.Trigger>

    <AlertDialog.Content class="">
        
        <AlertDialog.Header>
            <AlertDialog.Title>Are you absolutely sure?

                <div class="float-right">
                    <button on:click={() => selectedSymbolDialog = false}><X /></button>
                </div>
            </AlertDialog.Title>
            
            <AlertDialog.Description>

                {#if data}
                    <CharterChange {data} />
                {/if}
               
                
            </AlertDialog.Description>
        
        </AlertDialog.Header>
        
    </AlertDialog.Content>
    
</AlertDialog.Root>