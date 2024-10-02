<script setup>
import { ref, defineProps, onMounted } from 'vue';
import JobListing from './JobListing.vue';
import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

defineProps({
    limit: Number
})

const isLoading = ref(false);
const jobs = ref([])

onMounted(async () => {
    try {
        isLoading.value = true;
        const respone = await axios.get('/api/jobs')
        jobs.value = respone.data
    } catch (error) {
        console.log('ERROR: ' + error)
    } finally {
        setTimeout(() => {
            isLoading.value = false;
        }, 500);
    }
})

</script>

<template>
    <section class="bg-green-50 px-4 py-10">
        <div class="container-xl lg:container m-auto">
            <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
                Browse Jobs
            </h2>

            <PulseLoader v-if="isLoading" :loading="isLoading" />

            <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Job Listing 1 -->
                <JobListing v-for="job in jobs.slice(0, limit || jobs.length)" :key="job.id" :job="job" />
            </div>
        </div>
    </section>

    <section class="m-auto max-w-lg my-10 px-6">
        <RouterLink to="/jobs" class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700">
            View All Jobs</RouterLink>
    </section>
</template>