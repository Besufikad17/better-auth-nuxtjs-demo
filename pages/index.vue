<script setup lang="ts">
    const FEATURES = [
        "Email & Password", 
        "Organization | Teams", 
        "Passkeys", 
        "Multi Factor",
        "Password Reset",
        "Role & Permissions",
        "Rate Limiting",
        "Session Management"
    ];
</script>

<template>
    <div class="flex flex-col items-center justify-center gap-6 min-h-screen w-full dark:bg-black bg-white dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] overflow-hidden">
        <h1 class="dark:text-gray-200 text-4xl">Better Auth.</h1>
        <span class="dark:text-gray-200 text-xl">Nuxt.js demo to showcase  <a href="https://better-auth.com/" class="underline italic" target="_blank">better-auth.</a> features and capabilities.</span>
        <span class="flex items-center justify-center bg-gray-200 dark:bg-gray-300 opacity-80 p-2 text-xs text-center">
            All features on this demo are Implemented with better auth without any custom backend code
        </span>
        <div class="flex flex-wrap justify-center gap-2 md:w-1/2">
            <span v-for="(feature, index) in FEATURES" :key="index" class="text-xs text-gray-500 hover:text-gray-800 dark:hover:text-gray-100 hover:underline cursor-pointer">{{ feature }}.</span>
        </div>
        <button class="bg-primary-950 hover:bg-primary-900 flex items-center gap-2 text-gray-100 px-4 py-2 text-sm">
            <Icon name="lucide:log-in" />
            Sign In
        </button>
    </div>
</template>

<style>
html, body {
    height: 100%;
    margin: 0;
}

::-webkit-scrollbar {
  width: 2px;
}

::-webkit-scrollbar-track {
  background: #fff;
}

::-webkit-scrollbar-thumb {
  background: #fff;
}

::-webkit-scrollbar-thumb:hover {
  background: #fff;
}
</style>