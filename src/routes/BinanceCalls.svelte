<script lang="ts">
    import { Search } from 'lucide-svelte';
    import Input from "$lib/components/ui/input/input.svelte";
    import type { SymbolTypes } from '$lib/types';
    import { createSearchStore, savedCharts, searchHandler, showActiveTrade } from '$lib';
    import { onDestroy } from 'svelte';
	import SelectedSymbol from './SelectedSymbol.svelte';
	import { fade, fly, scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import Button from '$lib/components/ui/button/button.svelte';
	import CharterChange from './CharterChange.svelte';

    export let symbols: SymbolTypes[];

    //all about reactive search
    let domSymbols = symbols.map( (symbols) => ({
        ...symbols,
        targetSearch: `${symbols.symbol}`
    }) );

    let searchStore = createSearchStore(domSymbols ?? []);
    let unsubscribe = searchStore.subscribe((model) => searchHandler(model));
    
    onDestroy( () => unsubscribe());

</script>

<div class="min-h-screen">

    <div class="flex items-center w-full sm:max-w-[400px]">
        <Search class="absolute ml-2" />
        <Input type="search" 
        placeholder="Search Binance Symbols" class="dark:hover:border-red-500 dark:focus:border-red-500 pl-9 border-slate-600"
        bind:value={$searchStore.targetSearch}
        on:click={() => $showActiveTrade = true}
        />
    </div>

    {#if $showActiveTrade}

        <div class="flex justify-end px-6 mt-3">
            <Button class="" on:click={() => $showActiveTrade = false}>Back</Button>
        </div>

        <div class="mt-2 max-h-[90dvh] overflow-y-auto overflow-x-hidden flex flex-col gap-2 sm:px-4" in:fade={{duration:300}}>
            {#each $searchStore.sanitized as symbol, index (index) }
                <div class="w-full" in:fly={{x:100, duration:300}} animate:flip|local>
                    <SelectedSymbol {symbol} />
                </div>
            {/each}
        </div>
    {:else}
        <div class="mt-4 overflow-y-auto overflow-x-hidden flex flex-col gap-2 sm:px-4" in:fade={{duration:300}}>
            
            <div class="flex flex-col gap-4">
                {#each $savedCharts ?? [] as savedChart }
                    <div class="w-full">
                        <p class="leading-7 [&:not(:first-child)]:mt-6">Date Saved</p>
                        <CharterChange data={JSON.parse(savedChart.data_array)} />
                    </div>
                {/each}
            </div>
           
        </div>
    {/if}


</div>