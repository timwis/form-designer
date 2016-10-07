exports.getIndexInParent = function (el) {
  return Array.from(el.parentNode.children).indexOf(el)
}
