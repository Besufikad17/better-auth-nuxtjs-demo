<script setup lang="ts">
    import { useColorMode } from '@vueuse/core';
    const mode = useColorMode();
</script>

<template>
    <div>
        <div class="flex items-center justify-center dark:bg-black">
            <div class="flex items-center justify-between border-b-2 border-gray-300 p-2 w-full lg:w-2/3">
                <div class="flex items-center gap-3">
                    <span class="flex items-center justify-center p-2 bg-gray-200 text-xs">B.</span>
                    <span class="dark:text-gray-200">BETTER AUTH.</span>
                </div>
                <client-only>
                    <div class="dark:text-gray-200">
                        <Icon v-if="mode === 'dark'" name="lucide:sun" @click="mode = 'light'" />
                        <Icon v-else name="lucide:moon" @click="mode = 'dark'" />
                    </div>
                </client-only>
            </div>
        </div>
        <slot/>
    </div>
</template>