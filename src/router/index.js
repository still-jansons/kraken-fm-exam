import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../stores/auth'

import Songs from '@/views/Songs.vue'
import Albums from '@/views/Albums.vue'
import About from '@/views/About.vue'
import Login from '@/views/Login.vue'

const routes = [
    {
        path: '/',
        component: Songs,
    },
    {
        path: '/albums',
        component: Albums,
    },
    {
        path: '/about',
        component: About,
    },
    {
        path: '/login',
        component: Login,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


router.beforeEach((to, from) => {
    if (!auth.is_authenticated && to.path !== '/login') {
        return '/login';
    } else if (auth.is_authenticated && to.path === '/login') {
        return from ? from.path : '/'
    }
})

export default router