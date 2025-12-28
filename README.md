# SLEF - Seed Phrase Encryption Template Generator

SLEF allows crypto HODLers to create unique Cipher Templates that turn your crypto seed phrases into secure encrypted codes using a **Two-Factor Security Model**.

With SLEF, you can securely store, travel with, and manage your crypto seed phrases without the stress of exposure or loss.

### [🚀 Try SLEF Now](https://slef.app)

## The Self Custody Problem

Self-Custody is **a hard problem**. But it needs to be solved for wider crypto adoption. We humans need a simple method that is **secure, user-friendly, and trustless**.

-   **There are Eyes Everywhere**: No matter how well you hide your seed phrase (metal, paper or other), if it's ever exposed, it's out there in plain text. Cell phones, security cameras, or even nosey neighbours can get a glimpse of your 12 or 24 words.
-   **Travelling with your Seed Phrase**: Traveling with a physical seed phrase exposes you to risks like airport security scanners and luggage inspections. Metal plates or even paper can be confiscated and/or photographed without your knowledge or consent.

## The SLEF Solution

Split your seed phrase into **three independent elements** and store them in separate locations. *All three elements* are needed to reconstitute your seed phrase:

1.  **Excel Template**: A Locked "Cipher Box".
2.  **Strong Password**: Your "Cipher Box" Key.
3.  **Encrypted Code**: The Decoy Treasure.

## Features

-   **Client-Side Only**: All template generation happens locally in your browser. No data is ever sent to a server.
-   **Offline Compatible**: Designed to work without an internet connection for maximum security.
-   **Deterministic**: Regenerate the exact same template using your unique 8-character Template ID.
-   **Modern UI**: Built with Svelte and Tailwind CSS for a clean, responsive user experience.
-   **Light/Dark Mode**: Because dark mode is cool.

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

## Cryptography & Security

### 1. Excel-Side Encryption (Offline Formulas)
These algorithms are embedded directly into the Excel cells to encrypt and decrypt the input without any external dependencies.

- **Bitwise-Mixed Vigenère Ciphers**: The character shift is derived by **XORing** the Password character code with the Salt (`Shift = BITXOR(PasswordChar, Salt)`).
- **Transposition Cipher**: Reverses the string order using standard Excel text functions (`MID`, `LEN`, `INDIRECT`) and calculated indices.
- **Shannon Entropy (Monoalphabetic Substitution)**: Maps every character (A-Z, a-z) to a randomized counterpart using `VLOOKUP` against a generated "KeyMap" sheet (a random permutation of 52 characters). Without the file, an attacker faces **52!** (approx. 8 × 10⁶⁷) possible combinations.

### 2. Generator-Side Logic (Setup & Keys)
These algorithms run in the browser to deterministically generate the unique structure and keys for each template.

- **Mulberry32 (PRNG)**: A seeded Pseudo-Random Number Generator used to shuffle the alphabet maps and determine the sequence of operations.
- **cyrb128 (Hash Function)**: Hashes the alphanumeric **Template ID** into a 128-bit integer seed for the Mulberry32 RNG.
- **Web Crypto API (CSPRNG)**: `window.crypto.getRandomValues` is used to generate the initial secure random Template ID.

## License

[MIT](LICENSE)
