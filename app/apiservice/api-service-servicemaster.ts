import { ServiceMaster } from "../types/type";

const getAllServiceMaster = async () => {
  const response = await fetch("http://localhost:5118/api/servicemasters/getAll");
  const data = await response.json();
  return data;
};

const createMaster = async (serviceMaster: ServiceMaster) => {
  const response = await fetch("http://localhost:5118/api/servicemasters/createMaster", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(serviceMaster)
  });
  const data = await response.json();
  return data;
};

const updateMaster = async (serviceMaster: ServiceMaster) => {
  const response = await fetch("http://localhost:5118/api/servicemasters/updateMaster", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(serviceMaster)
  });
  const data = await response.json();
  return data;
};

const deleteMaster = async (serviceMasterId: number) => {
  const response = await fetch(`http://localhost:5118/api/servicemasters/deleteMaster/${serviceMasterId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await response.json();
  return data;
};

export { getAllServiceMaster, createMaster, updateMaster, deleteMaster };