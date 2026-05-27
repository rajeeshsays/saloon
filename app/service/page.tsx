'use client';

import { Card, Input, Select, Button } from "../components/common";
import '@fortawesome/fontawesome-free/css/all.min.css'
import { getAllServiceMasters} from "../apiservice/api-service-servicemaster";
import { ServiceEntry, ServiceItem, ServiceMaster } from "../types/type";
import { useEffect, useState } from "react";


let _serviceItems: ServiceItem[] = [{
  serviceEntryId: 0,
  serviceItemId: 0,
  discount: 0,
  netAmount: 0,
  serviceMasterId: 0,
  serviceMaster: {
    serviceMasterId: 0,
    serviceCode: "",
    serviceName: "",
    description: "",
    price: 0,
    rate: 0,
    isActive: true,
    createdAt: new Date()
  } ,
  remarks: ""
}];

let _serviceEntry: ServiceEntry = {
  serviceEntryId: 0,
  customerName: "",
  mobileNumber: "",
  entryDate: new Date(),
  serviceItems : _serviceItems,
  remarks: ""
};




export default function Page() {
const[serviceEntry, setServiceEntry] = useState<ServiceEntry | null>(null);
const[formData, setFormData] = useState(_serviceEntry);
const[serviceMasters, setServiceMasters] = useState<ServiceMaster[]>([]);
const[serviceItems, setServiceItems] = useState(_serviceItems);

useEffect(() => {
  console.log("Fetching service items...");
  getAllServiceMasters().then(data => {
    console.log("jjj" + data);
    setServiceMasters(data);
  }).catch(err => console.error(err));
}, []);


function editServiceEntry(id: number) {

    
  }

  function editServiceItem(id: number) {
   
    
  }

  function deleteServiceEntry(id: number) {
    

  }

  function deleteServiceItem(id: number) {
    setServiceItems(serviceItems.filter((item) => item.serviceItemId !== id));
  }

  function updateServiceEntry(id: number) {  
   const index = serviceItems.findIndex(
    item => item.serviceItemId === id

  );

  if (index !== -1) {
    serviceItems[index] = {
      ...serviceItems[index],
      serviceMasterId: 1,
      discount: formData.serviceItems[0].discount,
      netAmount: formData.serviceItems[0].netAmount
    };
  }
  }

  function addServiceItem() {
   setServiceItems((prev: any) => [...prev,{
      serviceEntryId: 0,
      serviceItemId: 0,
      discount: 0,
      netAmount: 0,
      serviceMasterId: 0,
      serviceMaster: null,
      remarks: ""
    }]);
  }

  function createServiceEntry() {
   createServiceEntry()
    
  }

  return (
    <div>
    <Card title="Add Service ">
      <Button onClick={() => createServiceEntry()}>Save Service</Button>
        <Button className="bg-slate-500 hover:bg-slate-600">Clear</Button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <Input label="Customer Name" placeholder="Enter customer name" />
        <Input label="Mobile Number" type="number" placeholder="Enter mobile number" />
        <Input label="Remarks" placeholder="Enter remarks" />
      </div>
       <Card title="Service Entry">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <Input label="Entry No" placeholder="Auto Number" />
        <Input label="Entry Date" type="date" />
        <Input label="Customer Name" placeholder="Enter customer name" />


        <Select label="Service Type">
          {serviceMasters.map((master) => (
            <option key={master.serviceMasterId}>{master.serviceName}</option>
          ))}
        </Select>


        <Input label="Amount" type="number" placeholder="Enter amount" />
        <Input label="Remarks" placeholder="Enter remarks" />
      </div>


      <div className="flex gap-3 mb-6">
        <Button onClick={()=> formData.serviceItems[0].serviceItemId === 0 ? addServiceItem() : updateServiceEntry(formData.serviceItems[0].serviceItemId)}>Save Item</Button>
        <Button className="bg-slate-500 hover:bg-slate-600">Clear</Button>
      </div>




      <div className="overflow-auto border border-slate-200 rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="text-left px-4 py-3">Entry No</th>
              <th className="text-left px-4 py-3">Service</th>
              <th className="text-left px-4 py-3">Discount</th>
              <th className="text-right px-4 py-3">NetAmount</th>
              <th className="text-left px-4 py-3">Remarks</th>
            </tr>
          </thead>


          <tbody>
            {serviceItems.map((item) => (
              <tr key={item.serviceItemId} className="border-t border-slate-200 hover:bg-slate-50">
                <td className="px-4 py-3">SE-{item.serviceEntryId}</td>
                <td className="px-4 py-3">{item.serviceMaster?.serviceName}</td>
                <td className="px-4 py-3">{item.discount}</td>
                <td className="px-4 py-3 text-right">₹ {item.netAmount}</td>
                       <td className="px-4 py-3">
                  <button ><i className="fas fa-edit"></i></button>
                  <button ><i className="fas fa-trash"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
      </Card>


   
    </div>
  );

}

