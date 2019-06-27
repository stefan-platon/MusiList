import { Injectable } from '@angular/core';
import { User } from './user';
import { Http, Response } from '@angular/http';

@Injectable()
export class UserService {
    private userUrl = '/api/user';

    constructor (private http: Http) {}

    // get("/api/user")
    getUsers(): Promise<void | User[]> {
      return this.http.get(this.userUrl)
                 .toPromise()
                 .then(response => response.json() as User[])
                 .catch(this.handleError);
    }

    // post("/api/user")
    createUser(newUser: User): Promise<void | User> {
      return this.http.post(this.userUrl, newUser)
                 .toPromise()
                 .then(response => response.json() as User)
                 .catch(this.handleError);
    }

    // get("/api/user/:id") endpoint not used by Angular app

    // delete("/api/user/:id")
    deleteUser(delUserId: String): Promise<void | String> {
      let deleteUrl = this.userUrl + '/' + delUserId;
      return this.http.delete(deleteUrl)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/user/:id")
    updateUser(putUser: User): Promise<void | User> {
      let putUrl = this.userUrl + '/' + putUser._id;
      return this.http.put(putUrl, putUser)
                 .toPromise()
                 .then(response => response.json() as User)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}