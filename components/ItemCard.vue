<template>
  <div class="card">
    <div class="card-image">
      <div class="card-delete" :class="{visible: isMobile}">
        <img src="~/assets/images/delete.svg">
      </div>
      <img src="~/assets/images/itemImg.jpg" style="max-width: 332px">
    </div>
    <div class="card-info">
      <h3 class="card-info__title">
        Наименование товара
      </h3>
      <div class="card-info-block">
      <span class="card-info-block__description">
        Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк
      </span>
        <h2 class="card-info-block__price">10 000 руб.</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemCard",
  data() {
    return {
      isMobile: false,
    }
  },
  created() {
    this.isMobile = this.$device.isMobile
  }
}
</script>

<style scoped lang="scss">
  .card {
    max-width: 332px;
    min-width: 200px;
    height: 423px;
    background: #FFFEFB;
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.04), 0 6px 10px rgba(0, 0, 0, 0.02);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    cursor: pointer;

    &:hover {
      background: hsla(0, 0%, 100%, .92);
      box-shadow: 0 0 70px -25px rgb(0 0 0 / 25%);

      .card-image {
        .card-delete {
          opacity: 1;
        }
      }
    }

    .card-image {
      display: flex;
      flex-direction: column;
      position: relative;

      .card-delete {
        width: 32px;
        height: 32px;
        background: #FF8484;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        margin: 0;
        top: -10px;
        right: -6px;
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
      }
      .visible {
        opacity: 1;
      }
    }

    .card-info {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: 16px 16px 24px 16px;

      &__title {
        margin: 0;
        padding-bottom: 16px;
        font-style: normal;
        font-weight: 600;
        font-size: 1.4em;
        line-height: 25px;
        color: #3F3F3F;
        opacity: 0.9;
      }

      .card-info-block {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;

        &__description {
          font-style: normal;
          font-weight: normal;
          font-size: 1.13em;
          line-height: 20px;
          color: #3F3F3F;
        }
        &__price {
          font-style: normal;
          font-weight: 600;
          font-size: 1.7em;
          line-height: 30px;
          color: #3F3F3F;
          margin: 0;
        }
      }
    }
  }
</style>
