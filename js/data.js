'use strict';
const data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};
const $idImagUrl = document.querySelector('#photo-url');
const $image = document.querySelector('.image');
const $idJournalEntry = document.querySelector('#journal-entry');
$idImagUrl?.addEventListener('input', () => {
  if (!$idImagUrl) {
    $image.src = 'images/placeholder-image-square.jpg';
  }
  $image.src = $idImagUrl.value;
});
let nextEntryId;
$idJournalEntry.addEventListener('submit', (event) => {
  event.preventDefault();
  const $formElements = $idJournalEntry.elements;
  nextEntryId = data.nextEntryId;
  const formObject = {};
  formObject.entryId = data.nextEntryId;
  formObject.title = $formElements.title.value;
  formObject.photo = $formElements.photo.value;
  formObject.notes = $formElements.notes.value;
  data.entries.unshift({
    entryId: formObject.entryId,
    title: formObject.title,
    photo: formObject.photo,
    notes: formObject.notes,
  });
  nextEntryId++;
  data.nextEntryId = nextEntryId;
  console.log(data);
  $image.src = 'images/placeholder-image-square.jpg';
  $idJournalEntry.reset();
});
