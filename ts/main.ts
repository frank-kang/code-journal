// interfaces
interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  photo: HTMLInputElement;
  notes: HTMLInputElement;
}

interface FormObject {
  entryId?: number;
  title?: string;
  photo?: string;
  notes?: string;
}

// DOM objects
const $idImageUrl = document.querySelector('#photo-url') as HTMLInputElement;
const $image = document.querySelector('.image') as HTMLImageElement;
const $idJournalEntry = document.querySelector(
  '#journal-entry',
) as HTMLFormElement;
const $classNoPosts = document.querySelector(
  '.no-posts',
) as HTMLParagraphElement;
const $dataViewEntryForm = document.querySelector('.entry-form');
const $dataViewEntries = document.querySelector('.entries');
const $classEntriesAnchor = document.querySelector('.entries-anchor');
const $classNewEntry = document.querySelector('.new-anchor');
const $classJournalEntries = document.querySelector('.journal-entries');
const $classTextInput = document.querySelector(
  '.text-input',
) as HTMLInputElement;
const $idNotes = document.querySelector('#notes') as HTMLTextAreaElement;
const $classH2 = document.querySelector('.h2');

// Event Listeners
$idImageUrl?.addEventListener('input', () => {
  if (!$idImageUrl) {
    $image.src = 'images/placeholder-image-square.jpg';
  }
  $image.src = $idImageUrl.value;
});

$idJournalEntry.addEventListener('submit', (event: Event) => {
  if (data.editing === null) {
    event.preventDefault();
    if (!$classH2) throw new Error('H2 does not exist');
    $classH2.textContent = 'New Entry';
    const $formElements = $idJournalEntry.elements as FormElements;
    const formObject: FormObject = {};
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
  } else {
    event.preventDefault();
    const $formElements = $idJournalEntry.elements as FormElements;
    const formObject: FormObject = {};
    formObject.entryId = data.editing?.entryId;
    formObject.title = $formElements.title.value;
    formObject.photo = $formElements.photo.value;
    formObject.notes = $formElements.notes.value;
    if (!formObject.entryId) throw new Error('forObject.entryId is null');
    const indexToUpdate = data.entries.length - formObject?.entryId;
    data.entries.splice(Number(indexToUpdate), 1, formObject);
    writeData();
    $idJournalEntry.reset();
    const li = renderEntry(formObject);
    const elements = document.querySelectorAll('.entry');
    let element;
    for (element of elements) {
      if (element?.dataset?.entryId === String(data.editing?.entryId)) {
        element?.replaceWith(li);
      }
    }
    viewSwap('entries');
    data.editing = null;
  }
});

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

$classEntriesAnchor?.addEventListener('click', (event: Event): void => {
  event.preventDefault();
  data.view = 'entries';
  viewSwap(data.view);
});

$classNewEntry?.addEventListener('click', (event: Event): void => {
  event.preventDefault();
  viewSwap('entry-form');
});

$classJournalEntries?.addEventListener('click', (event: Event) => {
  const eventTarget = event.target as HTMLElement;
  if (eventTarget?.tagName === 'I') {
    const et = eventTarget;
    const closestLi = et.closest('.entry');
    if (closestLi === null) throw new Error('closest Li does not exist');
    const id = closestLi?.dataset.entryId;
    const journalEntries: any[] = data.entries;
    const matchingJournal = journalEntries.find(
      (journal) => journal.entryId === Number(id),
    );
    data.editing = matchingJournal;
    writeData();
    viewSwap('entry-form');
  }
  $image.src = data?.editing?.photo;
  if (!$classTextInput) throw new Error('Notes does not exist');
  $classTextInput.value = data?.editing?.title;
  $idImageUrl.value = data?.editing?.photo;
  if (!$idNotes) throw new Error('Notes does not exist');
  $idNotes.textContent = data?.editing?.notes;
  if (!$classH2) throw new Error('H2 does not exist');
  $classH2.textContent = 'Edit Entry';
});

// Functions
function renderEntry(entry: FormObject): HTMLLIElement {
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

function noEntries(): void {
  $classNoPosts.classList.remove('hidden');
}

function showEntries(): void {
  $classNoPosts.classList.add('hidden');
}

function viewSwap(view: string): void {
  data.view = view;
  writeData();
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
