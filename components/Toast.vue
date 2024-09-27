<script setup>
    import { getToastIconByType, getToastStyleByType } from "@/composables/functions/strings";

    const emits = defineEmits(["close"]);
    const props = defineProps({
        type: String,
        message: String
    });
</script>

<template>
    <div class="fixed flex items-center w-full max-w-xs p-4 rounded-lg shadow z-50" 
        :class="type === 'error' ? 'bg-red-100 text-red-500' : type === 'success' ? 'bg-green-100 text-green-500' : 'bg-blue-100 text-blue-500'"
    >
        <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg" :class="getToastStyleByType(type)">
            <Icon :name="getToastIconByType(type)" />
        </div>
        <div class="ms-3 text-sm font-normal">{{ message }}</div>
        <button type="button" class="ms-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 inline-flex items-center justify-center h-8 w-8"
            :class="type === 'error' ? 'bg-red-100 text-red-500 hover:bg-red-500 hover:text-white' : 
                type === 'success' ? 'bg-green-100 text-green-500 hover:bg-green-500 hover:text-white' : 'bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white'"
            @click="() => emits('close')"
        >
            <Icon name="material-symbols:close" />
        </button>
    </div>
</template>