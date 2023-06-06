export default function handleCloseDialog(e: MouseEvent, dialogRef: HTMLDialogElement, action: () => void) {
  const dialogDimensions = dialogRef.getBoundingClientRect()
  if (
    e.clientX < dialogDimensions!.left ||
    e.clientX > dialogDimensions!.right ||
    e.clientY < dialogDimensions!.top ||
    e.clientY > dialogDimensions!.bottom
  ) {
    action()
  }
}