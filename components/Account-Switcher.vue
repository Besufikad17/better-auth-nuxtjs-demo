<script setup lang="ts">
    import { client } from "~/composables/functions/client";
    import type { DeviceSession } from "~/types/auth";

    const session = client.useSession();

    const props = defineProps({
        sessions: {
            type: Array<DeviceSession>
        }
    });

    console.log(props.sessions);

    const switchAccount = async(id: string) => {
        await client.multiSession.setActive({
            sessionId: id
        });
    }
</script>

<template>
    <div class="flex justify-start">
        <HeadlessMenu as="div">
            <div>
                <HeadlessMenuButton class="absolute flex justify-center rounded-md px-4 py-2 text-sm font-medium bg-gray-100 dark:bg-primary-600 dark:text-white">
                    <div class="flex items-center gap-4">
                        <div class="flex items-center gap-2">
                            <img :src="session.data?.user.image" class="size-4 rounded-full" />
                            <span>{{ session.data?.user.name }}</span>
                        </div>
                        <Icon name="lucide:chevron-down"/>
                    </div>
                    <transition
                        enter-active-class="transition duration-100 ease-out"
                        enter-from-class="transform scale-95 opacity-0"
                        enter-to-class="transform scale-100 opacity-100"
                        leave-active-class="transition duration-75 ease-in"
                        leave-from-class="transform scale-100 opacity-100"
                        leave-to-class="transform scale-95 opacity-0"
                    >
                        <HeadlessMenuItems   
                            class="absolute left-0 mt-2 origin-top-right divide-y py-2 dark:bg-primary-950 divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                        >
                            <div class="flex flex-col gap-2 py-1">
                                <HeadlessMenuItem>
                                    <div class="flex flex-col items-start justify-start px-2 gap-2">
                                        <span class="dark:text-gray-300 text-xs">Current Account</span>
                                        <div class="bg-gray-200 dark:bg-primary-700 dark:text-gray-300 px-2 py-1 flex items-center gap-2">
                                            <img :src="session.data?.user.image" class="size-4 rounded-full" />
                                            <span>{{ session.data?.user.name }}</span>
                                        </div>
                                    </div>
                                </HeadlessMenuItem>
                                <HeadlessMenuItem>
                                    <div class="flex flex-col items-start px-2 py-1 gap-2 justify-start border-b border-t border-gray-300">
                                        <span>Switch Account</span>
                                        <span v-for="(s, index) in sessions" :key="index">
                                            <span v-if="session.data?.session.id !== s.session.id" class="bg-gray-200 dark:bg-primary-700 dark:text-gray-300 px-2 py-1 flex items-center gap-2" @click="(_) => switchAccount(s.session.id)">
                                                <img :src="s.user.image" class="size-4 rounded-full" />
                                                <span>{{ s.user.name }}</span>
                                            </span>
                                        </span>
                                    </div>
                                </HeadlessMenuItem>
                                <HeadlessMenuItem>
                                    <NuxtLink to="/auth/sign-in" class="flex items-center gap-2 px-2 dark:text-gray-300">
                                        <Icon name="lucide:circle-plus"/>
                                        <span>Add Account</span>
                                    </NuxtLink>
                                </HeadlessMenuItem>
                            </div>
                        </HeadlessMenuItems>
                    </transition>
                </HeadlessMenuButton>
            </div>
        </HeadlessMenu>
    </div>
</template>