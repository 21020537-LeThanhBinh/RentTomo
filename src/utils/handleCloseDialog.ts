export default function handleCloseDialog(e: MouseEvent, nodeRef: any, action: () => void) {
  const dialogDimensions = nodeRef?.getBoundingClientRect()
  if (
    dialogDimensions &&
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    action()
  }
}