<template>
  <header class="sticky top-0 z-50 bg-primary/95 backdrop-blur-md border-b border-white/5">
    <div class="container-custom">
      <!-- Top bar -->
      <div class="hidden md:flex items-center justify-between py-2 text-xs text-gray-400 border-b border-white/5">
        <div class="flex items-center gap-4">
          <a href="mailto:contact@vitesse-eco.fr" class="hover:text-accent flex items-center gap-1">
            <Icon name="lucide:mail" class="w-3 h-3" />
            contact@vitesse-eco.fr
          </a>
        </div>
        <LanguageSwitcher />
      </div>

      <!-- Main nav -->
      <nav class="flex items-center justify-between h-16 md:h-20">
        <!-- Logo -->
        <NuxtLink :to="localePath('/')" class="flex items-center gap-3 shrink-0">
          <img src="/logo.png" alt="Vitesse Eco" class="h-10 md:h-12 w-auto" />
          <div class="hidden sm:block">
            <span class="text-lg font-display font-bold text-white">VITESSE</span>
            <span class="text-lg font-display font-bold text-accent ml-1">ECO</span>
          </div>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center gap-8">
          <NuxtLink
            v-for="item in navItems"
            :key="item.path"
            :to="localePath(item.path)"
            class="text-sm font-medium text-gray-300 hover:text-accent transition-colors"
            active-class="!text-accent"
          >
            {{ item.label }}
          </NuxtLink>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-3">
          <!-- Cart -->
          <button
            class="relative p-2 text-gray-300 hover:text-accent transition-colors"
            @click="cartOpen = true"
            :aria-label="$t('nav.cart')"
          >
            <Icon name="lucide:shopping-bag" class="w-5 h-5" />
            <span
              v-if="cartCount > 0"
              class="absolute -top-0.5 -right-0.5 bg-accent text-primary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
            >
              {{ cartCount }}
            </span>
          </button>

          <!-- Account -->
          <NuxtLink
            :to="localePath('/connexion')"
            class="hidden md:flex p-2 text-gray-300 hover:text-accent transition-colors"
            :aria-label="$t('nav.account')"
          >
            <Icon name="lucide:user" class="w-5 h-5" />
          </NuxtLink>

          <!-- Mobile menu toggle -->
          <button
            class="lg:hidden p-2 text-gray-300 hover:text-accent transition-colors"
            @click="mobileMenuOpen = !mobileMenuOpen"
            aria-label="Menu"
          >
            <Icon :name="mobileMenuOpen ? 'lucide:x' : 'lucide:menu'" class="w-5 h-5" />
          </button>
        </div>
      </nav>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="mobileMenuOpen" class="lg:hidden bg-dark-secondary border-t border-white/5">
        <div class="container-custom py-4 space-y-1">
          <NuxtLink
            v-for="item in navItems"
            :key="item.path"
            :to="localePath(item.path)"
            class="block px-4 py-3 text-sm font-medium text-gray-300 hover:text-accent hover:bg-white/5 rounded-lg transition-colors"
            active-class="!text-accent bg-white/5"
            @click="mobileMenuOpen = false"
          >
            {{ item.label }}
          </NuxtLink>
          <div class="pt-3 border-t border-white/5">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </Transition>

    <!-- Cart Drawer -->
    <CartDrawer v-model="cartOpen" />
  </header>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const mobileMenuOpen = ref(false)
const cartOpen = ref(false)
const cartCount = ref(0) // Will be connected to Pinia store later

const navItems = computed(() => [
  { path: '/', label: t('nav.home') },
  { path: '/produits', label: t('nav.products') },
  { path: '/a-propos', label: t('nav.about') },
  { path: '/contact', label: t('nav.contact') },
])
</script>
