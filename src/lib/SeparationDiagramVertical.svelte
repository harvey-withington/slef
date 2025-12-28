<script>
  // No script needed, just pure SVG
</script>

<div class="w-full max-w-4xl mx-auto p-4">
  <svg
    viewBox="0 0 800 400"
    xmlns="http://www.w3.org/2000/svg"
    class="w-full h-auto text-slate-800 dark:text-slate-200"
  >
    <defs>
      <marker
        id="arrowhead"
        markerWidth="10"
        markerHeight="7"
        refX="9"
        refY="3.5"
        orient="auto"
      >
        <polygon points="0 0, 10 3.5, 0 7" class="fill-current" />
      </marker>
    </defs>

    <!-- Main Connection Lines -->
    <!-- Left Branch -->
    <path
      d="M 400 120 C 400 180, 140 180, 140 240"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-dasharray="5,5"
      marker-end="url(#arrowhead)"
      class="text-slate-400 dark:text-slate-500"
    />
    <!-- Center Branch -->
    <path
      d="M 400 120 C 400 180, 400 180, 400 240"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-dasharray="5,5"
      marker-end="url(#arrowhead)"
      class="text-slate-400 dark:text-slate-500"
    />
    <!-- Right Branch -->
    <path
      d="M 400 120 C 400 180, 660 180, 660 240"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-dasharray="5,5"
      marker-end="url(#arrowhead)"
      class="text-slate-400 dark:text-slate-500"
    />

    <!-- Input Node: Seed Phrase (Top Center) -->
    <g transform="translate(325, 40)">
      <rect
        x="0"
        y="0"
        width="150"
        height="80"
        rx="15"
        class="fill-slate-100 dark:fill-slate-800 stroke-slate-300 dark:stroke-slate-600"
        stroke-width="2"
      />
      <text
        x="75"
        y="35"
        text-anchor="middle"
        class="font-bold text-lg fill-slate-900 dark:fill-white"
        >Seed Phrase</text
      >
      <text
        x="75"
        y="55"
        text-anchor="middle"
        class="text-xs fill-slate-900 dark:fill-white"
        >(The Real Treasure)</text
      >
    </g>

    <!-- Output Node 1: Excel Workbook (Bottom Left) -->
    <g transform="translate(30, 250)">
      <rect
        x="0"
        y="0"
        width="220"
        height="80"
        rx="15"
        class="fill-blue-50 dark:fill-blue-900/20 stroke-blue-200 dark:stroke-blue-700/50"
        stroke-width="2"
      />
      <text
        x="110"
        y="35"
        text-anchor="middle"
        class="font-bold text-sm fill-blue-800 dark:fill-blue-200"
        >Excel Template</text
      >
      <text
        x="110"
        y="55"
        text-anchor="middle"
        class="text-xs fill-blue-600 dark:fill-blue-300"
        >(Locked "Cipher Box")</text
      >
    </g>

    <!-- Output Node 2: Password (Bottom Center) -->
    <g transform="translate(290, 250)">
      <rect
        x="0"
        y="0"
        width="220"
        height="80"
        rx="15"
        class="fill-amber-50 dark:fill-amber-900/20 stroke-amber-200 dark:stroke-amber-700/50"
        stroke-width="2"
      />
      <text
        x="110"
        y="35"
        text-anchor="middle"
        class="font-bold text-sm fill-amber-800 dark:fill-amber-200"
        >Strong Password</text
      >
      <text
        x="110"
        y="55"
        text-anchor="middle"
        class="text-xs fill-amber-600 dark:fill-amber-300"
        >("Cipher Box" Key)</text
      >
    </g>

    <!-- Output Node 3: Encrypted Code (Bottom Right) -->
    <g transform="translate(550, 250)">
      <rect
        x="0"
        y="0"
        width="220"
        height="80"
        rx="15"
        class="fill-green-50 dark:fill-green-900/20 stroke-green-200 dark:stroke-green-700/50"
        stroke-width="2"
      />
      <text
        x="110"
        y="35"
        text-anchor="middle"
        class="font-bold text-sm fill-green-800 dark:fill-green-200"
        >Encrypted Code</text
      >
      <text
        x="110"
        y="55"
        text-anchor="middle"
        class="text-xs fill-green-600 dark:fill-green-300"
        >(The Decoy Treasure)</text
      >
    </g>
  </svg>
</div>
