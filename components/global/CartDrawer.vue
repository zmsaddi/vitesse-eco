<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="modelValue" class="fixed inset-0 z-50">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60" @click="$emit('update:modelValue', false)" />

        <!-- Drawer -->
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="translate-x-0"
          leave-to-class="translate-x-full"
          appear
        >
          <div v-if="modelValue" class="absolute right-0 top-0 h-full w-full max-w-md bg-primary border-l border-white/10 shadow-2xl flex flex-col">
            <!-- Header -->
            <div class="flex items-center justify-between p-6 border-b border-white/10">
              <h2 class="text-lg font-display font-bold">{{ $t('cart.title') }}</h2>
              <button
                class="p-1 text-gray-400 hover:text-white transition-colors"
                @click="$emit('update:modelValue', false)"
              >
                <Icon name="lucide:x" class="w-5 h-5" />
              </button>
            </div>

            <!-- Cart content (placeholder for now) -->
            <div class="flex-1 flex items-center justify-center p-6">
              <div class="text-center">
                <Icon name="lucide:shopping-bag" class="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p class="text-gray-400">{{ $t('cart.empty') }}</p>
                <NuxtLink
                  :to="localePath('/produits')"
                  class="btn-primary inline-block mt-4 text-sm"
                  @click="$emit('update:modelValue', false)"
                >
                  {{ $t('cart.empty_cta') }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{ modelValue: boolean }>()
defineEmits<{ 'update:modelValue': [value: boolean] }>()
const localePath = useLocalePath()
</script>
