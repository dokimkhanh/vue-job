<script setup>
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

const toast = useToast();
const isLoading = ref(true);
const router = useRouter();

const form = reactive({
    username: '',
    password: '',
    expiresInMins: 1440,
});

onMounted(() => {
    if (localStorage.getItem('user')) {
        router.push('/');
    } else {
        isLoading.value = false;
    }
});

const handleLogin = async () => {
    try {
        isLoading.value = true;
        const response = await axios.post('https://dummyjson.com/auth/login', form);
        if (response.status === 200) {
            toast.success('Login successful');
            localStorage.setItem('access_token', response.data.accessToken);
            localStorage.setItem('refresh_token', response.data.refreshToken);
            localStorage.setItem('user', JSON.stringify(response.data));

            router.push('/');
        }
    } catch (error) {
        if (error.response.status === 400) {
            toast.error('Login failed');
        }
        console.log('ERROR: ' + error);
    } finally {
        setTimeout(() => {
            isLoading.value = false;
        }, 500);
    }
};

</script>

<template>
    <section class="bg-green-50">
        <div class="container m-auto max-w-2xl py-24">
            <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                <form @submit.prevent="handleLogin">
                    <h2 class="text-3xl text-center font-semibold mb-6">Login</h2>

                    <PulseLoader v-if="isLoading" class="m-auto" />

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Username</label>
                        <input v-model="form.username" type="text" id="username" name="username"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="eg. admin" required value="emilys"/>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">
                            Password
                        </label>
                        <input v-model="form.password" type="password" id="password" name="password"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="eg. password" required value="emilyspass"/>
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