<template>
  <div class="wrapper">
    <div class="wrapper-header">
      <h1 class="wrapper-header-title">
        Добавление Товара
      </h1>
    </div>
    <div class="wrapper-content">
      <div class="wrapper-content-form">
        <button
          class="wrapper-content-form__btn"
          id="show-modal"
          @click="showModal = true"
        >
          <span>Добавить товар</span>
          <svg style="width:18px;height:18px; padding-left: 10px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z" />
          </svg>
        </button>
        <div
          v-if="showModal"
          class="wrapper-content-form-container"
        >
          <div class="wrapper-content-form-container__wrapper">
            <create-new-item
              v-if="showModal"
              @close="showModal = false"
            />
          </div>
        </div>
      </div>
      <div class="wrapper-selector">
        <Selector/>
      </div>
      <transition-group name="list" class="wrapper-content__listItems">
        <ItemCard
          v-for="item in $store.state.listItems"
          :key="item.id"
          :productData="item"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
import Selector from "../components/Selector";
import CreateNewItem from "../components/CreateNewItem";
import ItemCard from "../components/ItemCard";

export default {
  name: "mobile.vue",
  components: {ItemCard, CreateNewItem, Selector},
  data() {
    return {
      showModal: false,
    }
  },
  mounted() {
    if (process.server) {
      this.$store.dispatch('nuxtServerInit').then(() => {
        this.$store.dispatch('callGetListFromStorage')
      })
    } else {
      this.$store.dispatch('callSetListItems').then(() => {
        this.$store.dispatch('callGetListFromStorage')
      })
    }
  },
}
</script>

<style scoped lang="scss">
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.wrapper {
  -webkit-tap-highlight-color: transparent;

  .wrapper-header {
    display: flex;
    justify-content: center;
    align-items: center;

    .wrapper-header-title {
      color: #3F3F3F;
      font-style: normal;
      font-weight: 600;
      font-size: 2em;
      line-height: 35px;
    }
  }

  .wrapper-content {
    width: 100%;

    .wrapper-content-form {
      display: flex;
      padding-bottom: 20px;
      justify-content: center;

      .wrapper-content-form-container {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: table;
        transition: opacity 0.3s ease;

        &__wrapper {
          display: table-cell;
          vertical-align: middle;
        }
      }

      &__btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 140px;
        height: 36px;
        background: #4caf50;
        border-radius: 10px;
        border: 1px solid #FFFEFB;
        outline: none;
        font-size: 0.9rem;
        color: white;
        opacity: 1;
      }
    }

    .wrapper-selector {
      display: flex;
      padding-bottom: 20px;
      justify-content: center;
    }

    &__listItems {
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 15px;

    }
  }
}
</style>
