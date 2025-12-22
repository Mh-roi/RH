import { Component, Input } from '@angular/core';
import { cloneDeep } from 'lodash';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { IPeriode, Periode } from 'src/app/shared/model/period';

@Component({
  selector: 'app-detail-period',
  templateUrl: './detail-period.component.html',
  styleUrls: ['./detail-period.component.scss']
})
export class DetailPeriodComponent {
  periode: IPeriode = new Periode();
  @Input() data: IPeriode = new Periode();

  constructor(
    private dialogRef: DynamicDialogRef,
    private dynamicDialog:  DynamicDialogConfig,
) {}

  ngOnInit(): void {
    if (this.dynamicDialog.data) {
      this.periode = cloneDeep(this.dynamicDialog.data);
    }
    }

    clear(): void {
      this.dialogRef.close();
      this.dialogRef.destroy();
  }
}
