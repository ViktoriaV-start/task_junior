<script lang="ts">

  const BASE_URL = 'https://open.er-api.com/v6/latest/';
  let currency: string[] = [];

  let isLoading: boolean = false;
  let error: boolean = false;

  let value: number = 0;
  let sourceCurrency: string = 'RUB';
  let destinationCurrency: string = 'USD';
  let output: number = 0;


  function getCurrencyList(): void {
    fetching().then((result) => {
      currency = [...Object.keys(result.rates)];
      isLoading = false;
    })
  }

  getCurrencyList();


  async function fetching() {
    error = false;
    isLoading = true;
    const url: string = BASE_URL + sourceCurrency;

    try {
      const response = await fetch(url);
      if(!response.ok) throw new Error('Error' + response.status);

      return await response.json();

    } catch (err) {
      error = true;
      console.log(err);
      isLoading = false;
    }
  }

  const handleSubmit = () => {

    fetching().then((result) => {
      output = +(value * result.rates[destinationCurrency]).toFixed(4);
      isLoading = false;
    })
  }


</script>

<form class="form" on:submit|preventDefault={handleSubmit}>
  <select class='select' bind:value={sourceCurrency} on:change={handleSubmit}>
    {#each currency as item}
      <option value={item}>
        {item}
      </option>
    {/each}
  </select>

<input class="input" type="number" bind:value={value} placeholder="Введите значение" min="0"/>

<select class='select' bind:value={destinationCurrency} on:change={handleSubmit}>
    {#each currency as item}
      <option value={item}>
        {item}
      </option>
    {/each}
  </select>

  <button class="btn" type="submit">Рассчитать</button>
</form>


<p class="result">Результат: {value} {sourceCurrency} = {output} {destinationCurrency}</p>
{#if isLoading}
  <div class="spinner"></div>
{/if}

{#if error}
  <div class="information">Ошибка при обращении к ресурсу. Повторите позже</div>
{/if}

<style>

  .btn {
    background: #c3ecfa;
    width: 13rem;
    height: 4.2rem;
    font-size: 1.2rem;
    vertical-align: bottom;
  }

  .btn:hover {
    border-color: #98c6d5;
    outline: none;
    background: #98c6d5;
  }

  .btn:focus, .btn:focus-visible {
    outline: none;
  }

  .result {
    font-size: 2rem;
    text-align: start;
    font-weight: 500;
  }

  .form {
    margin-top: 40px;
  }
  .select {
    width: 7rem;
    height: 4rem;
    font-size: 1.8rem;
    padding: 0.5rem;
  }

  .input {
    width: 16rem;
    height: 3.9rem;
    font-size: 1.8rem;
    padding: 0 0.5rem;
  }
  
  .spinner {
  border: 0.7rem solid #f3f3f3; /* Light grey */
  border-top: 0.7rem solid #4a7989;
  border-bottom: 0.7rem solid #4a7989;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  animation: spin 2s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.information {
  text-align: center;
  font-size: 1.5rem;
  margin-top: 3rem;
}

</style>