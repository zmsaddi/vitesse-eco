<template>
  <div class="py-12">
    <div class="container-custom">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <NuxtLink :to="localePath('/')" class="hover:text-accent">{{ $t('nav.home') }}</NuxtLink>
        <Icon name="lucide:chevron-right" class="w-3 h-3" />
        <NuxtLink :to="localePath('/produits')" class="hover:text-accent">{{ $t('nav.products') }}</NuxtLink>
        <Icon name="lucide:chevron-right" class="w-3 h-3" />
        <span class="text-white">{{ product.name }}</span>
      </nav>

      <!-- Product Detail -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Image Gallery -->
        <div>
          <div class="card aspect-square flex items-center justify-center bg-dark-secondary mb-4">
            <Icon name="lucide:bike" class="w-40 h-40 text-gray-600" />
          </div>
          <div class="grid grid-cols-4 gap-3">
            <div v-for="i in 4" :key="i" class="card aspect-square flex items-center justify-center bg-dark-secondary cursor-pointer hover:border-accent/50">
              <Icon name="lucide:image" class="w-8 h-8 text-gray-600" />
            </div>
          </div>
        </div>

        <!-- Product Info -->
        <div>
          <div class="flex items-center gap-3 mb-3">
            <span v-if="product.isNew" class="badge-new">{{ $t('product.new') }}</span>
            <span v-if="product.isOnSale" class="badge-promo">{{ $t('product.on_sale') }}</span>
            <span class="badge-promo bg-accent/10 text-accent">{{ $t('product.in_stock') }}</span>
          </div>

          <h1 class="text-3xl md:text-4xl font-display font-bold mb-2">{{ product.name }}</h1>
          <p class="text-gray-400 mb-6">{{ product.shortDescription }}</p>

          <!-- Price -->
          <div class="flex items-center gap-4 mb-8">
            <span class="text-4xl font-display font-bold text-accent">{{ product.price }} €</span>
            <span v-if="product.comparePrice" class="text-xl text-gray-500 line-through">
              {{ product.comparePrice }} €
            </span>
            <span v-if="product.comparePrice" class="badge-promo">
              -{{ Math.round((1 - product.price / product.comparePrice) * 100) }}%
            </span>
          </div>

          <!-- Color Picker -->
          <div class="mb-8">
            <h3 class="text-sm font-semibold uppercase tracking-wider mb-3">
              {{ $t('product.select_color') }}
            </h3>
            <div class="flex gap-3">
              <button
                v-for="(color, index) in product.colors"
                :key="color.hex"
                class="w-10 h-10 rounded-full border-2 transition-all"
                :class="selectedColor === index ? 'border-accent scale-110' : 'border-white/20 hover:border-white/40'"
                :style="{ backgroundColor: color.hex }"
                :title="color.name"
                @click="selectedColor = index"
              />
            </div>
            <p class="text-sm text-gray-400 mt-2">{{ product.colors[selectedColor]?.name }}</p>
          </div>

          <!-- Add to Cart -->
          <div class="flex gap-4 mb-8">
            <div class="flex items-center bg-dark-secondary rounded-lg border border-white/10">
              <button class="px-4 py-3 text-gray-400 hover:text-white" @click="quantity > 1 && quantity--">
                <Icon name="lucide:minus" class="w-4 h-4" />
              </button>
              <span class="px-4 py-3 font-semibold min-w-[40px] text-center">{{ quantity }}</span>
              <button class="px-4 py-3 text-gray-400 hover:text-white" @click="quantity++">
                <Icon name="lucide:plus" class="w-4 h-4" />
              </button>
            </div>
            <button class="btn-primary flex-1 flex items-center justify-center gap-2">
              <Icon name="lucide:shopping-bag" class="w-5 h-5" />
              {{ $t('product.add_to_cart') }}
            </button>
          </div>

          <!-- Specifications -->
          <div class="card p-6">
            <h3 class="text-lg font-display font-semibold mb-4">{{ $t('product.specifications') }}</h3>
            <div class="divide-y divide-white/5">
              <div v-for="spec in product.specs" :key="spec.label" class="flex justify-between py-3">
                <span class="text-sm text-gray-400">{{ spec.label }}</span>
                <span class="text-sm font-medium">{{ spec.value }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Description -->
      <div class="mt-16 card p-8">
        <h2 class="text-2xl font-display font-bold mb-4">{{ $t('product.description') }}</h2>
        <div class="prose prose-invert max-w-none text-gray-300 leading-relaxed">
          <p>{{ product.description }}</p>
        </div>
      </div>

      <!-- Related Products -->
      <div class="mt-16">
        <h2 class="section-title text-2xl mb-8">{{ $t('product.related') }}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="i in 4" :key="i" class="card group cursor-pointer">
            <div class="aspect-[4/3] bg-dark-tertiary flex items-center justify-center">
              <Icon name="lucide:bike" class="w-12 h-12 text-gray-600" />
            </div>
            <div class="p-4">
              <h3 class="text-sm font-semibold group-hover:text-accent transition-colors">Modèle</h3>
              <p class="text-sm text-accent font-bold mt-1">1 299 €</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const selectedColor = ref(0)
const quantity = ref(1)

// Placeholder - will be replaced with Sanity data
const product = {
  name: 'V20Pro',
  slug: route.params.slug,
  shortDescription: 'Le fatbike électrique le plus vendu. Double suspension, siège extensible, design moderne.',
  description: 'Le V20Pro est notre modèle phare, conçu pour offrir une expérience de conduite exceptionnelle sur tous les terrains. Équipé d\'un moteur puissant de 250W et d\'une batterie longue durée de 48V 15.6AH, il vous permet de parcourir jusqu\'à 50 km avec une seule charge. Sa double suspension absorbe les chocs pour un confort optimal, tandis que ses freins hydrauliques garantissent une sécurité maximale.',
  price: 1299,
  comparePrice: null,
  isNew: false,
  isOnSale: false,
  colors: [
    { name: 'Noir', hex: '#000000' },
    { name: 'Nardo Gray', hex: '#808080' },
    { name: 'Dark Gray', hex: '#333333' },
  ],
  specs: [
    { label: t('product.motor'), value: '250W' },
    { label: t('product.battery'), value: '48V 15.6AH' },
    { label: t('product.tire_size'), value: '20" x 4.0"' },
    { label: t('product.max_load'), value: '150 kg' },
    { label: t('product.range'), value: '40-50 km' },
    { label: t('product.brake_type'), value: 'Hydraulique' },
    { label: t('product.weight'), value: '40 kg' },
    { label: t('product.dimensions'), value: '174×67×123 cm' },
  ],
}

useHead({ title: `${product.name} - Vitesse Eco` })
</script>
