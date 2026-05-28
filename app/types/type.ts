
export interface ServiceMaster {
  serviceMasterId: number;
  serviceCode: string;
  serviceName: string;
  description?: string | null;
  price: number;
  rate: number;
  isActive: boolean;
  createdAt: Date;
}

export interface ServiceEntry {
  serviceEntryId: number;
  customerName: string;
  mobileNumber?: string | null;
  entryDate: Date;
  serviceItems : ServiceItem[];
  remarks?: string | null;  
}



export interface ServiceItem {
  serviceItemId: number;
  serviceMasterId: number;
  discount: number;
  netAmount: number;
  serviceEntryId: number;
  serviceMaster : ServiceMaster | null;
  remarks?: string | null;

   }

export interface ServiceFormdata {
  serviceEntryId: number;
  customerName: string;
  mobileNumber?: string | null;
  entryDate: Date;
  serviceItem : ServiceItem;
  remarks?: string | null;  
}
