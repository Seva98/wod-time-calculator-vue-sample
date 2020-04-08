export default function waterfall(el) {
  const containers = document.querySelectorAll(el)
  containers.forEach(container => {
    if (!container) return
    let elements = container.children
    if (elements.length === 0) return
    
    let containerWidth = container.clientWidth
    let childWidth = elements[0].clientWidth
    let numberOfChildren = Math.round(containerWidth/childWidth)
  
    for (let i = 0; i < elements.length; i++) {
      let itemContainerHeight = elements[i].clientHeight
      let itemHeight = elements[i].children[0].clientHeight+8 //8 is margin y
      elements[i].style.height = itemHeight
  
      let idToChange = i + numberOfChildren
      if (idToChange >= elements.length) break
  
      elements[idToChange].style.marginTop = `${itemHeight-itemContainerHeight}px`
    }
  })

}
