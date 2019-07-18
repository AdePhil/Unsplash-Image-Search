<template>
  <div id="app">
    <div class="header">
      <div class="container">
        <div class="header__input-container">
          <img
            src="/search-icon.svg"
            alt=""
            class="header__input-search-icon"
          />
          <input
            type="text"
            class="header__input"
            placeholder="Search for photo"
          />
        </div>
      </div>
    </div>
    <div class="gallery">
      <div class="gallery__container">
        <div class="gallery__img" v-for="photo in photos" :key="photo.id">
          <img :src="photo.urls.regular" :alt="photo.description" />
          <div class="gallery__img-text">
            <h3>{{ photo.user.name }}</h3>
            <p>{{ photo.user.location }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { APP_ID } from "./unsplash";
import axios from "axios";

export default {
  name: "app",
  components: {},
  data() {
    return {
      photos: Array.from({ length: 8 }).map((_, i) => ({
        id: i,
        description: "",
        urls: { regular: "" },
        user: {}
      }))
    };
  },
  methods: {
    searchPhoto(query) {
      axios
        .get(
          `https://api.unsplash.com/search/photos?page=1&per_page=8&query=${query}&client_id=${APP_ID}`
        )
        .then(response => {
          console.log(response.data.results);
          this.photos = response.data.results;
        });
    }
  },
  mounted() {
    this.searchPhoto("fun");
  }
};
</script>

<style lang="scss">
// variables
$blue: #253858;
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body {
  margin: 0 !important;
  padding: 0 !important;
}

.container {
  max-width: 800px;
  width: 100%;
  padding: 0 1em;
  margin: 0 auto;
}

.header {
  background: #dde2e9;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  &__input-container {
    position: relative;
  }
  &__input {
    width: 100%;
    padding: 20px 20px 20px 35px;
    border: none;
    border-radius: 5px;
    font-size: 20px;
    outline: none;
    color: #253858;
    &::placeholder {
      color: inherit;
    }
  }
  &__input-search-icon {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
  }
}

.gallery {
  max-width: 600px;
  margin: -30px auto;
  &__container {
    margin-top: -30px;
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 300px));
    grid-auto-rows: 50px;
    grid-auto-flow: dense;
    grid-column-gap: 30px;
    grid-row-gap: 20px;
    position: relative;
  }

  &__img {
    background-color: #f5f5f5;
    grid-row: span 3;
    position: relative;
    &-text {
      position: absolute;
      color: #fff;
      bottom: 0;
      font-size: 11px;
      z-index: 4;
      padding: 0 10px;
      h3 {
        margin-bottom: 0;
        font-size: 13px;
      }
      p {
        margin-top: 8px;
      }
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
    }

    &::before:not(:empty) {
      background-color: rgba(0, 0, 0, 0.3);
    }
    &::before {
      display: block;
      width: 100%;
      height: 100%;
      content: "";
      position: absolute;
      z-index: 3;
      border-radius: 4px;
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
  &__img:nth-child(even) {
    grid-row: span 4;
  }
}
</style>
