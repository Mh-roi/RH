import { Component, Input } from '@angular/core';
import { cloneDeep } from 'lodash';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Fonctionnaire, IFonctionnaire } from 'src/app/shared/model/fonctionnaire';

@Component({
  selector: 'app-detail-agent',
  templateUrl: './detail-agent.component.html',
  styleUrls: ['./detail-agent.component.scss']
})
export class DetailAgentComponent {

    fonctionnaire: IFonctionnaire = new Fonctionnaire();
    @Input() data: IFonctionnaire = new Fonctionnaire();
  
    constructor(
      private dialogRef: DynamicDialogRef,
      private dynamicDialog:  DynamicDialogConfig,
  ) {}
  
    ngOnInit(): void {
      if (this.dynamicDialog.data) {
        this.fonctionnaire = cloneDeep(this.dynamicDialog.data);
      }
      }
  
      clear(): void {
        this.dialogRef.close();
        this.dialogRef.destroy();
    }

}
