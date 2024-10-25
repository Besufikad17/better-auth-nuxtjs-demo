<script setup lang="ts">
    import { client } from "~/composables/functions/client";
import type { Invitation } from "~/types/auth";

    const route = useRoute();

    const inviteId = route.params.inviteId;

    const invitation = ref<Invitation | null>();
    const acceptInvitationLoading = ref(false);
    const rejectInvitationLoading = ref(false);
    const showToast = ref(false);
    const toastType = ref("message");
    const toastMessage = ref("");
    
    onMounted(async() => {
        const { data, error } = await client.organization.getInvitation({
            query: {
                id: inviteId as string
            }
        });

        console.log(data);
        if(data) {
            invitation.value = data;
        }

        if(error) {
            console.error(error);
            toastType.value = "error";
            toastMessage.value = error.message || "An error occurred";
        }
    });

    const accept = async () => {
        acceptInvitationLoading.value = true;
        const { data, error } = await client.organization.acceptInvitation({
            invitationId: inviteId as string
        });

        if(data) {
            acceptInvitationLoading.value = false;
            toastMessage.value = "Invitation accepted successfully";
            toastType.value = "success";
            showToast.value = true;
            setTimeout(() => {
                window.location.href = "/user";
            }, 2000);
        }

        if(error) {
            acceptInvitationLoading.value = false;
            console.error(error);
            toastMessage.value = error.message || "An error occurred";
            toastType.value = "error";
        }
    }

    const decline = async () => {
        rejectInvitationLoading.value = true;
        const { data, error } = await client.organization.rejectInvitation({
            invitationId: inviteId as string
        });

        if(data) {
            rejectInvitationLoading.value = false;
            toastMessage.value = "Invitation declined successfully";
            toastType.value = "success";
            showToast.value = true;
            setTimeout(() => {
                window.location.href = "/user";
            }, 2000);
        }

        if(error) {
            rejectInvitationLoading.value = false;
            console.error(error);
            toastMessage.value = error.message || "An error occurred";
            toastType.value = "error";
        }
    }
</script>

<template>
    <div class="flex items-center justify-center min-h-[calc(100vh-62px)] dark:bg-black bg-white overflow-auto w-full">
        <Toast v-if="showToast" :type="toastType" :message="toastMessage" @close="showToast = false" class="fixed top-6 right-6" />
        <div v-if="invitation && toastType !== 'error'" class="flex flex-col gap-4 w-1/3 border border-gray-900 dark:border-gray-200 rounded-md p-4">
            <h1 class="text-2xl dark:text-white">Invitation</h1>
            <p class="text-lg dark:text-white"><b>{{invitation.inviterEmail}}</b> has invited you to join <b>{{invitation.organizationName}}</b> on <b>better-auth</b>.</p>
            <div class="flex items-center justify-center gap-3">
                <button class="bg-white dark:bg-primary-700 dark:text-white px-2 py-1 flex items-center justify-center gap-2 rounded-md" @click="accept">
                    <Icon v-if="acceptInvitationLoading" name="svg-spinners:180-ring-with-bg" />
                    Accept
                </button>
                <button class="bg-red-500 text-white px-2 py-1 flex items-center justify-center gap-2 rounded-md" @click="decline">
                    <Icon v-if="rejectInvitationLoading" name="svg-spinners:180-ring-with-bg" />
                    Decline
                </button>
            </div>
        </div>
        <div v-else-if="toastType === 'error'" class="flex flex-col gap-4 w-1/3 border border-gray-900 dark:border-gray-200 rounded-md p-4">
            <h1 class="text-2xl text-red-500">Invitation Error</h1>
            <p class="dark:text-white">There was an issue with your invitation.</p>
            <p class="dark:text-white">The invitation you're trying to access is either invalid or you don't have the correct permissions. Please check your email for a valid invitation or contact the person who sent it.</p>
            <NuxtLink to="/user" class="bg-transparent border border-gray-900 dark:border-gray-200 flex items-center justify-center px-2 py-1 dark:text-white">Go back to home</NuxtLink>
        </div>
    </div>
</template>