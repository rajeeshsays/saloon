
'use client';

import { Card, Input, Select, Button } from "../components/common";
import { getAllServiceMaster,createMaster } from "../apiservice/api-service-servicemaster";  
import { useEffect, useState } from "react";
import { ServiceMaster } from "../types/type";
import { create } from "domain";

const services = [
  { id: 1, code: "S001", name: "Haircut", rate: 100, status: "Active" },
  { id: 2, code: "S002", name: "Beard Trim", rate: 50, status: "Active" },
  { id: 3, code: "S003", name: "Shave", rate: 75, status: "Inactive" }
];

let _serviceMasters: ServiceMaster[] = [];

export default function Page() {
const [serviceMasters, setServiceMasters] = useState(_serviceMasters);
const [formData, setFormData] = useState({
  serviceCode: "",
  serviceName: "",
  rate: 0,
  isActive: true
});

useEffect(() => {
getAllServiceMaster().then(data => {console.log(data)




}).catch(err => console.error(err));
},[]);


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
    return getAllServiceMaster();
  }).then(data => {
    setServiceMasters(data);
    alert("Service Master created successfully!");
  }).catch(err => console.error(err));  
  // Implement create logic here
}

function updateServiceMaster() {
  // Implement update logic here
}

function deleteServiceMaster() {
  // Implement delete logic here
}


  return (
    <Card title="Service Master">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <Input 
          label="Service Code" 
          placeholder="Enter service code" 
          value={formData.serviceCode}
          onChange={(e) => setFormData({...formData, serviceCode: e.target.value})}
        />
        <Input 
          label="Service Name" 
          placeholder="Enter service name" 
          value={formData.serviceName}
          onChange={(e) => setFormData({...formData, serviceName: e.target.value})}
        />
        <Input 
          label="Rate" 
          type="number" 
          placeholder="Enter rate" 
          value={formData.rate}
          onChange={(e) => setFormData({...formData, rate: Number(e.target.value)})}
        />

        <Select label="Status">
          <option>Active</option>
          <option>Inactive</option>
        </Select>
      </div>

      <div className="flex gap-3 mb-6">
        <Button onClick={() => {}}>Save</Button>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}