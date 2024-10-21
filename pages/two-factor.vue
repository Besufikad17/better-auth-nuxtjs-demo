<script setup lang="ts">
    import { ref } from "vue";
    import { client } from "~/composables/functions/client";

    const isLoading = ref(false);
    const showToast = ref(false);
    const toastType = ref("success");
    const toastMessage = ref("");
    const otp = ref("");

    const confirm = async() => {
        await client.twoFactor.verifyOtp({ code: otp.value }, {
            onSuccess(){
                showToast.value = true;
                toastType.value = "success";
                toastMessage.value = "OTP verified successfully";
                setTimeout(() => {
                    window.location.href = "/user";
                }, 1000);
            },
            onError(ctx){
                showToast.value = true;
                toastType.value = "error";
                toastMessage.value = ctx.error.message || "Could not verify OTP";
            }
        });
    }

    const resend = async() => {
        const { data, error } = await client.twoFactor.sendOtp();

        if(data) {
            showToast.value = true;
            toastType.value = "success";
            toastMessage.value = "OTP sent successfully";
        } else {
            showToast.value = true;
            toastType.value = "error";
            toastMessage.value = error.message || "Could not send OTP";
        }
    }
</script>

<template>
    <div class="flex items-center justify-center min-h-[calc(100vh-62px)] dark:bg-black bg-white overflow-auto w-full">
        <Toast v-if="showToast" :type="toastType" :message="toastMessage" @close="showToast = false" class="fixed top-6 right-6" />
        <div class="flex flex-col items-center p-8 w-full">
            <div class="flex flex-col gap-4 p-4 border bg-white dark:bg-black border-gray-300 dark:border-primary-700 w-1/2 md:w-1/3">
                <h1 class="dark:text-white font-semibold">Confirm OTP</h1>
                <p class="text-sm text-gray-500 dark:text-primary-400">Enter the OTP we just sent you</p>
                <OTPField v-model="otp" class="p-2 focus:border-2 focus:border-gray-950 dark:bg-[#424242] dark:text-white" :fields="6" />
                <button class="flex items-center justify-center w-full gap-2 p-2 text-sm rounded-sm text-white dark:text-black"
                    :class="isLoading ? 'bg-gray-800 dark:bg-gray-300' : 'bg-black dark:bg-white'" :disabled="isLoading" @click="() => confirm()"
                >
                    Confirm
                    <Icon v-if="isLoading" name="svg-spinners:90-ring-with-bg" />
                </button>
                <span class="flex items-center justify-center bg-transparent focus:outline-none focus:ring-0 dark:text-primary-700 hover:underline cursor-pointer" @click="resend">Resend OTP</span>
            </div>
        </div>
    </div>
</template>