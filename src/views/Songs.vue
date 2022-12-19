<script>
import { auth } from '../stores/auth';
import { player } from '../stores/player';
import songsAPI from '../data/songs';
import IconPlay from '../components/icons/IconPlay.vue';
import IconCaretUp from '../components/icons/IconCaretUp.vue';
import IconHeart from '../components/icons/IconHeart.vue';

export default {
    components: { IconPlay, IconCaretUp, IconHeart },
    data() {
        return {
            auth,
            player,
            songs: [...songsAPI],
            sort     : {
                by   : null,
                order: 'asc'
            },
            search          : '',
            clicks          : 0,
            show_favorites  : false
        }
    },
    methods: {
        getTime(time_in_ms) {
            let min = Math.floor((time_in_ms / 1000 / 60) << 0);
            let sec = Math.floor((time_in_ms / 1000) % 60);

            return `${min}:${sec.toString().length == 1 ? '0' : ''}${sec}`;
        },
        getArtists(artists) {
            return artists.map(artist => artist.name).join(', ');
        },
        handleScroll(event) {
            this.$refs.header.classList.value = event.target.scrollTop > 100 ? 'scrolled' : '';
        },
        sortBy(by) {
            if (by === this.sort.by) {
                this.sort.order = this.sort.order === 'asc' ? 'desc' : 'asc';
                this.sort.by = this.sort.order === 'asc' ? null : this.sort.by;
            } else {
                this.sort.by = by;
            }

            switch (this.sort.by) {
                case 'title':
                    this.songs.sort((a, b) => {
                        if (this.sort.order === 'asc') {
                            if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
                            if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
                        } else {
                            if (b.name.toLowerCase() < a.name.toLowerCase()) { return -1; }
                            if (b.name.toLowerCase() > a.name.toLowerCase()) { return 1; }
                        }
                        return 0;
                    });
                    break;

                case 'duration':
                    this.songs.sort((a, b) => {
                        if (this.sort.order === 'asc') {
                            if (a.duration_ms < b.duration_ms) { return -1; }
                            if (a.duration_ms > b.duration_ms) { return 1; }
                        } else {
                            if (b.duration_ms < a.duration_ms) { return -1; }
                            if (b.duration_ms > a.duration_ms) { return 1; }
                        }
                        return 0;
                    });

                    break;
                default:
                    this.songs = [...songsAPI];
                    break;
            }
        },
        selectSong(song) {
            this.clicks++;
            if (this.clicks === 1) {
                this.timer = setTimeout(() => {
                    this.clicks = 0;
                }, 500);
            } else {
                clearTimeout(this.timer);
                player.setNowPlaying(song);
                this.clicks = 0;
            } 
        }
    },
    mounted() {
        player.setPlaylist(this.songs);
    },
    computed: {
        filtered_songs() {
            return this.songs.filter(song => {
                let valid = song.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1;

                if (valid && this.show_favorites) {
                    valid = auth.getFavoriteSongs().includes(song.id);
                }

                return valid;
            });
        }
    },
    watch: {

    }
}
</script>

<template>
    <div id="songs-view" @scroll="handleScroll">
        <div class="wrapper-header">
            <h1>SONGS</h1>
            <div class="wrapper-search">
                <input placeholder="Search by title..." v-model="search" />
            </div>
            <div class="wrapper-settings">
                <button :class="{ active: show_favorites }" @click="show_favorites = !show_favorites">Show Favorites</button>
            </div>
        </div>
        <div class="wrapper-songs">
            <table cellspacing="0" cellpadding="0">
                <tr ref="header">
                    <th width="5%">#</th>
                    <th width="30%" @click="sortBy('title')" :class="{active: sort.by === 'title'}">
                        Title
                        <IconCaretUp v-if="sort.by === 'title'" color="var(--c-accent-secondary)" :class="{ 'flip-vertical': sort.order === 'desc' }"/>
                    </th>
                    <th width="30%">Artist</th>
                    <th width="20%">Album</th>
                    <th width="10%" @click="sortBy('duration')" :class="{active: sort.by === 'duration'}">
                        Duration<IconCaretUp v-if="sort.by === 'duration'" color="var(--c-accent-secondary)" :class="{ 'flip-vertical': sort.order === 'desc' }" />
                    </th>
                </tr>
                <tr v-for="(song, index) in filtered_songs" :key="song.id"
                @click="selectSong(song)"
                :class="{ active: player.getNowPlayingSongId() === song.id }">
                    <td id="index">
                        <IconPlay v-if="player.getNowPlayingSongId() === song.id" color="var(--c-accent-secondary)" />
                        <span v-else>{{ index + 1 }}</span>
                    </td>
                    <td id="title">
                        <img :src="song.album.images[1].url" />
                        {{ song.name }}
                    </td>
                    <td id="artist">{{ getArtists(song.artists) }}</td>
                    <td id="album">{{ song.album.name }}</td>
                    <td id="duration">
                        {{ getTime(song.duration_ms) }}
                        <IconHeart :class="{ active: auth.getFavoriteSongs().includes(song.id) }" @click="auth.toggleFavorite(song.id)" />
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>