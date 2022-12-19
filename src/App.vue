<script>
import { auth } from './stores/auth';

export default {
    data() {
        return {
            auth
        }
    }
}
</script>

<template>
    <Header v-if="auth.is_authenticated"></Header>
    <div id="section-body">
        <Navigation></Navigation>
        <router-view class="section-router"></router-view>
    </div>
    <div v-if="auth.is_authenticated" id="section-player">
        <AudioPlayer />
    </div>
</template>

<style scoped lang="scss">

</style>


