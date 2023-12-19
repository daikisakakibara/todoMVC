<script setup lang="ts">
import { ref } from 'vue'

type Todo = {
  id: number,
  title: string,
  completed: boolean,
}

const todo = ref<Todo>({
  id: 0,
  title: 'todo item',
  completed: false,
})

</script>

<template>
 <section id="app" class="todoapp">
  <header class="header">
    <h1>todos</h1>
    <input type="text"
    class="new-todo"
    placeholder="what needs to done?"
    v-model="todo.title"
    >
  </header>
  <section class="main">
    <ul class="todo-list">
      <li>
        <div class="view">
          <label>{{ todo.title }}</label>
        </div>
      </li>
    </ul>
  </section>
 </section>
</template>

<style>
@import url("https://unpkg.com/todomvc-app-css@2.4.2/index.css");
</style>