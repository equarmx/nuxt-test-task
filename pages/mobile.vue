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
        <transition name="fade" appear>
          <div
            v-if="showModal"
            class="wrapper-content-form-container"
          >
            <div class="wrapper-content-form-container__wrapper">
              <transition name="pop" appear>
                <create-new-item
                  v-if="showModal"
                  @close="showModal = false"
                />
              </transition>
            </div>
          </div>
        </transition>
      </div>
      <div class="wrapper-selector">
        <Selector/>
      </div>
      <template v-if="!isLoad">
        <transition-group name="list" class="wrapper-content__listItems">
          <ItemCard
            v-for="item in $store.state.listItems"
            :key="item.id"
            :productData="item"
          />
        </transition-group>
      </template>
      <loader
        v-else
      />
    </div>
  </div>
</template>

<script>
import Selector from "../components/Selector";
import CreateNewItem from "../components/CreateNewItem";
import ItemCard from "../components/ItemCard";
import Loader from "../components/Loader";

export default {
  name: "mobile.vue",
  components: {ItemCard, CreateNewItem, Selector, Loader},
  data() {
    return {
      showModal: false,
      isLoad: false,
    }
  },
  mounted() {
    this.isLoad = true
    if (process.server) {
      this.$store.dispatch('nuxtServerInit').then(() => {
        this.$store.dispatch('callGetListFromStorage')
      })
    } else {
      this.$store.dispatch('callSetListItems').then(() => {
        this.$store.dispatch('callGetListFromStorage')
      })
    }
    setTimeout(() => {
      this.isLoad = false
    }, 1500)
  },
  watch: {
    "$store.state.loader": {
      handler: function watch() {
        if (this.$store.state.loader) {
          this.isLoad = true
          setTimeout(() => {
            this.$store.commit('setLoader', false)
            this.isLoad = false
          }, 1500)
        }
      }
    }
  },
}
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity .4s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.3) translateY(-50%);
}

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
