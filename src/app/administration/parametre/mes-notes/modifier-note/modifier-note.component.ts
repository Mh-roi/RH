import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { LazyLoadEvent, Message, MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ICritere } from 'src/app/shared/model/critere';
import { Fonctionnaire } from 'src/app/shared/model/fonctionnaire';
import { CritereNote, Notation, Note, NoteSuperieur } from 'src/app/shared/model/note';
import { CritereService } from 'src/app/shared/service/critere.service';
import { NoteService } from 'src/app/shared/service/note.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modifier-note',
  templateUrl: './modifier-note.component.html',
  styleUrls: ['./modifier-note.component.scss']
})
export class ModifierNoteComponent {

  @Input() data: Note = new Notation();
  dynamicForm!: FormGroup;
  listcriteres: ICritere[] = [];
  fonctionnaire: Fonctionnaire = {};
  notes: NoteSuperieur[] = [];
  note: Note = new Notation();
  myFormGroup: FormGroup = new FormGroup({});
  isOpInProgress: boolean = false;
  isDialogOpInProgress: boolean = false;
  message: any;
  dialogErrorMessage: any;
  timeoutHandle: any;
  annee: number;
  years: number[] = [];

  constructor(private noteService: NoteService,
              private critereService: CritereService, 
              private messageService: MessageService, 
              private fb: FormBuilder,
              private dialogRef: DynamicDialogRef,
              private dynamicDialog:  DynamicDialogConfig) {
    this.annee = new Date().getFullYear();
    for(let year = this.annee; year >= this.annee-9; year --) {
      this.years.push(year);
    }
  }

  ngOnInit(): void {
    if (this.dynamicDialog.data) {
      this.note = cloneDeep(this.dynamicDialog.data);
      this.loadCritere(this.note.fonctionnaire?.profil?.id!);
    }

    this.dynamicForm = this.fb.group({
      observation: [''],
      pointDivergeance: [''],
      contraintesRealisation: [''],
      tauxActivite: [''],
      idFonctionnaire: [''],
      idNote: [''],
      annee: [''],
      criteres: new FormArray([]),
    });
  }

  save() {
    this.dynamicForm.patchValue({
      idFonctionnaire: this.note.fonctionnaire?.id,
      idNote: this.note.id,
      // annee: this.note.annee,
    });

    this.isDialogOpInProgress = true;
    this.noteService.updateNote(this.dynamicForm.value, this.note.id!).subscribe(response => {
      this.dialogRef.close(response);
      this.dialogRef.destroy();
      this.isDialogOpInProgress = false;
      this.showMessage({ severity: 'success', summary: 'Note modifiée avec succès !' });
    }, 
    error => {
      this.handleError(error);
      this.showMessage({ severity: 'error', summary: error.error.message });
    } );

  }
  

  loadCritere(idFonc: number, event?: LazyLoadEvent) {
    // this.t.clear();
    this.critereService.queryForNote(idFonc, event).subscribe(response => {
      this.listcriteres = response.body!;
      if(this.listcriteres.length>0){
        for(let i=0;i<this.listcriteres.length;i++){
          this.t.push(this.fb.group({
            id: this.listcriteres[i].id,
            note: ['', [Validators.required]]
          }))
        }
      }
    }, error => {
      console.error(JSON.stringify(error));
    });

  }

  showMessage(message: Message) {
    this.message = message;
    this.timeoutHandle = setTimeout(() => {
      this.message = null;
    }, 5000);
  }

  handleError(error: HttpErrorResponse) {
    console.error(`Processing Error: ${JSON.stringify(error)}`);
    this.isDialogOpInProgress = false;
    this.dialogErrorMessage = error.error.message;
  }

  clearDialogMessages() {
    this.dialogErrorMessage = null;
  }

  get idFonctionnaire() { return this.dynamicForm.get('idFonctionnaire'); }
  get f() { return this.dynamicForm.controls; }
  get t() { return this.f['criteres'] as FormArray; }
  get critereGroup() { 
    return this.t.controls as FormGroup[]; 
  }

}
