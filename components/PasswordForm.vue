<script setup lang="ts">
    import { client } from "~/composables/functions/client"; 

    const emit = defineEmits(['error', 'success']);

    const isLoading = ref(false);
    const currentPassword = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const revokeSession = ref(false);

    const updatePassword = async() => {
        isLoading.value = true;
        if(currentPassword.value === "" || password.value === "" || confirmPassword.value === "") {
            emit('error', { message: "Please fill all fields" });
            isLoading.value = false;
            return;
        }

        if (password.value !== confirmPassword.value) {
            emit('error', { message: "Passwords do not match" });
            isLoading.value = false;
            return;
        }

        const { data, error } = await client.user.changePassword({
            currentPassword: currentPassword.value,
            newPassword: password.value,
            revokeOtherSessions: revokeSession.value
        });

        if(error) {
            emit('error', error);
            return;
        }
        emit('success', { message: 'Password updated successfully!!' });
        if(revokeSession.value) {
            await navigateTo("/auth/sign-in");
        }
        isLoading.value = false;
    }
</script>

<template>
    <div class="bg-white dark:bg-black w-full flex flex-col justify-start gap-4 mt-6">
        <span class="text-xs text-gray-500 dark:text-primary-700">Change your password</span>
        <Textfield v-model="currentPassword" name="currentPassword" placeholder="Current Password" type="password"
            class="px-2 py-1 border border-gray-300 bg-transparent dark:border-primary-700 focus:outline-gray-900 focus:rounded-sm dark:focus:outline-primary-900 shadow-sm"
        >
            <template #label>
                <label for="currentPassword" class="text-sm dark:text-white mb-2">Current Password</label>
            </template>
        </Textfield>
        <Textfield v-model="password" name="password" placeholder="Password" type="password"
            class="px-2 py-1 border border-gray-300 bg-transparent dark:border-primary-700 focus:outline-gray-900 focus:rounded-sm dark:focus:outline-primary-900 shadow-sm"
        >
            <template #label>
                <label for="password" class="text-sm dark:text-white mb-2">Password</label>
            </template>
        </Textfield>
        <Textfield v-model="confirmPassword" name="confirmPassword" placeholder="Confirm Password" type="password"
            class="px-2 py-1 border border-gray-300 bg-transparent dark:border-primary-700 focus:outline-gray-900 focus:rounded-sm dark:focus:outline-primary-900 shadow-sm"
        >
            <template #label>
                <label for="confirmPassword" class="text-sm dark:text-white mb-2">Confirm Password</label>
            </template>
        </Textfield>
        <Checkbox
            v-model="revokeSession"
            :data="{ label: 'Sign out from other devices', value: true }"
            class="text-sm dark:text-white cursor-pointer accent-black dark:accent-white bg-transparent border dark:border-white"
        />
        <div class="flex items-center justify-end">

            <button class="flex items-center justify-center gap-2 p-2 text-sm rounded-sm text-white dark:text-black"
                :class="isLoading ? 'bg-gray-800 dark:bg-gray-300' : 'bg-black dark:bg-white'" :disabled="isLoading" @click="updatePassword"
            >
                Change Password
                <Icon v-if="isLoading" name="svg-spinners:90-ring-with-bg" />
            </button>
        </div>
    </div>
</template>