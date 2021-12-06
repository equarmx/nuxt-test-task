<template>
  <div class="wrapper" :class="{wrapperMobile: isMobile}">
      <form
        class="wrapper-content"
        action="#"
        method="post"
        enctype="multipart/form-data"
        @submit.prevent="onSubmit"
      >
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
              v-model.trim="newItem.name"
              :class="{invalid: $v.name.$dirty && (!$v.name.required || !$v.name.maxLength)}"
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
            v-model.trim="newItem.description"
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
              v-model.trim="newItem.src"
              :class="{invalid: $v.src.$dirty && (!$v.src.required || !$v.src.maxLength)}"
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
              v-model.trim="newItem.price"
            >
          </div>
        </div>
        <div class="wrapper-content-bottom" :class="{mobileStructure: isMobile}">
          <button
            v-if="isMobile"
            @click="$emit('close')"
            class="wrapper-content-bottom__close"
          >
            Закрыть
          </button>
          <button
            class="wrapper-content-bottom__btn"
            :class="{widthBtn: isMobile}"
            type="submit"
          >
<!--            @click.prevent="onSubmit()"-->
            Добавить товар
          </button>
        </div>
      </form>
    </div>
</template>

<script>
import {required, maxLength} from "vuelidate/lib/validators"

const isNumber = (value) => /^\+?[0-9]+$/.test(value);
const isURL = (value) => /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(value);

export default {
  name: "createNewItem",
  validations: {
    name: {required, maxLength: maxLength(25)},
    src: {required, url: isURL()},
    price:{required, maxLength: maxLength(25), number: isNumber()},
  },
  data() {
    return {
      isMobile: false,
      newItem: {
        name: '',
        description: '',
        src: '',
        price: '',
      },
    }
  },
  created() {
    this.isMobile = this.$device.isMobile
  },
  methods: {
    onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      this.$store.dispatch('callCreateNewElem', this.newItem)
      for (let key in this.newItem) {
        this.newItem[key] = ''
      }
    }
  },
}
</script>

<style scoped lang="scss">
.wrapperMobile {
  margin: 0 auto;
}
.wrapper {
  max-width: 332px;
  min-width: 200px;
  background: #fffefb;
  font-size: 10px;
  line-height: 13px;
  color: #49485E;
  font-style: normal;
  font-weight: normal;
  letter-spacing: -0.02em;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.04), 0 6px 10px rgba(0, 0, 0, 0.02);
  border-radius: 4px;

  .wrapper-content {
    width: 100%;
    padding: 24px;
    box-sizing: border-box;

    .wrapper-content-bottom {
      max-width: 284px;
      display: flex;
      justify-content: center;

      &__close {
        height: 36px;
        background: #FF8484;
        border-radius: 10px;
        border: 1px solid #FFFEFB;
        outline: none;
        font-size: 0.9rem;
        color: white;
        opacity: 1;
      }

      &__btn {
        width: 100%;
        height: 36px;
        background: #EEEEEE;
        border-radius: 10px;
        border: 1px solid #FFFEFB;
        outline: none;
        font-size: 0.9rem;
        color: #B4B4B4;
        opacity: 1;
      }
      .widthBtn {
        width: unset;
      }
    }

    .mobileStructure {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .wrapper-content-item {
      display: flex;
      flex-direction: column;
      row-gap: 4px;
      padding-bottom: 1.15rem;

      .wrapper-content-item-header {
        display: flex;
        align-items: flex-start;
        &__title {
          padding-right: 5px;
        }
      }
      .wrapper-content-item-input-wrapper {
        max-width: 284px;
        font-size: 0.85rem;

        .invalid {
          border-color:  #FF8484;
        }

        input {
          box-sizing: border-box;
          width: 100%;
          height: 36px;
          background: #FFFEFB;
          border: 1px solid #FFFEFB;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          text-indent: 1.15rem;
          outline: none;
          transition: background 0.25s ease-in-out, border-bottom 0.25s ease-in-out;
          line-height: 15px;

          &:focus {
            background: #FFFF;
            border-bottom: 1px solid lightblue;
          }

          &::placeholder {
            font-size: 0.85rem;
            color: #B4B4B4;
            opacity: 1;
            padding-top: 10px;
          }

          &:-ms-input-placeholder {
            color: #B4B4B4;
            font-size: 0.85rem;
          }

          &::-ms-input-placeholder {
            color: #B4B4B4;
            font-size: 0.85rem;
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
            font-size: 0.85rem;
            color: #B4B4B4;
            opacity: 1;
          }
          &:-ms-input-placeholder {
            font-size: 0.85rem;
            color: #B4B4B4;
          }

          &::-ms-input-placeholder {
            font-size: 0.85rem;
            color: #B4B4B4;
          }
        }
      }
    }
  }
}

</style>
