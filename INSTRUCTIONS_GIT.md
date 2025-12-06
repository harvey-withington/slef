# Git & GitHub Setup Instructions

Follow these steps to add your project to Git and publish it as a **Private** repository on GitHub.

## 1. Initialize Git Locally

Open your terminal in the project folder (`Slef/Code/Slef`) and run:

```bash
git init
git add .
git commit -m "Initial commit: Cypher Template Generator"
```

## 2. Create a Private Repo on GitHub

1.  Log in to [GitHub.com](https://github.com).
2.  Click the **+** icon in the top-right corner -> **New repository**.
3.  **Repository name**: `cypher-template-generator` (or whatever you prefer).
4.  **Visibility**: Select **Private**.
5.  **Initialize this repository with**: Leave all unchecked (no README, no gitignore - we already have them).
6.  Click **Create repository**.

## 3. Connect and Push

Copy the HTTPS or SSH URL provided by GitHub (e.g., `https://github.com/username/cypher-template-generator.git`).

Run these commands in your terminal, replacing the URL with yours:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

## 4. Verifying Privacy

-   Go to your repository page on GitHub.
-   You should see a `Private` badge next to the repo name.
-   Only you (and collaborators you invite) can see this code.

## 5. Future Updates

When you make changes:

```bash
git add .
git commit -m "Description of changes"
git push
```
