export function generateId(){
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,c=>(c^crypto.getRandomValues(new Uint8Array(1))[0]&15 >> c/4).toString(16));
}

export function CreatePost(name, message, id = generateId()) {
  this.id = id;
  this.name = name;
  this.message = message;
  this.date = new Date();
}