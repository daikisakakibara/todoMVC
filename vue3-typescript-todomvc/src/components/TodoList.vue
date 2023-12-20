<script setup lang="ts">
import TodoItem from './TodoItem.vue'
import type { Todo } from '../App.vue'

type Props = {
	todos: Todo[]
}

type Emit = {
  (event: 'removeTodo', todo: Todo): void
  (event: 'done', todo: Todo, completed: boolean): void
}
defineProps<Props>()
const emit = defineEmits<Emit>()

const removeTodo = (todo: Todo) => {
  emit('removeTodo', todo)
  // console.log(todo)
}

const done = (todo: Todo, completed: boolean) => {
  emit('done',todo,completed)
  console.log(completed)
}
</script>

<template>
	 <ul class="todo-list">
      <li 
      v-for="todo in todos" 
      :key='todo.id'
      :class="['todo',{completed: todo.completed}]"
      >
        <div class="view">
					<TodoItem 
          :todo="todo"
          @removeTodo="removeTodo"
          @done="done"
          />
        </div>
      </li>
    </ul>
</template>

