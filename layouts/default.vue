<script setup lang="ts">

</script>

<template>
    <div class="flex items-center justify-center">
        <div class="flex items-center justify-between border-b-2 border-gray-300 p-2 w-full lg:w-2/3">
            <div class="flex items-center gap-3">
                <span class="flex items-center justify-center p-2 bg-gray-200 text-xs">B.</span>
                <span>BETTER AUTH.</span>
            </div>
            <Icon name="lucide:sun" />
        </div>
        <slot/>
    </div>
</template>