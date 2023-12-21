<script setup lang="ts">
import { computed } from 'vue';
import type { Todo } from '../App.vue'

type Prop = {
	todos: Todo[]
	remaining: number
	visibility: string
}
const props = defineProps<Prop>()

const isMulti = computed(() => {
	return props.remaining === 1 ? 'item' : 'items' 
})

</script>

<template>
	<footer class="footer" v-show="todos.length">
		<label class="todo-count">
			<strong>{{ props.remaining }}</strong> {{isMulti}} left
		</label>
		<ul class="filters">
			<li>
				<a href="#/all" :class="{ selected: visibility === 'all'}">All</a>
			</li>
			<li>
				<a href="#/active" :class="{ selected: visibility === 'active'}">Active</a>
			</li>
			<li>
				<a href="#/completed" :class="{ selected: visibility === 'completed'}">Completed</a>
			</li>
		</ul>
	</footer>
</template>