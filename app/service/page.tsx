'use client';
import { Card, Input, Select, Button } from "../components/common";
import '@fortawesome/fontawesome-free/css/all.min.css'
import { getAllServiceMasters} from "../apiservice/api-service-servicemaster";
import { createEntry,updateEntry } from "../apiservice/api-service-service";
import { deleteEntry } from "../apiservice/api-service-service-index";
import { ServiceEntry, ServiceFormdata, ServiceItem, ServiceMaster } from "../types/type";
import { ChangeEvent, useEffect, useState } from "react";


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

let _serviceItem : ServiceItem = {
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
};  


let _serviceFormData: ServiceFormdata = {
  serviceEntryId: 0,
  customerName: "",
  mobileNumber: "",
  entryDate: new Date(),
  serviceItem : _serviceItem,
  remarks: ""
};

let _serviceEntry : ServiceEntry = {
  serviceEntryId: 0,
  customerName: "",
  mobileNumber: "",
  entryDate: new Date(),
  serviceItems : _serviceItems,
  remarks: ""
};  
type CE = React.ChangeEvent<HTMLInputElement>;
export default function Page() {
const[serviceEntry, setServiceEntry] = useState(_serviceEntry);
const[formData, setFormData] = useState(_serviceFormData);
const[serviceMasters, setServiceMasters] = useState<ServiceMaster[]>([]);
const[serviceItems, setServiceItems] = useState(_serviceItems);

useEffect(() => {
  console.log("Fetching service items...");
  getAllServiceMasters().then(data => {
    console.log("jjj" + data);
    setServiceMasters(data);
  }).catch(err => console.error(err));
}, []);



//Service Entry Operations
  function createServiceEntry() {
   createEntry(serviceEntry).then(data => {
    console.log("Entry created successfully");
    setServiceEntry(_serviceEntry);
    setFormData(_serviceFormData);
    setServiceItems(_serviceItems);
   }).catch(err => console.error(err));
    
  }

  function editServiceEntry(id: number) {
   updateEntry(serviceEntry).then(data => {
    console.log("Entry updated successfully");
    setServiceEntry(_serviceEntry);
    setFormData(_serviceFormData);
    setServiceItems(_serviceItems);
   }).catch(err => console.error(err));

  }

  function deleteServiceEntry(id: number) {
    deleteEntry(id).then((data : ServiceEntry) => {
      console.log("Entry deleted successfully");
      setServiceItems(serviceItems.filter((item) => item.serviceItemId !== id));
    }).catch((err : Error) => console.error(err));
  }
//-----------------------------------------------


  //Service Item Operations
  function deleteServiceItem(id: number) {
    setServiceItems(serviceItems.filter((item) => item.serviceItemId !== id));
  }

  function editServiceItem(id: number) {

   let serviceItem = serviceItems.filter((item) => item.serviceItemId !== id);
    if(serviceItem.length > 0) {    

      setFormData({
        ...formData,
        serviceItem: serviceItem[0]
      });
    }
      
  }
  
  function updateServiceItem(id: number) {  
setServiceItems((prev) => [...prev,{
  serviceEntryId: formData.serviceItem.serviceEntryId,
  serviceItemId: id,
  discount: formData.serviceItem.discount,
  netAmount: formData.serviceItem.netAmount,
  serviceMasterId: formData.serviceItem.serviceMasterId,
  serviceMaster: formData.serviceItem.serviceMaster,
  remarks: formData.serviceItem.remarks
}]);
  };

  //Service Item Operations



  function addServiceItem() {
   console.log("Adding service item...");
   console.log(formData.serviceItem);
   console.log(serviceItems); 
   setServiceItems((prev: any) => [...prev,{
      serviceEntryId: 0,
      serviceItemId: 0,
      discount: formData.serviceItem.discount,
      netAmount: formData.serviceItem.netAmount,
      serviceMasterId: formData.serviceItem.serviceMasterId,
      serviceMaster: null,
      remarks: ""
    }]);
  }



  return (
    <div>
    <Card title="Add Service ">
      <Button onClick={() => createServiceEntry()}>Save Service</Button>
        <Button className="bg-slate-500 hover:bg-slate-600">Clear</Button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <Input label="Customer Name" placeholder="Enter customer name" onChange={(e : CE ) => setFormData({...formData, customerName: e.target.value})} />
        <Input label="Mobile Number" type="number" placeholder="Enter mobile number" onChange={(e : CE) => setFormData({...formData, mobileNumber: e.target.value})} />
        <Input label="Remarks" placeholder="Enter remarks" onChange={(e : CE ) => setFormData({...formData, remarks: e.target.value})} />
      </div>
       <Card title="Service Entry">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <Input label="Entry Date" type="date" onChange={(e : CE ) => setFormData({...formData, entryDate: new Date(e.target.value)})} />

        <Select label="Service Type" onChange={(e : CE) => setFormData({...formData, serviceItem: {...formData.serviceItem, serviceMasterId: parseInt(e.target.value), serviceMaster: serviceMasters.filter((master) => master.serviceMasterId === parseInt(e.target.value))[0]}})}>
          {serviceMasters.map((master) => (
            <option key={master.serviceMasterId}>{master.serviceName}</option>
          ))}
        </Select>
        <Input label="Rate" type="number" placeholder="Enter rate" onChange={(e : CE) => setFormData({...formData, serviceItem: {...formData.serviceItem, discount: parseFloat(e.target.value) || 0}})} />
        <Input label="Discount" type="number" placeholder="Enter discount" onChange={(e : CE) => setFormData({...formData, serviceItem: {...formData.serviceItem, discount: parseFloat(e.target.value) || 0}})} />
        <Input label="Amount" type="number" placeholder="Enter amount" onChange={(e : CE) => setFormData({...formData, serviceItem: {...formData.serviceItem, netAmount: parseFloat(e.target.value) || 0}})} />
        <Input label="Remarks" placeholder="Enter remarks" onChange={(e : CE ) => setFormData({...formData, remarks: e.target.value})} />
      </div>


      <div className="flex gap-3 mb-6">
        <Button onClick={()=> formData.serviceItem.serviceItemId === 0 ? addServiceItem() : updateServiceItem(formData.serviceItem.serviceItemId)}>Save Item</Button>
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
            {serviceItems.map((item,index) => (
              <tr key={index} className="border-t border-slate-200 hover:bg-slate-50">
                <td className="px-4 py-3">{item.serviceMaster?.serviceMasterId}</td>
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

