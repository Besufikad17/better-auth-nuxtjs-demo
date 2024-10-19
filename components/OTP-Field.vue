<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
    class: {
        type: String,
        default: "",
    },
    fields: {
        type: Number,
    },
});

const data = ref<string[]>([]);
const firstInputEl = ref<HTMLElement[]>();
const emit = defineEmits(["update:modelValue"]);

watch(
    () => data,
    (newVal) => {
        if (
            newVal.value.length > 0 &&
            newVal.value.length === props.fields &&
            !newVal.value.includes("")
        ) {
            emit("update:modelValue", newVal.value.join(""));
        } else {
            emit("update:modelValue", null);
        }
    },
    { deep: true },
);

const handleOtpInput = (e: Event) => {
    const inputEvent = e as InputEvent;
    const target = e.target as HTMLInputElement;

    if (inputEvent.data && target.nextElementSibling) {
        (target.nextElementSibling as HTMLElement).focus();
    } else if (inputEvent.data == null && target.previousElementSibling) {
        (target.previousElementSibling as HTMLElement).focus();
    }
};

const handlePaste = (e: ClipboardEvent) => {
    const pasteData = e.clipboardData?.getData("text");
    let nextEl = firstInputEl.value![0].nextElementSibling;
    for (let i = 1; i < pasteData!.length; i++) {
        if (nextEl) {
            data.value[i] = pasteData![i];
            nextEl = nextEl.nextElementSibling;
        }
    }
};
</script>

<template>
    <div class="otp w-full flex justify-between" @input="handleOtpInput">
        <template v-for="field in fields" :key="field">
            <input
                v-model="data[field - 1]"
                ref="firstInputEl"
                type="text"
                maxlength="1"
                class="border rounded w-10 h-10 text-center focus:border-primary focus:ring-primary"
                :class="class"
                @paste="field === 1 && handlePaste($event)"
            />
        </template>
    </div>
</template>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>