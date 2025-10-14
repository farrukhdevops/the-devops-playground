# Day 11 VS Code Onboarding

Do not start or stop containers from VS Code. Canonical run is the Day 10.1 compose bundle outside the editor.

Common tasks:
- Health table: Terminal -> Run Task -> "health: stack summary"
- Prometheus targets: Terminal -> Run Task -> "health: prometheus targets"
- Storefront metrics: Terminal -> Run Task -> "health: storefront metrics"

Git flow:
- Work on feature branches, PR to dev (squash).
- PR dev -> main (squash) when stable.
- Sync main -> dev after release.

Ports and targets must not change from Day 10.1.
