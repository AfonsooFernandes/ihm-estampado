import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface User {
  id: number;
  email: string;
  password: string;
  morada: string;
  nome: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [
    { id: 1, nome:'Pedro' ,email: 'pedro@gmail.com', password: 'password', morada:'morada'}
  ];

  constructor() { }

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  getUserByEmailAndPassword(email: string, password: string): Observable<User | null> {
    return of(this.users.find(user => user.email === email && user.password === password) || null).pipe(
      catchError(() => of(null))
    );
  }

  addUser(nome:string, email: string, password: string, morada: string): Observable<User> {
    const newUser: User = {
      id: this.users.length > 0 ? Math.max(...this.users.map(user => user.id)) + 1 : 1,
      nome,
      email,
      password,
      morada,
    };
    this.users.push(newUser);
    return of(newUser);
  }
}
