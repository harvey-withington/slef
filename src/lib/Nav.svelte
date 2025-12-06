<script>
  export let currentPage;
  import { FileSpreadsheet, BookOpen, Shield } from 'lucide-svelte';
</script>

<nav class="flex items-center justify-between mb-12">
  <!-- Logo / Home Link -->
  <button 
    class="flex items-center gap-3 group"
    on:click={() => currentPage = 'home'}
  >
    <div class="bg-slate-900 dark:bg-blue-600 p-2 rounded-lg shadow-lg dark:shadow-blue-900/20 group-hover:scale-105 transition-transform duration-200">
      <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));">
        <defs>
          <linearGradient id="navGradientLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#60A5FA;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#8B5CF6;stop-opacity:1" />
          </linearGradient>
          <linearGradient id="navGradientRight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#F472B6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#7C3AED;stop-opacity:1" />
          </linearGradient>
        </defs>
        <path d="M12 2 L4 5 V12 C4 17.5 10 21.5 12 22 C13 18 10 16 12 12 C14 8 11 6 12 2 Z" fill="url(#navGradientLeft)" stroke="none"/>
        <path d="M12 2 C11 6 8 8 10 12 C12 16 9 18 10 22 C14 21.5 20 17.5 20 12 V5 L12 2 Z" fill="url(#navGradientRight)" stroke="none"/>
      </svg>
    </div>
    <span class="font-bold text-xl text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">SLEF</span>
  </button>

  <!-- Nav Links -->
  <div class="flex bg-white dark:bg-slate-800 p-1 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
    <button 
      class="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all duration-200 {currentPage === 'home' ? 'bg-slate-900 dark:bg-blue-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}"
      on:click={() => currentPage = 'home'}
    >
      <FileSpreadsheet class="w-4 h-4" />
      <span class="hidden sm:inline">Generator</span>
    </button>
    <button 
      class="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all duration-200 {currentPage === 'guide' ? 'bg-slate-900 dark:bg-blue-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}"
      on:click={() => currentPage = 'guide'}
    >
      <BookOpen class="w-4 h-4" />
      <span class="hidden sm:inline">How it Works</span>
    </button>
  </div>
</nav>
