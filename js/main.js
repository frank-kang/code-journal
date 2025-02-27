"use strict";
const $idImageUrl = document.querySelector('#photo-url');
const $image = document.querySelector('.image');
const $idJournalEntry = document.querySelector('#journal-entry');
const $classNoPosts = document.querySelector('.no-posts');
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
    }
    else {
        $classImage.src = 'images/placeholder-image-square.jpg';
    }
    const $divClassColumnHalfText = document.createElement('div');
    $divClassColumnHalfText.className = 'column-half';
    const $pClassTitle = document.createElement('p');
    $pClassTitle.className = 'title';
    if (entry.title) {
        $pClassTitle.textContent = entry.title;
    }
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
    $divClassColumnHalfText.appendChild($pClassEntryNote);
    return $tagLi;
}
function hideNoPost() {
    $classNoPosts.className = 'no-posts hidden';
}
document.addEventListener('DOMContentLoaded', () => {
    for (const i of data.entries) {
        const entry = i;
        const li = renderEntry(entry);
        const $classJournalEntries = document.querySelector('.journal-entries');
        $classJournalEntries?.appendChild(li);
    }
    hideNoPost();
});
