<script>
import { auth } from '../stores/auth';

export default {
    data() {
        return {
            auth
        }
    },
    computed: {
        full_name() {
            return `${auth.user.name} ${auth.user.surname}`;
        }
    }
    }
</script>

<template>
    <div id="main-header" class="active">
        <div class="wrapper-logo">
            <img src="@/assets/logo.svg"/>
            <h2>KRAKEN.FM</h2>
        </div>
        <div class="wrapper-profile">
            <div class="section-user">
                <span class="avatar"></span>
                <h3>{{ full_name }}</h3>
            </div>
            <button @click="auth.logout()">LOGOUT</button>
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>

