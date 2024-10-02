<script setup>
import Home from '@/components/Home.vue';
import HomeCard from '@/components/HomeCard.vue';
import JobListings from '@/components/JobListings.vue';
</script>

<template>
    <Home />
    <HomeCard />
    <JobListings :limit="6" />
</template>