
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
  voucherNo: string;
  entryDate: Date;
  customerName: string;
  totalAmount: number;
}

