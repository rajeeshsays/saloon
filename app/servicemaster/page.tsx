import { Card, Input, Select, Button } from "../components/common";
const services = [
  { id: 1, code: "S001", name: "Haircut", rate: 100, status: "Active" },
  { id: 2, code: "S002", name: "Beard Trim", rate: 50, status: "Active" },
  { id: 3, code: "S003", name: "Shave", rate: 75, status: "Inactive" }
];
export default function Page() {
  return (
    <Card title="Service Master">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <Input label="Service Code" placeholder="Enter service code" />
        <Input label="Service Name" placeholder="Enter service name" />
        <Input label="Rate" type="number" placeholder="Enter rate" />

        <Select label="Status">
          <option>Active</option>
          <option>Inactive</option>
        </Select>
      </div>

      <div className="flex gap-3 mb-6">
        <Button>Save</Button>
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
            {services.map((item) => (
              <tr key={item.id} className="border-t border-slate-200 hover:bg-slate-50">
                <td className="px-4 py-3">{item.code}</td>
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3 text-right">₹ {item.rate}</td>
                <td className="px-4 py-3 text-center">
                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                    {item.status}
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