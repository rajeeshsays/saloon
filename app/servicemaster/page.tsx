
'use client';

import { Card, Input, Select, Button } from "../components/common";
import { getAllServiceMasters,createMaster,updateMaster, deleteMaster,searchMaster} from "../apiservice/api-service-servicemaster";  
import { ReactNode, useEffect, useState } from "react";
import { ServiceMaster } from "../types/type";
import { create } from "domain";
import { AnyARecord } from "dns";
import '@fortawesome/fontawesome-free/css/all.min.css'


let _serviceMasters: ServiceMaster[] = [];
let _serviceMaster: ServiceMaster = {
  serviceMasterId: 0,
  serviceCode: "",
  serviceName: "",
  description: "",
  price: 0,
  rate: 0,
  isActive: true,
  createdAt: new Date()
};

export default function Page() {
const [serviceMasters, setServiceMasters] = useState(_serviceMasters);
const [formData, setFormData] = useState(_serviceMaster);

useEffect(() => {
  console.log("Fetching service masters...");
  getAllServiceMasters().then(data => {
    console.log("jjj" + data);
    setServiceMasters(data);
  }).catch(err => console.error(err));
}, []);


useEffect(() => {

  console.log("Service Masters updated:", serviceMasters);
}, [serviceMasters]);


function createServiceMaster() {
  createMaster({
    serviceMasterId: 0,
    serviceCode: formData.serviceCode,
    serviceName: formData.serviceName,
    description: "",
    price: 0,
    rate: formData.rate,
    isActive: formData.isActive,
    createdAt: new Date()
  }).then(data => {
    console.log("Created:", data);
    // Optionally refresh the list after creation
    return getAllServiceMasters();
  }).then(data => {
    setServiceMasters(data);
    alert("Service Master created successfully!");
  }).catch(err => console.error(err));  
  // Implement create logic here
}

function updateServiceMaster() {
  updateMaster(formData).then(data => {
    console.log("Updated:", data);
    // Optionally refresh the list after update
    return getAllServiceMasters();
  }).then(data => {
    setServiceMasters(data);
    alert("Service Master updated successfully!");
  }).catch(err => console.error(err));    
}

function deleteServiceMaster() {
  deleteMaster(formData.serviceMasterId).then(data => {
    console.log("Deleted:", data);
    // Optionally refresh the list after deletion
    return getAllServiceMasters();
  }).then(data => {
    setServiceMasters(data);
    alert("Service Master deleted successfully!");
  }).catch(err => console.error(err));  
  // Implement delete logic here
}

function searchServiceMaster() {
  searchMaster(formData.serviceName).then(data => {
    console.log("Searched:", data);
    setServiceMasters(data);
  }).catch(err => console.error(err));  
  // Implement search logic here  
}

function editServiceMaster(serviceMasterId : number) {
  alert("You are now editing this service master. Make changes and click update to save.");
  serviceMasters.filter((item) => item.serviceMasterId === serviceMasterId).map((item) => {
    setFormData(item);
  });

}

function trashServiceMaster(serviceMasterId : number) {
  alert("Are you sure you want to delete this service master?");
  deleteMaster(serviceMasterId).then(data => {
    console.log("Deleted:", data);
    // Optionally refresh the list after deletion
    return getAllServiceMasters();
  }).then(data => {
    setServiceMasters(data);
    alert("Service Master deleted successfully!");
  }).catch(err => console.error(err));  
  // Implement delete logic here
}


  return (
    <Card title="Service Master">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <Input 
          label="Service Code" 
          placeholder="Enter service code" 
          value={formData.serviceCode}
          onChange={(e : any) => setFormData({...formData, serviceCode: e.target.value})}
        />
        <Input 
          label="Service Name" 
          placeholder="Enter service name" 
          value={formData.serviceName}
          onChange={(e : any) => setFormData({...formData, serviceName: e.target.value})}
        />
        <Input 
          label="Rate" 
          type="number" 
          placeholder="Enter rate" 
          value={formData.rate}
          onChange={(e : any) => setFormData({...formData, rate: Number(e.target.value)})}
        />

        <Select label="Status">
          <option>Active</option>
          <option>Inactive</option>
        </Select>
      </div>

      <div className="flex gap-3 mb-6">
        <Button onClick={createServiceMaster}>Save</Button>
        
        <Button onClick={searchServiceMaster}>Search</Button>
        <Button onClick={updateServiceMaster}>Update</Button>
        <Button onClick={deleteServiceMaster}>Delete</Button>
        <Button className="bg-slate-500 hover:bg-slate-600">Clear</Button>
      </div>

      <div className="overflow-auto border border-slate-200 rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="text-left px-4 py-3">Code</th>
              <th className="text-left px-4 py-3">Service Name</th>
              <th className="text-right px-4 py-3">Rate</th>
              <th className="text-center px-4 py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {serviceMasters.map((item) => (
              <tr key={item.serviceMasterId} className="border-t border-slate-200 hover:bg-slate-50">
                <td className="px-4 py-3">{item.serviceCode}</td>
                <td className="px-4 py-3">{item.serviceName}</td>
                <td className="px-4 py-3 text-right">₹ {item.rate}</td>
                <td className="px-4 py-3 text-center">
                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                    {item.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3">
           
                  <button onClick={()=>editServiceMaster(item.serviceMasterId)}><i className="fas fa-edit"></i></button>
                  <button onClick={()=>trashServiceMaster(item.serviceMasterId)}><i className="fas fa-trash"></i></button>
                 
                  </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}