<script setup lang="ts">
    import { client } from "~/composables/functions/client"; 

    const emit = defineEmits(['error', 'success']);
    const props = defineProps({
        action: {
            type: String,
            default: "enable"
        }
    });

    const isLoading = ref(false);
    const password = ref("");

    const handle2FA = async() => {
        isLoading.value = true;
        if(password.value === "") {
            emit('error', { message: "Password is required." });
            isLoading.value = false;
        }else {
            try {
                let res = null;

                if(props.action === "enable") {
                    res = await client.twoFactor.enable({
                        password: password.value
                    });
                }else {
                    res = await client.twoFactor.disable({
                        password: password.value
                    });
                }

                if(res.error) {
                    throw new Error(res.error.message);
                }
                emit('success', { message: `2FA ${props.action}d successfully.` });
            } catch(error) {
                emit('error', { message: (error as Error).message });
            }
        }
        isLoading.value = false;
    }
</script>

<template>
    <div class="bg-white dark:bg-black w-full flex flex-col justify-start gap-4 mt-6">
        <span class="text-xs text-gray-500 dark:text-primary-700">Enable 2FA to secure your account</span>
        <Textfield v-model="password" name="password" type="password" placeholder="password"
            class="px-2 py-1 border border-gray-300 bg-transparent dark:border-primary-700 focus:outline-gray-900 focus:rounded-sm dark:focus:outline-primary-900 shadow-sm"
        >
            <template #label>
                <label for="passkey" class="text-sm dark:text-white mb-2">Password</label>
            </template>
        </Textfield>
        <div class="flex items-center justify-end">
            <button class="flex items-center justify-center gap-2 p-2 text-sm rounded-sm text-white dark:text-black"
                :class="isLoading ? 'bg-gray-800 dark:bg-gray-300' : 'bg-black dark:bg-white'" :disabled="isLoading" @click="handle2FA"
            >
                {{ action === 'enable' ? 'Enable 2FA' : 'Disable 2FA' }}
                <Icon v-if="isLoading" name="svg-spinners:90-ring-with-bg" />
            </button>
        </div>
    </div>
</template>