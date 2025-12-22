import { Component, Input, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FPParameter, IFPParameter } from 'src/app/shared/model/fp-parameter';


@Component({
  selector: 'app-details-fp-parameter',
  templateUrl: './details-fp-parameter.component.html',
  styleUrls: ['./details-fp-parameter.component.scss']
})
export class DetailsFpParameterComponent implements OnInit {
  
  fPParameter: IFPParameter = new FPParameter();
  @Input() data: IFPParameter = new FPParameter();

  constructor(
    private dialogRef: DynamicDialogRef,
    private dynamicDialog:  DynamicDialogConfig,
) {}

  ngOnInit(): void {
    if (this.dynamicDialog.data) {
      this.fPParameter = cloneDeep(this.dynamicDialog.data);
    }
    }

    clear(): void {
      this.dialogRef.close();
      this.dialogRef.destroy();
  }
}
