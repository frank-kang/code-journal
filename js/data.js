'use strict';
let data = {
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
function readJournal() {
  const journalStorage = localStorage.getItem('journal-storage');
  if (!journalStorage) {
    return data;
  }
  const journalEntry = JSON.parse(journalStorage);
  return journalEntry;
}
function writeJournal() {
  const journalJSON = JSON.stringify(data);
  localStorage.setItem('journal-storage', journalJSON);
}
let nextEntryId;
$idJournalEntry.addEventListener('submit', (event) => {
  event.preventDefault();
  data = readJournal();
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
  writeJournal();
  $image.src = 'images/placeholder-image-square.jpg';
  $idJournalEntry.reset();
});
