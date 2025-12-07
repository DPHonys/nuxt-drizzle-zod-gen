<script setup lang="ts">
import { UsersInsertSchema } from '#build/schemas'
import type { FormErrorEvent } from '@nuxt/ui'
import type { z } from 'zod'

type UserFormData = z.output<typeof UsersInsertSchema>
const route = useRoute()
const router = useRouter()
const toast = useToast()

const isNew = computed(() => route.params.id === 'new')
const userId = computed(() => (isNew.value ? null : route.params.id))

// Form state
const state = reactive<Partial<UserFormData>>({
  name: '',
  email: '',
})

const submitting = ref(false)

// Load existing user data if editing
if (!isNew.value) {
  const { data: user, error } = await useFetch(`/api/users/${userId.value}`)

  if (error.value) {
    toast.add({
      title: 'Error',
      description: 'Failed to load user',
      color: 'error',
    })
    router.push('/users')
  } else if (user.value) {
    state.name = user.value.name
    state.email = user.value.email
  }
}

async function onSubmit() {
  // Validate form before submitting
  const validation = UsersInsertSchema.safeParse(state)
  if (!validation.success) {
    return
  }

  submitting.value = true
  formErrors.value = []

  try {
    if (isNew.value) {
      // Create new user
      await $fetch('/api/users', {
        method: 'POST',
        body: {
          name: state.name,
          email: state.email,
        },
      })

      toast.add({
        title: 'Success',
        description: 'User created successfully',
        color: 'success',
      })
    } else {
      // Update existing user
      await $fetch(`/api/users/${userId.value}`, {
        method: 'PUT',
        body: {
          name: state.name,
          email: state.email,
        },
      })

      toast.add({
        title: 'Success',
        description: 'User updated successfully',
        color: 'success',
      })
    }

    router.push('/users')
  } catch (error: unknown) {
    const errorMessage =
      error &&
      typeof error === 'object' &&
      'data' in error &&
      typeof error.data === 'object' &&
      error.data &&
      'message' in error.data
        ? String(error.data.message)
        : 'An error occurred'
    toast.add({
      title: 'Error',
      description: errorMessage,
      color: 'error',
    })
  } finally {
    submitting.value = false
  }
}

const formErrors = ref<string[]>([])

function onError(event: FormErrorEvent) {
  formErrors.value = event.errors
    .map((e) => e.name)
    .filter((name): name is string => !!name)
}

const isFormValid = computed(() => {
  const result = UsersInsertSchema.safeParse(state)
  console.log('Form valid:', result)
  return result.success
})
</script>

<template>
  <div class="container mx-auto p-8 max-w-2xl">
    <div class="mb-6">
      <UButton
        to="/users"
        icon="i-heroicons-arrow-left"
        variant="ghost"
        class="mb-4"
      >
        Back to Users
      </UButton>
      <h1 class="text-3xl font-bold">
        {{ isNew ? 'Create User' : 'Edit User' }}
      </h1>
    </div>

    <UCard>
      <UForm
        :schema="UsersInsertSchema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
        @error="onError"
      >
        <UFormField label="Name" name="name" required>
          <UInput v-model="state.name" placeholder="John Doe" />
        </UFormField>

        <UFormField label="Email" name="email" required>
          <UInput
            v-model="state.email"
            type="email"
            placeholder="john@example.com"
          />
        </UFormField>

        <div class="flex gap-3 pt-4">
          <UButton
            type="submit"
            :loading="submitting"
            :disabled="submitting || !isFormValid"
          >
            {{ isNew ? 'Create User' : 'Update User' }}
          </UButton>
          <UButton
            to="/users"
            color="neutral"
            variant="soft"
            :disabled="submitting"
          >
            Cancel
          </UButton>
        </div>
      </UForm>
    </UCard>
  </div>
</template>
