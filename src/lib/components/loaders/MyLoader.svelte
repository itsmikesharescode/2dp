<script lang="ts">
    import { Loader2 } from 'lucide-svelte';

    export let name = "";
    export let loader = false;
    export let loader_name = "";
</script>

{#if loader}
    <div class="flex items-center gap-1">
        <p>{loader_name}</p>
        <div class="">
            <Loader2 size="15px" class="animate-spin" />
        </div>
    </div>
{:else}
    <p>{name}</p>
{/if}