<template>
  <div class="wrapper">
    <form class="wrapper-content">
      <div class="wrapper-content-item">
        <div class="wrapper-content-item-header">
          <span class="wrapper-content-item-header__title">
            Наименование товара
          </span>
          <img src="~/assets/images/Rectangle_32.svg" alt="*" style="color: red">
        </div>

        <div class="wrapper-content-item-input-wrapper">
          <input
            class="wrapper-content-item-input-wrapper__input"
            placeholder="Введите наименование товара"
          >
        </div>
      </div>
      <div class="wrapper-content-item">
        <div class="wrapper-content-item-header">
          <span class="wrapper-content-item-header__title">
            Описание товара
          </span>
        </div>

        <div class="wrapper-content-item-input-wrapper">
          <textarea
            class="wrapper-content-item-input-wrapper__textarea"
            placeholder="Введите описание товара"
          ></textarea>
        </div>
      </div>
      <div class="wrapper-content-item">
        <div class="wrapper-content-item-header">
          <span class="wrapper-content-item-header__title">
            Ссылка на изображение товара
          </span>
          <img src="~/assets/images/Rectangle_32.svg" alt="*" style="color: red">
        </div>

        <div class="wrapper-content-item-input-wrapper">
          <input
            class="wrapper-content-item-input-wrapper__input"
            placeholder="Введите ссылку"
          >
        </div>
      </div>
      <div class="wrapper-content-item">
        <div class="wrapper-content-item-header">
          <span class="wrapper-content-item-header__title">
            Цена товара
          </span>
          <img src="~/assets/images/Rectangle_32.svg" alt="*" style="color: red">
        </div>

        <div class="wrapper-content-item-input-wrapper">
          <input
            class="wrapper-content-item-input-wrapper__input"
            placeholder="Введите цену"
          >
        </div>
      </div>
      <div class="wrapper-content-bottom">
        <button class="wrapper-content-bottom-btn">
          Добавить товар
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "createNewItem"
}
</script>

<style scoped lang="scss">
.wrapper {
  max-width: 332px;
  min-width: 200px;
  //height: 440px;
  background: #fffefb;
  font-size: 10px;
  line-height: 13px;
  color: #49485E;
  font-style: normal;
  font-weight: normal;
  letter-spacing: -0.02em;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.04), 0px 6px 10px rgba(0, 0, 0, 0.02);
  border-radius: 4px;

  .wrapper-content {
    width: 100%;
    padding: 24px;
    box-sizing: border-box;

    .wrapper-content-bottom {
      max-width: 284px;
      display: flex;
      justify-content: center;

      .wrapper-content-bottom-btn {
        width: 100%;
        height: 36px;
        background: #EEEEEE;
        border-radius: 10px;
        border: 1px solid #FFFEFB;
        outline: none;
        font-size: 12px;
        color: #B4B4B4;
        opacity: 1;
      }
    }

    .wrapper-content-item {
      display: flex;
      flex-direction: column;
      row-gap: 4px;
      padding-bottom: 16px;

      .wrapper-content-item-header {
        display: flex;
        align-items: flex-start;
        &__title {
          padding-right: 5px;
        }
      }
      .wrapper-content-item-input-wrapper {
        max-width: 284px;
        font-size: 12px;

        input {
          box-sizing: border-box;
          width: 100%;
          height: 36px;
          background: #FFFEFB;
          border: 1px solid #FFFEFB;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          text-indent: 16px;
          outline: none;
          transition: background 0.25s ease-in-out, border-bottom 0.25s ease-in-out;
          line-height: 15px;

          &:focus {
            background: #FFFF;
            border-bottom: 1px solid lightblue;
          }

          &::placeholder {
            font-size: 12px;
            color: #B4B4B4;
            opacity: 1;
            padding-top: 10px;
          }

          &:-ms-input-placeholder {
            color: #B4B4B4;
            font-size: 12px;
          }

          &::-ms-input-placeholder {
            color: #B4B4B4;
            font-size: 12px;
          }
        }
        textarea {
          box-sizing: border-box;
          font-family: inherit;
          font-size: inherit;
          width: 100%;
          height: 108px;
          background: #FFFEFB;
          border: 1px solid #FFFEFB;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          outline: none;
          resize: none;
          padding: 10px 16px;
          transition: background 0.25s ease-in-out, border-bottom 0.25s ease-in-out;
          line-height: 15px;

          &:focus {
            background: #FFFF;
            border-bottom: 1px solid lightblue;
          }
          &::placeholder {
            font-size: 12px;
            color: #B4B4B4;
            opacity: 1;
          }
          &:-ms-input-placeholder {
            font-size: 12px;
            color: #B4B4B4;
          }

          &::-ms-input-placeholder {
            font-size: 12px;
            color: #B4B4B4;
          }
        }
      }
    }
  }
}

</style>
