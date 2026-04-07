<template>
  <div class="py-12">
    <div class="container-custom">
      <!-- Page Header -->
      <div class="text-center mb-12">
        <h1 class="section-title">{{ $t('products.title') }}</h1>
        <p class="section-subtitle mx-auto mt-4">{{ $t('products.subtitle') }}</p>
      </div>

      <!-- Filters & Products -->
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar Filters -->
        <aside class="lg:w-64 shrink-0">
          <div class="card p-6 sticky top-28">
            <h3 class="text-sm font-semibold uppercase tracking-wider mb-4">{{ $t('products.filter') }}</h3>

            <!-- Category filter -->
            <div class="mb-6">
              <label class="text-xs text-gray-400 uppercase tracking-wider mb-2 block">
                {{ $t('products.all_categories') }}
              </label>
              <select v-model="filters.category" class="input-field text-sm">
                <option value="">{{ $t('products.all_categories') }}</option>
                <option value="urban">Urban</option>
                <option value="offroad">Off-Road</option>
                <option value="foldable">Pliable</option>
                <option value="lady">Lady</option>
              </select>
            </div>

            <!-- Tire size filter -->
            <div class="mb-6">
              <label class="text-xs text-gray-400 uppercase tracking-wider mb-2 block">
                {{ $t('products.tire_size') }}
              </label>
              <select v-model="filters.tireSize" class="input-field text-sm">
                <option value="">Toutes</option>
                <option value="16">16"</option>
                <option value="20">20"</option>
                <option value="24">24"</option>
              </select>
            </div>

            <!-- Price range -->
            <div class="mb-6">
              <label class="text-xs text-gray-400 uppercase tracking-wider mb-2 block">
                {{ $t('products.price_range') }}
              </label>
              <div class="flex gap-2">
                <input v-model="filters.minPrice" type="number" placeholder="Min" class="input-field text-sm" />
                <input v-model="filters.maxPrice" type="number" placeholder="Max" class="input-field text-sm" />
              </div>
            </div>

            <button class="text-sm text-accent hover:underline" @click="clearFilters">
              {{ $t('products.clear_filters') }}
            </button>
          </div>
        </aside>

        <!-- Product Grid -->
        <div class="flex-1">
          <!-- Sort & View toggle -->
          <div class="flex items-center justify-between mb-6">
            <p class="text-sm text-gray-400">11 vélos</p>
            <div class="flex items-center gap-4">
              <select v-model="sortBy" class="input-field text-sm !w-auto">
                <option value="name">{{ $t('products.sort_name') }}</option>
                <option value="price_asc">{{ $t('products.sort_price_asc') }}</option>
                <option value="price_desc">{{ $t('products.sort_price_desc') }}</option>
                <option value="newest">{{ $t('products.sort_newest') }}</option>
              </select>
              <div class="hidden md:flex gap-1">
                <button
                  class="p-2 rounded-lg transition-colors"
                  :class="viewMode === 'grid' ? 'bg-accent/10 text-accent' : 'text-gray-400 hover:text-white'"
                  @click="viewMode = 'grid'"
                >
                  <Icon name="lucide:grid-3x3" class="w-4 h-4" />
                </button>
                <button
                  class="p-2 rounded-lg transition-colors"
                  :class="viewMode === 'list' ? 'bg-accent/10 text-accent' : 'text-gray-400 hover:text-white'"
                  @click="viewMode = 'list'"
                >
                  <Icon name="lucide:list" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <!-- Product Cards (placeholder) -->
          <div
            :class="viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
              : 'space-y-4'"
          >
            <NuxtLink
              v-for="product in placeholderProducts"
              :key="product.slug"
              :to="localePath(`/produits/${product.slug}`)"
              class="card group cursor-pointer"
              :class="viewMode === 'list' ? 'flex flex-row' : ''"
            >
              <div
                class="bg-dark-tertiary relative overflow-hidden"
                :class="viewMode === 'list' ? 'w-48 shrink-0' : 'aspect-[4/3]'"
              >
                <div class="absolute inset-0 flex items-center justify-center text-gray-600">
                  <Icon name="lucide:bike" class="w-16 h-16" />
                </div>
                <div v-if="product.isNew" class="absolute top-3 left-3">
                  <span class="badge-new">{{ $t('product.new') }}</span>
                </div>
                <div v-if="product.isOnSale" class="absolute top-3 right-3">
                  <span class="badge-promo">{{ $t('product.on_sale') }}</span>
                </div>
              </div>
              <div class="p-5 flex-1">
                <h3 class="font-display font-semibold group-hover:text-accent transition-colors">
                  {{ product.name }}
                </h3>
                <p class="text-sm text-gray-400 mt-1">{{ product.specs }}</p>
                <div class="flex items-center gap-3 mt-3">
                  <span class="text-lg font-bold text-accent">{{ product.price }} €</span>
                  <span v-if="product.comparePrice" class="text-sm text-gray-500 line-through">
                    {{ product.comparePrice }} €
                  </span>
                </div>
                <!-- Color dots -->
                <div class="flex gap-1.5 mt-3">
                  <span
                    v-for="color in product.colors"
                    :key="color"
                    class="w-4 h-4 rounded-full border border-white/20"
                    :style="{ backgroundColor: color }"
                  />
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useHead({ title: `${t('products.title')} - Vitesse Eco` })

const viewMode = ref<'grid' | 'list'>('grid')
const sortBy = ref('name')
const filters = reactive({
  category: '',
  tireSize: '',
  minPrice: '',
  maxPrice: '',
})

function clearFilters() {
  filters.category = ''
  filters.tireSize = ''
  filters.minPrice = ''
  filters.maxPrice = ''
}

// Placeholder data - will be replaced with Sanity queries
const placeholderProducts = [
  { name: 'V20Mini', slug: 'v20mini', specs: '16" - 36V 13AH - 30-40km', price: 999, comparePrice: null, isNew: true, isOnSale: false, colors: ['#000', '#808080', '#4A0080'] },
  { name: 'V20Pro', slug: 'v20pro', specs: '20" - 48V 15.6AH - 40-50km', price: 1299, comparePrice: null, isNew: false, isOnSale: false, colors: ['#000', '#808080', '#333'] },
  { name: 'V20Limited', slug: 'v20limited', specs: '20" - 48V 18.2AH - 50-60km', price: 1499, comparePrice: null, isNew: false, isOnSale: false, colors: ['#000', '#808080', '#333'] },
  { name: 'S20Pro', slug: 's20pro', specs: '20" - 48V 18.2AH - 50-60km', price: 1399, comparePrice: 1599, isNew: false, isOnSale: true, colors: ['#000', '#808080', '#333'] },
  { name: 'V20Cross', slug: 'v20cross', specs: '17" - 48V 22AH - 60-70km', price: 1699, comparePrice: null, isNew: true, isOnSale: false, colors: ['#000', '#333'] },
  { name: 'Q30', slug: 'q30', specs: '20" - 48V 15.6AH - 40-50km - Pliable', price: 1199, comparePrice: null, isNew: false, isOnSale: false, colors: ['#000', '#808080', '#FFF'] },
  { name: 'D50', slug: 'd50', specs: '20" - 48V 18.2AH - 50-60km', price: 1499, comparePrice: null, isNew: false, isOnSale: false, colors: ['#000', '#228B22', '#F5F5DC', '#333', '#800080'] },
  { name: 'C28', slug: 'c28', specs: '20" - 48V 15.6AH - 40-50km', price: 1299, comparePrice: null, isNew: false, isOnSale: false, colors: ['#000', '#FFB6C1', '#228B22', '#800080'] },
  { name: 'EB30', slug: 'eb30', specs: '20" - Double batterie - 90-100km', price: 1899, comparePrice: null, isNew: true, isOnSale: false, colors: ['#000', '#808080'] },
  { name: 'V20Max', slug: 'v20max', specs: '24" - 48V 18.2AH - 50-60km', price: 1599, comparePrice: null, isNew: false, isOnSale: false, colors: ['#000', '#808080'] },
  { name: 'V20Limited Pro', slug: 'v20limited-pro', specs: '20" - Double batterie - 100km', price: 1799, comparePrice: 1999, isNew: false, isOnSale: true, colors: ['#000', '#808080'] },
]
</script>
