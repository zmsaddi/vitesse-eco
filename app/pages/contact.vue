<template>
  <div class="py-12">
    <div class="container-custom">
      <div class="text-center mb-14">
        <h1 class="section-title">{{ $t('contact.title') }}</h1>
        <p class="section-subtitle mx-auto mt-4">{{ $t('contact.subtitle') }}</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Contact Info -->
        <div class="space-y-6">
          <div class="card p-6 flex items-start gap-4">
            <div class="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
              <Icon name="lucide:mail" class="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 class="font-semibold mb-1">Email</h3>
              <a href="mailto:contact@vitesse-eco.fr" class="text-sm text-gray-400 hover:text-accent">
                contact@vitesse-eco.fr
              </a>
            </div>
          </div>

          <div class="card p-6 flex items-start gap-4">
            <div class="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
              <Icon name="lucide:globe" class="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 class="font-semibold mb-1">Site Web</h3>
              <span class="text-sm text-gray-400">www.vitesse-eco.com</span>
            </div>
          </div>

          <div class="card p-6 flex items-start gap-4">
            <div class="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
              <Icon name="lucide:clock" class="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 class="font-semibold mb-1">Horaires</h3>
              <p class="text-sm text-gray-400">Lun - Ven: 9h - 18h</p>
              <p class="text-sm text-gray-400">Sam: 10h - 16h</p>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="lg:col-span-2">
          <div class="card p-8">
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="text-xs text-gray-400 uppercase tracking-wider mb-2 block">
                    {{ $t('contact.name') }}
                  </label>
                  <input v-model="form.name" type="text" required class="input-field" />
                </div>
                <div>
                  <label class="text-xs text-gray-400 uppercase tracking-wider mb-2 block">
                    {{ $t('contact.email') }}
                  </label>
                  <input v-model="form.email" type="email" required class="input-field" />
                </div>
              </div>

              <div>
                <label class="text-xs text-gray-400 uppercase tracking-wider mb-2 block">
                  {{ $t('contact.subject') }}
                </label>
                <input v-model="form.subject" type="text" required class="input-field" />
              </div>

              <div>
                <label class="text-xs text-gray-400 uppercase tracking-wider mb-2 block">
                  {{ $t('contact.message') }}
                </label>
                <textarea v-model="form.message" rows="5" required class="input-field resize-none" />
              </div>

              <button type="submit" class="btn-primary w-full flex items-center justify-center gap-2">
                <Icon name="lucide:send" class="w-4 h-4" />
                {{ $t('contact.send') }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
useHead({ title: `${t('contact.title')} - Vitesse Eco` })

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

function handleSubmit() {
  // Will connect to server API later
  alert(t('contact.success'))
}
</script>
