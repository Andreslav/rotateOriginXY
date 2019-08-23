// nodes: array
// angle, offsetX, offsetY: number
// unitTypeX, unitTypeY: string

function rotateOriginXY(nodes, angle = 0, offsetX = 0, offsetY = 0, unitTypeX = "px", unitTypeY = "px") {
	// relative position of the center of rotation
	if (unitTypeX === "%") {
		offsetX = group.width * offsetX
	}
	if (unitTypeY === "%") {
		offsetY = group.height * offsetY
	}

	// keep the position of the elements
	const parents = nodes.map(node => ({
		id: node.id,
		parent: node.parent,
		index: getIndexNode(node)
	}))

	const group = figma.group(nodes, figma.currentPage)
	const [[,,x1],[,,y1]] = group.absoluteTransform

	// using the frame, we will change the center of rotation
	const frameNode = figma.createFrame()
	frameNode.x = x1
	frameNode.y = y1
	frameNode.appendChild(group)

	const [[,,x2],[,,y2]] = group.absoluteTransform

	// сorrect the position of the group after moving to frame
	group.x -= (x2 - x1) + offsetX
	group.y -= (y2 - y1) + offsetY

	// change the center of rotation
	group.x -= offsetX
	group.y -= offsetY
	frameNode.x += offsetX
	frameNode.y += offsetY

	frameNode.rotation = angle

	// return the elements to their original positions.
	nodes.forEach(e => {
		const [[,,x],[,,y]] = e.absoluteTransform
		const p = parents.find(p => e.id === p.id)
		if (p) {
			p.parent.appendChild(e)
		} else {
			// never know what ..
			figma.currentPage.appendChild(e)
		}
		e.rotation = angle
		e.x = x
		e.y = y
	})

	frameNode.remove()

	// get index
	function getIndexNode(node) {
		const id = node.id
		const index = node.parent.children.findIndex(item => item.id === id)
		return index < 0 ? 0 : index
	}
}
