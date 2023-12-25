<script setup lang="ts">
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import FooterSection from './components/FooterSection.vue'
import { useTodoApp } from './hooks/useTodoApp'
export type Todo = {
  id: number
  title: string
  completed: boolean
}

const {
  todos,
  visibility,
  remaining,
  allDone,
  addTodo,
  removeTodo,
  done,
  filteredTodos,
  toggleAll,
  clearCompleted,
} = useTodoApp()
</script>

<template>
  <section id="app" class="todoapp">
    <header class="header">
      <Transition appear name="todo-head">
        <h1>todos</h1>
      </Transition>
      <TodoInput @addTodo="addTodo" />
      <!-- <input type="text"
  class="new-todo"
  placeholder="what needs to done?"
  v-model="todo.title"
  > -->
    </header>
    <section class="main">
      <!-- <TodoList 
  :todos="todos"
  @removeTodo="removeTodo" 
  @done="done"
  /> -->
      <TodoList
        :filteredTodos="filteredTodos"
        :todos="todos"
        @removeTodo="removeTodo"
        @done="done"
        @toggleAll="toggleAll"
        :allDone="allDone"
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
  <FooterSection
    :todos="todos"
    :remaining="remaining"
    :visibility="visibility"
    @clearCompleted="clearCompleted"
  />
</template>

<style>
@import url('https://unpkg.com/todomvc-app-css@2.4.2/index.css');
.todo-head-enter-from {
  opacity: 0;
  transform: translateY(-40px)
}
.todo-head-enter-active {
  transition: 1s ease-in
}
</style>
