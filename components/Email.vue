<script setup lang="ts">
import { Button, Container, Html, Text } from '@vue-email/components'

defineProps({
  body: String,
  link: String,
  receiver: String,
})
</script>

<template>
  <Html lang="en">
    <Container :style="{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      border: '1px solid #000',
      borderRadius: '5px',
      padding: '8px',
      gap: '1rem',
    }">
      <Text>Reset your <b>Better Auth</b> password</Text>
      <Text>Hello {{ receiver }}</Text>
      <Text>{{ body }}</Text>
      <Button :href="link"
        :style="{
          backgroundColor: '#000',
          color: 'white',
          padding: '8px 4px',
          borderRadius: '5px',
          textAlign: 'center',
          textDecoration: 'none',
        }"
      >Click me</Button>
    </Container>
  </Html>
</template>
