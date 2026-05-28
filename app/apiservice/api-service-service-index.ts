const editEntry = (id: number, data: any) => {
  return fetch(`http://localhost:5118/api/serviceentries/editEntry/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

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

export { editEntry, deleteEntry };
