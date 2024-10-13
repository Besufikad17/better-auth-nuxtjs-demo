<template>
     <div class="flex items-center justify-center min-h-[calc(100vh-62px)] dark:bg-black bg-white overflow-auto">
        <div class="flex flex-col gap-2 p-3 py-4 border border-gray-500 dark:border-primary-700 rounded-md">
                <h1 class="dark:text-primary-300 font-semibold">Email Verified!!</h1>
                <p class="dark:text-primary-300">You have successfully verified your email address.</p>
                <div class="flex items-center justify-start">
                    <NuxtLink to="/user" class="bg-gray-100 dark:bg-primary-700 flex items-center justify-center gap-2 px-2 py-1
                    dark:text-primary-300 rounded-md" >
                       Continue
                    </NuxtLink>
                </div>    
            </div>
     </div>
</template>