function insert(parent, elm, ref) {
  if (parent) {
    if (ref) {
      if (nodeOps.parentNode(ref) === parent) {
        nodeOps.insertBefore(parent, elm, ref)
      }
    } else {
      nodeOps.appendChild(parent, elm)
    }
  }
}

function createChildren(vnode, children, invokeCreateHooks) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; ++i) {
      createElm(children[i], vnode.elm, null, invokeCreateHooks)
    }
  } else if (vnode.text) {
    nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)))
  }
}

function createElm(vnode, parentElm, refElm, invokeCreateHooks) {
  var data = vnode.data
  var children = vnode.children
  var tag = vnode.tag

  if (tag) {
    vnode.elm = vnode.ns
      ? nodeOps.createElementNS(vnode.ns, tag)
      : nodeOps.createElement(tag, vnode)

    createChildren(vnode, children, invokeCreateHooks)
    if (data && invokeCreateHooks) {
      invokeCreateHooks(vnode)
    }
    insert(parentElm, vnode.elm, refElm)
  } else if (vnode.isComment) {
    vnode.elm = nodeOps.createComment(vnode.text)
    insert(parentElm, vnode.elm, refElm)
  } else {
    vnode.elm = nodeOps.createTextNode(vnode.text)
    insert(parentElm, vnode.elm, refElm)
  }
}
