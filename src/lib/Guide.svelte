<script>
  import {
    FileSpreadsheet,
    Lock,
    ShieldCheck,
    Shield,
    Plane,
    Eye,
    Cloud,
    Archive,
  } from "lucide-svelte";
</script>

<div
  class="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12"
>
  <div class="text-center space-y-4">
    <h2
      class="text-4xl font-bold text-slate-900 dark:text-white tracking-tight"
    >
      How SLEF Works
    </h2>
    <p
      class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
    >
      SLEF creates a unique, offline encryption tool that turns your seed phrase
      into a secure code using a
      <span class="text-blue-600 dark:text-blue-400 font-medium"
        >Two-Factor Security Model</span
      >.
    </p>
  </div>

  <!-- The Problem: Why do this? -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div
      class="bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl border border-red-100 dark:border-red-900/30"
    >
      <div class="flex items-start gap-4">
        <div
          class="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl text-red-600 dark:text-red-400"
        >
          <Plane class="w-6 h-6" />
        </div>
        <div>
          <h3 class="font-bold text-slate-900 dark:text-white text-lg mb-2">
            The Travel Problem
          </h3>
          <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Traveling with a physical seed phrase (paper or metal) is risky.
            Airport security scanners can see metal plates, and paper can be
            confiscated or photographed at border crossings.
          </p>
        </div>
      </div>
    </div>
    <div
      class="bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl border border-red-100 dark:border-red-900/30"
    >
      <div class="flex items-start gap-4">
        <div
          class="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl text-red-600 dark:text-red-400"
        >
          <Eye class="w-6 h-6" />
        </div>
        <div>
          <h3 class="font-bold text-slate-900 dark:text-white text-lg mb-2">
            The Discovery Problem
          </h3>
          <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            If a friend, cleaner, or thief finds your paper backup, your funds
            are gone instantly. Conventional storage relies entirely on "Nobody
            finding it".
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
    <!-- Step 1 -->
    <div
      class="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all duration-300 group"
    >
      <div
        class="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300"
      >
        <FileSpreadsheet class="w-7 h-7" />
      </div>
      <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">
        1. Generate Template
      </h3>
      <p class="text-slate-500 dark:text-slate-400 leading-relaxed">
        We generate a unique Excel file with a randomized cipher sequence and a
        shuffled <span
          class="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded"
          >KeyMap</span
        > specific to your unique Template ID.
      </p>
    </div>

    <!-- Step 2 -->
    <div
      class="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 hover:border-amber-500/30 dark:hover:border-amber-500/30 transition-all duration-300 group"
    >
      <div
        class="w-14 h-14 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center text-amber-600 dark:text-amber-400 mb-6 group-hover:scale-110 transition-transform duration-300"
      >
        <Lock class="w-7 h-7" />
      </div>
      <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">
        2. Encrypt Offline
      </h3>
      <p class="text-slate-500 dark:text-slate-400 leading-relaxed">
        Open the file (ideally on an offline computer). Enter your password and
        seed phrase. The spreadsheet calculates your encrypted code instantly
        without macros.
      </p>
    </div>

    <!-- Step 3 -->
    <div
      class="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 hover:border-green-500/30 dark:hover:border-green-500/30 transition-all duration-300 group"
    >
      <div
        class="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-green-600 dark:text-green-400 mb-6 group-hover:scale-110 transition-transform duration-300"
      >
        <ShieldCheck class="w-7 h-7" />
      </div>
      <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">
        3. Separate & Store
      </h3>
      <p class="text-slate-500 dark:text-slate-400 leading-relaxed">
        Save the <strong>Encrypted Code</strong> and the
        <strong>Excel File</strong> in different locations (e.g., Cloud + USB). You
        need BOTH pieces plus your password to decrypt.
      </p>
    </div>
  </div>

  <!-- Security Deep Dive -->
  <div
    class="bg-slate-900 dark:bg-slate-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-slate-800 dark:border-slate-700 shadow-2xl"
  >
    <!-- Decorative Background -->
    <div
      class="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -mr-32 -mt-32"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -ml-32 -mb-32"
    ></div>

    <div class="relative z-10">
      <div class="flex flex-col lg:flex-row gap-12 items-start lg:items-center">
        <div class="flex-1 space-y-6">
          <div
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider"
          >
            <Shield class="w-3 h-3" />
            Security Architecture
          </div>
          <h3 class="text-3xl font-bold text-white">
            Why is it mathematically secure?
          </h3>
          <div class="space-y-4 text-slate-300 text-lg leading-relaxed">
            <p>
              SLEF combines <strong class="text-white">Bitwise-Mixed Vigenère Ciphers</strong>,
              <strong class="text-white">Transposition</strong>, and <strong class="text-white">Shannon Entropy</strong>.
              The Excel file acts as a physical key containing a unique
              <span class="text-white font-mono bg-white/10 px-1 rounded"
                >KeyMap</span
              >—a random permutation of 52 characters.
            </p>
            <p>
              Without the Excel file, an attacker faces <strong>52!</strong>
              (approx. 8 &times; 10<sup>67</sup>) possible combinations. This
              number is larger than the number of atoms in the galaxy. Even with
              the file, they still need your strong password to decrypt the
              multi-layered bitwise encryption.
            </p>
          </div>
        </div>

        <div
          class="bg-slate-800/80 dark:bg-slate-900/80 backdrop-blur-md border border-red-500/30 p-8 rounded-2xl max-w-md w-full shadow-xl"
        >
          <h4 class="text-white font-bold text-lg mb-6 flex items-center gap-3">
            <span class="relative flex h-3 w-3">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"
              ></span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"
              ></span>
            </span>
            Critical Warning
          </h4>
          <ul class="space-y-4 text-slate-300">
            <li class="flex gap-4">
              <span class="text-red-400 font-bold text-xl">•</span>
              <span
                >If you lose the <strong>Excel File</strong> (or Template ID),
                recovery is
                <span class="text-red-400 font-bold">IMPOSSIBLE</span>.</span
              >
            </li>
            <li class="flex gap-4">
              <span class="text-red-400 font-bold text-xl">•</span>
              <span
                >If you lose your <strong>Password</strong>, recovery is
                <span class="text-red-400 font-bold">IMPOSSIBLE</span>.</span
              >
            </li>
            <li class="flex gap-4">
              <span class="text-green-400 font-bold text-xl">•</span>
              <span
                ><strong>Action:</strong> Write down your Template ID in multiple
                secure locations.</span
              >
            </li>
            <li class="flex gap-4">
              <span class="text-yellow-400 font-bold text-xl">•</span>
              <span
                ><strong>Privacy:</strong> Turn off "Auto-Save" in Excel to prevent
                your password or seed from being saved to the file.</span
              >
            </li>
            <li class="flex gap-4">
              <span class="text-orange-400 font-bold text-xl">•</span>
              <span
                ><strong>Security:</strong> Disconnect from the internet before
                opening the file to enter your sensitive data.</span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- Pro Tips -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div
      class="bg-blue-50 dark:bg-slate-800/50 p-8 rounded-3xl border border-blue-100 dark:border-slate-700"
    >
      <div class="flex flex-col h-full">
        <div
          class="w-12 h-12 bg-blue-100 dark:bg-slate-700 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6"
        >
          <Cloud class="w-6 h-6" />
        </div>
        <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">
          Cloud Resilience
        </h3>
        <p
          class="text-slate-600 dark:text-slate-400 leading-relaxed mb-4 flex-grow"
        >
          The Excel file itself is just the "Lock". It is safe to store in the
          cloud (Google Drive, Dropbox, iCloud) <strong>IF</strong> you zip it with
          a password.
        </p>
        <div
          class="text-sm bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500"
        >
          <div
            class="flex items-center gap-2 mb-1 font-semibold text-slate-700 dark:text-slate-300"
          >
            <Archive class="w-4 h-4" />
            Recipe:
          </div>
          Right-click the Excel file → "Compress to ZIP file" → Set a password. Now
          you can access your "Lock" from any device worldwide.
        </div>
      </div>
    </div>

    <div
      class="bg-purple-50 dark:bg-slate-800/50 p-8 rounded-3xl border border-purple-100 dark:border-slate-700"
    >
      <div class="flex flex-col h-full">
        <div
          class="w-12 h-12 bg-purple-100 dark:bg-slate-700 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6"
        >
          <Lock class="w-6 h-6" />
        </div>
        <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">
          Unforgettable Passwords
        </h3>
        <p
          class="text-slate-600 dark:text-slate-400 leading-relaxed mb-4 flex-grow"
        >
          The biggest risk is forgetting your password. Do not use random
          characters like "Kj8#m9!". The human brain forgets these easily under
          stress.
        </p>
        <div
          class="text-sm bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500"
        >
          <div
            class="flex items-center gap-2 mb-1 font-semibold text-slate-700 dark:text-slate-300"
          >
            <strong>Use a Passphrase:</strong>
          </div>
          Pick 4 random words that create a visual image.<br />
          <em>"Purple-Elephant-Eating-Pizza"</em> <br />
          This is mathematically strong but easy to remember.
        </div>
      </div>
    </div>
  </div>
</div>
