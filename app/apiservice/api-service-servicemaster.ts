const getAllServiceMaster = async () => {
  const response = await fetch("http://localhost:3000/api/servicemaster/getAllServiceMaster");
  const data = await response.json();
  return data;
};

const getAllServiceEntries = async () => {
  const response = await fetch("http://localhost:3000/api/serviceentries/getAllServiceEntries");
  const data = await response.json();
  return data;
};
const createMaster = async () => {
  const response = await fetch("http://localhost:3000/api/servicemaster/getAllServiceMaster");
  const data = await response.json();
  return data;
};

const updateMaster = async () => {
  const response = await fetch("http://localhost:3000/api/servicemaster/getAllServiceMaster");
  const data = await response.json();
  return data;
};

const deleteMaster = async () => {
  const response = await fetch("http://localhost:3000/api/servicemaster/getAllServiceMaster");
  const data = await response.json();
  return data;
};

export { getAllServiceMaster, getAllServiceEntries, createMaster, updateMaster, deleteMaster };