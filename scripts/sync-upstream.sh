#!/usr/bin/env bash
set -euo pipefail

UPSTREAM_REMOTE="upstream"
UPSTREAM_BRANCH="main"
SYNC_BRANCH_PREFIX="upstream-sync"
STATE_FILE=".upstream-sync-state"

echo "==> Fetching upstream..."
git fetch "$UPSTREAM_REMOTE" -q

UPSTREAM_HEAD=$(git rev-parse "$UPSTREAM_REMOTE/$UPSTREAM_BRANCH")

if [ -f "$STATE_FILE" ]; then
  LAST_SYNCED=$(cat "$STATE_FILE")
else
  LAST_SYNCED=""
fi

if [ "$UPSTREAM_HEAD" == "$LAST_SYNCED" ]; then
  echo "==> No new upstream commits since last sync. Nothing to do."
  exit 0
fi

echo "==> New upstream commits found."
echo "    Last synced: ${LAST_SYNCED:-<none>}"
echo "    New head:    $UPSTREAM_HEAD"

SYNC_BRANCH="${SYNC_BRANCH_PREFIX}-$(date +%Y%m%d%H%M%S)"
echo "==> Creating sync branch: $SYNC_BRANCH"
git checkout -q -b "$SYNC_BRANCH"

echo "==> Attempting merge..."
if git merge "$UPSTREAM_REMOTE/$UPSTREAM_BRANCH" --no-edit -q; then
  echo "==> Merge succeeded with no text conflicts."
  echo "$UPSTREAM_HEAD" > "$STATE_FILE"
  git add "$STATE_FILE"
  git commit -q -m "Update upstream sync state to $UPSTREAM_HEAD"
  echo "MERGE_STATUS=clean" >> "${GITHUB_OUTPUT:-/dev/stdout}"
  echo "SYNC_BRANCH=$SYNC_BRANCH" >> "${GITHUB_OUTPUT:-/dev/stdout}"
else
  echo "==> Merge produced conflicts. Committing conflict markers as-is for human review."
  git status --short | grep '^UU' || true
  git add -A
  git commit -q -m "WIP: unresolved merge conflict with upstream ($UPSTREAM_HEAD) - needs manual resolution"
  echo "MERGE_STATUS=conflict" >> "${GITHUB_OUTPUT:-/dev/stdout}"
  echo "SYNC_BRANCH=$SYNC_BRANCH" >> "${GITHUB_OUTPUT:-/dev/stdout}"
fi

echo "==> Done. Branch '$SYNC_BRANCH' is ready for a PR."