import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { FhirClientService } from '../services/fhirclient-service/fhir-client.service';
import { switchMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const fhirClientService = inject(FhirClientService);

  return fhirClientService.getClient().pipe(
    switchMap((client) => {
      if (!client) {
        return next(req);
      }
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${client.state.tokenResponse?.access_token}`,
        },
      });
      return next(req);
    }),
  );
};
