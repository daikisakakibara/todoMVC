<script setup lang="ts">
import TodoItem from './TodoItem.vue'
import TodoEdit from './TodoEdit.vue'
import type { Todo } from '../App.vue'
import { ref } from 'vue';
type Props = {
  todos: Todo[]
  filteredTodos: Todo[]
  allDone: boolean
}

type Emit = {
  (event: 'removeTodo', todo: Todo): void
  (event: 'done', todo: Todo, completed: boolean): void
  (event: 'toggleAll', checked: boolean): void
}
defineProps<Props>()
const emit = defineEmits<Emit>()

const removeTodo = (todo: Todo) => {
  emit('removeTodo', todo)
  // console.log(todo)
}

const done = (todo: Todo, completed: boolean) => {
  emit('done', todo, completed)
  // console.log(completed)
}

// onchangeについてはわかりませんでしたー。後回し
// const onChange = (checked:any) => {
//   emit('toggleAll', t.checked)
// }
const onChange = ({ target }: Event) => {
  if (!(target instanceof HTMLInputElement)) return
  emit('toggleAll', target.checked)
}

const editedTodo = ref<Todo | null>(null)
const editTodo = (todo:Todo) => {
  editedTodo.value = todo
}

const doneEdit = (todoTitle: string) => {
  if(!editedTodo.value) return
  const title = todoTitle.trim()
  if(title) {
    editedTodo.value.title = title
  } else {
    removeTodo(editedTodo.value)
  }
  editedTodo.value = null
}

const cancelEdit = () => {
	editedTodo.value = null;
};

</script>

<template>
  <section class="main">
    <input id="toggle-all" type="checkbox" class="toggle-all" @click="onChange" :checked="allDone" />
    <label for="toggle-all">Mark all as complete</label>
    <TransitionGroup class="todo-list" name="todo-item" tag="ul">
      <!-- <ul> -->
        <li
          v-for="todo in filteredTodos"
          :key="todo.id"
          :class="[
                  'todo-item', 
                  { completed: todo.completed, editing: todo == editedTodo }
                  ]"
        >
            <TodoItem
            :todo="todo" 
            @removeTodo="removeTodo" 
            @done="done" 
            @editTodo="editTodo"
            />
            <TodoEdit 
            :todo="todo" 
            @doneEdit="doneEdit" 
            @cancelEdit="cancelEdit"
            :editedTodo="editedTodo"
            />
        </li>
      <!-- </ul> -->
    </TransitionGroup>
  </section>
</template>

<style scoped>
.todo-item {
  transition: 1s
}
.todo-item-enter-from,
.todo-item-leave-to {
  opacity: 0;
  transform: translateX(400px)
}
.todo-item-leave-active {
  position: absolute
}


</style>