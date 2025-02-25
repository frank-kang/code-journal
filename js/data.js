'use strict';
const data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};
function readData() {
  const journalStorage = localStorage.getItem('journal-storage');
  if (!journalStorage) {
    return data;
  }
  const journalEntry = JSON.parse(journalStorage);
  return journalEntry;
}
function writeData() {
  const journalJSON = JSON.stringify(data);
  localStorage.setItem('journal-storage', journalJSON);
}
