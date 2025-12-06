<script>
  import { FileSpreadsheet, Shield, Download, RefreshCw } from 'lucide-svelte';
  import { TemplateGenerator } from './lib/generator';
  
  let generating = false;
  let templateId = '';
  let inputTemplateId = '';
  let status = 'ready'; // ready, generating, done
  
  const generateTemplate = async () => {
    generating = true;
    status = 'generating';
    
    try {
      // Add a small delay so user sees the loading state (UX)
      await new Promise(r => setTimeout(r, 800));
      
      const generator = new TemplateGenerator();
      // If user entered an ID, use it. Otherwise null (generates new).
      const idToUse = inputTemplateId.trim() || null;
      
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

<main class="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
  <div class="max-w-3xl mx-auto px-6 py-12">
    <!-- Header -->
    <header class="mb-12 text-center">
      <div class="inline-flex items-center justify-center p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200 mb-6">
        <Shield class="w-8 h-8 text-white" />
      </div>
      <h1 class="text-4xl font-bold tracking-tight text-slate-900 mb-4">
        Cypher Template Generator
      </h1>
      <p class="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
        Generate a unique, offline-first Excel encryption tool for your crypto seed phrases.
        <span class="font-medium text-blue-600 block mt-1">Zero trust. No servers. Your algorithm.</span>
      </p>
    </header>

    <!-- Main Card -->
    <div class="bg-white rounded-3xl shadow-xl shadow-slate-200 border border-slate-100 overflow-hidden">
      <div class="p-8 sm:p-12">
        <div class="flex flex-col items-center justify-center space-y-8">
          
          <!-- Status Display -->
          {#if status === 'ready'}
            <div class="text-center space-y-4">
              <div class="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileSpreadsheet class="w-10 h-10 text-slate-400" />
              </div>
              <h3 class="text-xl font-semibold text-slate-900">Ready to Generate</h3>
              <p class="text-slate-500 max-w-md">
                Click below to create a new unique encryption template, or enter a Template ID to recover a previous one.
              </p>
            </div>
          {:else if status === 'generating'}
            <div class="text-center space-y-4 animate-pulse">
              <div class="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw class="w-10 h-10 text-blue-600 animate-spin" />
              </div>
              <h3 class="text-xl font-semibold text-slate-900">Constructing Algorithm...</h3>
              <p class="text-slate-500">Combining secure building blocks randomly</p>
            </div>
          {:else if status === 'done'}
            <div class="text-center space-y-4">
              <div class="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileSpreadsheet class="w-10 h-10 text-green-600" />
              </div>
              <h3 class="text-xl font-semibold text-slate-900">Template Generated!</h3>
              <div class="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 inline-block">
                <span class="text-slate-500 uppercase tracking-wider text-xs">Template ID</span>
                <div class="text-lg font-mono font-bold text-slate-700 selectable">{templateId}</div>
              </div>
            </div>
          {/if}

          <!-- Input for Regeneration -->
          <div class="w-full max-w-sm">
             <label for="template-id" class="block text-sm font-medium text-slate-700 mb-2 text-center">
               Regenerate Existing (Optional)
             </label>
             <input 
               id="template-id"
               type="text" 
               bind:value={inputTemplateId} 
               placeholder="Enter Template ID (e.g. X7K9P2...)"
               class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center font-mono text-slate-800 placeholder-slate-400"
               disabled={generating}
             />
          </div>

          <!-- Action Button -->
          <button
            on:click={generateTemplate}
            disabled={generating}
            class="relative group w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-blue-600 text-white rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
          >
            <span class="relative z-10 flex items-center justify-center gap-2">
              {#if status === 'done'}
                <Download class="w-5 h-5" />
                Download Template
              {:else}
                {#if inputTemplateId.trim().length > 0}
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
                class="text-sm text-slate-500 hover:text-blue-600 underline"
                on:click={() => { status = 'ready'; inputTemplateId = ''; templateId = ''; }}
            >
                Start Over
            </button>
          {/if}
          
        </div>
      </div>

      <!-- Footer Info -->
      <div class="bg-slate-50 px-8 py-6 border-t border-slate-100">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-slate-500">
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

    <footer class="mt-12 text-center text-slate-400 text-sm">
      <p>Cypher Template Generator v0.1.0 &bull; <a href="#" class="hover:text-slate-600 underline">View Source</a></p>
    </footer>
  </div>
</main>
