<script lang="ts">
    import Form from './lib/Form.svelte';

    const date: Date = new Date();
</script>

<main>

  <h1>Currency Converter</h1>
  <h2>{date}</h2>

  <div class="card">
    <Form />
  </div>

</main>

<style>

</style>
