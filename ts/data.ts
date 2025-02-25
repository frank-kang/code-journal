interface Data {
  view: string;
  entries: any[];
  editing: null | string;
  nextEntryId: number;
}

const data: Data = {
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
  if (!$idImagUrl) {
    $image.src = 'images/placeholder-image-square.jpg';
  }
  $image.src = $idImagUrl.value;
});

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
let nextEntryId: number;
$idJournalEntry.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const $formElements = $idJournalEntry.elements as FormElements;
  nextEntryId = data.nextEntryId;
  const formObject: FormObject = {};
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
