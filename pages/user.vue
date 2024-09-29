<script setup lang="ts">
    import { client } from "~/composables/functions/client"; 

    const session = client.useSession();

    const logout = async () => {
        await client.signOut();
        await navigateTo("/auth/sign-in");
    };
</script>

<template>
    <div>
        <h1>User: {{ session.data?.user.name }}</h1>
        <button @click="logout">Logout</button>
    </div>
</template>