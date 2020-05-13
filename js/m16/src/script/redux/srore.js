let state = {
  posts: [
    {id: this.generateId(), name:'Вася', message:'Всем привет!', date: new Date},
    {id: this.generateId(), name:'Петя', message:'Всем привет!', date: new Date},
    {id: this.generateId(), name:'Коля', message:'Всем привет!', date: new Date},
    {id: this.generateId(), name:'Женя', message:'Всем привет!', date: new Date},
    {id: this.generateId(), name:'Миша', message:'Всем привет!', date: new Date},
  ],
  newPostText:'',
  newPostName:''
};

let inputsName = {
  name: "NAME",
  message: "MESSAGE"
}

// changeInputValue={this.changeInputValue}
// addPost={this.addPost}
// removePost={this.removePost}

