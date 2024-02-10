<script lang="ts">
    import { GoogleAuthProvider, signInWithPopup, type User, type UserCredential } from "firebase/auth";
    import { auth, ggAuth } from "$lib/firebase/firebaseConfig";
	import { Button } from "$lib/components/ui/button";
    import { onAuthStateChanged } from "firebase/auth";
	import BinanceCalls from "./BinanceCalls.svelte";
	import type { PageServerData } from "./$types";
	
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

    let userListener: User | null = null;

    onAuthStateChanged(auth, (hasUser) => userListener = hasUser);


</script>

{#if userListener}
    <div class="flex flex-col gap-2 sm:max-w-lg mx-auto min-h-[60dvh] justify-center mt-[10dvh]">
        <Button on:click={logoutUser}>Sign Out</Button>

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

