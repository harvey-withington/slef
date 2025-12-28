<script>
  import { onMount } from "svelte";
  export let currentPage;
  import {
    FileSpreadsheet,
    BookOpen,
    Shield,
    Sun,
    Moon,
    Monitor,
  } from "lucide-svelte";

  let theme = "system"; // "light", "dark", or "system"
  let isSystemDark = false;
  const base = import.meta.env.BASE_URL;

  onMount(() => {
    // Initialize state from localStorage or default to system
    theme = localStorage.theme || "system";
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    isSystemDark = mediaQuery.matches;
    mediaQuery.addEventListener("change", (e) => {
      isSystemDark = e.matches;
      if (theme === "system") applyTheme();
    });

    applyTheme();
  });

  const applyTheme = () => {
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    if (theme === "system") {
      localStorage.removeItem("theme");
    } else {
      localStorage.theme = theme;
    }
  };

  const toggleTheme = () => {
    if (theme === "system") {
      theme = "light";
    } else if (theme === "light") {
      theme = "dark";
    } else {
      theme = "system";
    }
    applyTheme();
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

    <!-- Theme Toggle -->
    <button
      on:click={toggleTheme}
      class="p-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 relative"
      aria-label="Toggle Theme"
      title="Current: {theme.charAt(0).toUpperCase() + theme.slice(1)}"
    >
      {#if theme === "system"}
        <Monitor class="w-5 h-5" />
        <div class="absolute -top-1 -right-1 bg-white dark:bg-slate-800 rounded-full p-0.5 border border-slate-200 dark:border-slate-700 shadow-sm">
          {#if isSystemDark}
            <Moon class="w-2.5 h-2.5 text-blue-500" />
          {:else}
            <Sun class="w-2.5 h-2.5 text-blue-500" />
          {/if}
        </div>
      {:else if theme === "dark"}
        <Moon class="w-5 h-5" />
      {:else}
        <Sun class="w-5 h-5" />
      {/if}
    </button>
  </div>
</nav>
