const data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

const $idImagUrl = document.querySelector('#photo-url') as HTMLInputElement;
const $image: any = document.querySelector('.image') as HTMLImageElement;
const $idJournalEntry = document.querySelector(
  '#journal-entry',
) as HTMLFormElement;

$idImagUrl?.addEventListener('input', () => {
  $image.src = $idImagUrl.value;
});

interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  photo: HTMLInputElement;
  notes: HTMLInputElement;
}

interface FormObject {
  title?: string;
  photo?: string;
  notes?: string;
}

const journalEntries: FormObject[] = [{}];

$idJournalEntry.addEventListener('submit', (event: Event) => {
  event.preventDefault();

  const $formElements = $idJournalEntry.elements as FormElements;
  const formObject: FormObject = {};
  formObject.title = $formElements.title.value;
  formObject.photo = $formElements.photo.value;
  formObject.notes = $formElements.notes.value;

  journalEntries.push(formObject);
  console.log(journalEntries);
});
