<script>
  import { onMount } from 'svelte';
  import { Sun, Moon } from 'lucide-svelte';
  import Nav from './lib/Nav.svelte';
  import Home from './lib/Home.svelte';
  import Guide from './lib/Guide.svelte';
  
  let currentPage = 'home'; // 'home' or 'guide'
  let darkMode = false;

  onMount(() => {
    // Check local storage or system preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      darkMode = true;
      document.documentElement.classList.add('dark');
    } else {
      darkMode = false;
      document.documentElement.classList.remove('dark');
    }
  });

  const toggleDarkMode = () => {
    darkMode = !darkMode;
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  };
</script>

<main class="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-sans selection:bg-blue-100 dark:selection:bg-blue-900 transition-colors duration-300">
  <!-- Dark Mode Toggle -->
  <div class="absolute top-6 right-6 z-10">
    <button 
      on:click={toggleDarkMode}
      class="p-3 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200"
      aria-label="Toggle Dark Mode"
    >
      {#if darkMode}
        <Sun class="w-5 h-5" />
      {:else}
        <Moon class="w-5 h-5" />
      {/if}
    </button>
  </div>

  <div class="max-w-4xl mx-auto px-6 py-12">
    <!-- Navigation -->
    <Nav bind:currentPage />

    <!-- Page Content -->
    {#if currentPage === 'home'}
      <Home />
    {:else}
      <Guide />
    {/if}

    <!-- Footer -->
    <footer class="mt-16 text-center text-slate-400 dark:text-slate-500 text-sm pb-8">
      <p>SLEF v1.0.0 &bull; <a href="https://github.com/harvey-withington/slef" class="hover:text-slate-600 dark:hover:text-slate-300 underline transition-colors">View Source</a></p>
    </footer>
  </div>
</main>
