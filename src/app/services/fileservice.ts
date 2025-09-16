import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}

  downloadFile(url: string): Observable<Blob> {
    return this.http.get(url, { responseType: 'blob' });
  }

  getUrlVariables(url: string = window.location.href): Record<string, string | string[]> {
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    const variables: Record<string, string | string[]> = {};

    for (const [key, value] of params.entries()) {
      // If a key has multiple values (e.g., ?size=M&size=L), store them as an array
      if (params.getAll(key).length > 1) {
        variables[key] = params.getAll(key);
      } else {
        variables[key] = value;
      }
    }
    return variables;
  }
}
