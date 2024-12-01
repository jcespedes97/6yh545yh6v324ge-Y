import { Injectable } from '@angular/core';
import { oauth2 as SmartClient } from 'fhirclient';
import {
  BehaviorSubject,
  firstValueFrom,
  from,
  Observable,
  of,
  skipWhile,
  switchMap,
} from 'rxjs';
import { environment } from '../../../environments/environment';
import Client from 'fhirclient/lib/Client';
import { Patient } from 'fhir/r4';

@Injectable({
  providedIn: 'root',
})
export class FhirClientService {
  private fhirClient: BehaviorSubject<Client | null> =
    new BehaviorSubject<Client | null>(null);
  private serverUrl: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  public serverUrl$ = this.serverUrl.asObservable();

  authorize(loginType: string = '') {
    console.log('AUTHORIZING');
    const auth = environment.smartAuth;
    SmartClient.authorize({
      clientId: auth.clientId,
      scope: auth.fhirScope,
      redirectUri: `${auth.redirectUri}/${loginType}`,
    }).then(() => {
      console.log('Authorized');
    });
  }

  readyClient() {
    SmartClient.ready()
      .then((client: Client) => {
        this.fhirClient.next(client);
        this.serverUrl.next(client.getState('serverUrl'));
      })
      .catch((error: any) => {
        // this.utilsService.showErrorNotification(
        //   'Error getting the client ready',
        // );
        console.error(error);
      });
  }

  public getClient(): Observable<Client | null> {
    return this.fhirClient.asObservable();
  }

  public async getClientAsync(): Promise<Client | null> {
    return firstValueFrom(
      this.fhirClient.pipe(
        skipWhile((client) => client === null),
        switchMap(() => {
          return this.fhirClient.asObservable();
        }),
      ),
    );
  }

  public getPatient(): Observable<Patient | null> {
    return this.getClient().pipe(
      switchMap((client) => {
        if (client == null) {
          return of(null);
        }
        return from(client.patient.read());
      }),
    );
  }
}
