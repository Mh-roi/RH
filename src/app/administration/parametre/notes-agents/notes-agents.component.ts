import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, LazyLoadEvent, Message, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CURRENT_PAGE } from 'src/app/shared/constants/pagination.constants';
import { Critere } from 'src/app/shared/model/critere';
import { Fonctionnaire } from 'src/app/shared/model/fonctionnaire';
import { Note } from 'src/app/shared/model/note';
import { NoteService } from 'src/app/shared/service/note.service';
import { TokenStorageService } from 'src/app/shared/service/token-storage.service';
import { environment } from 'src/environments/environment';
import { AfficherNoteComponent } from '../mes-notes/afficher-note/afficher-note.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ModifierNoteComponent } from '../mes-notes/modifier-note/modifier-note.component';

@Component({
  selector: 'app-notes-agents',
  templateUrl: './notes-agents.component.html',
  styleUrls: ['./notes-agents.component.scss']
})
export class NotesAgentsComponent {
  @Input() enableCreate!: boolean;
  @Output() creates: EventEmitter<any> = new EventEmitter();
  isLoggedIn = false;
  note!: Note;
  matricule?:string;
  saveSuccess: boolean = false;
  message: any;
  // code: boolean = false;
  notes: Note[]=[];
  listcriteres: Critere[] = [];
  isLoading: boolean = false;
  // submitted!: boolean;
  // showDialog: boolean = false;
  // showDialogAgent: boolean = false;
  // checked: boolean = false;
  selection: any;
  fonctionnaire!: Fonctionnaire;
  form?: NgForm;
  isOpInProgress: boolean = false;
  isDialogOpInProgress: boolean = false;
  enableBtnInfo = true;
  enableBtnEdit = true;
  enableBtnDelete = true;
  enableBtnDownload = true;
  enableBtnAccepter = true;
  noteAvecCriteres: Note = {};
  filtreLibelle: string | undefined;
  recordsPerPage = environment.recordsPerPage;
  totalRecords!: number;
  dynamicForm!: FormGroup;
  myFormGroup: FormGroup = new FormGroup({});
  timeoutHandle: any;
  dialogErrorMessage: any;
  page = CURRENT_PAGE;
  predicate!: string;
  ascending!: boolean;
  reverse: any;

  constructor(
    private tokenStorageService: TokenStorageService,
    private noteService: NoteService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.matricule = user.matricule;
    }
    this.load();
  }

  load(): void {
    const req = this.buildReq();
    this.noteService.query(req).subscribe(result => {
      if (result && result.body) {
        this.totalRecords = Number(result.headers.get('X-Total-Count'));
        // console.log("======= result ========== notes agents ===== ", result);
        this.notes = result.body || [];
        console.log("========== notes agents ===== ", this.notes);
      }
    });
  }

  // load(event?: LazyLoadEvent) {
  //   this.isLoading = true;
  //   this.noteService.getNotesAgents(event).subscribe(response => {
  //     this.isLoading = false;
  //     this.notes = response.notes;
  //     this.totalRecords = this.notes.length;
  //   }, error => {
  //     this.isLoading = false;
  //     this.message = { severity: 'error', summary: error.error };
  //     console.error(JSON.stringify(error));
  //   });
  // }

  filtrer(): void {
    this.load();
  }

  resetFilter(): void {
    this.filtreLibelle = undefined;
    this.filtrer();
  }

  loadPage(event:any): void {
    if(event){
      this.page = event.first/event.rows + 1; 
      this.recordsPerPage = event.rows;
    }
    this.transition();
  }

  transition(): void {
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute.parent,
      queryParams: {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc'),
      },
    });
    this.load();
  }

  sortMethod(): string[] {
    this.predicate = 'id';
    this.reverse = true;
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    return result;
  }

  buildReq(): any {
    let req = {
      page: this.page -1,
      size: this.recordsPerPage,
      sort: this.sortMethod(),
    };
    let obj : any;
    if (this.filtreLibelle) {
      obj = {};
      obj['libelle.contains'] = this.filtreLibelle;
      req = Object.assign({}, req, obj);
    }
    return req;
  }

  openModalAfficheNote(note:Note): void {
    this.dialogService.open(AfficherNoteComponent, {
      header: 'Affichage des détails de la note',
      width: '60%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: note
    });
  }

  onEdit(note:Note): void {
    this.dialogService.open(ModifierNoteComponent, {
      header: 'Modification de la note',
      width: '60%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      closable: true,
      data: note
    }).onClose.subscribe(result => {
      if(result){
        this.isDialogOpInProgress = false;
        this.load();
        this.showMessage({ severity: 'success', summary: 'Note modifiée avec succès !' });
      }
    });
  }

  onAcceptNote(note?: Note) {
    if (note) this.selection = note;
    this.note = Object.assign({}, this.selection);
    this.confirmationService.confirm({
      message: 'Etes-vous sûr de vouloir valider cette note ?',
      acceptLabel:"Oui",
      rejectLabel:"Non",
      accept: () => {
        this.acceptNote(note);
      }
    });
  }

  acceptNote(note?: Note) {
    this.noteService.acceptNote(note!).subscribe(data => {
      this.note = data;
      this.messageService.add({severity:'success', summary: 'Succès', detail: 'Vous avez validé la note avec succès !', life: 3000});
      this.load();
    }, 
    error => {
      this.messageService.add({severity:'error', summary: 'Erreur', detail: error.summary, life: 3000});
      // this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  onPrintNote(note?: Note){
    if (note) this.selection = note;
    this.note = Object.assign({}, this.selection);
    this.printNote(note?.fonctionnaire?.matricule!, note?.annee);
  }

  printNote(matricule: string, annee: any){
    this.noteService.printNote(matricule, annee).subscribe((response: any) => {

      // creer le fichier pdf de la note puis construire son url et l'ouvrir dans un nouvel onglet du navigateur
      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  // // Suppression
  // onDelete(note: Note) {
  //   this.confirmationService.confirm({
  //     message: 'Etes-vous sur de vouloir supprimer cette note ?',
  //     accept: () => {
  //       this.delete(note);
  //     }
  //   });
  // }

  // delete(selection: any) {
  //   this.isOpInProgress = true;
  //   this.noteService.delete(selection.id).subscribe(() => {
  //     this.notes = this.notes.filter(note => note.id !== selection.id);
  //     selection = null;
  //     this.isOpInProgress = false;
  //     this.totalRecords--;
  //     this.showMessage({
  //       severity: 'success',
  //       summary: 'note supprimée avec succès',
  //     });
  //   }, (error) => {
  //     console.error("note " + JSON.stringify(error));
  //     this.isOpInProgress = false;
  //     this.showMessage({ severity: 'error', summary: error.error.message });
  //   });
  // }

  handleError(error: HttpErrorResponse) {
    console.error(`Processing Error: ${JSON.stringify(error)}`);
    this.isDialogOpInProgress = false;
    this.dialogErrorMessage = error.error.message;
  }

  showMessage(message: Message) {
    this.message = message;
    this.timeoutHandle = setTimeout(() => {
      this.message = null;
    }, 5000);
  }

  clearDialogMessages() {
    this.dialogErrorMessage = null;
  }

  get idFonctionnaire() { return this.dynamicForm.get('idFonctionnaire'); }
  get f() { return this.dynamicForm.controls; }
  get t() { return this.f['criteres'] as FormArray; }
  get critereGroup() { return this.t.controls as FormGroup[]; }

}
