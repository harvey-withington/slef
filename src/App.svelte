<script>
  import { onMount } from 'svelte';
  import { FileSpreadsheet, Shield, Download, RefreshCw, Plus, Sun, Moon } from 'lucide-svelte';
  import { TemplateGenerator } from './lib/generator';
  
  let generating = false;
  let templateId = '';
  let inputTemplateId = '';
  let status = 'ready'; // ready, generating, done
  let activeTab = 'new'; // 'new' or 'regenerate'
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
  
  const generateTemplate = async () => {
    generating = true;
    status = 'generating';
    
    try {
      // Add a small delay so user sees the loading state (UX)
      await new Promise(r => setTimeout(r, 800));
      
      const generator = new TemplateGenerator();
      // If regenerating, use the input ID. Otherwise null.
      const idToUse = activeTab === 'regenerate' ? (inputTemplateId.trim() || null) : null;
      
      templateId = await generator.generate(idToUse);
      
      status = 'done';
    } catch (error) {
      console.error(error);
      alert('Error generating template: ' + error.message);
      status = 'ready';
    } finally {
      generating = false;
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

  <div class="max-w-3xl mx-auto px-6 py-12">
    <!-- Header -->
    <header class="mb-12 text-center">
      <div class="inline-flex items-center justify-center p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-lg shadow-slate-200 dark:shadow-none border border-slate-100 dark:border-slate-700 mb-6 transform hover:scale-105 transition-transform duration-300">
        <!-- Custom SLEF Icon: Gapless Gradient Split Shield -->
        <svg class="w-16 h-16" viewBox="0 0 24 24" fill="none" style="filter: drop-shadow(0 4px 6px rgba(0,0,0,0.15));">
          <defs>
            <linearGradient id="gradientLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#60A5FA;stop-opacity:1" /> <!-- Blue-400 -->
              <stop offset="100%" style="stop-color:#8B5CF6;stop-opacity:1" /> <!-- Violet-500 -->
            </linearGradient>
            <linearGradient id="gradientRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#F472B6;stop-opacity:1" /> <!-- Pink-400 -->
              <stop offset="100%" style="stop-color:#7C3AED;stop-opacity:1" /> <!-- Violet-600 -->
            </linearGradient>
          </defs>
          
          <!-- Left Half -->
          <!-- Outer: 12,2 -> 4,5 -> 4,12 -> 12,22 -->
          <!-- Inner Seam (Shared): 12,22 -> C(13,18 10,16 12,12) -> C(14,8 11,6 12,2) -->
          <path d="M12 2 L4 5 V12 C4 17.5 10 21.5 12 22 C13 18 10 16 12 12 C14 8 11 6 12 2 Z" fill="url(#gradientLeft)" stroke="none"/>
          
          <!-- Right Half -->
          <!-- Inner Seam (Shared): 12,2 -> C(11,6 14,8 12,12) -> C(10,16 13,18 12,22) -->
          <!-- Outer: 12,22 -> 20,12 -> 20,5 -> 12,2 -->
          <path d="M12 2 C11 6 14 8 12 12 C10 16 13 18 12 22 C14 21.5 20 17.5 20 12 V5 L12 2 Z" fill="url(#gradientRight)" stroke="none"/>
        </svg>
      </div>
      <h1 class="text-5xl font-black tracking-tighter text-slate-900 dark:text-white mb-4">
        SLEF
      </h1>
      <p class="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
        Self Custody. Secured.
        <span class="font-medium text-blue-600 dark:text-blue-400 block mt-2 text-base">Generate your unique, offline-first encryption template.</span>
      </p>
    </header>

    <!-- Tabs -->
    <div class="flex justify-center mb-8">
        <div class="bg-white dark:bg-slate-800 p-1 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 inline-flex">
            <button 
                class="px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 {activeTab === 'new' ? 'bg-slate-900 dark:bg-blue-600 text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700'}"
                on:click={() => { activeTab = 'new'; status = 'ready'; }}
                disabled={generating || status === 'done'}
            >
                <Plus class="w-4 h-4" />
                Generate New
            </button>
            <button 
                class="px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 {activeTab === 'regenerate' ? 'bg-slate-900 dark:bg-blue-600 text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700'}"
                on:click={() => { activeTab = 'regenerate'; status = 'ready'; }}
                disabled={generating || status === 'done'}
            >
                <RefreshCw class="w-4 h-4" />
                Regenerate Existing
            </button>
        </div>
    </div>

    <!-- Main Card -->
    <div class="bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-slate-200 dark:shadow-none border border-slate-100 dark:border-slate-700 overflow-hidden min-h-[400px] flex flex-col transition-colors duration-300">
      <div class="p-8 sm:p-12 flex-grow flex flex-col justify-center">
        <div class="flex flex-col items-center justify-center space-y-8 w-full">
          
          <!-- Status Display -->
          {#if status === 'ready'}
            <div class="text-center space-y-4">
              <div class="w-20 h-20 bg-slate-100 dark:bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileSpreadsheet class="w-10 h-10 text-slate-400 dark:text-slate-400" />
              </div>
              <h3 class="text-xl font-semibold text-slate-900 dark:text-white">
                  {activeTab === 'new' ? 'Create New Template' : 'Recover Existing Template'}
              </h3>
              <p class="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                {activeTab === 'new' 
                    ? 'Click below to create a completely unique encryption template with a random algorithm.' 
                    : 'Enter your previous Template ID to regenerate the exact same file.'}
              </p>
            </div>
            
            {#if activeTab === 'regenerate'}
              <div class="w-full max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
                 <label for="template-id" class="sr-only">Template ID</label>
                 <input 
                   id="template-id"
                   type="text" 
                   bind:value={inputTemplateId} 
                   placeholder="Enter Template ID (e.g. X7K9P2...)"
                   class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center font-mono text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 bg-slate-50 dark:bg-slate-900 transition-colors duration-200"
                 />
              </div>
            {/if}

          {:else if status === 'generating'}
            <!-- Generating State -->
            <div class="text-center space-y-4 animate-pulse">
              <div class="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw class="w-10 h-10 text-blue-600 dark:text-blue-400 animate-spin" />
              </div>
              <h3 class="text-xl font-semibold text-slate-900 dark:text-white">
                  {activeTab === 'new' ? 'Constructing Algorithm...' : 'Restoring Template...'}
              </h3>
              <p class="text-slate-500 dark:text-slate-400">
                  {activeTab === 'new' ? 'Combining secure building blocks randomly' : 'Rebuilding algorithm from seed'}
              </p>
            </div>

          {:else if status === 'done'}
            <!-- Done State -->
            <div class="text-center space-y-4">
              <div class="w-20 h-20 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileSpreadsheet class="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <h3 class="text-xl font-semibold text-slate-900 dark:text-white">Template Generated!</h3>
              <div class="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 inline-block">
                <span class="text-slate-500 dark:text-slate-400 uppercase tracking-wider text-xs">Template ID</span>
                <div class="text-lg font-mono font-bold text-slate-700 dark:text-slate-200 selectable">{templateId}</div>
              </div>
            </div>
          {/if}

          <!-- Action Button -->
          <button
            on:click={generateTemplate}
            disabled={generating || (activeTab === 'regenerate' && !inputTemplateId.trim())}
            class="relative group w-full sm:w-auto px-8 py-4 bg-slate-900 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-500 text-white rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-blue-200 dark:hover:shadow-blue-900/30 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden disabled:shadow-none"
          >
            <span class="relative z-10 flex items-center justify-center gap-2">
              {#if status === 'done'}
                <Download class="w-5 h-5" />
                Download Template
              {:else}
                {#if activeTab === 'regenerate'}
                    <RefreshCw class="w-5 h-5" />
                    Regenerate Template
                {:else}
                    <Shield class="w-5 h-5" />
                    Generate New Template
                {/if}
              {/if}
            </span>
          </button>
          
          {#if status === 'done'}
            <button 
                class="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 underline mt-4"
                on:click={() => { status = 'ready'; inputTemplateId = ''; templateId = ''; }}
            >
                Generate Another
            </button>
          {/if}
          
        </div>
      </div>


      <!-- Footer Info -->
      <div class="bg-slate-50 dark:bg-slate-700/20 px-8 py-6 border-t border-slate-100 dark:border-slate-700">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-slate-500 dark:text-slate-400">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-green-500"></div>
            Client-side only
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-green-500"></div>
            Offline compatible
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-green-500"></div>
            Open source
          </div>
        </div>
      </div>
    </div>

    <footer class="mt-12 text-center text-slate-400 dark:text-slate-500 text-sm">
      <p>SLEF v1.0.0 &bull; <a href="#" class="hover:text-slate-600 dark:hover:text-slate-300 underline">View Source</a></p>
    </footer>
  </div>
</main>
