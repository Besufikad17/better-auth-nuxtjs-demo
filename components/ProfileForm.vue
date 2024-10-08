<script setup lang="ts">
    import { client } from "~/composables/functions/client"; 

    const config = useRuntimeConfig();
    const emit = defineEmits(['error', 'success']);

    const fullName = ref("");
    const image = ref();
    const isLoading = ref(false);

    const onFileUpload = async(e: Event) => {
        var element = e.target as HTMLInputElement;
        const formData = new FormData();
        formData.append('file', element!.files![0]);
        formData.append('upload_preset', config.public.CLOUDINARY_UPLOAD_PRESET);
        fetch(config.public.CLOUDINARY_URL, {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then((data) => {
            if (data.secure_url !== '') {
                image.value = data.secure_url;
            }
        }).catch(err => emit('error', err));
    }

    const editProfile = async() => {
        console.log(fullName.value, image.value);
        if(fullName.value === "" || image.value) {
            emit('error', { message: 'Please fill all fields!!' });
            return;
        }
        isLoading.value = true;
        const { data, error } = await client.user.update({
            image: "https://example.com/image.jpg",
            name: "John Doe",
        });
        if(error) {
            emit('error', error);
            return;
        }
        emit('success', { message: 'Profile updated successfully!!' });
        isLoading.value = false;
    }
</script>

<template>
    <div class="bg-white dark:bg-black w-full flex flex-col justify-start gap-4 mt-6">
        <span class="text-xs text-gray-500 dark:text-primary-700">Enter user information</span>
        <Textfield v-model="fullName" name="fullName" placeholder="John Doe" 
            class="px-2 py-1 border border-gray-500 bg-transparent dark:border-primary-700 focus:outline-gray-900 focus:rounded-sm dark:focus:outline-primary-900 shadow-sm"
        >
            <template #label>
                <label for="email" class="text-sm dark:text-white mb-2">Email</label>
            </template>
        </Textfield>
        <div class="flex flex-col gap-2">
            <label for="image" class="text-sm dark:text-white mb-2">Profile Image</label>
            <input name="image" type="file" v-on:change="onFileUpload" class="px-2 py-1 w-full text-gray-500 dark:text-primary-700 border border-gray-500 dark:border-primary-700 shadow-sm rounded-sm" />
        </div>
        <div class="flex items-center justify-end">
            <button class="flex items-center justify-center gap-2 p-2 text-sm rounded-sm text-white dark:text-black"
                :class="isLoading ? 'bg-gray-800 dark:bg-gray-300' : 'bg-black dark:bg-white'" :disabled="isLoading" @click="editProfile"
            >
                Update
                <Icon v-if="isLoading" name="svg-spinners:90-ring-with-bg" />
            </button>
        </div>
    </div>
</template>