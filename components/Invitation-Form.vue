<script setup lang="ts">
    import { client } from "~/composables/auth/client"; 

    const emit = defineEmits(['error', 'success']);

    const email = ref("");
    const isLoading = ref(false);
    const role = ref();

    const invite = async() => {
        if(email.value === "" || role.value === "") {
            emit('error', new Error( "Please fill all fields."));
            return;
        }

        isLoading.value = true;
        const { data, error } = await client.organization.inviteMember({
            email: email.value,
            role: role.value,
        });

        if(data) {
            emit('success', "Memeber invited successfully.");
        }

        if(error) {
            emit('error', error);
        }
    }
</script>

<template>
     <div class="bg-white dark:bg-black w-full flex flex-col justify-start gap-4 mt-6">
        <span class="text-xs text-gray-500 dark:text-primary-700">Invite a member to your organization.</span>
        <Textfield v-model="email" name="email" type="text" placeholder="Email"
            class="px-2 py-1 border border-gray-300 bg-transparent dark:border-primary-700 focus:outline-gray-900 focus:rounded-sm dark:focus:outline-primary-900 shadow-sm"
        >
            <template #label>
                <label for="name" class="text-sm dark:text-white mb-2">Email</label>
            </template>
        </Textfield>
        <div class="flex flex-col justify-start gap-2">
            <label for="role" class="dark:text-gray-300">Type</label>
            <select id="role" v-model="role"
                class="text-gray-900 text-sm rounded-lg block w-full px-2.5 py-2 border border-gray-500 bg-white dark:bg-black focus:outline-none focus:ring-0 dark:text-white cursor-pointer">
                <option value="admin">Admin</option>
                <option value="member">Member</option>
            </select>
        </div>
        <div class="flex justify-end">
            <button class="flex items-center justify-center gap-2 p-2 text-sm rounded-sm text-white dark:text-black"
                :class="isLoading ? 'bg-gray-800 dark:bg-gray-300' : 'bg-black dark:bg-white'" :disabled="isLoading" @click="invite"
            >
                Invite
                <Icon v-if="isLoading" name="svg-spinners:90-ring-with-bg" />
            </button>
        </div>
    </div>
</template>