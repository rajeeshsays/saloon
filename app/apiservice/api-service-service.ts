
const getAllEntries = async () => {
  const response = await fetch("http://localhost:3000/api/serviceentries/getAllServiceEntries");
  const data = await response.json();
  return data;
};

const createEntry = async () => {
  const response = await fetch("http://localhost:3000/api/serviceentries/createEntry",);
  const data = await response.json();
  return data;
}
const updateEntry = async () => {
  const response = await fetch("http://localhost:3000/api/serviceentries/updateEntry");
  const data = await response.json();
  return data;
}
const deleteEntry = async () => {

  const response = await fetch("http://localhost:3000/api/serviceentries/deleteEntry");
  const data = await response.json();
  return data;
};

export { getAllEntries, createEntry, updateEntry, deleteEntry };