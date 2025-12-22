export enum EnumStatusReponse {
  CODE_200 = 200,
  CODE_404 = 404,
  CODE_500 = 500,
}

// export enum CategorieEmployeurEnum {
// 	Physique=0,
// 	Morale=1
// }
// export enum CategorieEmployeurEnum {
// 	false="Personne physique",
// 	true="Personne morale"
// }






export const MESSAGE_PAR_STATUS_REPONSE = {
  200: 'Opération effectuée avec succès',
  404: 'Donnée introuvable',
  500: 'Erreur système, veuillez contacter un administrateur',
};

/** Liste des sexes */
export const LISTE_SEXES = [
  { code: 'M', lib: 'MASCULIN' },
  { code: 'F', lib: 'FÉMININ' },
];


export const LISTE_STATUTS_USER = {
  0: 'INACTIF',
  1: 'ACTIF',
};

export enum EnumListeStatuts {
  INACTIF = 0,
  ACTIF = 1,
}

export const LISTE_FORMAT_FILE = [
  { format: 'PDF', libelle: 'PDF' },
  { format: 'EXCEL', libelle: 'EXCEL' },
];

export const LISTE_CATEGORIE = [
  { categorie: "ENTREPRISE_INDIVIDUELLE", lib: 'ENTREPRISE INDIVIDUELLE' },
  { categorie: "ADMINISTRATION", lib: 'ADMINISTRATION'},
  { categorie: "SOCIETE_COMMERCIALE", lib: 'SOCIETE COMMERCIALE'},
  { categorie: "ENTREPRISES_ASSOCIATIVES", lib: 'ENTREPRISES ASSOCIATIVES'},
  { categorie: "INDEPENDANTS", lib: 'INDEPENDANTS'},
  { categorie: "MENAGES", lib: 'MENAGES'},
  { categorie: "PENSIONNES", lib: 'PENSIONNES'}
 

]
