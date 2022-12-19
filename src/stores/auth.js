import { reactive } from "vue"
import router from "../router"

export const auth = reactive({
    user: {
        name       : "NAME",
        surname    : "SURNAME",
        code       : "IT1234",
        liked_songs: localStorage.liked_songs ? localStorage.liked_songs.split(",") : []
    },
    is_authenticated: localStorage.is_authenticated ?? false,
    setUserData(name, surname, code) {
        this.user.name    = name;
        this.user.surname = surname;
        this.user.code    = code;
    },
    authenticate(email, password) {
        if (email === "user.email@mail.com" && password === "123456") {
            localStorage.is_authenticated = true;
            this.is_authenticated         = true;

            router.push("/");
        }
    },
    logout() {
        localStorage.clear();
        this.is_authenticated = false;
        
        router.push("/login");
    },
    toggleFavorite(songID) {
        console.log(this.user.liked_songs);
        const song_index = this.user.liked_songs.indexOf(songID);

        if (song_index < 0) {
            this.user.liked_songs.push(songID);
        } else {
            this.user.liked_songs.splice(song_index);
        }

        localStorage.liked_songs = this.user.liked_songs;
    },
    getFavoriteSongs() {
        return this.user.liked_songs;
    }
})