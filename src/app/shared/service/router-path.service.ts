import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouterPathService {

  constructor() { }

  updatePath(path:String):any{
    console.log('path',path);
  }
}
