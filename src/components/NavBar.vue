<script setup>
import logo from '@/assets/img/logo.png'
import { RouterLink, useRoute } from 'vue-router';
import { reactive, onMounted } from 'vue';
import axios from 'axios';

const isActiveLink = (link) => {
    const route = useRoute()
    return route.path === link
}

const handleLogout = () => {

}

const state = reactive({
    user: {}
})


onMounted(async () => {
    if (localStorage.getItem('access_token')) {
        const response = await axios.get('https://dummyjson.com/auth/me', {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })

        if (response.status === 200) {
            state.user = response.data
            localStorage.setItem('user', JSON.stringify(response.data));
            console.log('User is logged in: ' + state.user.firstName);
        }
    }
})
</script>

<template>
    <nav class="bg-green-700 border-b border-green-500">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="flex h-20 items-center justify-between">
                <div class="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                    <!-- Logo -->
                    <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
                        <img class="h-10 w-auto" :src="logo" alt="Vue Jobs" />
                        <span class="hidden md:block text-white text-2xl font-bold ml-2">Vue Jobs</span>
                    </RouterLink>
                    <div class="md:ml-auto">
                        <div class="flex space-x-2">
                            <RouterLink to="/"
                                :class="[isActiveLink('/') ? 'text-white bg-green-900 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2' : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2']">
                                Home</RouterLink>
                            <RouterLink to="/jobs"
                                :class="[isActiveLink('/jobs') ? 'text-white bg-green-900 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2' : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2']">
                                Jobs</RouterLink>
                            <RouterLink to="/job/add"
                                :class="[isActiveLink('/job/add') ? 'text-white bg-green-900 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2' : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2']">
                                Add Job</RouterLink>

                            <template v-if="state.user.firstName">
                                <img class="h-10 w-auto rounded-full border border-white-500" :src="state.user.image"
                                    alt="Vue Jobs Logo" />
                                <RouterLink to="/profile"
                                    class="font-bold text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">
                                    {{ state.user.firstName }}
                                </RouterLink>
                            </template>

                            <RouterLink v-else to="/login"
                                :class="[isActiveLink('/login') ? 'text-white bg-green-900 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2' : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2']">
                                Login</RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>