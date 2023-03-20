import { Component, OnInit } from '@angular/core';


interface Todo {
  id:number,
  title:string,
  status:boolean
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})


export class TodoComponent implements OnInit {
  title: string = 'MyTodo';
  todos: Todo[] = [
    {"id":1,"title":"Do something nice for someone I care about","status":true,},
    {"id":2,"title":"Memorize the fifty states and their capitals","status":false},
    {"id":3,"title":"Watch a classic movie","status":false},
    {"id":4,"title":"Contribute code or a monetary donation to an open-source software project","status":true}
  ];
  currentId: number = 0;

  getTodos(): void {
    this.todos = JSON.parse(localStorage.getItem('todos') as string) || [];
    this.currentId = this.todos.length === 0 ? 1 : this.todos[this.todos.length - 1].id + 1;
  }
  addTodo(): void {
    this.getTodos();
    let todo: Todo = {
      id: this.currentId,
      title:this.title,
      status: false
    }
    this.todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(this.todos));
    this.title='';
  }
  changeStatus(id: number): void {
    let index: number = this.todos.findIndex((todo => todo.id === id));
    this.todos[index].status = !this.todos[index].status;
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
  deleteTodo(id: number): void {
    let index: number = this.todos.findIndex((todo => todo.id === id));
    this.todos.splice(index,1);
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
