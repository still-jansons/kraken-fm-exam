<script>
import { auth } from '../stores/auth';

export default {
    data() {
        return {
            routes: [
                {
                    name: 'SONGS',
                    path: '/'
                },
                {
                    name: 'ALBUMS',
                    path: '/albums'
                },
                {
                    name: 'ABOUT ME',
                    path: '/about'
                }
            ],
            auth
        }
    },
}
</script>

<template>
    <nav id="main-navigaton" v-if="auth.is_authenticated" class="wrapper-navigation">
        <ol>
            <li v-for="(link, index) in routes" :key="index">
                <router-link :to="link.path">{{ link.name }}</router-link>
            </li>
        </ol>
    </nav>
</template>

<style scoped lang="scss">
</style>

