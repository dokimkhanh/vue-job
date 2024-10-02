<script setup>

import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

const route = useRoute();
const isLoading = ref(true);

const state = reactive({
    user: {}
})

onMounted(async () => {
    const response = await axios.get(`https://dummyjson.com/auth/me`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    })
    state.user = response.data
    isLoading.value = false
})

</script>

<template>
    <section class="bg-green-50 px-4 py-10">
        <div class="container-xl lg:container m-auto">
            <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
                Profile
            </h2>
            <PulseLoader v-if="isLoading" :loading="isLoading" />
            <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
                    <div class="text-center">

                        <img :src="state.user.image" class="border border-green-500 w-32 h-32 rounded-full mx-auto" />
                        <h4 class="text-xl font-bold mt-4">{{ state.user.firstName }}</h4>
                        <p class="text-gray-500">@{{ state.user.username }}</p>

                    </div>

                    <div class="text-left">
                        <h4 class="text-xl font-bold mb-4">Profile</h4>
                        <ul class="list-disc list-inside">
                            <li v-if="state.user.firstName">
                                <i class="fa-solid fa-user mr-2"></i>
                                Name: {{ state.user.firstName }}
                            </li>
                            <li v-if="state.user.email">
                                <i class="fa-solid fa-envelope mr-2"></i>
                                Email: {{ state.user.email }}
                            </li>
                            <li v-if="state.user.phone">
                                <i class="fa-solid fa-phone mr-2"></i>
                                Phone: {{ state.user.phone }}
                            </li>
                        </ul>

                        <h4 class="text-xl font-bold mb-4 mt-4">Company</h4>
                        <ul class="list-disc list-inside">
                            <li v-if="state.user.company">
                                <i class="fa-solid fa-building mr-2"></i>
                                Name: {{ state.user.company.name }}
                            </li>
                            <li v-if="state.user.company"><i class="fa-solid fa-briefcase mr-2"></i> Title: {{
                                state.user.company.title }}</li>
                            <li v-if="state.user.company">
                                <i class="fa-solid fa-location-dot mr-2"></i> Address: {{
                                    state.user.company.address.address }}, {{
                                    state.user.company.address.city }}, {{ state.user.company.address.state }}
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
ul {
    list-style-type: none;
}
</style>