import { computed, onMounted, ref } from 'vue'
import type { Todo } from '../App.vue'

export const useTodoApp = () => {
	const todos = ref<Todo[]>([])
	const visibility = ref('all')
	const uid = ref(0)
	const remaining = computed(() => getActive(todos.value).length)
	const allDone = computed(() => remaining.value === 0)
	const addTodo = (todoTitle: string) => {
		todos.value.push({
			id: uid.value++,
			title: todoTitle,
			completed: false
		})
	}
	const removeTodo = (removeTodo: Todo) => {
		todos.value = todos.value.filter((todo) => todo !== removeTodo)
	}
	const done = (todo: Todo, completed: boolean) => {
		todo.completed = completed
	}
	const getActive = (todos: Todo[]) => {
		return todos.filter((todo) => !todo.completed)
	}
	const onHashChange = () => {
		visibility.value = window.location.hash.replace(/#\/?/, '')
	}
	const toggleAll = (checked: boolean) => {
		todos.value.forEach((todo) => (todo.completed = checked))
	}
	const clearCompleted = () => {
		todos.value = getActive(todos.value)
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
	return {
		todos,
		visibility,
		remaining,
		allDone,
		addTodo,
		removeTodo,
		done,
		filteredTodos,
		toggleAll,
		clearCompleted,
	}
}