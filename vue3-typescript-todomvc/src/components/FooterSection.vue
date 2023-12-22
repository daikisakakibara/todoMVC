<script setup lang="ts">
import { computed } from 'vue'
import type { Todo } from '../App.vue'

type Prop = {
  todos: Todo[]
  remaining: number
  visibility: string
}

// clearCompletedイベントは何も返さない。
// 処理を実行するだけ。つまり受け渡しみたいなもの。
type Emit = {
  (event: 'clearCompleted'): void
}
const props = defineProps<Prop>()
const emit = defineEmits<Emit>()

const isMulti = computed(() => {
  return props.remaining === 1 ? 'item' : 'items'
})

// 下記だとクリックイベントで算出するのと、computed()で算出するのとで二重になる。
// const clearCompleted = computed(() => {
// 	return emit('clearCompleted')
// })
const clearCompleted = () => {
  return emit('clearCompleted')
}
</script>

<template>
  <footer class="footer" v-show="todos.length">
    <label class="todo-count">
      <strong>{{ props.remaining }}</strong> {{ isMulti }} left
    </label>
    <ul class="filters">
      <li>
        <a href="#/all" :class="{ selected: visibility === 'all' }">All</a>
      </li>
      <li>
        <a href="#/active" :class="{ selected: visibility === 'active' }">Active</a>
      </li>
      <li>
        <a href="#/completed" :class="{ selected: visibility === 'completed' }">Completed</a>
      </li>
    </ul>
    <button class="clear-completed" @click="clearCompleted" v-show="remaining < todos.length">
      Clear completed
    </button>
  </footer>
</template>
