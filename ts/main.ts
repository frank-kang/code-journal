const $idImagUrl = document.querySelector('#photo-url') as HTMLInputElement;
const $image: any = document.querySelector('.image') as HTMLImageElement;

$idImagUrl?.addEventListener('input', () => {
  $image.src = $idImagUrl.value;
});
