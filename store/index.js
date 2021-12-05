import animation from "ant-design-vue/lib/_util/openAnimation";

function SetStartList(name, id, description, src, price, first, animation) {
  this.name = name;
  this.id = id;
  this.description = description;
  this.src = src;
  this.price = price.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  this.first = first;
  this.animation = animation
}

export const state = () => ({
  listItems: [],
  selected: {},
  numOfCreated: 0,
  deleteAnimation: false,
})

export const mutations = {
  setSelected(state, obj) {
    state.selected = obj
  },
  sortListItems(state, value) {
    state.listItems.sort((a, b)=> {
      if (value === 'default') {
        if (a.id > b.id) return 1
        else if (a.id < b.id) return -1
        else return 0
      } else if (value === 'min') {
        if (Number(a.price.replace(/\s/g, "")) > Number(b.price.replace(/\s/g, ""))) return 1
        else if (Number(a.price.replace(/\s/g, "")) < Number(b.price.replace(/\s/g, ""))) return -1
        else return 0
      } else if (value === 'max') {
        if (Number(a.price.replace(/\s/g, "")) < Number(b.price.replace(/\s/g, ""))) return 1
        else if (Number(a.price.replace(/\s/g, "")) > Number(b.price.replace(/\s/g, ""))) return -1
        else return 0
      } else if (value === 'byName') {
        let collator = new Intl.Collator(['ru', 'en']);
        return collator.compare(a.name.toLowerCase(), b.name.toLowerCase())
      }
    })
  },
  setListItems(state) {
    // let arr = []
    for (let i = 0; i < 30; i++) {
      state.listItems.push(new SetStartList(
        'Наименование товара',
        i+1,
        'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
        'itemImg.jpg',
        '10000',
        0,
        false,
      ))
    }
    /* Для проверки фильтрации элементов по указанным фильтрам */
    state.listItems.push(new SetStartList(
      'Алфавит',
      state.listItems.length+1,
      'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
      'itemImg.jpg',
      '100',
      0,
      false,
    ))
    state.listItems.push(new SetStartList(
      'Язва',
      state.listItems.length+1,
      'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
      'itemImg.jpg',
      '100000000',
      0,
      false,
    ))
    state.listItems.push(new SetStartList(
      'Брехня',
      state.listItems.length+1,
      'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
      'itemImg.jpg',
      '1000',
      0,
      false,
    ))
  },
  createNewElem(state, obj) {
    let number = state.numOfCreated += 1
    state.listItems.push(new SetStartList(
      obj.name,
      state.listItems.length+1,
      obj.description,
      obj.src,
      obj.price,
      number.toString(),
      false,
    ))
  },
  sortedWhenCreate(state) {
    state.listItems.sort((a, b)=> {
      if (a.first < b.first) return 1
      else if (a.first > b.first) return -1
      else return 0
    })
  },
  deleteElement(state, id) {
    let index = state.listItems.findIndex(i => {
      return i.id === id
    })
    if (index !== -1) state.listItems.splice(index, 1)
  },
  addDeleteAnimation(state, id) {
    let index = state.listItems.findIndex(i => {
      return i.id === id
    })
    state.listItems[index].animation = true
  },
}

export const actions = {
  callSetListItems({commit}, arr) {
    commit('setListItems', arr)
  },
  callSetSelected({commit}, obj) {
    commit('setSelected', obj)
    commit('sortListItems', obj.value)
  },
  callCreateNewElem({commit}, obj) {
    commit('createNewElem', obj)
    commit('sortedWhenCreate')
  },
  callDeleteElement({commit}, id) {
    commit('addDeleteAnimation', id)
    setTimeout(() => {
        commit('deleteElement', id)
    }, 400)
  },
}
