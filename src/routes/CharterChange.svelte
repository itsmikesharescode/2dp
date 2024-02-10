
<script lang="ts">
	import { bindWindow } from '$lib';
	import type { CandaleTypes } from '$lib/types';
    import {ColorType, CrosshairMode} from 'lightweight-charts';
	import { onMount } from 'svelte';
    import {Chart, CandlestickSeries} from 'svelte-lightweight-charts';
    
    let widthBinder = 0;

    export let data: CandaleTypes[]

    onMount( () => widthBinder = $bindWindow.clientWidth)

    $: options = {
        width: widthBinder,
        height: 400,
        layout: {
            background: {
                type: ColorType.Solid,
                color: '#000000',
            },
            textColor: 'rgba(255, 255, 255, 0.9)',
        },
        grid: {
            vertLines: {
                color: 'rgba(197, 203, 206, 0.5)',
            },
            horzLines: {
                color: 'rgba(197, 203, 206, 0.5)',
            },
        },
        crosshair: {
            mode: CrosshairMode.Normal,
        },
        rightPriceScale: {
            borderColor: 'rgba(197, 203, 206, 0.8)',
        },
        timeScale: {
            borderColor: 'rgba(197, 203, 206, 0.8)',
        },
    }

</script>

<div class="" bind:this={$bindWindow}>
    <Chart {...options}>
        <CandlestickSeries
            data={data}
            upColor="rgba(255, 144, 0, 1)"
            downColor="#000"
            borderDownColor="rgba(255, 144, 0, 1)"
            borderUpColor="rgba(255, 144, 0, 1)"
            wickDownColor="rgba(255, 144, 0, 1)"
            wickUpColor="rgba(255, 144, 0, 1)"
        />
    </Chart>
</div>
