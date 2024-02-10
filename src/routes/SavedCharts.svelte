<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import { savedCharts } from "$lib";
	import CharterChange from "./CharterChange.svelte";
    import { Badge } from "$lib/components/ui/badge";
    import { X } from 'lucide-svelte';
	import { scale, slide } from "svelte/transition";
	import { flip } from "svelte/animate";
	import { enhance } from "$app/forms";
	import type { SubmitFunction } from "@sveltejs/kit";
	import type { SavedChartsType } from "$lib/types";
	import { toast } from "svelte-sonner";
	import MyLoader from "$lib/components/loaders/MyLoader.svelte";

    type ServerNews = {
        status: number
        type: string
        data: {
            msg: string
            userCharts: SavedChartsType[]
        }
    };

    let chartDeletionLoader = false;

    const deleteChartNews: SubmitFunction = () => 
    {
        chartDeletionLoader = true;
        return async ({ result, update }) => 
        {
            const {status, data: {msg, userCharts} } = result as ServerNews;
                
            switch (status) {
                case 200:
                    toast.success("Deletion Success", {description: msg});
                    $savedCharts = userCharts;
                    chartDeletionLoader = false;
                    break;
                
                case 400:
                    toast.error("Deletion Failed", {description: msg});
                    chartDeletionLoader = false;
                    break;
            };
            await update();
        };
    };
</script>


{#each $savedCharts ?? [] as savedChart (savedChart.id) }
    <div class="" out:scale animate:flip={{duration:350}}>
        <Card.Root>
            <Card.Header>
                <Card.Title>
                    <Badge>{savedChart.symbol_name}</Badge>
                    <div class="float-right">
                        <form method="post" action="?/deleteChart" enctype="multipart/form-data" use:enhance={deleteChartNews}>
                            <input name="chart_ref" type="hidden" class="hidden" value={JSON.stringify(savedChart)} hidden />
                            <button disabled={chartDeletionLoader} type="submit" title="Click to delete" class="text-sm">                         
                                <X />
                            </button>
                        </form>
                    </div>
                </Card.Title>
                <Card.Description>{new Date(savedChart.created_at)}</Card.Description>
            </Card.Header>
    
            <Card.Content class="w-full md:w-[500px]">
                <CharterChange data={JSON.parse(savedChart.data_array)} />
            </Card.Content>
    
        </Card.Root>
    </div>
{/each}

        
                