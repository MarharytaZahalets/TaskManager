Review and rewrite `.cursor/skills/project-plan.md` so it matches the current state of this repository (RN-CLI-Playground), which contains the Task Manager application.

IMPORTANT: analyze first and preserve valid product decisions. Do not implement application code or modify unrelated project files. Only update this skill file.

The current skill is outdated because it describes the Task Manager application in this repository as a "Legacy React Native Architecture" project and explicitly says not to migrate to the React Native New Architecture.

That is no longer true.

CURRENT PROJECT STATE:

This repository is RN-CLI-Playground. It contains Task Manager, an existing / legacy React Native application being modernized.

Current migration target:
- React Native 0.87.1
- React 19.2.3
- React Native New Architecture
- React Native CLI (not Expo)
- native iOS and Android projects remain part of this repository

Migration status:
- JS/tooling migration completed
- iOS migration completed
- iOS builds successfully
- React Native New Architecture is active/default
- Android migration is currently in progress
- Android is being aligned from the old RN 0.75-era native configuration to RN 0.87.1

Do NOT describe Task Manager as a React Native "Legacy Architecture" project.

It is acceptable to describe it as:
- an existing application
- a legacy codebase
- an older codebase being modernized

But distinguish this from the deprecated React Native Legacy Architecture.

TaskTracker remains a separate repository and separate implementation:
- Expo
- React Native New Architecture
- same future product/business domain
- eventually the same Supabase backend/database

Do not merge the projects.
Do not migrate the Task Manager application in this repository to Expo.
Do not copy TaskTracker architecture into RN-CLI-Playground.

--------------------------------------------------
REQUIRED CHANGES
--------------------------------------------------

1. Add a clear current platform migration phase before application/product phases.

Suggested structure:

Phase 0 — React Native Platform Migration

Current focus:
- React Native 0.87.1 migration
- Android native/toolchain migration
- New Architecture alignment
- native dependency compatibility only when a concrete build/runtime error requires it

Current Android work includes:
- Gradle/toolchain alignment
- SDK/NDK/Kotlin alignment
- RN 0.87 Android template compatibility
- New Architecture configuration
- MainApplication bootstrap alignment
- concrete native dependency fixes only after reproducing errors on the aligned toolchain

Do not:
- blindly upgrade packages
- change packages just because a build task mentions them
- run repeated change → build → random change loops
- introduce Gradle compatibility flags unless a concrete error requires them
- mix Android platform migration with product architecture refactoring

2. Update all references that incorrectly say:
- Task Manager remains Legacy Architecture
- do not migrate to React Native New Architecture
- migrate to Expo/New Architecture is forbidden

The Task Manager application in this repository must now be described as:
- React Native CLI
- React Native 0.87.1
- React Native New Architecture
- existing codebase being modernized

3. Preserve the separation between this repository (RN-CLI-Playground / Task Manager) and TaskTracker.

4. Review the architecture terminology.

The current dependency direction says:

Platform → DSL / Application Ports → Features

Do not keep "DSL" unless the repository and roadmap clearly define what it means and why it belongs here.

If DSL is not a deliberate and justified architectural layer, simplify the terminology.

Prefer a clear and interview-explainable direction such as:

Feature
→ Application / Port
→ Adapter / Infrastructure

or another simple direction that accurately matches the intended Hexagonal Architecture.

Do not introduce architecture terminology just to make the roadmap sound more advanced.

5. Preserve the existing product decisions unless they conflict with the completed RN migration.

These decisions remain valid:

- Redux will eventually be removed
- React Query will be used for server state
- local React state for local UI state
- Supabase will replace JSON Server
- Supabase Auth will replace the current Home flow
- geolocation/maps will be removed
- Weather and BLE/Device are future separate features
- TaskRepository/application boundary is planned where useful
- pragmatic Hexagonal Architecture
- avoid unnecessary abstractions
- Tasks should support large collections
- pagination/infinite queries where appropriate
- optimistic updates with rollback
- shared Supabase database between Task Manager (this repository) and TaskTracker

6. Make the execution rules more practical.

The agent must always:
- identify the current phase
- identify the exact requested task
- inspect before changing code
- make the smallest correct change
- avoid unrelated refactoring
- avoid future-phase dependencies

For migration work specifically:
- stop at the first meaningful build/compiler error
- analyze that error before changing anything
- do not perform speculative dependency upgrades
- do not repeatedly modify files and rebuild without understanding the previous error

7. Keep the skill concise and useful.

This is an AI development instruction file, not full project documentation.

Remove duplicated rules.
Remove contradictory rules.
Avoid repeating the same decision in multiple sections unless necessary for enforcement.
Keep the roadmap easy to scan.

8. Add a short "Current State" section near the top.

Example:

Current State:
- RN 0.87.1
- React 19.2.3
- React Native CLI
- New Architecture
- iOS migration complete and building successfully
- Android migration currently in progress
- Current phase: Phase 0 — Platform Migration

Do not hardcode temporary build errors as permanent project rules.

--------------------------------------------------
OUTPUT
--------------------------------------------------

First analyze the current skill and identify contradictions or outdated instructions.

Then rewrite ONLY `.cursor/skills/project-plan.md`.

After rewriting, provide:
1. What was removed
2. What was changed
3. Why those changes were necessary
4. Any remaining architectural decisions that should be clarified by me

Do not modify application code.
Do not modify package.json.
Do not modify Android/iOS files.
Do not run builds.
Do not perform the Android migration.