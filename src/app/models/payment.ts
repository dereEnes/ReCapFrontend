export interface Payment {
    id: number;
    cardNo: string;
    fullName: string;
    expityMonth: number;
    expityYear: number;
    amount: number;
    cvCode: number;
    customerEmail: string;
}
