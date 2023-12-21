<script setup lang="ts">
import TodoItem from './TodoItem.vue'
import type { Todo } from '../App.vue'
type Props = {
	todos: Todo[]
  filteredTodos: Todo[]
  allDone: boolean
}

type Emit = {
  (event: 'removeTodo', todo: Todo): void
  (event: 'done', todo: Todo, completed: boolean): void
  (event: 'toggleAll',checked: boolean): void
}
defineProps<Props>()
const emit = defineEmits<Emit>()

const removeTodo = (todo: Todo) => {
  emit('removeTodo', todo)
  // console.log(todo)
}

const done = (todo: Todo, completed: boolean) => {
  emit('done',todo,completed)
  // console.log(completed)
}

// onchangeについてはわかりませんでしたー。後回し
// const onChange = (checked:any) => {
//   emit('toggleAll', t.checked)
// }

const onChange = (target:any) => {
  // console.log(target.checked)
	emit('toggleAll', target.checked);
};

</script>

<template>{{ checked }}
  <input
			id="toggle-all"
			type="checkbox"
			class="toggle-all"
      @click="onChange"
      :checked="allDone"
		/>
		<label for="toggle-all">Mark all as complete</label>
	 <ul class="todo-list">
      <li 
      v-for="todo in filteredTodos" 
      :key='todo.id'
      :class="['todo',{completed: todo.completed}]"
      >
        <div class="view">
					<TodoItem 
          :todos="todos"
          :todo="todo"
          @removeTodo="removeTodo"
          @done="done"
          />
        </div>
      </li>
    </ul>
</template>

