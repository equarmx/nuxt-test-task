<template>
  <div class="wrapper-header-selector" :class="{activeHeader: show}">
    <div class="wrapper-header-selector-header" @click.prevent="onShow">
      <span class="wrapper-header-selector-header__current">{{ $store.state.selected.name }}</span>
      <img
        src="~/assets/images/Rectangle_33.svg" class="wrapper-header-selector-header__arrow"
        :class="{showed: show}"
      >
    </div>
    <div class="wrapper-header-selector-items" :class="{active: show}">
      <div
        class="wrapper-header-selector-items__item"
        v-for="(item, i) in listItems"
        :key="i"
        @click.prevent="onSelect(item)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Selector",
  data: () => ({
    show: false,
    listItems: [
      {
        value: 'default',
        name: 'По умолчанию',
      },
      {
        value: 'min',
        name: 'Сначала недорогие',
      },
      {
        value: 'max',
        name: 'Сначала дорогие',
      },
      {
        value: 'byName',
        name: 'По наименованию',
      },
    ],
  }),
  mounted() {
    this.$store.dispatch('callSetSelected', {
      value: 'default',
      name: 'По умолчанию',
    })
  },
  methods: {
    onShow() {
      this.show = !this.show
    },
    onSelect(item) {
      this.$store.dispatch('callSetSelected', item)
      // this.selectedItem = Object.assign({}, item)
    }
  }
}
</script>

<style scoped lang="scss">

  .wrapper-header-selector {
    min-width: 146px;
    height: 36px;
    border: 1px solid #FFFEFB;
    background: #FFFEFB;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 0.85em;
    line-height: 15px;
    color: #B4B4B4;
    z-index: 120;

    .wrapper-header-selector-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      padding-left: 0.7em;

      &__arrow {
         display: flex;
         flex-shrink: 0;
         align-items: center;
         justify-content: center;
         padding-right: 0.7em;
        transition: transform 0.25s ease-in-out;
       }
      .showed {
        -webkit-transform:scaleY(-1);
        -moz-transform: scaleY(-1);
        -ms-transform: scaleY(-1);
        -o-transform: scaleY(-1);
        transform: scaleY(-1);
      }
      &:hover {
        background: darken(#FFFEFB, 5%);
      }
    }

    .wrapper-header-selector-items {
      position: relative;
      left: 0;
      right: 0;
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
      border: 1px solid #FFFEFB;
      border-radius: 4px;
      background: #FFFEFB;
      border-top: 0;
      display: none;
      z-index: 9999;

      &__item {
         cursor: pointer;
         padding: 0.7em;

        &:hover {
           background: darken(#FFFEFB, 5%);
         }
      }
    }
    .active {
      display: block;
    }
  }

  .activeHeader {
    border-bottom: 0;
    box-shadow: none !important;
  }
</style>
