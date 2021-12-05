export const state = () => ({
  listItems: [],
  selected: {},
})

export const mutations = {
  setListItems(state, arr) {
    state.listItems = arr
  },
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
  }
}

export const actions = {
  callSetListItems({commit}, arr) {
    commit('setListItems', arr)
  },
  callSetSelected({commit}, obj) {
    commit('setSelected', obj)
    commit('sortListItems', obj.value)
  },
}
