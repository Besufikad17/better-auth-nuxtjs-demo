<script setup lang="ts">
    import { client } from "~/composables/functions/client"; 

    const session = client.useSession();
</script>

<template>
    <div>
        <!-- FIXME Get user info -->
        <h1>User: {{ session.data?.user }}</h1>
    </div>
</template>