<script setup lang="ts">
import type { Todo } from '../App.vue'

type Props = {
	todo: Todo
}

type Emits = {
	(event: 'removeTodo', todo: Todo): void,
	(event: 'done', todo: Todo, completed: boolean): void
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
</script>

<template>
<!-- {{ props.todo }} -->
	<input 
	type="checkbox" 
	class="toggle"
	@change="onchange"
	:value="todo.completed"
	>
	<label>{{ todo.title }}</label>
	<button class="destroy" @click="removeTodo"/>
</template>