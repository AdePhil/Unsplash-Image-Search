<template>
  <transition name="modal">
    <div class="modal__mask" @click="$emit('close')">
      <div class="modal__wrapper">
        <div class="modal__container">
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
        <button class="modal__close" @click="$emit('close')">&times;</button>
      </div>
    </div>
  </transition>
</template>

<style lang="scss">
.modal {
  &__close {
    position: fixed;
    top: 30px;
    right: 200px;
    background: transparent;
    color: #f5f5f5;
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
    display: table;
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
    width: 800px;
    margin: 50px auto;
    height: 500px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    border-radius: 6px;
    overflow: hidden;
  }

  &__body {
    height: 80%;
    background-color: #f5f5f5;
    img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
      object-position: 0 -100px;
    }
  }
}
</style>
