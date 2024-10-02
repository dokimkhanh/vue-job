import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import JobListings from '@/components/JobListings.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import JobView from '@/views/JobView.vue'
import AddJobView from '@/views/AddJobView.vue'
import EditJobView from '@/views/EditJobView.vue'
import LoginView from '@/views/Auth/LoginView.vue'
import ProfileView from '@/views/User/ProfileView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
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
            component: AddJobView,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/job/edit/:id',
            name: 'job-edit',
            component: EditJobView,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfileView
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !localStorage.getItem('access_token')) {
        next({ name: 'login' })
    } else {
        next()
    }
})

export default router