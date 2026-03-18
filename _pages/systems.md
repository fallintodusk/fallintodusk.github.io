---
title: "Systems"
permalink: /systems/
layout: single
---

# Systems

ALIS is built around interacting systems grounded in real-world logic. Each system is modular — built, tested, and documented independently. [Browse source](https://github.com/fallintodusk/alis/tree/main/Plugins){: target="_blank" rel="noopener" }.

## Survival Physiology

- Calories, hydration, fatigue, condition
- Threshold states with cascading effects (hunger degrades condition, fatigue cuts stamina)
- Server-authoritative — no client-side cheating

## Inventory

- Grid-based spatial packing — items occupy real space
- Weight and volume as constraints
- Equipment grants storage (backpack gives space, losing it removes it)
- Hands-only baseline when unequipped

## Mind

- Inner voice driven by player state and surroundings
- Thought sources: vitals, environment, dialogue, quests
- Priority and deduplication keep it useful, not noisy
- Guidance through awareness, not waypoints

## World

- Real terrain: streets, building footprints, elevation
- Tile-based data-driven geography
- Spatial queries and point-of-interest management
- Each location carries its own material context

## Combat

- Feature-based framework
- Ability system with attributes, tags, and effects

## Dialogue

- Conversation scripting and execution
- Feeds into the Mind system as a thought source

## Interaction

- Object interaction tracing and event routing
- Capability-based — objects declare what they support

## UI

- Descriptor-driven — data defines screens, not code
- Per-system screens: vitals, inventory, dialogue, mind, settings, menus

## Data Architecture

- JSON configuration for all system tuning
- Asset sync: rename detection updates JSON paths automatically
- Definition generation: JSON changes regenerate game assets
- Placement propagation: definition changes update placed objects in scenes
- Built for rapid development with AI agents

## Loading

- 6-phase content loading after boot
- Resolve → mount → preload → activate → travel → warmup
- Separate boot orchestration for plugin code (before engine UI exists)

## Build and Delivery

- Build Service (Rust) — change detection, builds, packaging, CDN publishing
- Launcher (Rust) — updates, verification, secure handoff to game
- Signed releases with hash and signature verification
- Separate client and server build targets

## Multiplayer

- Online play framework with dedicated server support
- Server-authoritative component replication
- Headless server builds (no rendering overhead)

## Save and Settings

- Game state persistence
- Player settings management