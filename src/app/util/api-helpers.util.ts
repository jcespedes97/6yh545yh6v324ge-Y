import {environment} from '../../environments/environment';
import {BaseResourcePath} from '../models/app.constants';

export function getResourceUrl(resourcePrefix: string): string {
  return `${environment.ApiHost}${BaseResourcePath}${resourcePrefix}`
}
