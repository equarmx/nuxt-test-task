function SetStartList(name, id, description, src, price, first) {
  this.name = name;
  this.id = id;
  this.description = description;
  this.src = src;
  this.price = price.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  this.first = first;
}

export const state = () => ({
  listItems: [],
  selected: {},
  numOfCreated: 0,
  counterId: 0,
  loader: false
})

export const mutations = {
  setSelected(state, obj) {
    state.selected = obj
  },
  sortListItems(state, value) {
    state.listItems.sort((a, b)=> {
      if (value === 'default') {
        return b.first - a.first || a.id - b.id
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
    state.listItems = []
    for (let i = 0; i < 30; i++) {
      state.listItems.push(new SetStartList(
        'Наименование товара',
        i+1,
        'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
        'itemImg.jpg',
        '10000',
        0,
      ))
    }
    /* Для проверки фильтрации элементов по указанным фильтрам */
    state.listItems.push(new SetStartList(
      'Арбуз',
      state.listItems.length+1,
      'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
      'itemImg.jpg',
      '100',
      0,
    ))
    state.listItems.push(new SetStartList(
      'Якорь',
      state.listItems.length+1,
      'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
      'itemImg.jpg',
      '100000000',
      0,
    ))
    state.listItems.push(new SetStartList(
      'Бандана',
      state.listItems.length+1,
      'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
      'itemImg.jpg',
      '1000',
      0,
    ))
    state.counterId = state.listItems.length
  },
  setLoader(state, value) {
    state.loader = value
  },
  createNewElem(state, obj) {
    let number = state.numOfCreated += 1
    state.listItems.push(new SetStartList(
      obj.name.value,
      state.counterId+1,
      obj.description.value,
      obj.src.value,
      obj.price.value,
      number.toString(),
      false,
    ))
    state.counterId++
  },
  sortedWhenCreate(state) {
    state.listItems.sort((a, b)=> {
      if (a.first === b.first) {
        if (a.id > b.id) return -1
        else if (a.id < b.id) return 1
      }
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
  setToTheStorage(state) {
    if (process.client) {
      if (!sessionStorage.length) {
        sessionStorage.setItem('list', JSON.stringify(state.listItems))
      }
    }
  },
  setStorageByNewItem(state) {
    if (process.client) {
      sessionStorage.setItem('list', JSON.stringify(state.listItems))
    }
  },
  getListFromStorage(state) {
    if (process.client) {
      if (sessionStorage.length) {
        state.listItems = []
        state.listItems = JSON.parse(sessionStorage.getItem('list'))
        state.counterId = state.listItems.length
      }
    }
  }
}

export const actions = {
  async nuxtServerInit ({dispatch}) {
    dispatch('callSetListItems')
  },
  async callSetListItems({commit}, arr) {
    commit('setListItems', arr)
  },
  callSetToTheStorage({commit}) {
    commit('setToTheStorage')
  },
  callSetSelected({commit}, obj) {
    commit('setSelected', obj)
    commit('sortListItems', obj.value)
  },
  async callCreateNewElem({commit}, obj) {
    try {
      commit('setLoader', true)
      commit('createNewElem', obj)
      commit('sortedWhenCreate')
      commit('setStorageByNewItem')
    } catch (err) {
      throw new Error('Внутреняя ошибка сервера, сообщите администратору')
    }
  },
  callDeleteElement({commit}, id) {
    setTimeout(() => {
        commit('deleteElement', id)
        if (process.client) {
          commit('setStorageByNewItem')
        }
    }, 400)
  },
  callGetListFromStorage({commit}) {
    commit('getListFromStorage')
    setTimeout(() => {
      commit('sortedWhenCreate')
    }, 700)
  }
}
