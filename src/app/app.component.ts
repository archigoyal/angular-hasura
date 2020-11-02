import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs' ;
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

interface Task{
  uuid: string;
  title: string;
  description: string;
  user: User;
}

interface  User{
  uuid: string;
  displayNAme: string;
}

interface Response {
  tasks: Task[];
}

const GET_TASKS= gql `
query MyQuery {
  tasks {
    uuid
    title
    description
    user {
      fullName
      uuid
    }
  }
}


`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-tut';

  tasks$: Observable<Task[]>;

  constructor(private apollo: Apollo){

  }
  ngOnInit(): void {
    this.tasks$=this.apollo
    .watchQuery<Response>({
      query: GET_TASKS,
    })
    .valueChanges.pipe(map((result) => result.data.tasks));
  }

}
