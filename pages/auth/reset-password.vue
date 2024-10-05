<script setup lang="ts">
    import { ref } from "vue";
    import { client } from "~/composables/functions/client";

    const confirmPassword = ref("");
    const isLoading = ref(false);
    const password = ref("");
    const showToast = ref(false);
    const toastType = ref("success");
    const toastMessage = ref("");

    const resetPassword = async () => {
        isLoading.value = true;
        try {
            if(password.value !== confirmPassword.value) {
                throw new Error("Passwords do not match");
            }
            
            const { data, error } = await client.resetPassword({
                newPassword: password.value,
            });

            if(error) {
                throw new Error(error ? error.message : "Failed to reset password");
            }
            console.log(data);
            showToast.value = true;
            toastType.value = "success";
            toastMessage.value = "Password reset link sent to your email";
            setTimeout(async() => {
                await navigateTo("/auth/sign-in");
            }, 2000);
        } catch (error: any) {
            showToast.value = true;
            toastType.value = "error";
            toastMessage.value = error.message;
        }
        isLoading.value = false;
    };
</script>

<template>
    <div class="flex items-center justify-center md:h-[calc(100vh-62px)] dark:bg-black bg-white overflow-auto">
        <Toast v-if="showToast" :type="toastType" :message="toastMessage" @close="showToast = false" class="fixed top-6 right-6" />
        <div class="flex flex-col p-8">
            <div class="flex flex-col gap-4 p-4 border bg-white dark:bg-black border-gray-300 dark:border-primary-700">
                <h1 class="dark:text-white font-semibold">Reset password</h1>
                <p class="text-sm text-gray-500 dark:text-primary-400">Enter new password and confirm it to reset your password.</p>
                <Textfield v-model="password" name="password" placeholder="Password" type="password"
                    class="px-2 py-1 border border-gray-300 bg-transparent dark:border-primary-700 focus:outline-gray-900 focus:rounded-sm dark:focus:outline-primary-900 shadow-sm"
                >
                    <template #label>
                        <label for="email" class="text-sm dark:text-white mb-2">Password</label>
                    </template>
                </Textfield>
                <Textfield v-model="confirmPassword" name="confirmPassword" placeholder="Confirm Password" type="password"
                    class="px-2 py-1 border border-gray-300 bg-transparent dark:border-primary-700 focus:outline-gray-900 focus:rounded-sm dark:focus:outline-primary-900 shadow-sm"
                >
                    <template #label>
                        <label for="email" class="text-sm dark:text-white mb-2">Confirm Password</label>
                    </template>
                </Textfield>
                <button class="flex items-center justify-center w-full gap-2 p-2 text-sm rounded-sm text-white dark:text-black"
                    :class="isLoading ? 'bg-gray-800 dark:bg-gray-300' : 'bg-black dark:bg-white'" :disabled="isLoading" @click="() => resetPassword()"
                >
                    Reset Password
                    <Icon v-if="isLoading" name="svg-spinners:90-ring-with-bg" />
                </button>
            </div>
        </div>
    </div>
</template>