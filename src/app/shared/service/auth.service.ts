import {
    HttpClient,
    HttpHeaders,
    HttpParams,
    HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IFonctionnaire } from '../model/fonctionnaire';
import { AuthenticationResponse, ILoginVM } from '../model/login-vm';

const resourceUrl = environment.authResource;
const resetInitUrl = environment.resetInitResource;
const resetFinishUrl = environment.resetFinishResource;
const activateAccountUrl = environment.activateAccountResource;
const activerCompteMinistreUrl = environment.activerCompteMinistre;

type EntityResponseType = HttpResponse<ILoginVM>;
type FonctionnaireResponseType = HttpResponse<IFonctionnaire>;
type EntityArrayResponseType = HttpResponse<ILoginVM[]>;

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient) {}

    login(request: ILoginVM): Observable<AuthenticationResponse> {
        return this.http.post<AuthenticationResponse>(
            `${resourceUrl}/authenticate`,
            request
        );
    }

    // resetInit(email: String): Observable<any> {
    //   return this.http.post(resetInitUrl, {email},{observe: 'response'});
    // }

    resetInit(email: string): Observable<any> {
        const body = { email: email }; // JSON
        return this.http.post(resetInitUrl, body, { observe: 'response' });
    }

    resetFinish(password: String, token: any): Observable<any> {
        const body = { newPassword: password, token: token }; // JSON
        return this.http.post(resetFinishUrl, body, { observe: 'response' });
    }

    activateAccount(request: IFonctionnaire): Observable<any> {
        return this.http.post<IFonctionnaire>(activateAccountUrl, request, {
            observe: 'response',
        });
    }

    activerCompteMinistre(request: IFonctionnaire): Observable<any> {
        return this.http.post<IFonctionnaire>(
            activerCompteMinistreUrl,
            request,
            { observe: 'response' }
        );
    }

    getConnectedUser(): Observable<any> {
        return this.http.get(`${environment.connectedUserUrl}`);
    }
}
