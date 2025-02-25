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
  $image.src = $idImagUrl.value;
});
let entryId = 1;
const journalEntries = [{}];
$idJournalEntry.addEventListener('submit', (event) => {
  event.preventDefault();
  const $formElements = $idJournalEntry.elements;
  const formObject = {};
  formObject.title = $formElements.title.value;
  formObject.photo = $formElements.photo.value;
  formObject.notes = $formElements.notes.value;
  data.entries.push(formObject);
  journalEntries.push(formObject);
  console.log(journalEntries);
  entryId++;
});
