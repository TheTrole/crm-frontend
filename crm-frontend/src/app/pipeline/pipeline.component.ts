import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { PipelineContactsService } from 'src/app/services/pipeline-contacts.service';
import { PipeType } from 'src/app/models/utils';

@Component({
  selector: 'app-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrls: ['./pipeline.component.css']
})
export class PipelineComponent implements OnInit {
  PipeType = PipeType;

  opportunityContacts: Contact[] = [];
  proposalContacts: Contact[] = [];
  followUpContacts: Contact[] = [];

  constructor(private pipelineService: PipelineContactsService) {}

  ngOnInit() {
    this.pipelineService.getOpportunity().subscribe(data =>{
      if(!data)
        return [];
      data.forEach(element => {
        const contact: Contact = {
          _id: element._id,
          name:element.name,
          flag:element.flag,
          date: element.date.toString()
        }
        this.opportunityContacts.push(contact);
      });
    })

    this.pipelineService.getProposal().subscribe(data =>{
      if(!data)
        return [];
      data.forEach(element => {
        const contact: Contact = {
          _id: element._id,
          name:element.name,
          flag:element.flag,
          date: element.date.toString()
        }
        this.proposalContacts.push(contact);
      });
    })

    this.pipelineService.getFollowUp().subscribe(data =>{
      if(!data)
        return [];
      data.forEach(element => {
        const contact: Contact = {
          _id: element._id,
          name:element.name,
          flag:element.flag,
          date: element.date.toString()
        }
        this.followUpContacts.push(contact);
      });
    })
  }
}

// export interface Contact{
//   name:string,
//   flags:string[],
//   date:string   
// }