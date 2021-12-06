<template>
  <div class="wrapper">
    <div class="wrapper-header">
      <h1 class="wrapper-header-title">
        Добавление Товара
      </h1>
      <Selector/>
    </div>
    <div class="wrapper-content">
      <div class="wrapper-content__form">
        <create-new-item/>
      </div>
      <template v-if="!isLoad">
        <transition-group name="list" class="wrapper-content__listItems">
          <item-card
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
import CreateNewItem from "../components/CreateNewItem";
import Selector from "../components/Selector.vue";
import ItemCard from "../components/ItemCard.vue";
import Loader from "../components/Loader.vue"

export default {
  name: "desktop.vue",
  components: {
    Loader,
    ItemCard,
    CreateNewItem,
    Selector,
  },
  data() {
    return {
      isLoad: false,
    }
  },
  mounted() {
    this.isLoad = true
    if (process.server) {
      console.log('server')
      this.$store.dispatch('nuxtServerInit').then(() => {
        this.$store.dispatch('callGetListFromStorage')
      })
    } else {
      console.log('client')
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
            this.$store.commit('setLoader')
            this.isLoad = false
          }, 1500)
        }
      }
    }
  },
}
</script>

<style scoped lang="scss">
@media (max-width: 992px) {
  .wrapper-content__listItems {
    grid-template-columns: auto auto !important;
  }
}

@media (max-width: 767px) {
  .wrapper-content__listItems {
    grid-template-columns: auto !important;
  }
}

.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.wrapper {
  padding: 0 16px;

  .wrapper-header {
    display: flex;
    justify-content: space-between;
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
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 1em;

    .wrapper-content__listItems {
      max-width: 1082px;
      display: grid;
      grid-template-columns: auto auto auto;
      justify-content: space-between;
      row-gap: 1em;
      column-gap: 1em;
    }
  }
}
</style>
