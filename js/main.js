'use strict';
const $idImagUrl = document.querySelector('#photo-url');
const $image = document.querySelector('.image');
$idImagUrl?.addEventListener('input', () => {
  $image.src = $idImagUrl.value;
});
