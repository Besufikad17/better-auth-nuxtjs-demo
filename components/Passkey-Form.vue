<script setup lang="ts">
    import { client } from "~/composables/functions/client"; 

    const emit = defineEmits(['error', 'success']);

    const isLoading = ref(false);
    const passkey = ref("");

    const addPasskey = async() => {
        isLoading.value = true;
        if(passkey.value === "") {
            emit('error', { message: "Passkey name is required." });
            isLoading.value = false;
        }else {
            try {
                const res = await client.passkey.addPasskey({ name: passkey.value });
                if(res?.error) {
                    throw new Error(res.error.message);
                }
                emit('success', { message: "Passkey created successfully." });
            } catch (error) {
                emit('error', { message: (error as Error).message });
            }
        }
        isLoading.value = false;
    }
</script>

<template>
    <div class="bg-white dark:bg-black w-full flex flex-col justify-start gap-4 mt-6">
        <span class="text-xs text-gray-500 dark:text-primary-700">Create a new passkey to securely access your account without a password.</span>
        <Textfield v-model="passkey" name="passkey" type="text"
            class="px-2 py-1 border border-gray-300 bg-transparent dark:border-primary-700 focus:outline-gray-900 focus:rounded-sm dark:focus:outline-primary-900 shadow-sm"
        >
            <template #label>
                <label for="passkey" class="text-sm dark:text-white mb-2">Passkey Name</label>
            </template>
        </Textfield>
        <button class="flex items-center justify-center gap-2 p-2 text-sm rounded-sm text-white dark:text-black"
            :class="isLoading ? 'bg-gray-800 dark:bg-gray-300' : 'bg-black dark:bg-white'" :disabled="isLoading" @click="addPasskey"
        >
            <Icon v-if="!isLoading" name="lucide:fingerprint" />
            Create Passkey
            <Icon v-if="isLoading" name="svg-spinners:90-ring-with-bg" />
        </button>
    </div>
</template>