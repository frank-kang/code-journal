interface Data {
  view: any;
  entries: any[];
  editing: any;
  nextEntryId: any;
}

let data: Data = {
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

function readJournal(): Data {
  const journalStorage = localStorage.getItem('journal-storage');
  if (!journalStorage) {
    return data;
  }
  const journalEntry = JSON.parse(journalStorage);
  return journalEntry;
}

function writeJournal(): void {
  const journalJSON = JSON.stringify(data);
  localStorage.setItem('journal-storage', journalJSON);
}

let nextEntryId: number;
$idJournalEntry.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  data = readJournal();
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
  writeJournal();
  $image.src = 'images/placeholder-image-square.jpg';
  $idJournalEntry.reset();
});
