コンポーザブルに切り分けないときのappvueファイル

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import FooterSection from './components/FooterSection.vue'
// import TodoItem from './components/TodoItem.vue';

export type Todo = {
  id: number
  title: string
  completed: boolean
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
    completed: false
  })
  // console.log(todoTitle)
  // console.log(todos.value)
}

const removeTodo = (removeTodo: Todo) => {
  todos.value = todos.value.filter((todo) => todo !== removeTodo)
  // console.log(removeTodo.id)
  // console.log(todos.value)
}

const done = (todo: Todo, completed: boolean) => {
  todo.completed = completed
  // console.log(todo.completed)
}

// const remaining = computed(() => getActive.value.length)
// const getActive = computed(() => {
//   return todos.value.filter((todo) => todo.completed === false)
// })
const remaining = computed(() => getActive(todos.value).length)

// アクティブなtodoを取得
function getActive(todos: Todo[]) {
  return todos.filter((todo) => !todo.completed)
}

const visibility = ref('all')

const onHashChange = () => {
  visibility.value = window.location.hash.replace(/#\/?/, '')
}
onMounted(() => {
  window.addEventListener('hashchange', onHashChange)
})

const filteredTodos = computed(() => {
  switch (visibility.value) {
    case 'all':
      return todos.value
    case 'active':
      return todos.value.filter((todo) => !todo.completed)
    case 'completed':
      return todos.value.filter((todo) => todo.completed)
    default:
      return todos.value
  }
})

const allDone = computed(() => remaining.value === 0)
// const toggleAll = (checked: boolean) => {
//   return todos.value.forEach((todo) => todo.completed = checked)
// }
const toggleAll = (checked: boolean) => {
  todos.value.forEach((todo) => (todo.completed = checked))
}

function clearCompleted() {
  // todos.value = todos.value.filter((todo) => !todo.completed)
  todos.value = getActive(todos.value)
}
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
