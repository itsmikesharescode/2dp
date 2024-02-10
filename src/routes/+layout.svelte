<script lang="ts">
    import "../app.pcss";
    import { ModeWatcher } from "mode-watcher";
    import { Toaster } from "$lib/components/ui/sonner";
	import type { LayoutData } from "./$types";
	import { onMount } from "svelte";
	import { supabase } from "$lib";

    export let data: LayoutData;

    onMount(() => $supabase = data.supabase);
    
</script>

<Toaster position="top-right" />
<ModeWatcher />

<div class="p-4">
   <slot/> 
</div>