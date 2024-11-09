<script setup lang="ts">
    import { client } from "~/composables/auth/client"; 

    const config = useRuntimeConfig();
    const emit = defineEmits(['error', 'success']);

    const image = ref("");
    const imageUploading = ref(false);
    const isLoading = ref(false);
    const name = ref("");
    const slug = ref("");

    const onFileUpload = async(e: Event) => {
        var element = e.target as HTMLInputElement;
        const formData = new FormData();
        formData.append('file', element!.files![0]);
        formData.append('upload_preset', config.public.CLOUDINARY_UPLOAD_PRESET);
        imageUploading.value = true;
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
        imageUploading.value = false;
    }

    const createORG = async() => {
        if(name.value === "" || slug.value === "" || image.value === "") {
            emit('error', new Error( "Please fill all fields."));
            return;
        }

        isLoading.value = true;
        const { data, error } = await client.organization.create({
            name: name.value,
            slug: slug.value,
            logo: image.value
        });
        
        if(data) {
            emit('success', "Organization created successfully.");
        }

        if(error) {
            emit('error', error);
        }
    }
</script>

<template>
    <div class="bg-white dark:bg-black w-full flex flex-col justify-start gap-4 mt-6">
        <span class="text-xs text-gray-500 dark:text-primary-700">Create a new organization to collaborate with your team.</span>
        <Textfield v-model="name" name="name" type="text" placeholder="Name"
            class="px-2 py-1 border border-gray-300 bg-transparent dark:border-primary-700 focus:outline-gray-900 focus:rounded-sm dark:focus:outline-primary-900 shadow-sm"
        >
            <template #label>
                <label for="name" class="text-sm dark:text-white mb-2">Organization Name</label>
            </template>
        </Textfield>
        <Textfield v-model="slug" name="slug" type="text" placeholder="Slug"
            class="px-2 py-1 border border-gray-300 bg-transparent dark:border-primary-700 focus:outline-gray-900 focus:rounded-sm dark:focus:outline-primary-900 shadow-sm"
        >
            <template #label>
                <label for="slug" class="text-sm dark:text-white mb-2">Organization Slug</label>
            </template>
        </Textfield>
        <div class="flex flex-col gap-2">
            <label for="image" class="text-sm dark:text-white mb-2">Logo</label>
            <div class="flex items-center gap-2">
                <img v-if="image !== ''" :src="image" class="size-12 rounded-full" />
                <Icon v-if="imageUploading" name="svg-spinners:180-ring-with-bg" />
                <input name="image" type="file" v-on:change="onFileUpload" class="px-2 py-1 w-full text-gray-500 dark:text-primary-700 border border-gray-500 dark:border-primary-700 shadow-sm rounded-sm" />
            </div>
        </div>
        <div class="flex justify-end">
            <button class="flex items-center justify-center gap-2 p-2 text-sm rounded-sm text-white dark:text-black"
                :class="isLoading ? 'bg-gray-800 dark:bg-gray-300' : 'bg-black dark:bg-white'" :disabled="isLoading" @click="createORG"
            >
                Create
                <Icon v-if="isLoading" name="svg-spinners:90-ring-with-bg" />
            </button>
        </div>
    </div>
</template>