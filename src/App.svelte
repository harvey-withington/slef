<script>
  import Nav from "./lib/Nav.svelte";
  import Home from "./lib/Home.svelte";
  import Guide from "./lib/Guide.svelte";

  let currentPage = "home"; // 'home' or 'guide'
</script>

<main
  class="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-sans selection:bg-blue-100 dark:selection:bg-blue-900 transition-colors duration-300"
>
  <div class="max-w-4xl mx-auto px-6 py-6">
    <!-- Navigation -->
    <Nav bind:currentPage />

    <!-- Page Content -->
    {#if currentPage === "home"}
      <Home />
    {:else}
      <Guide />
    {/if}

    <!-- Footer -->
    <footer
      class="mt-16 text-center text-slate-400 dark:text-slate-500 text-sm pb-8"
    >
      <p>
        SLEF v1.0.0 &bull; <a
          href="https://github.com/harvey-withington/slef"
          target="_blank"
          class="hover:text-slate-600 dark:hover:text-slate-300 underline transition-colors"
          >View Source</a
        >
      </p>
    </footer>
  </div>
</main>
