import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import JobListings from '@/components/JobListings.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import JobView from '@/views/JobView.vue'
import AddJobView from '@/views/AddJobView.vue'
import EditJobView from '@/views/EditJobView.vue'
import LoginView from '@/views/Auth/LoginView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/jobs',
            name: 'jobs',
            component: JobListings
        },
        {
            path: '/:catchAll(.*)',
            name: 'not-found',
            component: NotFoundView
        },
        {
            path: '/job/:id',
            name: 'job',
            component: JobView
        },
        {
            path: '/job/add',
            name: 'job-add',
            component: AddJobView
        },
        {
            path: '/job/edit/:id',
            name: 'job-edit',
            component: EditJobView
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        }
    ]
})

export default router