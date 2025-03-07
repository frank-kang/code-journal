'use strict';
const $idImageUrl = document.querySelector('#photo-url');
const $image = document.querySelector('.image');
const $idJournalEntry = document.querySelector('#journal-entry');
const $classNoPosts = document.querySelector('.no-posts');
const $dataViewEntryForm = document.querySelector('.entry-form');
const $dataViewEntries = document.querySelector('.entries');
const $classEntriesAnchor = document.querySelector('.entries-anchor');
const $classNewEntry = document.querySelector('.new-anchor');
const $classJournalEntries = document.querySelector('.journal-entries');
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
  const li = renderEntry(formObject);
  const $ul = document.querySelector('ul');
  $ul?.prepend(li);
  viewSwap('entries');
});
function renderEntry(entry) {
  const $tagLi = document.createElement('li');
  $tagLi.className = 'entry';
  const $divClassRow = document.createElement('div');
  $divClassRow.className = 'row';
  const $divClassColumnHalf = document.createElement('div');
  $divClassColumnHalf.className = 'column-half';
  const $classImage = document.createElement('img');
  $classImage.className = 'image';
  if (entry.photo) {
    $classImage.src = entry.photo;
  } else {
    $classImage.src = 'images/placeholder-image-square.jpg';
  }
  const $divClassColumnHalfText = document.createElement('div');
  $divClassColumnHalfText.className = 'column-half';
  const $pClassTitle = document.createElement('p');
  $pClassTitle.className = 'title';
  if (entry.title) {
    $pClassTitle.textContent = entry.title;
  }
  const $sClassPen = document.createElement('i');
  $sClassPen.className = 'fa fa-pencil';
  const $pClassEntryNote = document.createElement('p');
  $pClassEntryNote.className = 'entry-notes';
  if (entry.notes) {
    $pClassEntryNote.textContent = entry.notes;
  }
  $tagLi.appendChild($divClassRow);
  $divClassRow.appendChild($divClassColumnHalf);
  $divClassColumnHalf.appendChild($classImage);
  $divClassRow.appendChild($divClassColumnHalfText);
  $divClassColumnHalfText.appendChild($pClassTitle);
  $divClassColumnHalfText.appendChild($sClassPen);
  $divClassColumnHalfText.appendChild($pClassEntryNote);
  return $tagLi;
}
function noEntries() {
  $classNoPosts.classList.remove('hidden');
}
function showEntries() {
  $classNoPosts.classList.add('hidden');
}
document.addEventListener('DOMContentLoaded', () => {
  if (data.nextEntryId === 1) {
    noEntries();
    return;
  }
  data.view = 'entries';
  for (const i of data.entries) {
    const li = renderEntry(i);
    $classJournalEntries?.appendChild(li);
  }
  viewSwap(data.view);
});
function viewSwap(view) {
  data.view = view;
  if (data.view === 'entry-form') {
    $dataViewEntryForm?.classList.remove('hidden');
    $dataViewEntries?.classList.add('hidden');
    noEntries();
  } else {
    showEntries();
    $dataViewEntryForm?.classList.add('hidden');
    $dataViewEntries?.classList.remove('hidden');
  }
}
$classEntriesAnchor?.addEventListener('click', (event) => {
  event.preventDefault();
  data.view = 'entries';
  viewSwap(data.view);
});
$classNewEntry?.addEventListener('click', (event) => {
  event.preventDefault();
  viewSwap('entry-form');
});
