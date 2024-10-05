<script setup lang="ts">
    import { ref } from "vue";
    import { client } from "~/composables/functions/client"; 
    import type { AuthProvider } from "~/types/auth";

    const authType = ref("sign-in");
    const isLoading = ref(false);
    const showToast = ref(false);
    const toastType = ref("message");
    const toastMessage = ref("");

    const email = ref("");
    const password = ref("");
    const rememberMe = ref(false);

    const firstName = ref("");
    const lastName = ref("");
    const confirmPassword = ref("");
    const image = ref();
    
    const login = async() => {
        isLoading.value = true;
        const { data, error } = await client.signIn.email({
            email: email.value,
            password: password.value,
            callbackURL: "/user"
        });

        isLoading.value = false;
        if(error) {
            showToast.value = true;
            toastType.value = "error";
            toastMessage.value = error.message!;
        }else {
            showToast.value = true;
            toastType.value = "success";
            toastMessage.value = "Signed In successfully!";
            setTimeout(async() => {
                await navigateTo("/user");
            }, 3000);
        }
    };

    const loginWithPasskey = async() => {
        await client.signIn.passkey();
    }

    const loginWithProvider = async(provider: AuthProvider) => {
        isLoading.value = true;
       
        const { data, error } = await client.signIn.social({
            provider: provider,
            callbackURL: "/user"
        });

        isLoading.value = false;
        if(error) {
            showToast.value = true;
            toastType.value = "error";
            toastMessage.value = error.message!;
        }
    };

    const signup = async() => {
        isLoading.value = true;
        const { data, error } = await client.signUp.email({
            email: email.value,
            password: password.value,
            name: firstName.value + " " + lastName.value,
            image: image.value,
            callbackURL: "/user"
        });

        isLoading.value = false;
        if(error) {
            showToast.value = true;
            toastType.value = "error";
            toastMessage.value = error.message!;
        }else {
            showToast.value = true;
            toastType.value = "success";
            toastMessage.value = "Account created successfully!";
            setTimeout(async() => {
                await navigateTo("/user");
            }, 3000);
        }
    };
</script>

<template>
    <div class="flex items-center justify-center md:h-[calc(100vh-62px)] dark:bg-black bg-white overflow-auto
        bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:12px_12px]
        dark:bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)]
    ">
        <Toast v-if="showToast" :type="toastType" :message="toastMessage" @close="showToast = false" class="fixed top-6 right-6" />
        <div class="flex flex-col p-8">
            <div class="flex items-center">
                <span 
                    class="flex items-center justify-center py-2 px-4 cursor-pointer border-t border-l border-gray-300 dark:border-primary-700 dark:text-gray-100"
                    :class="authType === 'sign-in' ? 'bg-gray-200 dark:bg-[rgba(84,77,74,0.5)]' : 
                        'bg-transparent text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-500'"
                    @click="authType = 'sign-in'"
                >
                    Sign In
                </span>
                <span 
                    class="flex items-center justify-center py-2 px-4 cursor-pointer border-t border-r border-gray-300 dark:border-primary-700 dark:text-gray-100"
                    :class="authType === 'sign-up' ? 'bg-gray-200 dark:bg-[rgba(84,77,74,0.5)]' : 
                        'bg-transparent text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-500'"
                    @click="authType = 'sign-up'"
                >
                    Sign Up
                </span>
            </div>
            <div class="flex flex-col gap-4 p-4 border bg-white dark:bg-black border-gray-300 dark:border-primary-700">
                <div class="flex flex-col gap-2">
                    <h1 class="dark:text-white font-semibold">{{ [authType.split('-')[0].charAt(0).toUpperCase() + authType.split('-')[0].slice(1), authType.split('-')[1].charAt(0).toUpperCase() + authType.split('-')[1].slice(1)].join(' ') }}</h1>
                    <p class="text-xs text-gray-500 dark:text-primary-400">{{ authType === 'sign-in' ? 'Enter your email below to login to your account' : 'Enter your information to create an account' }}</p>
                </div>
                <div v-if="authType === 'sign-in'" class="flex flex-col gap-3">
                    <Textfield v-model="email" name="email" placeholder="john@example.com" 
                        class="px-2 py-1 border border-gray-300 bg-transparent dark:border-primary-700 focus:outline-gray-900 focus:rounded-sm dark:focus:outline-primary-900 shadow-sm"
                    >
                        <template #label>
                            <label for="email" class="text-sm dark:text-white mb-2">Email</label>
                        </template>
                    </Textfield>
                    <Textfield v-model="password" name="password" placeholder="Password" type="password"
                        class="px-2 py-1 border border-gray-300 bg-transparent dark:border-primary-700 focus:outline-gray-900 focus:rounded-sm dark:focus:outline-primary-900 shadow-sm"
                    >
                        <template #label>
                            <div class="flex items-center justify-between w-full mb-2">
                                <label for="email" class="text-sm dark:text-white">Password</label>
                                <NuxtLink to="/auth/forgot-password" class="text-sm dark:text-white underline">Forgot your password?</NuxtLink>
                            </div>
                        </template>
                    </Textfield>
                    <Checkbox
                        v-model="rememberMe"
                        :data="{ label: 'Remember me', value: true }"
                        class="text-sm dark:text-white cursor-pointer accent-black dark:accent-white bg-transparent border dark:border-white"
                    />
                    <button class="flex items-center justify-center w-full gap-2 p-2 text-sm rounded-sm text-white dark:text-black"
                        :class="isLoading ? 'bg-gray-800 dark:bg-gray-300' : 'bg-black dark:bg-white'" :disabled="isLoading" @click="() => login()"
                    >
                        Login
                        <Icon v-if="isLoading" name="svg-spinners:90-ring-with-bg" />
                    </button>
                    <button class="flex items-center justify-center w-full gap-2 p-2 text-sm rounded-sm border border-gray-300 hover:border-gray-900 dark:border-primary-700 dark:hover:border-primary-900 dark:text-white" @click="() => loginWithProvider('github')">
                        <Icon name="entypo-social:github" />
                        Continue with Github
                    </button>
                    <button class="flex items-center justify-center w-full gap-2 p-2 text-sm rounded-sm border border-gray-300 hover:border-gray-900 dark:border-primary-700 dark:hover:border-primary-900 dark:text-white" @click="() => loginWithProvider('google')">
                        <Icon name="logos:google-icon" />
                        Continue with Google
                    </button>
                    <button class="flex items-center justify-center w-full gap-2 p-2 text-sm rounded-sm border border-gray-300 hover:border-gray-900 dark:border-primary-700 dark:hover:border-primary-900 dark:text-white" @click="() => loginWithProvider('discord')">
                        <Icon name="logos:discord-icon" />
                        Continue with Discord
                    </button>
                    <button class="flex items-center justify-center w-full gap-2 p-2 text-sm rounded-sm border border-gray-300 hover:border-gray-900 dark:border-primary-700 dark:hover:border-primary-900 dark:text-white" @click="() => loginWithPasskey()">
                        <Icon name="lucide:key" />
                        Continue with Passkey
                    </button>
                </div>
                <div v-else class="flex flex-col gap-3">
                    <div class="flex gap-2">
                        <Textfield v-model="firstName" name="firstName" placeholder="John" 
                            class="px-2 py-1 border border-gray-300 bg-transparent dark:border-primary-700 focus:outline-gray-900 focus:rounded-sm dark:focus:outline-primary-900 shadow-sm"
                        >
                            <template #label>
                                <label for="firstName" class="text-sm dark:text-white mb-2">First Name</label>
                            </template>
                        </Textfield>
                        <Textfield v-model="lastName" name="lastName" placeholder="Doe" 
                            class="px-2 py-1 border border-gray-300 bg-transparent dark:border-primary-700 focus:outline-gray-900 focus:rounded-sm dark:focus:outline-primary-900 shadow-sm"
                        >
                            <template #label>
                                <label for="lastName" class="text-sm dark:text-white mb-2">Last Name</label>
                            </template>
                        </Textfield>
                    </div>
                    <Textfield v-model="email" name="email" placeholder="john@example.com" 
                        class="px-2 py-1 border border-gray-300 bg-transparent dark:border-primary-700 focus:outline-gray-900 focus:rounded-sm dark:focus:outline-primary-900 shadow-sm"
                    >
                        <template #label>
                            <label for="email" class="text-sm dark:text-white mb-2">Email</label>
                        </template>
                    </Textfield>
                    <Textfield v-model="password" name="password" placeholder="Password" type="password"
                        class="px-2 py-1 border border-gray-300 bg-transparent dark:border-primary-700 focus:outline-gray-900 focus:rounded-sm dark:focus:outline-primary-900 shadow-sm"
                    >
                        <template #label>
                            <label for="email" class="text-sm dark:text-white mb-2">Password</label>
                        </template>
                    </Textfield>
                    <Textfield v-model="confirmPassword" name="confirmPassword" placeholder="Confirm Password" type="password"
                        class="px-2 py-1 border border-gray-300 bg-transparent dark:border-primary-700 focus:outline-gray-900 focus:rounded-sm dark:focus:outline-primary-900 shadow-sm"
                    >
                        <template #label>
                            <label for="email" class="text-sm dark:text-white mb-2">Confirm Password</label>
                        </template>
                    </Textfield>
                    <div class="flex flex-col gap-2">
                        <label for="image" class="text-sm dark:text-white mb-2">Profile Image (Optional)</label>
                        <input name="image" type="file" v-on:change="(e: any) => image = e.target.files[0].name" class="px-2 py-1 w-full text-gray-300 dark:text-primary-700 border border-gray-300 dark:border-primary-700 shadow-sm rounded-sm" />
                    </div>
                    <button class="flex items-center justify-center w-full gap-2 p-2 text-sm rounded-sm text-white dark:text-black"
                        :class="isLoading ? 'bg-gray-800 dark:bg-gray-300' : 'bg-black dark:bg-white'" :disabled="isLoading" @click="signup"
                    >
                        Create an account
                        <Icon v-if="isLoading" name="svg-spinners:90-ring-with-bg" />
                    </button>
                    <button class="flex items-center justify-center w-full gap-2 p-2 text-sm rounded-sm border border-gray-300 hover:border-gray-900 dark:border-primary-700 dark:hover:border-primary-900 dark:text-white" @click="() => loginWithProvider('github')">
                        <Icon name="entypo-social:github" />
                        Continue with Github
                    </button>
                    <button class="flex items-center justify-center w-full gap-2 p-2 text-sm rounded-sm border border-gray-300 hover:border-gray-900 dark:border-primary-700 dark:hover:border-primary-900 dark:text-white" @click="() => loginWithProvider('google')">
                        <Icon name="logos:google-icon" />
                        Continue with Google
                    </button>
                    <button class="flex items-center justify-center w-full gap-2 p-2 text-sm rounded-sm border border-gray-300 hover:border-gray-900 dark:border-primary-700 dark:hover:border-primary-900 dark:text-white" @click="() => loginWithProvider('discord')">
                        <Icon name="logos:discord-icon" />
                        Continue with Discord
                    </button>
                </div>
                <div class="flex items-center justify-center border-t border-gray-300 dark:border-primary-700 p-4">
                    <span class="text-xs text-gray-500 dark:text-white">Secured by <a href="#" class="text-orange-300" target="_blank">better-auth.</a></span>
                </div>
            </div>
        </div>
    </div>
</template>