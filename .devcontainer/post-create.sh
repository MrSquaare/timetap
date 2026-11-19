#!/usr/bin/env bash
set -euo pipefail

# Named volumes are created as root: hand them (and their parents) to the user.
sudo chown node:node \
  "$HOME/.local" \
  "$HOME/.local/share" \
  "$HOME/.local/share/pnpm" \
  "$HOME/.local/share/pnpm/store" \
  "$HOME/.expo"

# pnpm version comes from the "packageManager" field in package.json.
sudo corepack enable
corepack install

# Preinstall @expo/ngrok globally so `expo start --tunnel ngrok` works without prompting.
npm install -g "@expo/ngrok@^4.1.0"

pnpm install --frozen-lockfile
