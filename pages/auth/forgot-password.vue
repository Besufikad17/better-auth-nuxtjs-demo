<script setup lang="ts">
    import { ref } from "vue";
    import { client } from "~/composables/functions/client";

    const email = ref("");
    const emailSent = ref(false);
    
    const isLoading = ref(false);
    const showToast = ref(false);
    const toastType = ref("success");
    const toastMessage = ref("");

    const forgetPassword = async () => {
        isLoading.value = true;
        try {
            const data = await client.forgetPassword({
                email: email.value,
                redirectTo: "/auth/reset-password"
            });
    
            if(data.error) {
                console.log(data.error);
                throw new Error(data.error ? data.error.message : "Failed to send email");
            }

            showToast.value = true;
            toastType.value = "success";
            toastMessage.value = "Password reset link sent to your email";
            setTimeout(() => {
                email.value = "";
                emailSent.value = true;
                showToast.value = false;
            }, 2000);
        } catch(error: any) {
            showToast.value = true;
            toastType.value = "error";
            toastMessage.value = error.message;
        }
        isLoading.value = false;
    }
</script>

<template>
    <div class="flex items-center justify-center md:h-[calc(100vh-62px)] dark:bg-black bg-white overflow-auto">
        <Toast v-if="showToast" :type="toastType" :message="toastMessage" @close="showToast = false" class="fixed top-6 right-6" />
        <div class="flex flex-col p-8">
            <div class="flex flex-col gap-4 p-4 border bg-white dark:bg-black border-gray-300 dark:border-primary-700">
                <h1 class="dark:text-white font-semibold">{{ emailSent ? 'Check your email' : 'Forgot password' }}</h1>
                <p class="text-sm text-gray-500 dark:text-primary-400">{{ emailSent ? 'We have sent a password reset link to your email.' : 'Enter your email to reset your password' }}</p>
                <div v-if="emailSent" class="flex items-center gap-3 w-full p-3 border bg-white dark:bg-black border-gray-300 dark:border-primary-700 dark:text-white">
                    <Icon name="weui:done2-outlined" />
                    <span class="text-sm">If you don't see the email, check your spam folder.</span>
                </div>
                <Textfield v-else v-model="email" name="email" placeholder="john@example.com" 
                    class="px-2 py-1 border border-gray-300 bg-transparent dark:border-primary-700 focus:outline-gray-900 focus:rounded-sm dark:focus:outline-primary-900 shadow-sm"
                >
                    <template #label>
                        <label for="email" class="text-sm dark:text-white mb-2">Email</label>
                    </template>
                </Textfield>
                <NuxtLink to="/auth/forgot-password" v-if="emailSent" class="flex items-center justify-center w-full gap-2 p-2 text-sm rounded-sm border border-gray-300 hover:border-gray-900 dark:border-primary-700 dark:hover:border-primary-900 dark:text-white" @click="emailSent = false">
                        <Icon name="lucide:arrow-left" />
                        Back to reset password
                </NuxtLink>
                <button v-else class="flex items-center justify-center w-full gap-2 p-2 text-sm rounded-sm text-white dark:text-black"
                    :class="isLoading ? 'bg-gray-800 dark:bg-gray-300' : 'bg-black dark:bg-white'" :disabled="isLoading" @click="() => forgetPassword()"
                >
                    Send reset link
                    <Icon v-if="isLoading" name="svg-spinners:90-ring-with-bg" />
                </button>
                <NuxtLink v-if="!emailSent" to="/auth/sign-in" class="flex items-center justify-center dark:text-gray-100 hover:underline p-2">Back to sign in</NuxtLink>
            </div>
        </div>
    </div>
</template>