'use strict';
let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};
data = readData();
function readData() {
  const journalStorage = localStorage.getItem('journal-storage');
  if (!journalStorage) {
    data = {
      view: 'entry-form',
      entries: [],
      editing: null,
      nextEntryId: 1,
    };
    return data;
  } else {
    const journalEntry = JSON.parse(journalStorage);
    return journalEntry;
  }
}
function writeData() {
  const journalJSON = JSON.stringify(data);
  localStorage.setItem('journal-storage', journalJSON);
}
