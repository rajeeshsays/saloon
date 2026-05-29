import { ServiceFormdata } from "../types/type";

const getAllEntries = async () => {
  const response = await fetch("http://localhost:5118/api/serviceentries/getAllServiceEntries");
  const data = await response.json();
  return data;
};

const createEntry = async (serviceEntry: ServiceFormdata) => {
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

const updateEntry = async (serviceEntry: ServiceFormdata) => {
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



export { getAllEntries, createEntry, updateEntry };