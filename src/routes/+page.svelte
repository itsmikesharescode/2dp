<script lang="ts">
    import { GoogleAuthProvider, signInWithPopup, type User, type UserCredential } from "firebase/auth";
    import { auth, ggAuth } from "$lib/firebase/firebaseConfig";
	import { Button } from "$lib/components/ui/button";
    import { onAuthStateChanged } from "firebase/auth";
	import BinanceCalls from "./BinanceCalls.svelte";
	import type { PageServerData } from "./$types";
	import DarkMode from "$lib/components/darkmode/DarkMode.svelte";
	import { savedCharts, supabase, userState } from "$lib";
	import { onMount } from "svelte";

    export let data: PageServerData;

    //logs user using gmail
    const createGGlog = async () =>
    {
        signInWithPopup(auth, ggAuth).then( (result: UserCredential) => {

            const ggCreds = GoogleAuthProvider.credentialFromResult(result);

            const token = ggCreds?.accessToken;

            const user = result.user;

        }).catch( (error) => {
            console.log(error.code, error.message, error.customData.email);
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
    };

    //logout user using idk
    const logoutUser = () => auth.signOut();

    let userObj: User | null = null;

    onAuthStateChanged(auth, async (hasUser) => {
        userObj = hasUser;
      
        if(hasUser){
            $userState = hasUser;
            const {data, error} = await $supabase.from("binance_records").select("*").eq("user_uid", hasUser.uid);
            $savedCharts = data;

        }else {
            $userState = null;
            $savedCharts = null;
        }

    });

</script>

{#if userObj}
    <div class="flex flex-col gap-4  mx-auto min-h-[60dvh] justify-center mt-[10dvh]">
        <h4 class="scroll-m-20 text-xl font-semibold tracking-tight">Hello, {userObj.displayName}</h4>
        <div class="flex items-center gap-4 justify-between">
            <Button on:click={logoutUser} class="w-full sm:max-w-fit">Sign Out</Button>
            <DarkMode />
        </div>

        {#if data.symbols}
            <div class="">
                <BinanceCalls symbols={data.symbols} />
            </div>
        {/if}
    </div>

{:else}
    <div class="flex flex-col gap-2 sm:max-w-sm mx-auto min-h-[60dvh] justify-center">
        <div class="flex flex-col gap-2">
            <h4 class="scroll-m-20 text-xl font-semibold tracking-tight text-center">
                Come and Explore!
            </h4>

            <small class="text-sm font-medium leading-none text-center">Explore the world of Crypto!!!!</small>
        </div>
        <Button on:click={createGGlog}>Sign in via Google</Button>
    </div>
{/if}

