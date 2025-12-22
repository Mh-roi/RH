//const commonAppURI: string = 'https://digicop.gov.bf';

// The list of file replacements can be found in `angular.json`.
const commonAppURI: string = 'http://localhost:8080';

const commonAuth: string = 'http://localhost:8080/api/auth';

export const domaineUrl = 'http://localhost:4200';
// export const domaineUrl="http://localhost:4200";
//export const baseUrl = 'http://10.65.12.78:8080/api';
export const baseUrl = 'http://10.65.12.129:8080/api/dashboard';
// export const baseUrl="http://localhost:8080/evaluation/api";
// export const baseUrl="http://192.168.0.102:8080/evaluation/api";
export const environment = {
    production: false,
    recordsPerPage: 100,

    userUrl: commonAuth + 'utilisateurs',
    profilUrl: commonAuth + 'profiles',
    privilegeUrl: commonAuth + 'privileges',

    accountResource: commonAuth + 'utilisateurs/validate',

    dashbordUrl: commonAppURI + 'reports',
    profilResource: `${baseUrl}/auth/profils/list`,
    profilResource2: `${baseUrl}/auth/profils`,
    agentRessource:commonAuth + 'agents',
    profilAgentResource: `${baseUrl}/type-agents`,
    authResource: `${baseUrl}/auth`,
    resetInitResource: `${baseUrl}/auth/users/reset-password/request`,
    resetFinishResource: `${baseUrl}/auth/users/reset-password/confirm`,
    activateAccountResource: `${baseUrl}/activate-account`,
    changePassword: `${baseUrl}/account/change-password`,
    fonctionnaireResource: `${baseUrl}/fonctionnaires`,
    critereResource: `${baseUrl}/criteres`,
    critereProfilResource: `${baseUrl}/criteres/profil`,
    categorieResource: `${baseUrl}/categories`,
    ministereInstitutionResource: `${baseUrl}/ministeres`,
    fichesPosteResource: `${baseUrl}/fiche-postes`,
    fileResource: `${baseUrl}/resource`,
    fileUrl: `${baseUrl}/files`,
    activiteResourceAgent: `${baseUrl}/activites/matricule/`,
    activiteResource: `${baseUrl}/activites`,
    aproposResource: `${baseUrl}/apropos`,
    activerCompteMinistre: `${baseUrl}/fonctionnaires/admin/generate-code`,
    changeAffiliationResource: `${baseUrl}/fonctionnaires/change-affiliation`,
    rejeterFonctionnaireResource: `${baseUrl}/fonctionnaires/rejeter/`,
    verifierAffiliationResource: `${baseUrl}/fonctionnaires/get-superieur`,
    mesAgentsResource: `${baseUrl}/fonctionnaires/agents`,
    mesNotesResource: `${baseUrl}/notes/mes_notes`,
    notesAgentsResource: `${baseUrl}/notes/notes_agents`,
    noteOfficeResource: `${baseUrl}/notes/office`,
    noteCouranteResource: `${baseUrl}/notes/noteCourante`,
    noteSuperieurProposer: `${baseUrl}/notes/superieur/proposer`,
    updateNoteSuperieur: `${baseUrl}/notes/superieur/update`,
    genererCodeResource: `${baseUrl}/fonctionnaires/generate-code`,
    afficherCodeResource: `${baseUrl}/fonctionnaires/mon-code`,
    noteAgentProposer: `${baseUrl}/notes/agent/proposer`,
    noteUpdateResource: `${baseUrl}/notes`,
    printNoteResource: `${baseUrl}/download`,
    noteActiviteResource: `${baseUrl}/activites/note-activite`,
    acceptNoteResource: `${baseUrl}/notes/accepter`,
    rejectNoteResource: `${baseUrl}/notes/rejeter`,
    statMoyRessource: `${baseUrl}/notes/`,
    periodeResources: `${baseUrl}/periodes`,
    statistique: `${baseUrl}/statistiques/agentStat`,
    fonctionResourceAgent: `${baseUrl}/fonctions`,

    activiteSupResources: `${baseUrl}/activites/matricule/`,

    propositionActResources: `${baseUrl}/activites/superieur/proposer/`,

    modifierActResources: `${baseUrl}/activites/superieur/modifier/`,

    statRessource: `${baseUrl}/statistiques/`,
    utilisateurUrl: `${commonAuth}/users`,

    parametreResource: `${baseUrl}/fp-parameters`,

    AgentResource: `${baseUrl}/agents`,
    AgentResources: `${baseUrl}/agents/matricule`,
    rejeterAgentResource: `${baseUrl}/agents/rejeter`,

    connectedUserUrl: `${commonAuth}/connected-user`,

    mesAgentsBySuperieurUrl: `${baseUrl}/agents/list/by-superieur`,

    structureResource: `${baseUrl}/structures`,
    ficheResource: `${baseUrl}/fiches`,
    fonctionResource: `${baseUrl}/fonctions`,
    emploiResource: `${baseUrl}/emplois`,
    ReclamationResource: `${baseUrl}/reclamations`,
    rapportResource: `${baseUrl}/rapport`,

    indicateurResource: `${baseUrl}/indicateurs`,
    //recordsPerPage: 10,
};
