---
title: "Systems"
permalink: /systems/
layout: single
---

# Systems

ALIS is built around interacting systems grounded in real-world logic. Each system is modular, tested, and documented independently. [Browse source](https://github.com/fallintodusk/alis/tree/main/Plugins){: target="_blank" rel="noopener" }.

## Survival Physiology

- Calories, hydration, fatigue, condition
- Threshold states with cascading effects
- Server-authoritative core state

## Inventory

- Grid-based spatial packing: items occupy real space
- Weight and volume as constraints
- Equipment grants storage
- Hands-only baseline when unequipped

## Mind

- Inner voice driven by player state and surroundings
- Thought sources from vitals, environment, dialogue, and quests
- Priority and deduplication keep it useful, not noisy
- Guidance through awareness, not waypoints

## World

- Real terrain: streets, building footprints, elevation
- Tile-based data-driven geography
- Spatial queries and point-of-interest management
- Material context attached to places and objects

## Dialogue

- Universal data-driven dialogue for NPCs, objects, and terminals
- Dialogue output can feed the Mind system as a thought source

## Interaction and Object Capabilities

- Object interaction tracing and event routing
- Capability-based objects: lockable, loot container, pickup

## Character, Motion, and Combat

- Base character plugin for gameplay modes
- Skeleton-agnostic motion primitives
- Gameplay Ability System integration layer
- Combat framework as a feature plugin

## UI

- Descriptor-driven screens
- Per-system screens for vitals, inventory, dialogue, mind, settings, and menus

## Data Architecture

- JSON-driven definitions and layouts for many iteration paths
- Asset sync and definition generation
- Placement propagation into scene objects
- Universal generators instead of plugin-by-plugin custom authoring pipelines

## Loading

- Six-phase content loading after boot
- Resolve, mount, preload, activate, travel, warmup
- Separate boot orchestration for plugin code before engine UI exists

## Build and Delivery

- Public scripts package Win64 release builds through Unreal Automation Tool.
- Release signing generates `SHA256SUMS.txt` and a detached signature.
- Verification checks the public-key fingerprint, detached signature, and listed asset hashes.
- Separate client and server build targets exist in source.

## Multiplayer

- Online play framework with dedicated server support
- Server-authoritative component replication
- Headless server builds are part of the target layout

## Save and Settings

- Game state persistence
- Typed player settings consumed by gameplay and UI
