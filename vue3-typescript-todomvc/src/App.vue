<script setup lang="ts">
import { ref } from 'vue'
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList.vue';
// import TodoItem from './components/TodoItem.vue';

export type Todo = {
  id: number,
  title: string,
  completed: boolean,
}

// const todo = ref<Todo>({
//   id: 0,
//   title: '',
//   completed: false,
// })

const todos = ref<Todo[]>([])
const uid = ref(0)
const addTodo = (todoTitle: string) => {
  todos.value.push({
    id: uid.value++,
    title: todoTitle,
    completed: false,
  })
  // console.log(todoTitle)
  // console.log(todos.value)
}

function removeTodo(removeTodo: Todo){
  todos.value = todos.value.filter((todo) => todo !== removeTodo)
  // console.log(removeTodo.id)
  // console.log(todos.value)
}

function done(todo: Todo, completed: boolean){
  todo.completed = completed
  // console.log(todo.completed)
}

</script>

<template>
 <section id="app" class="todoapp">
  <header class="header">
    <h1>todos</h1>
    <TodoInput @addTodo="addTodo"/>
    <!-- <input type="text"
    class="new-todo"
    placeholder="what needs to done?"
    v-model="todo.title"
    > -->
  </header>
  <section class="main">
    <TodoList 
    :todos="todos"
    @removeTodo="removeTodo" 
    @done="done"
    />
    <!-- <ul class="todo-list">
      <li>
        <div class="view">
          <label>{{ todo.title }}</label>
        </div>
      </li>
    </ul> -->
  </section>
 </section>
</template>

<style>
@import url("https://unpkg.com/todomvc-app-css@2.4.2/index.css");
</style>