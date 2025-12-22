import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MessageService, LazyLoadEvent, Message } from 'primeng/api';
import { CURRENT_PAGE } from 'src/app/shared/constants/pagination.constants';
import { Critere } from 'src/app/shared/model/critere';
import { Fonctionnaire } from 'src/app/shared/model/fonctionnaire';
import { Note } from 'src/app/shared/model/note';
import { CritereService } from 'src/app/shared/service/critere.service';
import { FonctionnaireService } from 'src/app/shared/service/fonctionnaire.service';
import { NoteService } from 'src/app/shared/service/note.service';
import { TokenStorageService } from 'src/app/shared/service/token-storage.service';
import { environment } from 'src/environments/environment';
import { AfficherNoteComponent } from './afficher-note/afficher-note.component';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mes-notes',
  templateUrl: './mes-notes.component.html',
  styleUrls: ['./mes-notes.component.scss']
})
export class MesNotesComponent {
  @Input() enableCreate!: boolean;
  isLoggedIn = false;
  username?: string;
  note!: Note;
  matricule?:string;
  saveSuccess: boolean = false;
  message: any;
  code: boolean = false;
  notes: Note[]=[];
  isLoading: boolean = false;
  submitted!: boolean;
  showDialog: boolean = false;
  showDialogAgent: boolean = false;
  checked: boolean = false;
  selection: any;
  
  listcriteres: Critere[] = [];
  fonctionnaire!: Fonctionnaire;
  form?: NgForm;
  isOpInProgress: boolean = false;
  isDialogOpInProgress: boolean = false;
  enableBtnInfo = true;
  enableBtnEdit = true;
  enableBtnDelete = true;
  enableBtnPrint = true;
//  enableCreate = false;
  enableBtnDownload = true;
  enableBtnAccepter = true;
  enableBtnRejeterNote = true;
  noteRejetee: boolean = false;
  anneeCourante: Date = new Date();
  noteC! : Note;
  noteAvecCriteres: Note = {};
  noteActivite!: number;
  filtreLibelle: string | undefined;
  // recordsPerPage = environment.recordsPerPage;
  totalRecords!: number;
  critere: Critere = {};
  template: any = [];
  dynamicForm!: FormGroup;
  myFormGroup: FormGroup = new FormGroup({});
  timeoutHandle: any;
  dialogErrorMessage: any;
  recordsPerPage = environment.recordsPerPage;
  page = CURRENT_PAGE;
  predicate!: string;
  ascending!: boolean;
  reverse: any;

  @Output() creates: EventEmitter<any> = new EventEmitter();
  constructor(
    private tokenStorageService: TokenStorageService,
    private noteService: NoteService,
    private fonctionnaireService: FonctionnaireService,
    private critereService: CritereService, 
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialogService: DialogService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.matricule = user.matricule;
    }
    
    this.load();

    // this.dynamicForm = this.fb.group({
    //   observation: [''],
    //   pointDivergeance: [''],
    //   contraintesRealisation: [''],
    //   annee: [new Date().getFullYear()],
    //   okSuperieur: [true],
    //   okAgent: [false],
    //   idFonctionnaire: [''],
    //   criteres: new FormArray([]),
    // });

    this.getFonctionnaire(this.matricule!);
    // this.loadCritere(); 
  }

  onInfo(selection:any){
    console.log(selection);
  }

  filtrer(): void {
    this.load();
  }

  fireCreate() {
    this.creates.emit();
  }

  // loadAll(): void {
  //   const req = this.buildReq();
  //   this.noteService.query(req).subscribe(result => {
  //     if (result && result.body) {
  //       this.totalRecords = Number(result.headers.get('X-Total-Count'));
  //       this.notes = result.body || [];
  //     }
  //   });
  // }

  
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

  sortMethod(): string[] {
    this.predicate = 'id';
    this.reverse = true;
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    return result;
  }

  resetFilter(): void {
    this.filtreLibelle = undefined;
    this.filtrer();
  }

  getFonctionnaire(matricule: string){
    this.fonctionnaireService.getFonctionnaireConnecte(matricule).subscribe(
      data => {
        this.fonctionnaire = data;
             },
      err => {
        this.message = err.message;
      }
    );
  }

  getNoteCourante(){
    this.getFonctionnaire(this.matricule!);
    this.noteService.getNoteCourante(this.fonctionnaire.id!).subscribe(response => {
      this.noteC = response;
    }, 
    error => {
        this.message = {severity: 'error', summary: error.error};
        console.error(JSON.stringify(error));
        
    });
  }

  load(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.noteService.getAllNote(event).subscribe(response => {
      this.isLoading = false;
      this.notes = response.notes;
      this.totalRecords = this.notes.length;
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  viewNote(note?: Note) {
    if (note) this.selection = note;
    this.note = Object.assign({}, this.selection);

    this.noteService.getCritereNote(this.note).subscribe(data => {
      this.noteAvecCriteres = data;
    }, 
    error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });

    this.noteService.getNoteActivite(this.matricule!, note?.annee).subscribe(data =>{
      this.noteActivite = data as number;
    }, 
    error =>{
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });

    this.showDialog = true;
  }

  onPrintNote(note?: Note){
    if (note) this.selection = note;
    this.note = Object.assign({}, this.selection);
    this.printNote(this.matricule!, note?.annee);
  }

  printNote(matricule: string, annee: any){
    this.noteService.printNote(matricule, annee).subscribe((response: any) => {

      // creer le fichier pdf de la note puis construire son url et l'ouvrir dans un nouvel onglet du navigateur
      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  


  // loadCritere(event?: LazyLoadEvent) {
  //   // this.isLoading = true;
  //   this.critereService.findAll(event).subscribe(response => {
  //     // this.isLoading = false;
  //     this.listcriteres = response.body!;

  //     if(this.listcriteres.length>0){
  //       for(let i=0;i<this.listcriteres.length;i++){
  //         this.t.push(this.fb.group({
  //           id: this.listcriteres[i].id,
  //           note: ['', [Validators.required]]

  //         }))

  //       }

  //     }
  //     console.log("I have :",this.listcriteres);

  //   }, error => {
  //     console.error(JSON.stringify(error));
  //   });

  // }

  
  // save() {

  //   console.log("Mon Formulaire :", this.dynamicForm.value);

  //   if (this.idFonctionnaire) {
  //     this.create();

    
  //   } else {
  //     console.log("Veuillez selectionner un agent a noté !! ");

  //   }
  // }


  // onSubmit() {
  //   let noteData: any[] = [];
  //   console.log(this.myFormGroup.value);
  //   for (let i in this.dynamicForm.value.criteres) {
  //     noteData.push(this.dynamicForm.value.criteres[i].noteData)
  //   }
  // }


  // onCreate() {
  //   this.fonctionnaire = {};
  //   this.form?.resetForm();
  //   this.showDialogAgent = true;
  // }

  // create() {
  //   this.clearDialogMessages();
  //   this.isDialogOpInProgress = true;

  //   this.noteService.createNoteAgent(this.dynamicForm.value).subscribe(response => {
  //     if (this.notes.length !== this.recordsPerPage) {
  //       this.notes.push(response);
  //       this.notes = this.notes.slice();
  //       console.log("Hello Word: ", response);
  //     }
  //     this.totalRecords++;
  //     this.isDialogOpInProgress = false;
  //     this.showDialogAgent = false;
  //     this.messageService.add({severity:'success', summary: 'Succès', detail: 'Votre proposition de note a été prise en compte avec succès !', life: 3000});

  //   }, error => {
  //     this.handleError(error);
  //     this.messageService.add({severity:'error', summary: 'Erreur', detail: error.error.message, life: 4000});

  //   } );

  // }


  // onEdit(fonctionnaire?: Fonctionnaire) {
  //   if (fonctionnaire) this.selection = fonctionnaire;

  //   this.dynamicForm.patchValue({
  //     idFonctionnaire: this.selection?.id,
  //   });

  //   this.clearDialogMessages();
  //   this.fonctionnaire = Object.assign({}, this.selection);
  //   this.showDialogAgent = true;

  //   console.log("Fonctionnaire: ", fonctionnaire);
  // }

  // edit() {
  //   this.clearDialogMessages();
  //   this.isDialogOpInProgress = true;
  //   this.fonctionnaireService.update(this.fonctionnaire).subscribe(response => {
  //     let index = this.notes.findIndex(note => note.id === response.id);
  //     // this.fonctionnaires[index] = response;
  //     this.isDialogOpInProgress = false;
  //     this.showDialogAgent = false;
  //     this.showMessage({ severity: 'success', summary: 'MinistereInstitution agent modifié avec succes' });
  //   }, error => this.handleError(error));
  // }


  

  // onProposer() {
  //   this.dynamicForm.patchValue({
  //     idFonctionnaire: this.fonctionnaire!.id!,
  //   });

  //   this.clearDialogMessages();
  //   this.showDialogAgent = true;

  //   console.log("Fonctionnaire: ", this.fonctionnaire);
  // }

  // Errors

  handleError(error: HttpErrorResponse) {
    console.error(`Processing Error: ${JSON.stringify(error)}`);
    this.isDialogOpInProgress = false;
    this.dialogErrorMessage = error.error.message;
  }

  clearDialogMessages() {
    this.dialogErrorMessage = null;
  }

  showMessage(message: Message) {
    this.message = message;
    this.timeoutHandle = setTimeout(() => {
      this.message = null;
    }, 5000);
  }

  openModalAfficheNote(note:Note): void {
    this.dialogService.open(AfficherNoteComponent,
      {
        header: 'Affichage des détails de la note',
        width: '60%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        data: note
      });
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

  get idFonctionnaire() { return this.dynamicForm.get('idFonctionnaire'); }
  // get f() { return this.dynamicForm.controls; }
  // get t() { return this.f['criteres'] as FormArray; }
  // get critereGroup() { return this.t.controls as FormGroup[]; }
}
