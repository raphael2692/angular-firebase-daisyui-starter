import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

interface CatImage {
  url: string;
  width: number;
  height: number;
}

@Injectable({
  providedIn: 'root'
})
export class CatsService {
  private apiUrl: string = 'https://api.thecatapi.com/v1/images/search';
  private key: string = environment.catApiKey;

  constructor(private http: HttpClient) { }

  async getCatImageUrl(): Promise<string> {
    return this.http.get<CatImage[]>(`${this.apiUrl}?api_key=${this.key}`).toPromise()
      .then(response => {
        if (response && response.length > 0) {
          return response[0].url;
        } else {
          throw new Error('No cat image found in the response');
        }
      });
  }
}