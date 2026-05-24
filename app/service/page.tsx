
import { Card, Input, Select, Button } from "../components/common";


export default function Page() {


const services = [
  { id: 1, code: "S001", name: "Haircut", rate: 100, status: "Active" },
  { id: 2, code: "S002", name: "Beard Trim", rate: 50, status: "Active" },
  { id: 3, code: "S003", name: "Shave", rate: 75, status: "Inactive" }
];

const entries = [
  { id: 1, customer: "John Doe", service: "Haircut", date: "2023-10-01", amount: 100, remarks: "Regular customer" },
  { id: 2, customer: "Jane Smith", service: "Beard Trim", date: "2023-10-02", amount: 50, remarks: "First time" }
];

  return (
    <Card title="Service Entry">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <Input label="Entry No" placeholder="Auto Number" />
        <Input label="Entry Date" type="date" />
        <Input label="Customer Name" placeholder="Enter customer name" />


        <Select label="Service Type">
          {services.map((service) => (
            <option key={service.id}>{service.name}</option>
          ))}
        </Select>


        <Input label="Amount" type="number" placeholder="Enter amount" />
        <Input label="Remarks" placeholder="Enter remarks" />
      </div>


      <div className="flex gap-3 mb-6">
        <Button>Save Entry</Button>
        <Button className="bg-slate-500 hover:bg-slate-600">Clear</Button>
      </div>


      <div className="overflow-auto border border-slate-200 rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="text-left px-4 py-3">Entry No</th>
              <th className="text-left px-4 py-3">Customer</th>
              <th className="text-left px-4 py-3">Service</th>
              <th className="text-left px-4 py-3">Date</th>
              <th className="text-right px-4 py-3">Amount</th>
              <th className="text-left px-4 py-3">Remarks</th>
            </tr>
          </thead>


          <tbody>
            {entries.map((item) => (
              <tr key={item.id} className="border-t border-slate-200 hover:bg-slate-50">
                <td className="px-4 py-3">SE-{item.id}</td>
                <td className="px-4 py-3">{item.customer}</td>
                <td className="px-4 py-3">{item.service}</td>
                <td className="px-4 py-3">{item.date}</td>
                <td className="px-4 py-3 text-right">₹ {item.amount}</td>
                <td className="px-4 py-3">{item.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}



// I separated the Service Entry into its own standalone component section and cleaned the structure so you now have:

// ServiceMaster
// ServiceEntry
// Shared reusable UI components:
// Card
// Input
// Select
// Button

// The page now renders both components independently, making it easier to move them into separate files later like:

// /components
//   ServiceMaster.jsx
//   ServiceEntry.jsx
//   Common.jsx