<script lang="ts">
    import { Search } from 'lucide-svelte';
    import Input from "$lib/components/ui/input/input.svelte";
    import type { SymbolTypes } from '$lib/types';
    import { createSearchStore, searchHandler } from '$lib';
    import { onDestroy } from 'svelte';
	import Button from '$lib/components/ui/button/button.svelte';

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

<div class="flex items-center w-full">
    <Search class="absolute ml-2" />
    <Input type="search" placeholder="Search Binance Symbols" class="dark:hover:border-red-500 dark:focus:border-red-500 pl-9 border-slate-600"
    bind:value={$searchStore.targetSearch}
    />
</div>

<div class="mt-5 max-h-[70dvh] border-2 overflow-y-auto overflow-x-hidden flex flex-col gap-2 p-4">
    {#each $searchStore.sanitized as symbol }
        <Button class="w-full">{symbol.symbol}</Button>
    {/each}
</div>