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
            v-model="query"
            @keyup.enter="searchPhoto"
          />
        </div>
        <transition name="fade">
          <h3 v-show="!loading && showHelperText" class="header__helper-text">
            Search Results for
            <span class="keyword"
              >&ldquo;{{ previouslySearchedQuery }}&rdquo;</span
            >
          </h3>
        </transition>
      </div>
    </div>
    <div class="gallery">
      <div class="gallery__container">
        <div
          class="gallery__img"
          v-for="photo in photos"
          :key="photo.id"
          @click="showImageModal(photo)"
        >
          <img :src="photo.urls.regular" :alt="photo.alt_description" />
          <div class="gallery__img-text">
            <h3 :class="!Object.keys(photo.user).length ? '' : 'active'">
              {{ photo.user.name }}
            </h3>
            <p :class="!Object.keys(photo.user).length ? '' : 'active'">
              {{ photo.user.location }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <Modal v-if="showModal && modalPhoto" @close="showModal = false">
      <img
        slot="body"
        :src="modalPhoto.urls.regular"
        :alt="modalPhoto.description"
      />
      <div slot="footer" class="modal__footer-text">
        <h3>{{ modalPhoto.user.name }}</h3>
        <p>{{ modalPhoto.user.location }}</p>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from "./components/Modal";
import axios from "axios";

export default {
  name: "app",
  components: {
    Modal
  },
  data() {
    return {
      loading: false,
      modalPhoto: null,
      query: "African",
      showModal: false,
      previouslySearchedQuery: "African",
      showHelperText: false,
      photos: Array.from({ length: 8 }).map((_, i) => ({
        id: i,
        alt_description: "",
        description: "",
        urls: { regular: "" },
        user: {}
      }))
    };
  },
  watch: {
    query(newValue) {
      //the input cleared resets the list of photos and hides helper text
      if (!newValue) {
        this.photos = Array.from({ length: 8 }).map((_, i) => ({
          id: i,
          description: "",
          urls: { regular: "" },
          user: {}
        }));
        this.showHelperText = false;
      }
    }
  },
  methods: {
    showImageModal(photo) {
      this.modalPhoto = photo;
      this.showModal = true;
    },
    searchPhoto() {
      this.showHelperText = true;
      this.loading = true;
      this.previouslySearchedQuery = this.query;
      axios
        .post(`/.netlify/functions/images`, { query: this.query })
        .then(response => {
          this.loading = false;
          console.log(response.data);
          this.photos = response.data;
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
    }
  },
  mounted() {
    this.searchPhoto();
  }
};
</script>

<style lang="scss">
// variables
$blue: #253858;
$light-blue: #6d7b91;

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
* {
  box-sizing: border-box;
}
body {
  margin: 0 !important;
  padding: 0 !important;
  font-family: "Roboto", sans-serif;
}

.keyword {
  color: $light-blue;
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

  &__helper-text {
    color: $blue;
  }
  &__input-container {
    position: relative;
  }
  &__input {
    width: 100%;
    padding: 20px 20px 20px 50px;
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

//Gallery
.gallery {
  max-width: 600px;
  margin: -30px auto;
  padding: 0 1em;
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
    transition: transform 300ms ease;
    border-radius: 4px;
    overflow: hidden;

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
        min-width: 100px;
        min-height: 10px;
        background-color: #e6e6e6;
      }
      p {
        margin-top: 2px;
        min-width: 50px;
        background-color: #e6e6e6;
        min-height: 10px;
        display: inline-block;
      }
      p.active,
      h3.active {
        background-color: transparent;
      }
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
    }

    &:hover {
      transform: scale(1.1);
      cursor: pointer;
    }
    &::before {
      display: block;
      width: 100%;
      height: 100%;
      content: "";
      position: absolute;
      z-index: 3;
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
  &__img:nth-child(even) {
    grid-row: span 4;
  }
}
@media (max-width: 560px) {
  .gallery {
    &__container {
      grid-template-columns: repeat(2, minmax(0, 300px));
    }
    &__img {
      grid-row: span 4;
    }
  }
}

@media (max-width: 360px) {
  .gallery {
    &__container {
      grid-template-columns: repeat(1, minmax(0, 300px));
    }
  }
}
//Gallery end

.modal {
  &__footer-text {
    background-color: #fff;
    padding: 18px 30px;
    text-transform: capitalize;
    h3 {
      margin: 0;
      color: $blue;
    }
    p {
      margin-top: 5px;
      color: $light-blue;
      font-size: 13px;
    }
  }
}
</style>
