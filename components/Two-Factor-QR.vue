<script setup lang="ts">
    import { useClipboard, useColorMode } from "@vueuse/core";
    import QRCodeVue3 from "qrcode-vue3";
    
    const props = defineProps({
        value : {
            type: String,
            default: ""
        },
    });

    const colorMode = useColorMode();
    const isDark = colorMode.value === "dark";
    const src = ref(props.value);
    const { text, copy, copied, isSupported } = useClipboard({ source: src });

    console.log(props.value);
</script>

<template>
    <div class="bg-white dark:bg-black w-full flex flex-col items-center justify-center gap-3 mt-6">
        <span class="text-xs text-gray-500 dark:text-primary-700">Scan QR Code</span>
        <client-only>
            <QRCodeVue3 :value="value" :dots-options="{
                type: 'dots',
                color: isDark ? '#ffffff' : '#000000',
                background: 'transparent',
                size: 5,
                margin: 3,
                scale: 4
            }" :backgroundOptions="{ color: 'transparent' }" />
        </client-only>
        <div class="flex items-center gap-2">
            <span class="text-gray-950 dark:text-gray-300">{{ copied ? 'Copied' : 'Copy URI to clipboard' }}</span>
            <button class="flex items-center justify-center bg-transparent focus:outline-none focus:ring-0 text-gray-950 dark:text-gray-300" @click="copy(src)"> 
                <Icon v-if="!copied" name="lucide:copy" />
                <Icon v-else name="material-symbols:done" />
            </button>
        </div>
    </div>
</template>