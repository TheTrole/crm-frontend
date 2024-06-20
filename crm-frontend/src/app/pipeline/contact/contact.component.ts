import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { PipelineContactsService } from 'src/app/services/pipeline-contacts.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  @Input()
  contact: Contact
  @Output() removeContact: EventEmitter<any> = new EventEmitter<any>();
  flagAddingEnabled = false;

  constructor(private pipeContactService:PipelineContactsService){}

  confirmDeleteContact() {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${this.contact.name}?`);
    if (confirmDelete) {
      this.onDeleteContact();
    }
  }

  onDeleteContact() {
    this.removeContact.emit(this.contact);
  }

  getDate(): string {
    const date = new Date(this.contact.date);
    const shortDate = date.toISOString().slice(0, 10);
    return shortDate
  }

  addFlag(flag:string){
    this.contact.flag.push(flag)
    this.pipeContactService.addFlag(this.contact,flag)
  }

  enableFlagAdding(){
    this.flagAddingEnabled = !this.flagAddingEnabled;
  }
}
