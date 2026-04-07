<template>
  <div class="py-12">
    <div class="container-custom">
      <div class="text-center mb-14">
        <h1 class="section-title">{{ $t('about.title') }}</h1>
        <p class="section-subtitle mx-auto mt-4">{{ $t('about.subtitle') }}</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <div class="flex items-center gap-2 mb-4">
            <div class="h-px w-12 bg-gold" />
            <span class="text-gold text-sm font-semibold uppercase tracking-widest">Notre Histoire</span>
          </div>
          <h2 class="text-3xl font-display font-bold mb-6">La mobilité électrique accessible à tous</h2>
          <div class="space-y-4 text-gray-300 leading-relaxed">
            <p>
              Vitesse Eco est née d'une passion pour la mobilité durable et le plaisir de rouler.
              Basée en France, notre mission est de rendre les fatbikes électriques de qualité
              accessibles à tous les amateurs de sensations fortes et de déplacements écologiques.
            </p>
            <p>
              Nous sélectionnons rigoureusement chaque modèle auprès de fabricants européens
              certifiés, garantissant des vélos qui répondent aux normes les plus strictes en matière
              de sécurité et de performance.
            </p>
            <p>
              Notre engagement : vous offrir le meilleur rapport qualité-prix, un service client
              irréprochable et des vélos qui vous accompagneront pendant des années.
            </p>
          </div>
        </div>
        <div class="card aspect-video flex items-center justify-center bg-dark-secondary">
          <img src="/poster.jpeg" alt="Vitesse Eco" class="w-full h-full object-cover rounded-2xl" />
        </div>
      </div>

      <!-- Values Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="card p-8 text-center">
          <div class="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-5">
            <Icon name="lucide:shield-check" class="w-8 h-8 text-accent" />
          </div>
          <h3 class="text-xl font-display font-semibold mb-3">Qualité Garantie</h3>
          <p class="text-sm text-gray-400">Tous nos vélos sont assemblés en Europe et répondent aux normes CE les plus strictes.</p>
        </div>
        <div class="card p-8 text-center">
          <div class="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-5">
            <Icon name="lucide:truck" class="w-8 h-8 text-gold" />
          </div>
          <h3 class="text-xl font-display font-semibold mb-3">Livraison Rapide</h3>
          <p class="text-sm text-gray-400">Expédition depuis notre entrepôt européen. Livraison rapide et suivi en temps réel.</p>
        </div>
        <div class="card p-8 text-center">
          <div class="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-5">
            <Icon name="lucide:wrench" class="w-8 h-8 text-accent" />
          </div>
          <h3 class="text-xl font-display font-semibold mb-3">SAV Dédié</h3>
          <p class="text-sm text-gray-400">Service après-vente réactif et pièces détachées disponibles pour tous nos modèles.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
useHead({ title: `${t('about.title')} - Vitesse Eco` })
</script>
