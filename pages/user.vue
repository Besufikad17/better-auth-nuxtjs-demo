<script setup lang="ts">
    import { client } from "~/composables/functions/client"; 
    import type { Session } from "~/types/auth";

    const session = client.useSession();

    const isLoading = ref(false);
    const sessions = ref<Session[]>([]);

    client.user.listSessions().then(data => {
        data.data?.map((s: Session) => {
            console.log(s);
            sessions.value  .push(s);
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
        sessions.value = sessions.value.filter(s => s.id !== id);
        isLoading.value = false;
    };
</script>

<template>
    <div class="flex flex-col items-center gap-6 p-8 px-4 min-h-[calc(100vh-62px)] w-full bg-white dark:bg-black">
        <div class="flex flex-col gap-4 p-4 border border-gray-300 dark:border-primary-700 rounded-md w-full lg:w-2/3">
            <h1 class="dark:text-primary-300 font-semibold">User</h1>
            <div class="flex items-center justify-between">
                <client-only>
                    <div class="flex items-center gap-4">
                        <img :src="session.data?.user.image" class="size-12 rounded-full" />
                        <div class="flex flex-col gap-2 dark:text-primary-300">
                            <span>{{ session.data?.user.name }}</span>
                            <span>{{ session.data?.user.email }}</span>
                        </div>
                    </div>
                </client-only>
                <button class="bg-transparent border border-gray-300 dark:border-primary-700 flex items-center justify-center gap-2 px-2 py-1
                 text-gray-300 dark:text-primary-300 rounded-md">
                    <Icon name="lucide:square-pen" />
                    Edit Profile
                </button>
            </div>
            <div class="flex flex-col gap-2 mt-4">
                <h1 class="text-xs dark:text-primary-300">Active Sessions</h1>
                <div v-for="(s, index) in sessions" :key="index" class="flex items-center gap-2 text-gray-900 dark:text-gray-300">
                    <Icon name="lucide:laptop" />
                    <span>{{ s.userAgent?.split(" ")[2] }}</span>
                    <button class="bg-transparent px-2 py-1 flex items-center justify-center" @click="() => revokeSession(s.id)">
                        <Icon v-if="isLoading" name="lucide:trash" />
                        <span v-else class="text-red-500 hover:underline">sign out</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>