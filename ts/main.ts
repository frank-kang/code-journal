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
