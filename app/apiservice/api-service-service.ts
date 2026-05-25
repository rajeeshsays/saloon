import { ServiceEntry } from "../types/type";

const getAllEntries = async () => {
  const response = await fetch("http://localhost:5118/api/serviceentries/getAllServiceEntries");
  const data = await response.json();
  return data;
};

const createEntry = async (serviceEntry: ServiceEntry) => {
  const response = await fetch("http://localhost:5118/api/serviceentries/createEntry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(serviceEntry)
  });
  const data = await response.json();
  return data;
};
const updateEntry = async (serviceEntry: ServiceEntry) => {
  const response = await fetch("http://localhost:5118/api/serviceentries/updateEntry", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(serviceEntry)
  });
  const data = await response.json();
  return data;
}

const deleteEntry = async (serviceEntryId: number) => {
  const response = await fetch(`http://localhost:5118/api/serviceentries/deleteEntry/${serviceEntryId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await response.json();
  return data;
};

export { getAllEntries, createEntry, updateEntry, deleteEntry };