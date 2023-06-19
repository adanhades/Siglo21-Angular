import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from 'src/app/interfaces/auth.interfaces';

@Pipe({ name: 'UserSearchPipe', pure: false })
export class UserSearchPipe implements PipeTransform {
  transform(value:any, args?:any) {
    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter((user:Usuario) => {
        if (user.nombres) {
          return user.nombres.search(searchText) !== -1;
        }
        else{
          return user.username.search(searchText) !== -1;
        }
      });
    }
  }
}