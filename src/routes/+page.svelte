<script lang="ts">
    import { GoogleAuthProvider, signInWithPopup, type UserCredential } from "firebase/auth";
    import { auth, ggAuth } from "$lib/firebase/firebaseConfig";
	import { Button } from "$lib/components/ui/button";

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

</script>

<div class="">
    <div class="">
        <h4 class="scroll-m-20 text-xl font-semibold tracking-tight">
            Come and Explore!
        </h4>

        <small class="text-sm font-medium leading-none">Email address</small>
    </div>
    <Button on:click={createGGlog}>Sign in via Google</Button>
</div>