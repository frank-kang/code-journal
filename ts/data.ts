interface Data {
  view: string;
  entries: object[];
  editing: null;
  nextEntryId: number;
}

/* let data: Data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
}; */

const data = readData();

function readData(): Data {
  const journalStorage = localStorage.getItem('journal-storage');
  if (journalStorage) {
    const journalEntry = JSON.parse(journalStorage);
    return journalEntry;
  } else {
    return {
      view: 'entry-form',
      entries: [],
      editing: null,
      nextEntryId: 1,
    };
  }
}

function writeData(): void {
  const journalJSON = JSON.stringify(data);
  localStorage.setItem('journal-storage', journalJSON);
}
