<script>
  import { onMount } from "svelte";
  export let currentPage;
  import { FileSpreadsheet, BookOpen, Shield, Sun, Moon } from "lucide-svelte";

  let darkMode = false;
  const base = import.meta.env.BASE_URL;

  onMount(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      darkMode = true;
      document.documentElement.classList.add("dark");
    } else {
      darkMode = false;
      document.documentElement.classList.remove("dark");
    }
  });

  const toggleDarkMode = () => {
    darkMode = !darkMode;
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  };
</script>

<nav class="flex items-center justify-between mb-12">
  <!-- Logo / Home Link -->
  <button
    class="flex items-center gap-3 group"
    on:click={() => (currentPage = "home")}
  >
    <div
      class="bg-slate-900 dark:bg-blue-600 p-2 rounded-lg shadow-lg dark:shadow-blue-900/20 group-hover:scale-105 transition-transform duration-200"
    >
      <img
        src="{base}slef-logo.svg"
        alt="SLEF Logo"
        class="w-6 h-6"
        style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));"
      />
    </div>
    <span
      class="font-bold text-xl text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
      >SLEF</span
    >
  </button>

  <div class="flex items-center gap-3 sm:gap-4">
    <!-- Nav Links -->
    <div
      class="flex bg-white dark:bg-slate-800 p-1 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700"
    >
      <button
        class="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all duration-200 {currentPage ===
        'home'
          ? 'bg-slate-900 dark:bg-blue-600 text-white shadow-md'
          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}"
        on:click={() => (currentPage = "home")}
      >
        <FileSpreadsheet class="w-4 h-4" />
        <span class="hidden sm:inline">Generator</span>
      </button>
      <button
        class="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all duration-200 {currentPage ===
        'guide'
          ? 'bg-slate-900 dark:bg-blue-600 text-white shadow-md'
          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}"
        on:click={() => (currentPage = "guide")}
      >
        <BookOpen class="w-4 h-4" />
        <span class="hidden sm:inline">How it Works</span>
      </button>
    </div>

    <!-- Dark Mode Toggle -->
    <button
      on:click={toggleDarkMode}
      class="p-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
      aria-label="Toggle Dark Mode"
    >
      {#if darkMode}
        <Sun class="w-5 h-5" />
      {:else}
        <Moon class="w-5 h-5" />
      {/if}
    </button>
  </div>
</nav>
