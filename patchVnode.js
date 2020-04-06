function findIdxInOld(node, oldCh, start, end) {
  for (var i = start; i < end; i++) {
    var c = oldCh[i]
    if (isDef(c) && sameVnode(node, c)) {
      return i
    }
  }
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, key
  var map = {}
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key
    if (isDef(key)) {
      map[key] = i
    }
  }
  return map
}

function updateChildren(parentElm, oldCh, newCh) {
  var oldStartIdx = 0
  var newStartIdx = 0
  var oldEndIdx = oldCh.length - 1
  var oldStartVnode = oldCh[0]
  var oldEndVnode = oldCh[oldEndIdx]
  var newEndIdx = newCh.length - 1
  var newStartVnode = newCh[0]
  var newEndVnode = newCh[newEndIdx]

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (isUndef(oldStartVnode)) {
      oldStartVnode = oldCh[++oldStartIdx] // Vnode has been moved left
    } else if (isUndef(oldEndVnode)) {
      oldEndVnode = oldCh[--oldEndIdx]
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      patchVnode(oldStartVnode, newStartVnode, newCh, newStartIdx)
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      patchVnode(oldEndVnode, newEndVnode, newCh, newEndIdx)
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      // Vnode moved right
      patchVnode(oldStartVnode, newEndVnode, newCh, newEndIdx)
      canMove &&
        nodeOps.insertBefore(
          parentElm,
          oldStartVnode.elm,
          nodeOps.nextSibling(oldEndVnode.elm)
        )
      oldStartVnode = oldCh[++oldStartIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      // Vnode moved left
      patchVnode(oldEndVnode, newStartVnode, newCh, newStartIdx)
      canMove &&
        nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]
    } else {
      if (isUndef(oldKeyToIdx)) {
        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
      }
      idxInOld = isDef(newStartVnode.key)
        ? oldKeyToIdx[newStartVnode.key]
        : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
      if (isUndef(idxInOld)) {
        // New element
        createElm(
          newStartVnode,
          parentElm,
          oldStartVnode.elm,
          false,
          newCh,
          newStartIdx
        )
      } else {
        vnodeToMove = oldCh[idxInOld]
        if (sameVnode(vnodeToMove, newStartVnode)) {
          patchVnode(vnodeToMove, newStartVnode, newCh, newStartIdx)
          oldCh[idxInOld] = undefined
          canMove &&
            nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm)
        } else {
          // same key but different element. treat as new element
          createElm(
            newStartVnode,
            parentElm,
            oldStartVnode.elm,
            false,
            newCh,
            newStartIdx
          )
        }
      }
      newStartVnode = newCh[++newStartIdx]
    }
  }
  if (oldStartIdx > oldEndIdx) {
    refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
    addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx)
  } else if (newStartIdx > newEndIdx) {
    removeVnodes(oldCh, oldStartIdx, oldEndIdx)
  }
}
function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx) {
  console.log('addVnodes', parentElm, refElm, vnodes, startIdx, endIdx)
}
function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    createElm(vnodes[startIdx], parentElm, refElm)
  }
}

function removeNode(el) {
  var parent = nodeOps.parentNode(el)
  // element may have already been removed due to v-html / v-text
  if (isDef(parent)) {
    nodeOps.removeChild(parent, el)
  }
}

function removeVnodes(vnodes, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    var ch = vnodes[startIdx]
    if (isDef(ch)) {
      if (isDef(ch.tag)) {
        // removeAndInvokeRemoveHook(ch);
        // invokeDestroyHook(ch);
      } else {
        // Text node
        removeNode(ch.elm)
      }
    }
  }
}

function patchVnode(oldVnode, vnode, invokeUpdateHooks) {
  if (oldVnode === vnode) {
    return
  }
  var i
  var elm = (vnode.elm = oldVnode.elm)
  var data = vnode.data
  if (data && (i = data.hook) && (i = i.prepatch)) {
    i(oldVnode, vnode)
  }

  var oldCh = oldVnode.children
  var ch = vnode.children
  if (data && vnode.tag && invokeUpdateHooks) {
    invokeUpdateHooks(oldVnode, vnode)
  }
  if (!vnode.text) {
    if (oldCh && ch) {
      if (oldCh !== ch) {
        updateChildren(elm, oldCh, ch)
      }
    } else if (ch) {
      if (oldVnode.text) {
        nodeOps.setTextContent(elm, '')
      }
      addVnodes(elm, null, ch, 0, ch.length - 1)
    } else if (oldCh) {
      removeVnodes(oldCh, 0, oldCh.length - 1)
    } else if (oldVnode.text) {
      nodeOps.setTextContent(elm, '')
    }
  } else if (oldVnode.text !== vnode.text) {
    nodeOps.setTextContent(elm, vnode.text)
  }

  if (data && (i = data.hook) && (i = i.postpatch)) {
    i(oldVnode, vnode)
  }
}
