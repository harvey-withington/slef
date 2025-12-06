<script>
  import { FileSpreadsheet, Shield, Download, RefreshCw, Plus } from 'lucide-svelte';
  import { TemplateGenerator } from './generator';
  
  let generating = false;
  let templateId = '';
  let inputTemplateId = '';
  let status = 'ready'; // ready, generating, done
  let activeTab = 'new'; // 'new' or 'regenerate'
  let idError = '';

  const VALID_CHARS = /^[A-HJ-NP-Z2-9]+$/;

  function validateId(id) {
    if (!id) return 'Template ID is required';
    if (id.length < 8) return 'Template ID must be at least 8 characters';
    if (!VALID_CHARS.test(id)) return 'Template ID contains invalid characters';
    return '';
  }

  function handleIdInput(e) {
    // Auto-uppercase and remove spaces
    let val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    // Remove ambiguous chars if user tries to type them (optional, or just let validation catch it)
    // Let's just clean it for display
    inputTemplateId = val;
    
    if (inputTemplateId.length > 0) {
        idError = validateId(inputTemplateId);
    } else {
        idError = '';
    }
  }

  const generateTemplate = async () => {
    if (activeTab === 'regenerate') {
        const error = validateId(inputTemplateId);
        if (error) {
            idError = error;
            return;
        }
    }

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

<div class="animate-in fade-in zoom-in-95 duration-500">
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
          <path d="M12 2 L4 5 V12 C4 17.5 10 21.5 12 22 C13 18 10 16 12 12 C14 8 11 6 12 2 Z" fill="url(#gradientLeft)" stroke="none"/>
          <!-- Right Half -->
          <path d="M12 2 C11 6 8 8 10 12 C12 16 9 18 10 22 C14 21.5 20 17.5 20 12 V5 L12 2 Z" fill="url(#gradientRight)" stroke="none"/>
        </svg>
      </div>
      <h1 class="text-5xl font-black tracking-tighter text-slate-900 dark:text-white mb-4">
        SLEF
      </h1>
      <p class="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
        Crypto Self Custody for Humans.
        <span class="font-medium text-blue-600 dark:text-blue-400 block mt-2 text-base">Generate your unique, offline-first encryption template.</span>
      </p>
    </header>

    <!-- Mode Selection (Radio Style) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
        <!-- Generate New Option -->
        <button 
            class="relative p-4 rounded-2xl border-2 text-left transition-all duration-200 flex items-center gap-4 group {activeTab === 'new' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800'}"
            on:click={() => { activeTab = 'new'; status = 'ready'; }}
            disabled={generating || status === 'done'}
        >
            <div class="flex-shrink-0 w-5 h-5 rounded-full border-2 {activeTab === 'new' ? 'border-blue-500 bg-blue-500' : 'border-slate-300 dark:border-slate-500'} flex items-center justify-center transition-colors">
                {#if activeTab === 'new'}
                    <div class="w-2 h-2 bg-white rounded-full"></div>
                {/if}
            </div>
            
            <Plus class="w-10 h-10 flex-shrink-0 transition-colors {activeTab === 'new' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}" />
            
            <div>
                <span class="block font-semibold text-slate-900 dark:text-white {activeTab === 'new' ? 'text-blue-700 dark:text-blue-300' : ''}">Generate New</span>
                <span class="text-xs text-slate-500 dark:text-slate-400">Create a fresh, random template</span>
            </div>
        </button>

        <!-- Regenerate Option -->
        <button 
            class="relative p-4 rounded-2xl border-2 text-left transition-all duration-200 flex items-center gap-4 group {activeTab === 'regenerate' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800'}"
            on:click={() => { activeTab = 'regenerate'; status = 'ready'; }}
            disabled={generating || status === 'done'}
        >
             <div class="flex-shrink-0 w-5 h-5 rounded-full border-2 {activeTab === 'regenerate' ? 'border-blue-500 bg-blue-500' : 'border-slate-300 dark:border-slate-500'} flex items-center justify-center transition-colors">
                {#if activeTab === 'regenerate'}
                    <div class="w-2 h-2 bg-white rounded-full"></div>
                {/if}
            </div>
            
            <RefreshCw class="w-10 h-10 flex-shrink-0 transition-colors {activeTab === 'regenerate' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}" />
            
            <div>
                <span class="block font-semibold text-slate-900 dark:text-white {activeTab === 'regenerate' ? 'text-blue-700 dark:text-blue-300' : ''}">Regenerate Existing</span>
                <span class="text-xs text-slate-500 dark:text-slate-400">Restore from Template ID</span>
            </div>
        </button>
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
                   on:input={handleIdInput}
                   placeholder="Enter Template ID (e.g. X7K9P2...)"
                   class="w-full px-4 py-3 rounded-xl border {idError ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 dark:border-slate-600 focus:ring-blue-500'} focus:ring-2 focus:border-transparent text-center font-mono text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 bg-slate-50 dark:bg-slate-900 transition-colors duration-200 uppercase"
                 />
                 {#if idError}
                    <p class="text-red-500 text-sm mt-2 font-medium animate-in slide-in-from-top-1">{idError}</p>
                 {/if}
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
            disabled={generating || (activeTab === 'regenerate' && (!!idError || !inputTemplateId.trim()))}
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
</div>
