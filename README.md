# SLEF - Self Custody Template Generator

SLEF (Self Custody for Humans) is a secure, client-side tool designed to help users generate unique, offline-first encryption templates for crypto self-custody. It provides a simple way to create and restore deterministic paper wallet layouts without exposing sensitive data to the internet.

### [🚀 Try SLEF Now](https://harvey-withington.github.io/slef/)

## Features

- **Client-Side Only**: All template generation happens locally in your browser. No data is ever sent to a server.
- **Offline Compatible**: Designed to work without an internet connection for maximum security.
- **Deterministic**: Regenerate the exact same template using your unique 8-character Template ID.
- **Modern UI**: Built with Svelte and Tailwind CSS for a clean, responsive user experience.
- **Dark Mode**: Because dark mode is cool.

## How It Works

1.  **Generate New**: Creates a completely unique encryption template with a random algorithm.
2.  **Download**: Save your template as an Excel file (.xlsx) which you can print or store offline.
3.  **Regenerate**: Enter your previous Template ID to regenerate the exact same template if you lose your file.

## Tech Stack

-   [Svelte](https://svelte.dev/) - UI Framework
-   [Tailwind CSS](https://tailwindcss.com/) - Styling
-   [ExcelJS](https://github.com/exceljs/exceljs) - Spreadsheet generation
-   [Vite](https://vitejs.dev/) - Build tool

## Development

1.  Clone the repository:
    ```bash
    git clone https://github.com/harvey-withington/slef.git
    cd slef
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the dev server:
    ```bash
    npm run dev
    ```

## Building for Production

To create a production build:

```bash
npm run build
```

The output will be in the `dist` directory.

## Deployment

This project is configured to deploy automatically to GitHub Pages via GitHub Actions.

1.  Push changes to `main`.
2.  The workflow in `.github/workflows/deploy.yml` will build and deploy to the `gh-pages` branch.
3.  Ensure GitHub Pages is enabled in repository settings and pointing to the `gh-pages` branch.

## Cryptography & Security

### 1. Excel-Side Encryption (Offline Formulas)
These algorithms are embedded directly into the Excel cells to encrypt and decrypt the input without any external dependencies.

- **Polyalphabetic Substitution (Vigenère Variants)**
  - **Additive Mixing (Used in "substitute" step):** The character shift is calculated by **adding** the Password character code and the Salt (`Shift = PasswordChar + Salt`).
  - **Bitwise Mixing (Used in "xor" step):** The character shift is derived by **XORing** the Password character code with the Salt (`Shift = BITXOR(PasswordChar, Salt)`).
  - **Case Preservation:** For both variants, the final shift is applied modulo 26. This ensures that uppercase letters remain uppercase and lowercase letters remain lowercase, preserving the format of seed phrases.
- **Transposition Cipher**
  - **Usage:** Used in the **"reverse"** step.
  - **Implementation:** Reverses the string order using standard Excel text functions (`MID`, `LEN`, `INDIRECT`) and calculated indices.
- **Monoalphabetic Substitution**
  - **Usage:** Used in the **"map"** step (always the final operation).
  - **Implementation:** Maps every character (A-Z, a-z) to a randomized counterpart using `VLOOKUP` against a generated "KeyMap" sheet.

### 2. Generator-Side Logic (Setup & Keys)
These algorithms run in the browser to deterministically generate the unique structure and keys for each template.

- **Mulberry32 (PRNG)**
  - **Usage:** A seeded Pseudo-Random Number Generator used to shuffle the alphabet maps, determine the sequence of operations, and generate the fixed salts.
- **cyrb128 (Hash Function)**
  - **Usage:** Hashes the alphanumeric **Template ID** into a 128-bit integer seed for the Mulberry32 RNG. This ensures the same Template ID always produces the exact same Excel sheet structure.
- **Web Crypto API (CSPRNG)**
  - **Usage:** `window.crypto.getRandomValues` is used to generate the initial secure random Template ID.

## License

[MIT](LICENSE)
