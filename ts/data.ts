interface Data {
  view: any;
  entries: any[];
  editing: any;
  nextEntryId: any;
}

const data: Data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

function readData(): Data {
  const journalStorage = localStorage.getItem('journal-storage');
  if (!journalStorage) {
    return data;
  }
  const journalEntry = JSON.parse(journalStorage);
  return journalEntry;
}

function writeData(): void {
  const journalJSON = JSON.stringify(data);
  localStorage.setItem('journal-storage', journalJSON);
}
