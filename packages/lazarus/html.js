export const html = {
  tag :null,
  attributes :null,
  children :{},
  make(tag) {
    const self = Object.assign({}, html)
    self.tag = tag
    return self
  },
  setAttributes(attrs) {
    this.attributes = attrs
    return this
  },
  setChildren(children) {
    this.children = children
    return this
  },
}