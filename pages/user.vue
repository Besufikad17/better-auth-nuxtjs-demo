<script setup lang="ts">
    import { client } from "~/composables/functions/client"; 
    import type { Session } from "~/types/auth";

    const session = client.useSession();

    const isLoading = ref(false);
    const passkeyModal = ref(false);
    const passkeyListModal = ref(false);
    const passwordModal = ref(false);
    const profileModal = ref(false);
    const sessions = ref<Session[]>([]);
    const showToast = ref(false);
    const toastType = ref("message");
    const toastMessage = ref("");

    client.user.listSessions().then(data => {
        data.data?.map((s: Session) => {
            sessions.value.push(s);
        });
    }).catch(err => {
        console.log(err);
    });

    const logout = async () => {
        await client.signOut();
        await navigateTo("/auth/sign-in");
    };

    const revokeSession = async (id: string) => {
        isLoading.value = true;
        await client.user.revokeSession({ id });
        sessions.value = sessions.value.filter((s: Session) => s.id !== id);
        isLoading.value = false;
    };

    const showNotification = (message: string, type: string) => {
        profileModal.value = false;
        passkeyModal.value = false;
        passwordModal.value = false;
        showToast.value = true;
        toastType.value = type;
        toastMessage.value = message;
        setTimeout(() => {
            showToast.value = false;
        }, 3000);
    }
</script>

<template>
    <div class="flex flex-col items-center gap-6 p-8 px-4 min-h-[calc(100vh-62px)] w-full bg-white dark:bg-black  bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:12px_12px] dark:bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)]">
        <Modal v-model="passkeyModal" wrapper-class="max-w-lg bg-white dark:bg-black">
            <template #Heading>
                <h1 class="dark:text-primary-300 font-semibold">Add New Passkey</h1>
            </template>
            <template #content>
                <PasskeyForm 
                    @error="(err) => showNotification(err.message, 'error')" 
                    @success="(msg) => showNotification(msg.message, 'message')"
                />
            </template>
        </Modal>
        <Modal v-model="passkeyListModal" wrapper-class="max-w-lg bg-white dark:bg-black">
            <template #Heading>
                <h1 class="dark:text-primary-300 font-semibold">Passkeys</h1>
            </template>
            <template #content>
                <PasskeyList
                    @error="(err) => showNotification(err.message, 'error')" 
                    @success="(msg) => showNotification(msg.message, 'message')"
                />
            </template>
        </Modal>
        <Modal v-model="passwordModal" wrapper-class="max-w-lg bg-white dark:bg-black">
            <template #Heading>
                <h1 class="dark:text-primary-300 font-semibold">Change Password</h1>
            </template>
            <template #content>
                <PasswordForm 
                    @error="(err) => showNotification(err.message, 'error')" 
                    @success="(msg) => showNotification(msg.message, 'message')"
                />
            </template>
        </Modal>
        <Modal v-model="profileModal" wrapper-class="max-w-lg bg-white dark:bg-black">
            <template #Heading>
                <h1 class="dark:text-primary-300 font-semibold">Edit Profile</h1>
            </template>
            <template #content>
                <ProfileForm 
                    @error="(err) => showNotification(err.message, 'error')" 
                    @success="(msg) => showNotification(msg.message, 'message')"
                />
            </template>
        </Modal>
        <Toast v-if="showToast" :type="toastType" :message="toastMessage" @close="showToast = false" class="fixed top-6 right-6" />
        <div class="flex flex-col gap-4 p-4 border bg-white dark:bg-black border-gray-300 dark:border-primary-700 rounded-lg shadow-md w-full lg:w-2/3">
            <h1 class="dark:text-primary-300 font-semibold">User</h1>
            <div class="flex flex-col gap-2 sm:gap-0 sm:flex-row sm:items-center  sm:justify-between">
                <client-only>
                    <div class="flex items-center gap-4">
                        <img :src="session.data?.user.image" class="size-12 rounded-full" />
                        <div class="flex flex-col gap-2 dark:text-primary-300">
                            <span>{{ session.data?.user.name }}</span>
                            <span>{{ session.data?.user.email }}</span>
                        </div>
                    </div>
                </client-only>
                <button class="bg-gray-100 dark:bg-primary-700 flex items-center justify-center gap-2 px-2 py-1
                  dark:text-primary-300 rounded-md" @click="profileModal = true">
                    <Icon name="lucide:square-pen" />
                    Edit Profile
                </button>
            </div>
            <div class="flex flex-col gap-2 px-2 mt-4 border-l border-gray-300 dark:border-primary-700">
                <h1 class="text-xs dark:text-primary-300">Active Sessions</h1>
                <div v-for="(s, index) in sessions" :key="index" class="flex items-center gap-2 text-gray-900 dark:text-gray-300">
                    <Icon name="lucide:laptop" />
                    <span>{{ s.userAgent?.split(" ")[2] }}, {{  s.userAgent?.split(" ")[8].split("/")[0] }}</span>
                    <button class="bg-transparent px-2 py-1 flex items-center justify-center" @click="() => revokeSession(s.id)">
                        <Icon v-if="isLoading" name="lucide:trash" />
                        <span v-else class="text-red-500 hover:underline">sign out</span>
                    </button>
                </div>
            </div>
            <div class="flex flex-col gap-2 py-4 border-t border-b border-gray-500 dark:border-primary-700">
                <div class="flex items-center justify-between">
                    <h1 class="dark:text-primary-300 font-semibold">Passkeys</h1>
                    <h1 class="dark:text-primary-300 font-semibold">Two Factor</h1>
                </div>
                <div class="flex flex-col gap-2 sm:flex-row sm:gap-0 sm:items-center sm:justify-between">
                    <div class="flex items-center gap-2">
                        <button class="bg-transparent border border-gray-500 dark:border-primary-700 flex items-center justify-center gap-2 px-2 py-1
                          dark:text-primary-300 rounded-md" @click="passkeyModal = true">
                            <Icon name="lucide:plus" />
                            Add New Passkey
                        </button>
                        <button class="bg-transparent border border-gray-500 dark:border-primary-700 flex items-center justify-center gap-2 px-2 py-1
                         dark:text-primary-300 rounded-md" @click="passkeyListModal = true">
                            <Icon name="lucide:fingerprint" />
                            Passkeys
                        </button>
                    </div>
                    <button class="bg-transparent border border-gray-500 dark:border-primary-700 flex items-center justify-center gap-2 px-2 py-1
                        dark:text-primary-300 rounded-md">
                        <Icon name="lucide:shield-check" />
                        Enable 2FA
                    </button>
                </div>
            </div>
            <div class="flex flex-col gap-2 sm:flex-row sm:gap-0 sm:items-center sm:justify-between">
                <button class="bg-transparent border border-gray-500 dark:border-primary-700 flex items-center justify-center gap-2 px-2 py-1
                    dark:text-primary-300 rounded-md" @click="passwordModal = true">
                    <Icon name="fa6-solid:ruler-horizontal" />
                    Change Password
                </button>
                <button class="bg-transparent bg-gray-100 dark:bg-primary-700 flex items-center justify-center gap-2 px-2 py-1
                    dark:text-primary-300 rounded-md" @click="logout">
                    <Icon name="lucide:log-out" />
                    Sign Out
                </button>
            </div>
        </div>
    </div>
</template>