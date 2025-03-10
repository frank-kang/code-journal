"use strict";
const $idImageUrl = document.querySelector('#photo-url');
const $image = document.querySelector('.image');
const $idJournalEntry = document.querySelector('#journal-entry');
const $classNoPosts = document.querySelector('.no-posts');
const $dataViewEntryForm = document.querySelector('.entry-form');
const $dataViewEntries = document.querySelector('.entries');
const $classEntriesAnchor = document.querySelector('.entries-anchor');
const $classNewEntry = document.querySelector('.new-anchor');
const $classJournalEntries = document.querySelector('.journal-entries');
const $classTextInput = document.querySelector('.text-input');
const $idNotes = document.querySelector('#notes');
const $classH2 = document.querySelector('.h2');
$idImageUrl?.addEventListener('input', () => {
    if (!$idImageUrl) {
        $image.src = 'images/placeholder-image-square.jpg';
    }
    $image.src = $idImageUrl.value;
});
function getElementByDataset(datasetName, datasetValue) {
    const elements = document.querySelectorAll(`[data-${datasetName}]`);
    for (const element of elements) {
        if (element.dataset[datasetName] === String(datasetValue)) {
            return element;
        }
    }
    return null; // Return null if no element is found
}
$idJournalEntry.addEventListener('submit', (event) => {
    if (data.editing === null) {
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
    }
    else {
        event.preventDefault();
        const $formElements = $idJournalEntry.elements;
        const formObject = {};
        formObject.entryId = data.editing?.entryId;
        formObject.title = $formElements.title.value;
        formObject.photo = $formElements.photo.value;
        formObject.notes = $formElements.notes.value;
        const indexToUpdate = data.entries.length - formObject?.entryId;
        data.entries.splice(Number(indexToUpdate), 1, formObject);
        data.editing = null;
        console.log(data);
        writeData();
        $idJournalEntry.reset();
        const li = renderEntry(formObject);
        const $ul = document.querySelector('ul');
        $ul?.prepend(li);
        const element = getElementByDataset('entry-id', String(formObject.entryId));
        console.log(element);
        viewSwap('entries');
        element?.replaceWith(li);
    }
});
function renderEntry(entry) {
    const $tagLi = document.createElement('li');
    $tagLi.className = 'entry';
    $tagLi.setAttribute('data-entry-id', `${entry.entryId}`);
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
    writeData();
    if (data.view === 'entry-form') {
        $dataViewEntryForm?.classList.remove('hidden');
        $dataViewEntries?.classList.add('hidden');
        noEntries();
    }
    else {
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
$classJournalEntries?.addEventListener('click', (event) => {
    const eventTarget = event.target;
    if (eventTarget?.tagName === 'I') {
        const et = eventTarget;
        const closestLi = et.closest('.entry');
        if (!closestLi)
            throw new Error('closes Li does not exist');
        const id = closestLi?.dataset.entryId;
        const journalEntries = data.entries;
        const matchingJournal = journalEntries.find((journal) => journal.entryId === Number(id));
        data.editing = matchingJournal;
        writeData();
        viewSwap('entry-form');
    }
    $image.src = data?.editing?.photo;
    $classTextInput.value = data?.editing?.title;
    $idImageUrl.value = data?.editing?.photo;
    $idNotes.value = data?.editing?.notes;
    $classH2.textContent = 'Edit Entry';
});
