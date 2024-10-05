<script setup lang="ts">
    import { useColorMode } from '@vueuse/core';
    const mode = useColorMode();
</script>

<template>
    <div>
        <div class="flex items-center justify-center dark:bg-black">
            <div class="flex items-center justify-between border-b border-gray-300 p-2 w-full lg:w-2/3">
                <div class="flex items-center gap-3">
                    <Logo class="text-black dark:text-white" />
                    <span class="dark:text-gray-200">BETTER-AUTH.</span>
                </div>
                <client-only>
                    <div class="dark:text-gray-200 hover:bg-gray-300 cursor-pointer dark:hover:bg-primary-800 p-2 rounded-sm flex items-center justify-center">
                        <Icon v-if="mode === 'light'" name="lucide:sun" @click="mode = 'dark'" />
                        <Icon v-else name="lucide:moon" @click="mode = 'light'" />
                    </div>
                </client-only>
            </div>
        </div>
        <slot/>
    </div>
</template>