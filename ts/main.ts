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

$idImageUrl?.addEventListener('input', () => {
  if (!$idImageUrl) {
    $image.src = 'images/placeholder-image-square.jpg';
  }
  $image.src = $idImageUrl.value;
});

$idJournalEntry.addEventListener('submit', (event: Event) => {
  event.preventDefault();
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
});

function renderEntry(entry: FormObject): HTMLLIElement {
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

function noEntries(): void {
  $classNoPosts.classList.remove('hidden');
}

function showEntries(): void {
  $classNoPosts.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  if (data.nextEntryId === 1) {
    noEntries();
    return;
  }
  showEntries();
  for (const i of data.entries) {
    const li = renderEntry(i);
    const $classJournalEntries = document.querySelector('.journal-entries');
    $classJournalEntries?.appendChild(li);
  }
});

function viewSwap(view: string): void {
  data.view = view;
  console.log(data.view);
  if (data.view === 'entry-form') {
    $dataViewEntryForm?.classList.remove('hidden');
    $dataViewEntries?.classList.add('hidden');
  } else {
    $dataViewEntryForm?.classList.add('hidden');
    $dataViewEntries?.classList.remove('hidden');
  }
}

$classEntriesAnchor?.addEventListener('click', (event: Event): void => {
  event.preventDefault();
  data.view = 'entries';
  viewSwap(data.view);
});

$classNewEntry?.addEventListener('click', (event: Event): void => {
  event.preventDefault();
  viewSwap('entry-form');
});
