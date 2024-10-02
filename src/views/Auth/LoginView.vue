<script setup>
import { reactive } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';

const toast = useToast();

const form = reactive({
    username: '',
    password: '',
});

const handleLogin = async () => {
    try {
        const response = await axios.post('https://dummyjson.com/auth/login', form);
        if (response.status === 200) {
            toast.success('Login successful');
            localStorage.setItem('access_token', response.data.token);
            router.push('/');
        }
    } catch (error) {
        if (error.response.status === 400) {
            toast.error('Login failed');
        }
        console.log('ERROR: ' + error);
    }
};
</script>

<template>
    <section class="bg-green-50">
        <div class="container m-auto max-w-2xl py-24">
            <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                <form @submit.prevent="handleLogin">
                    <h2 class="text-3xl text-center font-semibold mb-6">Login</h2>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Username</label>
                        <input v-model="form.username" type="text" id="username" name="username"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="eg. admin" required />
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">
                            Password
                        </label>
                        <input v-model="form.password" type="password" id="password" name="password"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="eg. password" required />
                    </div>

                    <div>
                        <button
                            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                            type="submit">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>