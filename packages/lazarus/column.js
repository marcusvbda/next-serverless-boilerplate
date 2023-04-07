export const column = {
  label :null,
  index : null,
  handler : null,
  visible : true,
  sortable : true,
  width : "auto",
  
  make(label,index = "") {
    const self = Object.assign({}, column)
    self.label = label
    if(index) self.index = index
    return self
  },
  setHandler(handler) {
    this.handler = handler
    return this
  },
  setVisible(value) {
    this.visible = value
    return this
  },
  setWidth(value) {
    this.width = value
    return this
  },
  setSortable(value) {
    this.sortable = value
    return this
  }
}