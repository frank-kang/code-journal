'use strict';
const $idImageUrl = document.querySelector('#photo-url');
const $image = document.querySelector('.image');
const $idJournalEntry = document.querySelector('#journal-entry');
$idImageUrl?.addEventListener('input', () => {
  if (!$idImageUrl) {
    $image.src = 'images/placeholder-image-square.jpg';
  }
  $image.src = $idImageUrl.value;
});
$idJournalEntry.addEventListener('submit', (event) => {
  event.preventDefault();
  const $formElements = $idJournalEntry.elements;
  const formObject = {};
  formObject.entryId = data.nextEntryId;
  formObject.title = $formElements.title.value;
  formObject.photo = $formElements.photo.value;
  formObject.notes = $formElements.notes.value;
  data.entries.unshift(formObject);
  data.nextEntryId++;
  writeData();
  $image.src = 'images/placeholder-image-square.jpg';
  $idJournalEntry.reset();
});
