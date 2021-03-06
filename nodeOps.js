var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML',
}

function createElement(tagName, vnode) {
  var elm = document.createElement(tagName)
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (
    vnode.data &&
    vnode.data.attrs &&
    vnode.data.attrs.multiple !== undefined
  ) {
    elm.setAttribute('multiple', 'multiple')
  }
  return elm
}

function createElementNS(namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode(text) {
  return document.createTextNode(text)
}

function createComment(text) {
  return document.createComment(text)
}

function insertBefore(parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode)
}

function removeChild(node, child) {
  node.removeChild(child)
}

function appendChild(node, child) {
  node.appendChild(child)
}

function parentNode(node) {
  return node.parentNode
}

function nextSibling(node) {
  return node.nextSibling
}

function tagName(node) {
  return node.tagName
}

function setTextContent(node, text) {
  node.textContent = text
}

function setStyleScope(node, scopeId) {
  node.setAttribute(scopeId, '')
}

var nodeOps = /*#__PURE__*/ Object.freeze({
  createElement: createElement,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setStyleScope: setStyleScope,
})
