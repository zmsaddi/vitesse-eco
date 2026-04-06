<template>
  <div class="relative" ref="dropdown">
    <button
      class="flex items-center gap-1.5 text-xs text-gray-400 hover:text-accent transition-colors px-2 py-1 rounded"
      @click="open = !open"
    >
      <Icon name="lucide:globe" class="w-3.5 h-3.5" />
      <span class="uppercase font-medium">{{ locale }}</span>
      <Icon name="lucide:chevron-down" class="w-3 h-3" :class="{ 'rotate-180': open }" />
    </button>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="open"
        class="absolute right-0 top-full mt-1 bg-dark-secondary border border-white/10 rounded-lg shadow-xl py-1 min-w-[140px] z-50"
      >
        <button
          v-for="loc in availableLocales"
          :key="loc.code"
          class="w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-white/5 transition-colors"
          :class="loc.code === locale ? 'text-accent' : 'text-gray-300'"
          @click="switchTo(loc.code)"
        >
          <span class="uppercase font-bold w-5">{{ loc.code }}</span>
          <span>{{ loc.name }}</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
const dropdown = ref<HTMLElement>()
const open = ref(false)

const availableLocales = computed(() =>
  (locales.value as Array<{ code: string; name: string }>)
)

function switchTo(code: string) {
  setLocale(code)
  open.value = false
}

function handleClickOutside(e: MouseEvent) {
  if (dropdown.value && !dropdown.value.contains(e.target as Node)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>
