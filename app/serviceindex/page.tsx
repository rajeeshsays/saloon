

"use client";

import { getAllEntries } from "../apiservice/api-service-service";
import Link from "next/link";
import { ServiceEntry } from "../types/type";
import {  useEffect, useState } from "react";





export default function Page() {

  let _serviceEntries : ServiceEntry[] =[] ;

  const [entries, setEntries] = useState<ServiceEntry[]>(_serviceEntries);

  
  function getTotal(entry: ServiceEntry) {
    return entry.serviceItems.reduce(
      (sum, item) => sum + item.netAmount,
      0
    );
  }

  useEffect(() => {
    getAllEntries().then((data) => {
      setEntries(data);
    });
  }, []);

  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full border-collapse">
        
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">#</th>
            <th className="p-3 text-left">Customer</th>
            <th className="p-3 text-left">Mobile</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Services</th>
            <th className="p-3 text-right">Total</th>
            <th className="p-3 text-left">Remarks</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {entries.map((entry, index) => (
            <tr
              key={entry.serviceEntryId}
              className="border-t hover:bg-gray-50"
            >
              <td className="p-3">{index + 1}</td>

              <td className="p-3 font-medium">
                {entry.customerName}
              </td>

              <td className="p-3">
                {entry.mobileNumber || "-"}
              </td>

              <td className="p-3">
                {new Date(entry.entryDate)
                  .toLocaleDateString()}
              </td>

              <td className="p-3">
                {entry.serviceItems.length}
              </td>

              <td className="p-3 text-right font-semibold">
                ₹ {getTotal(entry).toFixed(2)}
              </td>

              <td className="p-3">
                {entry.remarks || "-"}
              </td>

              <td className="p-3">
                <div className="flex gap-2 justify-center">
                  
                  <Link
                    href={`/service-entry/edit/${entry.serviceEntryId}`}
                    className="px-3 py-1 rounded bg-blue-500 text-white text-sm"
                  >
                    Edit
                  </Link>

                  <button
                    className="px-3 py-1 rounded bg-red-500 text-white text-sm"
                  >
                    Delete
                  </button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}









