//In javascript everything that has fixed amount of memoty is placed on stack
//Stack is a memory storage
//While the elements that dont have fixed amount of memory (it can be different) will be kept in heap
let hello = {
  hello:"said",
  by:"said"
}//this object now is kept in the heap(the reference will be kept in stack (let hello))
let name = "samir" //it goes to stack
