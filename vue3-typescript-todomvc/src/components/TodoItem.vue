<script setup lang="ts">
import type { Todo } from '../App.vue'

type Props = {
  todo: Todo
}

type Emits = {
  (event: 'removeTodo', todo: Todo): void
  (event: 'done', todo: Todo, completed: boolean): void
	(event: 'editTodo',todo:Todo): void
}
// defineProps<Props>();
const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const removeTodo = () => {
  emit('removeTodo', props.todo)
}
const onchange = () => {
  emit('done', props.todo, !props.todo.completed)
}
const editTodo = () => {
	emit('editTodo',props.todo)
}
// ？なぜこれらの処理をこのコンポーネントでやらないのかが分からない
// const editingTodo = ref(false)
// const editingTodoInput = ref(props.todo.title)
// const editingHandle = () => editingTodo.value = !editingTodo.value


</script>

<template>
  <!-- {{ props.todo }} -->
	<div class="view">
		<input 
		type="checkbox" 
		class="toggle" 
		@change="onchange" 
		:checked="todo.completed" 
		/>
		<label @dblclick="editTodo">{{ todo.title }}</label>
		<!-- <input  この処理もなんでここでやらないの？
		v-show="editingTodo" 
		v-model="editingTodoInput"
		> -->
		<button class="destroy" @click="removeTodo" />
	</div>
</template>
