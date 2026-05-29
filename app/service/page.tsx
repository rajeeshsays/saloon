'use client';
import { Card, Input, Select, Button } from "../components/common";
import '@fortawesome/fontawesome-free/css/all.min.css'
import { getAllServiceMasters} from "../apiservice/api-service-servicemaster";
import { createEntry,updateEntry } from "../apiservice/api-service-service";
import { deleteEntry } from "../apiservice/api-service-service-index";
import { ServiceFormdata,  ServiceItem, ServiceMaster } from "../types/type";
import { ChangeEvent, use, useEffect, useState } from "react";


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
  serviceMaster:  {
    serviceMasterId: 1,
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

let _serviceFormdata : ServiceFormdata = {
  serviceEntryId: 0,
  customerName: "",
  mobileNumber: "",
  entryDate: new Date(),
  serviceItems : _serviceItems,
  remarks: ""
};  

const createEmptyServiceItem = (): ServiceItem => ({
  serviceEntryId: 0,
  serviceItemId: 0,
  discount: 0,
  netAmount: 0,
  serviceMasterId: 0,
  serviceMaster:  {
    serviceMasterId: 1,
    serviceCode: "",
    serviceName: "",
    description: "",
    price: 0,
    rate: 0,
    isActive: true,
    createdAt: new Date()
  } ,
  remarks: ""
});

type CE = React.ChangeEvent<HTMLInputElement>;

export default function Page() {

const[formData, setFormData] = useState(_serviceFormdata);
const[serviceMasters, setServiceMasters] = useState<ServiceMaster[]>([]);
const[serviceItems, setServiceItems] = useState(_serviceItems);
const[serviceItem, setServiceItem] = useState(_serviceItem);

useEffect(() => {
  console.log("Fetching service masters ...");
  getAllServiceMasters().then(data => {
    console.log( data);
    setServiceMasters(data);
  }).catch(err => console.error(err));
}, []);




//Service Entry Operations
  function createServiceEntry() {
   createEntry(_serviceFormdata).then(data => {
    console.log("Entry created successfully");

    setFormData(_serviceFormdata);
    setServiceItems(_serviceItems);
   }).catch(err => console.error(err));
    
  }

  function editServiceEntry(id: number) {
   updateEntry(_serviceFormdata).then(data => {
    console.log("Entry updated successfully");
    setFormData(_serviceFormdata);
    setServiceItems(_serviceItems);
   }).catch(err => console.error(err));

  }

  function deleteServiceEntry(id: number) {
    deleteEntry(id).then((data : ServiceFormdata) => {
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

      setFormData(prev=>({
        ...prev,
        serviceItem: serviceItem[0]
      }));
    }
      
  }
  
function updateServiceItem(id: number) {  
let _serviceMaster = serviceMasters.filter((master) => master.serviceMasterId === serviceItem?.serviceMasterId)[0];
setServiceItems((prev: any) => [...prev,{
  serviceEntryId: serviceItem?.serviceEntryId,
  serviceItemId: id,
  discount: serviceItem?.discount,
  netAmount: serviceItem?.netAmount,
  serviceMasterId: serviceItem?.serviceMasterId,
  serviceMaster: _serviceMaster,
  remarks: serviceItem?.remarks
}]);
  };

  //Service Item Operations



  function addServiceItem() {
   console.log("Adding service item...");
   console.log(serviceItems); 
   console.log(serviceMasters.filter((master) => master.serviceMasterId === serviceItem?.serviceMasterId));
   let _serviceMasterId = serviceItem.serviceMasterId === 0 ? 1 : serviceItem?.serviceMasterId;
   console.log("_serviceMasterId" + _serviceMasterId);
   let _serviceMaster = serviceMasters.filter((master) => master.serviceMasterId === _serviceMasterId)[0];
   console.log("_serviceMaster" + JSON.stringify(_serviceMaster));
   console.log(_serviceMaster.serviceName);
   setServiceItems((prev: any) => [...prev,{
      serviceEntryId: 0,
      serviceItemId: 0,
      discount: serviceItem?.discount,
      netAmount: serviceItem?.netAmount,
      serviceMasterId: _serviceMasterId,
      serviceMaster: _serviceMaster,
      remarks: ""
    }])
    
    console.log("Service item added: " + JSON.stringify(serviceItem));
  
    setServiceItem({} as ServiceItem);
  }
useEffect(() => {
  console.log("Service items updated: " + JSON.stringify(serviceItems));
}, [serviceItems]);





function handleServiceMasterChange(e: CE) { 
    console.log("Selected service master ID: " + e.target.value);
    console.log("Current form data: " + JSON.stringify(formData));
    console.log("Current service item data: " + JSON.stringify(serviceItem));

    setServiceItem({
      ...serviceItem,
      serviceMasterId: parseInt(e.target.value),
      serviceMaster: serviceMasters.filter((master) => master.serviceMasterId === parseInt(e.target.value))[0]
    });
  }

const changeDiscount = () => (e: CE) => {
  let netAmount = serviceItem?.serviceMaster.rate - (parseFloat(e.target.value) || 0);
  setServiceItem(prev => ({...prev, discount: parseFloat(e.target.value) || 0, netAmount}));
  
  };

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

        <Select label="Service Type" onChange={(e : CE) => handleServiceMasterChange(e)} value = {serviceItem?.serviceMasterId}>
          {serviceMasters.map((master) => (
            <option key={master.serviceMasterId} value={master.serviceMasterId}>{master.serviceName}</option>
          ))}
        </Select>
        <Input label="Rate" type="number" placeholder="Enter rate" value={serviceItem?.serviceMaster?.rate || ""} onChange={(e : CE) => setServiceItem({...serviceItem, discount: parseFloat(e.target.value) || 0})} />
        <Input label="Discount" type="number" placeholder="Enter discount" value={serviceItem?.discount || ""} onChange={changeDiscount()} />
        <Input label="Amount" type="number" placeholder="Enter amount" value={serviceItem?.netAmount || ""} onChange={(e : CE) => setServiceItem((prev)=>({...prev, netAmount: parseFloat(e.target.value) || 0}))} />
        <Input label="Remarks" placeholder="Enter remarks" value={serviceItem?.remarks || ""} onChange={(e : CE ) => setServiceItem((prev)=>({...prev, remarks: e.target.value}))} />
      </div>


      <div className="flex gap-3 mb-6">
        <Button onClick={()=> serviceItem?.serviceItemId === 0 ? addServiceItem() : updateServiceItem(serviceItem?.serviceItemId)}>Save Item</Button>
        <Button className="bg-slate-500 hover:bg-slate-600">Clear</Button>
      </div>




      <div className="overflow-auto border border-slate-200 rounded-xl">
        {/* <pre>{JSON.stringify(serviceItems)}</pre>
        <pre>{JSON.stringify(serviceMasters)}</pre> */}

        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="text-left px-4 py-3">Service</th>
              <th className="text-left px-4 py-3">Discount</th>
              <th className="text-right px-4 py-3">NetAmount</th>
              <th className="text-left px-4 py-3">Remarks</th>
            </tr>
          </thead>


          <tbody>
           
            { serviceItems.map((item,index) => (
              
              <tr key={index} className="border-t border-slate-200 hover:bg-slate-50">
                 
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
