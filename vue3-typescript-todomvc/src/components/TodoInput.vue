<script setup lang="ts">

const emit = defineEmits<{
	(event:'addTodo', todoTitle: string): void
}>()

const addTodo = (target:any) => {
	const todoTitle = target.value
	if(!todoTitle) return
	emit('addTodo',todoTitle)
	target.value = ''
		// console.log(target.value)
}

</script>

<template>
	<input 
		type="text"
		class="new-todo"
		placeholder="what needs to done?"
		@keypress.enter="addTodo($event.target)"
	>
</template>

