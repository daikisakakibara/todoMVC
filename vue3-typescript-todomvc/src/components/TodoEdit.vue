<script setup lang="ts">
import { ref } from 'vue';
import type { Todo } from '../App.vue'

type Props = {
	todo: Todo
}
type Emit = {
	(event:'doneEdit',editTitle: string): void
	(event: 'cancelEdit'): void
}
const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const editedTitle = ref<string | null>(null)

const doneEdit = ({ target }: Event ) => {
	if (!(target instanceof HTMLInputElement)) return;
	editedTitle.value = target.value
	emit('doneEdit',editedTitle.value)
}

// ややこしくなってないと型が通らない
const onInput = ({ target }: Event) => {
	if (target instanceof HTMLInputElement) {
		editedTitle.value = target.value
	}
}

const cancelEdit = ({ target }: Event) => {
	if (!(target instanceof HTMLInputElement)) return;
	target.value = props.todo.title;
	emit('cancelEdit');
};

</script>

<template>
	<input 
	:id="`edit-${todo.id}`" 
	class="edit" 
	type="text" 
	:value="todo.title"
	@input="onInput"
	@keypress.enter="doneEdit"
	@keyup.esc="cancelEdit"
	/>
	<!-- <input 
	:id="`edit-${todo.id}`" 
	class="edit" 
	type="text" 
	v-model="todo.title"
	@keypress.enter="doneEdit"
	/> -->
</template>