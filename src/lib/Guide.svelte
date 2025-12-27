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
  import SeparationDiagramVertical from "./SeparationDiagramVertical.svelte";
</script>

<div
  class="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12"
>
  <div class="text-center space-y-4">
    <h2
      class="text-4xl font-bold text-slate-900 dark:text-white tracking-tight"
    >
      How to SLEF
    </h2>
    <p
      class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
    >
      SLEF allows crypto HODLers to create unique Cipher Templates that turn
      your crypto seed phrases into secure encrypted codes using a
      <span class="text-blue-600 dark:text-blue-400 font-medium"
        >Two-Factor Security Model</span
      >. <br /><br />As many as you want, for-free, forever.
    </p>
  </div>

  <!-- The Problem: Why do this? -->
  <div class="text-center space-y-4">
    <h3 class="font-bold text-slate-900 dark:text-white text-3xl mb-2">
      The Self Custody Problem
    </h3>
    <p
      class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
    >
      Self-Custody is <span
        class="text-blue-600 dark:text-blue-400 font-medium"
      >
        a hard problem</span
      >. But it needs to be solved for wider crypto adoption. We humans need a simple method that is
      <span class="text-blue-600 dark:text-blue-400 font-medium">
        secure, user-friendly, and trustless</span>.
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
      <div
        class="bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl border border-red-100 dark:border-red-900/30 text-left"
      >
        <div class="flex items-center gap-4 mb-3">
          <div
            class="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl text-red-600 dark:text-red-400 shrink-0"
          >
            <Eye class="w-6 h-6" />
          </div>
          <h3 class="font-bold text-slate-900 dark:text-white text-lg">
            There are Eyes Everywhere
          </h3>
        </div>
        <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          No matter how well you hide your seed phrase (metal, paper or other),
          if it's ever exposed, it's out there in plain text. Cell phones,
          security cameras, or even nosey neighbours can get a glimpse of your
          12 or 24 words, and you might not even know it has happened. Saving it
          online or a connected device exposes you to hacks and malware.
        </p>
      </div>
      <div
        class="bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl border border-red-100 dark:border-red-900/30 text-left"
      >
        <div class="flex items-center gap-4 mb-3">
          <div
            class="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl text-red-600 dark:text-red-400 shrink-0"
          >
            <Plane class="w-6 h-6" />
          </div>
          <h3 class="font-bold text-slate-900 dark:text-white text-lg">
            Travelling with your Seed Phrase
          </h3>
        </div>
        <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          Going on an extended trip where you might need your seed phrase?
          Traveling with a physical seed phrase exposes you to risks like
          airport security scanners and luggage inspections, not to mention
          exposure to other travellers. Metal plates or even paper can be
          confiscated and/or photographed without your knowledge or consent.
        </p>
      </div>
    </div>
  </div>

  <div class="text-center space-y-4">
    <h3 class="font-bold text-slate-900 dark:text-white text-3xl mb-2">
      The SLEF Solution
    </h3>
    <p
      class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
    >
      Split your seed phrase into <span
        class="text-blue-600 dark:text-blue-400 font-medium"
        >three independent elements</span
      >
      and store them in separate locations. <i>All three elements</i> are needed
      to reconstitute your seed phrase.
    </p>
    <SeparationDiagramVertical />
  </div>

  <div class="text-center space-y-4">
    <h3 class="font-bold text-slate-900 dark:text-white text-3xl mb-2">
      Three Steps to Security
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
      <!-- Step 1 -->
      <div
        class="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all duration-300 group"
      >
        <div class="flex items-center gap-4 mb-4">
          <div
            class="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 group-hover:scale-110 transition-transform duration-300"
          >
            <FileSpreadsheet class="w-7 h-7" />
          </div>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white">
            1. Generate
          </h3>
        </div>
        <p class="text-slate-500 dark:text-slate-400 leading-relaxed">
          We generate a unique Excel Template with a randomized cipher sequence
          and a shuffled <span
            class="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded"
            >KeyMap</span
          > specific to your unique Template ID.
        </p>
      </div>

      <!-- Step 2 -->
      <div
        class="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 hover:border-amber-500/30 dark:hover:border-amber-500/30 transition-all duration-300 group"
      >
        <div class="flex items-center gap-4 mb-4">
          <div
            class="w-14 h-14 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0 group-hover:scale-110 transition-transform duration-300"
          >
            <Lock class="w-7 h-7" />
          </div>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white">
            2. Encrypt
          </h3>
        </div>
        <p class="text-slate-500 dark:text-slate-400 leading-relaxed">
          Open the file (ideally on an offline computer). Enter your password
          and seed phrase. The spreadsheet calculates your encrypted code (no
          macros).
        </p>
      </div>

      <!-- Step 3 -->
      <div
        class="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 hover:border-green-500/30 dark:hover:border-green-500/30 transition-all duration-300 group"
      >
        <div class="flex items-center gap-4 mb-4">
          <div
            class="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-green-600 dark:text-green-400 shrink-0 group-hover:scale-110 transition-transform duration-300"
          >
            <ShieldCheck class="w-7 h-7" />
          </div>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white">
            3. Store
          </h3>
        </div>
        <p class="text-slate-500 dark:text-slate-400 leading-relaxed">
          Save the <strong>Encrypted Code</strong> and the
          <strong>Excel File</strong> in different locations (e.g., Cloud + USB).
          You need BOTH pieces plus your password to decrypt.
        </p>
      </div>
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
              SLEF combines <strong class="text-white"
                >Bitwise-Mixed Vigenère Ciphers</strong
              >,
              <strong class="text-white">Transposition</strong>, and
              <strong class="text-white">Shannon Entropy</strong>. The Excel
              file acts as a physical key containing a unique
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
          class="bg-slate-800/80 dark:bg-slate-900/80 backdrop-blur-md border border-red-500/30 p-8 rounded-2xl max-w-sm w-full shadow-xl"
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
                ><strong>Security:</strong> Disconnect from the internet before opening
                the file to enter your sensitive data.</span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- Pro Tips -->
  <div class="text-center space-y-4">
    <h3 class="font-bold text-slate-900 dark:text-white text-3xl mb-2">
      Pro Tips
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
      <div
        class="bg-blue-50 dark:bg-slate-800/50 p-8 rounded-3xl border border-blue-100 dark:border-slate-700"
      >
        <div class="flex flex-col h-full">
          <div class="flex items-center gap-4 mb-4">
            <div
              class="w-12 h-12 bg-blue-100 dark:bg-slate-700 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0"
            >
              <Cloud class="w-6 h-6" />
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white">
              Cloud Resilience
            </h3>
          </div>
          <p
            class="text-slate-600 dark:text-slate-400 leading-relaxed mb-4 flex-grow"
          >
            The Excel Template contains your unique cipher algorithm, but
            without the password (your Key) it is useless. You can store it in
            the cloud without too much risk, <strong>BUT</strong> why not zip it
            with a password and give it a weird filename?
          </p>
          <div
            class="text-sm bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500"
          >
            <div
              class="flex items-center gap-2 mb-1 font-semibold text-slate-700 dark:text-slate-300"
            >
              <Archive class="w-4 h-4" />
              Zip it up!
            </div>
            Right-click the Excel file → "Compress to ZIP file" → Set a password.
            Now you can access your "Cipher Box" from any device worldwide.
          </div>
        </div>
      </div>

      <div
        class="bg-purple-50 dark:bg-slate-800/50 p-8 rounded-3xl border border-purple-100 dark:border-slate-700"
      >
        <div class="flex flex-col h-full">
          <div class="flex items-center gap-4 mb-4">
            <div
              class="w-12 h-12 bg-purple-100 dark:bg-slate-700 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0"
            >
              <Lock class="w-6 h-6" />
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white">
              Unforgettable Passwords
            </h3>
          </div>
          <p
            class="text-slate-600 dark:text-slate-400 leading-relaxed mb-4 flex-grow"
          >
            You probably want to avoid Password Managers, but as the amazing
            pattern recognition system it is, the human brain is not designed to
            remember random sequences of characters and numbers like "Kj8#m9!".
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
            <em>"Purple-Elephant-Eating-Pizza".</em> This is mathematically strong
            but easy to remember.
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
