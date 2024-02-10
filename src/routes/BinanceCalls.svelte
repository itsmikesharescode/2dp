<script lang="ts">
    import { Search } from 'lucide-svelte';
    import Input from "$lib/components/ui/input/input.svelte";
    import type { SymbolTypes } from '$lib/types';
    import { createSearchStore, searchHandler } from '$lib';
    import { onDestroy } from 'svelte';
	import Button from '$lib/components/ui/button/button.svelte';

    export let symbols: SymbolTypes[];

     //all about reactive search
     $: domSymbols = symbols.map( (symbols) => ({
        ...symbols,
        targetSearch: `${symbols.symbol}`
    }) );

    $: searchStore = createSearchStore(domSymbols);
    $: unsubscribe = searchStore.subscribe((model) => searchHandler(model));
    
    onDestroy( () => unsubscribe());

</script>

<div class="flex items-center w-full">
    <Search class="absolute ml-2" />
    <Input type="search" placeholder="Search Binance Symbols" class="dark:hover:border-red-500 dark:focus:border-red-500 pl-9 border-slate-600"
    bind:value={$searchStore.targetSearch}
    />
</div>

{#each $searchStore.sanitized as symbol }
    <Button>{symbol.symbol}</Button>
{/each}