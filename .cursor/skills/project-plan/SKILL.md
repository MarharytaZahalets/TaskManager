---
name: project-plan
description: Project roadmap and execution rules for the Legacy React Native TaskManager. Use when planning, implementing, reviewing, or modifying project work.
---

# Project Plan

## Role

Act as a strict Senior React Native engineer.

Work incrementally.

Prefer small, correct, reviewable changes over large rewrites.

Do not make unrelated changes.
Do not introduce abstractions without a concrete reason.
Do not implement future phases early.

---

## Project Context

This repository is `TaskManager`.

It is the Legacy React Native Architecture implementation.

There is a separate repository called `TaskTracker`.

`TaskTracker`:
- uses Expo;
- uses React Native New Architecture;
- represents the same product and business logic;
- is a separate implementation.

References to `TaskTracker` are context only.

Do NOT:
- migrate this repository to Expo;
- migrate this repository to React Native New Architecture;
- copy `TaskTracker` architecture into this repository;
- modify `TaskTracker` while working in this repository.

The two projects remain separate implementations.

Eventually both projects will use:
- the same business/domain concepts;
- the same Supabase backend;
- the same Supabase database.

---

## Product Direction

The final product has three areas:

1. Tasks
2. Weather
3. BLE / Device

Authentication replaces the current Home flow.

The current geolocation/maps functionality will be removed.

Do not preserve geolocation/maps functionality unless explicitly requested.

---

## Architecture

Use this dependency direction:

Platform → DSL / Application Ports → Features

Apply Hexagonal Architecture pragmatically.

External dependencies should be isolated behind application-level boundaries when there is a concrete reason to isolate them.

Examples:

- Supabase → repository/adapter
- Weather API → weather client/adapter
- BLE/native APIs → platform/native adapter

Features must not directly depend on infrastructure implementations when an application port is appropriate.

Do not create abstractions only to make the architecture look clean.

Create a port when it:
- isolates a meaningful external dependency;
- provides a useful testing boundary;
- or represents a stable application capability.

Prefer small, explicit interfaces.

---

## State Management

These decisions are fixed:

- Redux will be removed.
- React Query will be used for server state.
- Local React state will be used for local UI state.
- Do not introduce another global state library unless explicitly requested.

React Query is responsible for:
- server state;
- fetching;
- caching;
- mutations;
- invalidation;
- optimistic updates;
- pagination/infinite queries;
- persisted server-state cache.

Do not use Redux as a second cache for the same server data.

---

## Backend

Supabase will replace JSON Server.

Target dependency:

Feature
→ React Query
→ TaskRepository
→ Supabase adapter
→ Supabase

Do not put Supabase queries directly into feature components when the repository boundary applies.

Both `TaskManager` and `TaskTracker` will eventually use the same Supabase database.

Authentication will use Supabase Auth.

Use proper user isolation and RLS.

---

## Tasks

Tasks are the primary feature.

The application must support approximately 10,000+ tasks.

Do not design the application around loading the entire task collection into memory.

Use pagination or infinite queries.

Search, filtering, and sorting must not replace the canonical server-state collection with a derived subset.

Optimistic updates are required for appropriate task mutations.

Optimistic mutations must support:

1. immediate UI update;
2. previous-state snapshot;
3. rollback on failure;
4. error handling;
5. appropriate invalidation/refetch after success.

Avoid unnecessary full-list refetches.

---

# Implementation Phases

## Phase 1 — Stabilize Legacy TaskManager

Only fix correctness and cleanup.

Order:

1. Fix `apiClient` error contract.
2. Stop search from replacing the canonical task collection.
3. Fix `useFocusEffect` correctness where the existing geolocation code still exists.
4. Tighten Task, Date, and route parameter types.
5. Fix loading and error states on the Task list.
6. Fix failed mutation/navigation behavior.
7. Remove clearly dead or obsolete code.

Do NOT:
- introduce React Query;
- migrate to Supabase;
- implement Weather;
- implement BLE;
- migrate to Expo/New Architecture.

---

## Phase 2 — Application Boundary

1. Introduce `TaskRepository` as an application port.
2. Make the existing task service implement the port.
3. Make the Task hook/view model depend on the port.
4. Keep JSON Server as the current adapter.
5. Ensure one clear task data-access path.
6. Add repository tests using a fake adapter where useful.

Do not migrate the backend yet.

---

## Phase 3 — React Query and Supabase

1. Introduce React Query for Tasks.
2. Remove Redux from server-state handling.
3. Remove Redux completely when no remaining client-state use requires it.
4. Implement `SupabaseTaskRepository`.
5. Replace JSON Server with Supabase.
6. Add Supabase Auth.
7. Configure the shared Supabase database for both projects.
8. Add appropriate RLS and user isolation.

Do not implement offline-first behavior yet.

---

## Phase 4 — Scale and Offline

1. Add pagination/infinite queries.
2. Design and test for 10,000+ tasks.
3. Add optimistic task mutations.
4. Add rollback behavior.
5. Add appropriate query invalidation.
6. Add persisted React Query cache.
7. Implement offline-first behavior where appropriate.
8. Add server-side search/filtering/sorting where needed.

Do not persist an entire 10,000-task collection unnecessarily.

---

## Phase 5 — Product Features

1. Replace Home with authentication.
2. Remove geolocation/maps.
3. Add Weather.
4. Add swipe-driven weather animations.
5. Add BLE / Device functionality.
6. Add native/TurboModule implementation where appropriate.

Weather and BLE are separate features.

Do not copy task-specific abstractions into these features.

---

## Phase 6 — Senior-Level Quality

1. Add meaningful unit/integration/E2E tests.
2. Test important error, loading, empty, offline, and mutation states.
3. Profile performance.
4. Review memory usage.
5. Review dependency boundaries.
6. Review TypeScript quality.
7. Review native boundaries.
8. Document important architectural decisions.
9. Add concise English technical explanations for important decisions.

---

# Current Execution Rule

**Work only within the current phase of the project plan. Do not implement future phases.**

Before making any change:

1. Identify the current phase.
2. Identify the exact requested task.
3. Inspect the existing implementation.
4. Make the smallest change that solves the task.
5. Do not modify unrelated files.
6. Do not introduce future-phase dependencies.
7. Do not perform unrelated refactoring.
8. Explain important trade-offs when a decision is required.

The project plan is a roadmap.

It is NOT a request to implement the entire roadmap.

---

# Decision Lock

Do not reconsider these decisions unless explicitly asked.

- Redux will be removed.
- React Query will be used for server state.
- Supabase will replace JSON Server.
- Both projects will use the same Supabase database.
- `TaskRepository` will isolate application code from the backend implementation.
- `TaskManager` remains Legacy Architecture.
- `TaskTracker` remains Expo + New Architecture.
- `TaskTracker` is a separate project, not a migration target.
- Geolocation/maps will be removed.
- Home will be replaced by authentication.
- Weather will be a separate feature.
- BLE/Device will be a separate feature.
- Tasks must support optimistic updates.
- Tasks must be designed for 10,000+ records.
- Architecture follows Platform → DSL / Application Ports → Features.
- Hexagonal Architecture is applied pragmatically.
- Avoid unnecessary abstractions.
- Avoid duplicate implementations of existing capabilities.

---

# AI Development Rules

Before implementing code:

1. Inspect existing code.
2. Search for existing abstractions before creating new ones.
3. Reuse existing Platform and DSL/Application Port capabilities.
4. Do not duplicate existing logic.
5. Do not create a second abstraction for the same responsibility.
6. Do not modify architecture unless the current task requires it.
7. Keep changes small and reviewable.

If a required shared capability is missing:

1. Identify the missing capability.
2. Explain why it belongs in Platform or DSL/Application Ports.
3. Propose the smallest appropriate change.
4. Do not implement a feature-specific duplicate.

---

# Analysis Mode

When asked to analyze code:

- Do not modify files.
- Do not create files.
- Do not refactor.
- Do not implement fixes.
- Inspect the repository and report findings.
- Distinguish confirmed problems from recommendations.
- Do not invent behavior that is not present in the code.

When asked to implement a task:

- Implement only the requested task.
- Do not proactively implement future tasks.
- Do not silently expand scope.
- Do not refactor unrelated code.