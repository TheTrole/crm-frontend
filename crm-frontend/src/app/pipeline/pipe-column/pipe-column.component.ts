import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input, OnInit, AfterViewInit, ViewChild, Renderer2 } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { PipelineContactsService } from 'src/app/services/pipeline-contacts.service';
import { PipeType } from 'src/app/models/utils';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-pipe-column',
  templateUrl: './pipe-column.component.html',
  styleUrls: ['./pipe-column.component.css']
})
export class PipeColumnComponent implements OnInit, AfterViewInit {
  @ViewChild('columnDiv') columnDiv!: ElementRef;
  @Input() color: string;
  @Input() title: string;
  @Input() type: PipeType;
  @Input() contacts: Contact[] = [];

  searchTerm = '';
  filteredContacts: Contact[] = [];
  total: string = '0';

  constructor(private renderer: Renderer2, private pipelineService: PipelineContactsService, private messageService:MessagesService) {}

  ngAfterViewInit(): void {
    this.setColor();
    this.updateFilteredContacts()
  }

  ngOnInit(): void {}

  setColor() {
    if (this.columnDiv && this.columnDiv.nativeElement) {
      let borderColor = 'grey';
      this.renderer.setStyle(this.columnDiv.nativeElement, 'border-top-color', `${this.color}`);
      this.renderer.setStyle(this.columnDiv.nativeElement, 'border-right-color', borderColor);
      this.renderer.setStyle(this.columnDiv.nativeElement, 'border-bottom-color', borderColor);
      this.renderer.setStyle(this.columnDiv.nativeElement, 'border-left-color', borderColor);
    }
  }

  drop(event: CdkDragDrop<Contact[]>) {
    const movedItem = event.previousContainer.data[event.previousIndex]
    if (event.previousContainer === event.container) { //Kada Ostane u istoj koloni
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {  //Kada se premesti u drugu kolonu
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.pipelineService.updateContacts(this.type, this.contacts,movedItem);
      
    }
    this.updateFilteredContacts();
  }

  onRemoveContact(contactToRemove: any) {
    this.contacts = this.contacts.filter(item => item !== contactToRemove);
    this.updateFilteredContacts()
  }

  getTotal(){
    return this.total;
  }

  updateFilteredContacts() {
    this.filteredContacts = [...this.contacts]; // Reset filtered contacts
    this.total = '' + this.filteredContacts.length;
    console.log({
      type: this.type,
      filtered: this.filteredContacts
    })
  }

  searchContacts(searchTerm: string) {
    this.searchTerm = searchTerm
    if (!searchTerm) {
      this.updateFilteredContacts();
      return;
    }
    searchTerm = searchTerm.toLowerCase();
    this.filteredContacts = this.contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm)
    );
    this.total = '' + this.filteredContacts.length;
  }

  isInQuery(name:string): boolean{
    let result = name.toLowerCase().includes(this.searchTerm.toLowerCase());
    return result;
  }

  bulkSend(){
    this.messageService.bulkSendMessages(this.type)
  }
}
