import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-apropos',
  templateUrl: './apropos.component.html',
  styleUrls: ['./apropos.component.scss']
})
export class AproposComponent {
  activeState: boolean[] = [true, false, false];

  constructor(private messageService: MessageService) {}

  onTabClose(event:any) {
      this.messageService.add({severity:'info', summary:'Tab Closed', detail: 'Index: ' + event.index})
  }
  
  onTabOpen(event:any) {
      this.messageService.add({severity:'info', summary:'Tab Expanded', detail: 'Index: ' + event.index});
  }

  toggle(index: number) {
      this.activeState[index] = !this.activeState[index];
  }
}
