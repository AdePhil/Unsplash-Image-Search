<template>
  <transition name="modal-fade">
    <div class="modal__mask">
      <div class="modal__wrapper">
        <div class="modal__container">
          <button class="modal__close" @click="$emit('close')">&times;</button>
          <div class="modal__body">
            <slot name="body">
              default body
            </slot>
          </div>

          <div class="modal__footer">
            <slot name="footer">
              default footer
              <button class="modal-default-button" @click="$emit('close')">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  created() {
    document.addEventListener("click", this.checkClick);
  },
  methods: {
    checkClick(e) {
      if (e.target.matches(".modal__wrapper")) {
        this.$emit("close");
      }
    }
  },
  destroyed() {
    document.removeEventListener("click", this.checkClick);
  }
};
</script>

<style lang="scss">
.modal {
  &__close {
    position: fixed;
    top: 18px;
    right: 15%;
    background: transparent;
    color: $lighter-gray;
    font-size: 25px;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 4px;
  }
  &__mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s ease;
  }

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    transition: 300ms ease;
  }

  &__container {
    position: relative;
    max-width: 800px;
    width: 90%;
    margin: 50px auto;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    border-radius: 6px;
    overflow: hidden;
  }

  &__body {
    background-color: $lighter-gray;
    img {
      width: 100%;
      height: 400px;
      display: block;
      object-fit: cover;
      object-position: 0 -80px;
    }
  }
}
@media (max-width: 600px) {
  .modal {
    &__body {
      img {
        height: 250px;
      }
    }
  }
}
// classes from vue
.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
