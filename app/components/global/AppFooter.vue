<template>
  <footer class="bg-dark-secondary border-t border-white/5">
    <div class="container-custom py-12 md:py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <!-- Brand -->
        <div class="lg:col-span-1">
          <NuxtLink :to="localePath('/')" class="flex items-center gap-3 mb-4">
            <img src="/logo.png" alt="Vitesse Eco" class="h-10 w-auto" />
            <div>
              <span class="text-lg font-display font-bold text-white">VITESSE</span>
              <span class="text-lg font-display font-bold text-accent ml-1">ECO</span>
            </div>
          </NuxtLink>
          <p class="text-sm text-gray-400 leading-relaxed">
            {{ $t('footer.description') }}
          </p>
          <!-- Social links -->
          <div class="flex gap-3 mt-5">
            <a
              v-for="social in socials"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="w-9 h-9 rounded-lg bg-white/5 hover:bg-accent/10 hover:text-accent flex items-center justify-center text-gray-400 transition-all"
              :aria-label="social.name"
            >
              <Icon :name="social.icon" class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">
            {{ $t('footer.quick_links') }}
          </h3>
          <ul class="space-y-3">
            <li v-for="item in navItems" :key="item.path">
              <NuxtLink
                :to="localePath(item.path)"
                class="text-sm text-gray-400 hover:text-accent transition-colors"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h3 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">
            {{ $t('footer.legal') }}
          </h3>
          <ul class="space-y-3">
            <li>
              <NuxtLink :to="localePath('/mentions-legales')" class="text-sm text-gray-400 hover:text-accent transition-colors">
                {{ $t('footer.mentions_legales') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/politique-confidentialite')" class="text-sm text-gray-400 hover:text-accent transition-colors">
                {{ $t('footer.privacy') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/cgv')" class="text-sm text-gray-400 hover:text-accent transition-colors">
                {{ $t('footer.cgv') }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div>
          <h3 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">
            {{ $t('footer.newsletter') }}
          </h3>
          <p class="text-sm text-gray-400 mb-4">
            {{ $t('footer.description') }}
          </p>
          <form class="flex gap-2" @submit.prevent>
            <input
              type="email"
              :placeholder="$t('footer.newsletter_placeholder')"
              class="input-field text-sm flex-1"
            />
            <button type="submit" class="btn-primary !px-4 !py-2.5 text-sm">
              <Icon name="lucide:send" class="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      <!-- Bottom -->
      <div class="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-xs text-gray-500">
          &copy; {{ new Date().getFullYear() }} Vitesse Eco. {{ $t('footer.rights') }}
        </p>
        <div class="flex items-center gap-4">
          <img src="https://img.icons8.com/color/32/visa.png" alt="Visa" class="h-6 opacity-50" />
          <img src="https://img.icons8.com/color/32/mastercard.png" alt="Mastercard" class="h-6 opacity-50" />
          <img src="https://img.icons8.com/color/32/apple-pay.png" alt="Apple Pay" class="h-6 opacity-50" />
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const navItems = computed(() => [
  { path: '/', label: t('nav.home') },
  { path: '/produits', label: t('nav.products') },
  { path: '/a-propos', label: t('nav.about') },
  { path: '/contact', label: t('nav.contact') },
])

const socials = [
  { name: 'Instagram', icon: 'lucide:instagram', url: '#' },
  { name: 'Facebook', icon: 'lucide:facebook', url: '#' },
  { name: 'TikTok', icon: 'simple-icons:tiktok', url: '#' },
]
</script>
