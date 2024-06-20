import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import { PipeType } from '../models/utils';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class PipelineContactsService {
  private apiUrl = 'http://localhost:3000/customers/';

  constructor(private http: HttpClient) { }

  private opportunityContacts: Contact[]
  // = [
  //   { date: '2024-06-17', name: 'Jane Doe', flags: ['Alliance', 'Partnership'] },
  //   { date: '2023-05-12', name: 'John Smith', flags: ['Sell', 'Expansion'] },
  //   { date: '2023-05-12', name: 'Black Jack', flags: ['Sell', 'Customer'] }
  // ];
  private proposalContacts: Contact[]
  // = [
  //   { date: '2024-06-17', name: 'Dave Davidson', flags: ['Alliance', 'Partnership'] },
  //   { date: '2023-05-12', name: 'Mike Tyson', flags: ['Sell', 'Expansion'] },
  //   { date: '2023-05-12', name: 'Jonny Bones', flags: ['Sell', 'Customer'] }
  // ];
  private followUpContacts: Contact[]
  // = [
  //   { date: '2024-06-17', name: 'Charles Darvin', flags: ['Alliance', 'Partnership'] },
  //   { date: '2023-05-12', name: 'Dave Mustine', flags: ['Sell', 'Expansion'] },
  //   { date: '2023-05-12', name: 'Dustin Proier', flags: ['Sell', 'Customer'] },
  //   { date: '2023-05-12', name: 'Connor Kanway', flags: ['Sell', 'Customer'] }
  // ];

  removeContact(type: PipeType, contact: Contact) {
    console.log("Remove")
    switch (type) {
      case PipeType.Opportunity:
        this.opportunityContacts = this.opportunityContacts.filter(c => c !== contact);
        break;
      case PipeType.Proposal:
        this.proposalContacts = this.proposalContacts.filter(c => c !== contact);
        break;
      case PipeType.FollowUp:
        this.followUpContacts = this.followUpContacts.filter(c => c !== contact);
        break;
    }
  }

  addContact(type: PipeType, contact: Contact) {
    console.log("Add")
    switch (type) {
      case PipeType.Opportunity:
        this.opportunityContacts.push(contact);
        break;
      case PipeType.Proposal:
        this.proposalContacts.push(contact);
        break;
      case PipeType.FollowUp:
        this.followUpContacts.push(contact);
        break;
    }
  }

  getOpportunity(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl + 'findByType/' + 'Opportunity');
  }

  getProposal(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl + 'findByType/' + 'Proposal');
  }

  getFollowUp(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl + 'findByType/' + 'FollowUp');
  }

  updateContacts(type: PipeType, contacts: Contact[], movedItem: Contact) {
    switch (type) {
      case PipeType.Opportunity:
        this.opportunityContacts = contacts;
        break;
      case PipeType.Proposal:
        this.proposalContacts = contacts;
        break;
      case PipeType.FollowUp:
        this.followUpContacts = contacts;
        break;
      default:
        console.log("Invalid PipeType");
        return;
    }
    this.http.patch(this.apiUrl + type, movedItem, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } }).subscribe((res) => {
      console.log("Updated");
    })
  }

  addFlag(contact: Contact, flag: string) {
    this.http.patch(this.apiUrl + 'addFlag/' + flag, contact, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } }).subscribe((res) => {
      console.log("Added Flag");
    })
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } });
  }
}