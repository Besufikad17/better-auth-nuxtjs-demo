<script setup lang="ts">
    import { client } from "~/composables/functions/client";

    const route = useRoute();

    const inviteId = route.params.inviteId;

    const isLoading = ref(false);
    const showToast = ref(false);
    const toastType = ref("message");
    const toastMessage = ref("");
    
    onMounted(async() => {
        isLoading.value = true;
        const { data, error } = await client.organization.acceptInvitation({
            invitationId: inviteId as string
        });

        if(data) {
            isLoading.value = false;
            toastMessage.value = "Invitation accepted successfully";
            toastType.value = "success";
            showToast.value = true;
            setTimeout(() => {
                window.location.href = "/user";
            }, 2000);
        }

        if(error) {
            isLoading.value = false;
            console.error(error);
            toastMessage.value = error.message || "An error occurred";
            toastType.value = "error";
            showToast.value = true;
        }
    })
</script>

<template>
    <div class="flex items-center justify-center min-h-[calc(100vh-62px)] dark:bg-black bg-white overflow-auto w-full">
        <Toast v-if="showToast" :type="toastType" :message="toastMessage" @close="showToast = false" class="fixed top-6 right-6" />
        <div class="flex items-center gap-3 dark:text-white">
            <Icon v-if="isLoading" name="svg-spinners:180-ring-with-bg" />
            <span>Accepting invitation</span>
        </div>
    </div>
</template>