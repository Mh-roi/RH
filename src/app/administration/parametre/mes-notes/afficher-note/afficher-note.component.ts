import { Component, Input } from '@angular/core';
import { cloneDeep } from 'lodash';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CritereNote, Notation, Note } from 'src/app/shared/model/note';

@Component({
  selector: 'app-afficher-note',
  templateUrl: './afficher-note.component.html',
  styleUrls: ['./afficher-note.component.scss']
})
export class AfficherNoteComponent {
 
  note: Note = new Notation();
  noteCritereList: CritereNote[] = [];
  ponderationActivite: number = 10;
  @Input() data: Note = new Notation();

  constructor(private dialogRef: DynamicDialogRef, private dynamicDialog:  DynamicDialogConfig) {}

  ngOnInit(): void {
    if (this.dynamicDialog.data) {
      this.note = cloneDeep(this.dynamicDialog.data);
      if (this.note.fonctionnaire?.profil?.code != "AG") { this.ponderationActivite = 12; }
      if(this.note.noteCritereList != null) { this.noteCritereList = this.note.noteCritereList; }
    }
  }

  clear(): void {
    this.dialogRef.close();
    this.dialogRef.destroy();
  }

}
