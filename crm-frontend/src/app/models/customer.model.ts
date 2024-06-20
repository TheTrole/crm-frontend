export interface Customer {
    _id: string,
    name: string;
    type: 'Opportunity' | 'Proposal' | 'FollowUp';
    address?: string;
    date?: Date;
    flag:string[];
    email?: string;
}