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
              v-model.trim="newItem.name.value"
              :class="{invalid: newItem.name.isTouched || $v.newItem.name.value.$error}"
              @focusout="onTouch('name')"
              @keyup="disableTouch('name')"
            >
            <template v-if="$v.newItem.name.value.$error || newItem.name.isTouched">
              <small
                v-if="!$v.newItem.name.value.required || newItem.name.isTouched"
              >Поле является обязательным
              </small>
              <small
                v-else-if="!$v.newItem.name.value.maxLength"
              >Необходимо ввести не более 25 символов
              </small>
            </template>
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
            v-model.trim="newItem.description.value"
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
              v-model.trim="newItem.src.value"
              :class="{invalid: newItem.src.isTouched || $v.newItem.src.value.$error}"
              @focusout="onTouch('src')"
              @keyup="disableTouch('src')"
            >
            <template v-if="$v.newItem.src.value.$error || newItem.src.isTouched">
              <small
                v-if="!$v.newItem.src.value.required || newItem.src.isTouched"
              >Поле является обязательным
              </small>
              <small
                v-else-if="!$v.newItem.src.value.url"
              >Введите коректный URL
              </small>
            </template>
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
              v-model.trim="newItem.price.value"
              :class="{invalid: newItem.price.isTouched || $v.newItem.price.value.$error}"
              @focusout="onTouch('price')"
              @keyup="disableTouch('price')"
            >
            <template v-if="$v.newItem.src.value.$error || newItem.price.isTouched">
              <small
                v-if="!$v.newItem.price.value.required || newItem.price.isTouched"
              >Поле является обязательным
              </small>
              <small
                v-else-if="!$v.newItem.price.value.maxLength"
              >Необходимо ввести не более 10 символов
              </small>
              <small
                v-else-if="!$v.newItem.price.value.number"
              >Поле должно включать только цифры
              </small>
            </template>
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
            :class="{widthBtn: isMobile, isSuccess: newItem.name.value && newItem.src.value && newItem.price.value && !$v.$anyError}"
            type="submit"
          >
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
    newItem: {
      name: {
        value: {required, maxLength: maxLength(25)},
        },
      src: {
        value: {required, url: isURL},
      },
      price: {
        value: {required, maxLength: maxLength(10), number: isNumber},
      },
    },
    validationGroup: ['newItem.name.value', 'newItem.src.value', 'newItem.price.value']
  },
  data() {
    return {
      isMobile: false,
      newItem: {
        name: {
          value: '',
          isTouched: false,
        },
        description: {
          value: '',
        },
        src: {
          value: '',
          isTouched: false,
        },
        price: {
          value: '',
          isTouched: false,
        },
      },
    }
  },
  created() {
    this.isMobile = this.$device.isMobile
  },
  methods: {
    onSubmit() {
      console.log(this.$v.$invalid)
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      this.$store.dispatch('callCreateNewElem', this.newItem)
      for (let key in this.newItem) {
        this.newItem[key].value = ''
      }
      this.$v.$reset()
    },
    onTouch(item) {
      if (!this.newItem[item].value) {
        this.newItem[item].isTouched = true
      } else this.newItem[item].isTouched = false
    },
    disableTouch(item) {
      if (this.newItem[item].value) {
        this.newItem[item].isTouched = false
      } else this.newItem[item].isTouched = true
    },
  },
}
</script>

<style scoped lang="scss">
.wrapperMobile {
  margin: 0 auto;
}
.wrapper {
  width: 332px;
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
        pointer-events:none;
      }
      .widthBtn {
        width: unset;
      }
      .isSuccess {
        pointer-events: unset;
        background: #7BAE73;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        color: #FFFFFF;
        cursor: pointer;

        &:hover {
          background: lighten(#7BAE73, 5%);
        }
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

          &:focus {
            background: #FFFF;
            border-color:  #FF8484;
          }
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
          transition: background 0.25s ease-in-out, border-bottom 0.25s ease-in-out, border-color 0.25s ease-in-out;
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
        small {
          color: #FF8484;
          font-size: 8px;
          line-height: 10px;
          letter-spacing: -0.02em;
        }
      }
    }
  }
}

</style>
