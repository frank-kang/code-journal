"use strict";
const data = readData();
function readData() {
    const journalStorage = localStorage.getItem('journal-storage');
    if (journalStorage) {
        const journalEntry = JSON.parse(journalStorage);
        return journalEntry;
    }
    else {
        return {
            view: 'entry-form',
            entries: [],
            editing: null,
            nextEntryId: 1,
        };
    }
}
function writeData() {
    const journalJSON = JSON.stringify(data);
    localStorage.setItem('journal-storage', journalJSON);
}
