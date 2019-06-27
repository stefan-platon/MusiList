import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { UserDetailsComponent } from '../user-details/user-details.component';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [UserService]
})

export class UserListComponent implements OnInit {

  users: User[]
  selectedUser: User

  constructor(private UserService: UserService) { }

  ngOnInit() {
     this.UserService
      .getUsers()
      .then((users: User[]) => {
        this.users = users.map((user) => {
          if (!user.phone) {
            user.phone = {
              mobile: '',
              work: ''
            }
          }
          return user;
        });
      });
  }

  private getIndexOfUser = (userId: String) => {
    return this.users.findIndex((user) => {
      return user._id === userId;
    });
  }

  selectUser(user: User) {
    this.selectedUser = user
  }

  createNewUser() {
    var user: User = {
      firstName: '',
      lastName: '',
      email: '',
      phone: {
        work: '',
        mobile: ''
      }
    };

    this.selectUser(user);
  }

  deleteUser = (userId: string) => {
    var index = this.getIndexOfUser(userId);
    if (index !== -1) {
      this.users.splice(index, 1);
      this.selectUser(null);
    }
    return this.users;
  }

  addUser = (user: User) => {
    this.users.push(user);
    this.selectUser(user);
    return this.users;
  }

  updateUser = (user: User) => {
    var index = this.getIndexOfUser(user._id);
    if (index !== -1) {
      this.users[index] = user;
      this.selectUser(user);
    }
    return this.users;
  }
}