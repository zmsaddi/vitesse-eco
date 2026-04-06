<template>
  <div>
    <!-- Hero Section -->
    <section class="relative min-h-[90vh] flex items-center overflow-hidden">
      <!-- Background -->
      <div class="absolute inset-0">
        <img
          src="/poster.jpeg"
          alt="Vitesse Eco Fatbike"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/40" />
        <div class="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
      </div>

      <!-- Content -->
      <div class="container-custom relative z-10 py-20">
        <div class="max-w-2xl">
          <div class="flex items-center gap-2 mb-6">
            <div class="h-px w-12 bg-accent" />
            <span class="text-accent text-sm font-semibold uppercase tracking-widest">
              {{ $t('site.tagline') }}
            </span>
          </div>

          <h1 class="text-5xl md:text-6xl lg:text-7xl font-display font-black leading-tight mb-2">
            <span class="text-white">{{ $t('home.hero_title') }}</span>
          </h1>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-accent mb-6">
            {{ $t('home.hero_subtitle') }}
          </h2>

          <p class="text-lg text-gray-300 leading-relaxed mb-8 max-w-lg">
            {{ $t('home.hero_description') }}
          </p>

          <div class="flex flex-wrap gap-4">
            <NuxtLink :to="localePath('/produits')" class="btn-primary text-lg px-8 py-4">
              {{ $t('home.hero_cta') }}
              <Icon name="lucide:arrow-right" class="w-5 h-5 inline ml-2" />
            </NuxtLink>
            <NuxtLink :to="localePath('/contact')" class="btn-secondary text-lg px-8 py-4">
              {{ $t('product.contact_us') }}
            </NuxtLink>
          </div>

          <!-- Stats -->
          <div class="flex gap-8 mt-12">
            <div>
              <div class="text-3xl font-display font-bold text-accent">250W</div>
              <div class="text-xs text-gray-400 uppercase tracking-wider mt-1">{{ $t('product.motor') }}</div>
            </div>
            <div>
              <div class="text-3xl font-display font-bold text-accent">100km</div>
              <div class="text-xs text-gray-400 uppercase tracking-wider mt-1">{{ $t('product.range') }}</div>
            </div>
            <div>
              <div class="text-3xl font-display font-bold text-accent">11+</div>
              <div class="text-xs text-gray-400 uppercase tracking-wider mt-1">Modèles</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Brand Values -->
    <section class="py-20 bg-dark-secondary">
      <div class="container-custom">
        <div class="text-center mb-14">
          <h2 class="section-title">{{ $t('home.values_title') }}</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="value in values"
            :key="value.icon"
            class="card p-8 text-center group"
          >
            <div class="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-accent/20 transition-colors">
              <Icon :name="value.icon" class="w-7 h-7 text-accent" />
            </div>
            <h3 class="text-lg font-display font-semibold mb-2">{{ value.title }}</h3>
            <p class="text-sm text-gray-400 leading-relaxed">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products (placeholder) -->
    <section class="py-20">
      <div class="container-custom">
        <div class="text-center mb-14">
          <h2 class="section-title">{{ $t('home.featured_title') }}</h2>
          <p class="section-subtitle mx-auto mt-4">{{ $t('home.featured_subtitle') }}</p>
        </div>

        <!-- Placeholder grid - will be replaced with Sanity data -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="i in 3" :key="i" class="card group cursor-pointer">
            <div class="aspect-[4/3] bg-dark-tertiary relative overflow-hidden">
              <div class="absolute inset-0 flex items-center justify-center text-gray-600">
                <Icon name="lucide:bike" class="w-20 h-20" />
              </div>
              <div class="absolute top-4 left-4">
                <span class="badge-new">{{ $t('product.new') }}</span>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-lg font-display font-semibold group-hover:text-accent transition-colors">
                Modèle V20Pro
              </h3>
              <p class="text-sm text-gray-400 mt-1">250W - 48V 15.6AH - 40-50km</p>
              <div class="flex items-center justify-between mt-4">
                <span class="text-xl font-bold text-accent">À partir de 1 299 €</span>
                <button class="btn-outline !px-3 !py-2 text-xs">
                  {{ $t('common.see_more') }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-10">
          <NuxtLink :to="localePath('/produits')" class="btn-primary">
            {{ $t('home.cta_button') }}
            <Icon name="lucide:arrow-right" class="w-4 h-4 inline ml-2" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-dark-secondary relative overflow-hidden">
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent blur-[200px]" />
      </div>
      <div class="container-custom relative z-10 text-center">
        <h2 class="section-title mb-4">{{ $t('home.cta_title') }}</h2>
        <p class="text-lg text-gray-400 mb-8 max-w-xl mx-auto">{{ $t('home.cta_description') }}</p>
        <div class="flex flex-wrap justify-center gap-4">
          <NuxtLink :to="localePath('/produits')" class="btn-primary text-lg px-8 py-4">
            {{ $t('home.cta_button') }}
          </NuxtLink>
          <NuxtLink :to="localePath('/contact')" class="btn-secondary text-lg px-8 py-4">
            {{ $t('product.contact_us') }}
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useHead({
  title: 'Vitesse Eco - Fatbikes Électriques',
})

const values = computed(() => [
  {
    icon: 'lucide:zap',
    title: 'Puissance',
    description: 'Moteurs 250W pour une performance optimale sur tous les terrains.',
  },
  {
    icon: 'lucide:leaf',
    title: 'Écologique',
    description: 'Mobilité verte et durable pour un avenir meilleur.',
  },
  {
    icon: 'lucide:shield-check',
    title: 'Qualité EU',
    description: 'Assemblage européen et normes de sécurité strictes.',
  },
  {
    icon: 'lucide:headphones',
    title: 'Service Client',
    description: 'Accompagnement personnalisé avant et après votre achat.',
  },
])
</script>
