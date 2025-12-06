<script setup lang="ts">
const { data: users, pending, error } = await useFetch('/api/users')
</script>

<template>
  <div class="container mx-auto p-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Users</h1>
      <UButton to="/users/new" icon="i-heroicons-plus" size="lg">
        Add User
      </UButton>
    </div>

    <UCard v-if="pending" class="text-center p-8">
      <div class="flex justify-center">
        <div
          class="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    </UCard>

    <UCard v-else-if="error" class="text-center p-8">
      <p class="text-red-500">Error loading users: {{ error.message }}</p>
    </UCard>

    <div v-else-if="users && users.length === 0" class="text-center p-8">
      <p class="text-gray-500 mb-4">No users found</p>
      <UButton to="/users/new" icon="i-heroicons-plus">
        Create your first user
      </UButton>
    </div>

    <UTable v-else :data="users">
      <template #actions-data="{ row }">
        <UButton
          :to="`/users/${row.id}`"
          icon="i-heroicons-pencil-square"
          size="sm"
          color="primary"
          variant="soft"
        >
          Edit
        </UButton>
      </template>
    </UTable>
  </div>
</template>
