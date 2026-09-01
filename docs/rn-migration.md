# RN migration checkpoint

Agent sessions: read this file first. Do not re-investigate completed steps. Do not upgrade a package unless RN 0.87.1, a peer dep, or a concrete build/runtime error requires it.

## Migration

- Starting version: React Native **0.75.4** (React **18.3.1**, New Architecture off)
- Target version: React Native **0.87.1** (React **19.2.3**, New Architecture on)
- Current status: **iOS Debug compile, Android Debug `assembleDebug`, and `tsc --noEmit` succeeded.** Jest has leftover test issues (not aliases).

### Completed steps

1. Pinned `react-native@0.87.1`, `react@19.2.3`, `react-test-renderer@19.2.3`; added `@react-native-community/cli@20.2.0` and `@react-native/*@0.87.1`; `typescript@^6.0.3`; `engines.node` `>=22.13.0`.
2. React 19 peers: `react-redux@^9.2.0`, `@reduxjs/toolkit@^2.5.0`.
3. Config: Jest preset, Metro, `tsconfig` extends `@react-native/typescript-config`; `InputField` uses public `TextInputProps`.
4. Removed from `package.json` only (app JS still imports them): maps, geolocation, picker.
5. iOS native: Swift `AppDelegate` (`RCTReactNativeFactory`, module `TaskManager`); removed `AppDelegate.h` / `AppDelegate.mm` / `main.m`; iOS 15.1; Gemfile 0.87 pins; `bundle install` + `pod install`; `CADisableMinimumFrameDurationOnPhone`; removed empty `CC`/`CXX`/`LD`/`LDPLUSPLUS`; kept Podfile, Hermes, autolinking, `TaskManagerTests`.
6. iOS compile reached native code after `.xcode.env.local` `NODE_BINARY`.
7. Native library bumps proven by iOS compile: safe-area-context, screens, svg, gesture-handler (see table).
8. iOS Debug simulator `xcodebuild` **succeeded**.
9. TS 6: dropped `baseUrl` / catch-all / unused `@` aliases.
10. **Option A — no aliases:** relative imports; no `paths` / module-resolver.
11. ESLint: replace custom stack with `extends: '@react-native/eslint-config'`. Drop import/unused-imports/prettier-eslint/`plugin:react-native/all`. Prettier stays CLI-only. Direct plugin deps are npm’s requirement so ESLint can resolve the shareable config (not extra product tooling).
12. Android toolchain aligned to RN 0.87.1 (Gradle 9.4.1, SDK/NDK/Kotlin catalog, `newArchEnabled=true`, AGP 9 ProGuard + template Kotlin opt-outs, `MainApplication` 0.87 bootstrap). `./gradlew assembleDebug` **BUILD SUCCESSFUL**. AsyncStorage not upgraded.

### Current step / blocker

- **Current:** iOS Debug and Android Debug assemble green. `tsc --noEmit` green. `eslint .` loads RN config; remaining lint errors are app/test (`apiClient.test.ts` parse, `react-hooks/exhaustive-deps`). Jest still has leftover test issues.
- Next: product cleanup (maps / geolocation UI leftover) or Jest test fixes.

### Remaining steps

1. Product cleanup: maps / geolocation screens and Info.plist; Jest test fixes.

## Project state (migration-relevant)

| Item | Value |
| --- | --- |
| `react-native` | 0.87.1 |
| `react` / `react-test-renderer` | 19.2.3 |
| Node | engine `>=22.13.0`; this machine uses Node 22 via Homebrew (`/opt/homebrew/opt/node@22/bin/node`) |
| iOS min | 15.1 |
| iOS entry | `ios/TaskManager/AppDelegate.swift` |
| CocoaPods | Gemfile-constrained (resolved ~1.15.2 because `xcodeproj < 1.26`) |
| `.xcode.env` | versioned `NODE_BINARY=$(command -v node)` — do not put machine paths here |
| `.xcode.env.local` | gitignored; `NODE_BINARY` for this Mac |
| Android `newArchEnabled` | `true` |
| Android Gradle | 9.4.1 (wrapper) |
| Android SDK / NDK / Kotlin | minSdk 24, compileSdk 37, targetSdk 36, buildTools 37.0.0, NDK 27.1.12297006, Kotlin 2.2.0 |
| AGP | 9.2.1 via React Native Gradle plugin |
| Experimental SwiftPM | off; keep CocoaPods |

Installed native UI (npm / pods):

- `react-native-safe-area-context` **5.9.1** (`^5.8.1`)
- `react-native-screens` **4.27.0** (`^4.27.0`)
- `react-native-svg` **15.15.5** (`^15.12.1`)
- `react-native-gesture-handler` **3.2.1** (`^3.2.1`)
- `react-native-actions-sheet` `^0.9.7` (peer RNGH `*`; not Reanimated)

## Decisions already made

| Change | Why | Required? | Validation |
| --- | --- | --- | --- |
| Target 0.87.1 + React 19.2.3, New Arch on, not Expo | Locked product/migration choice | Required (agreed target) | Versions in `package.json` |
| Redux bump to `react-redux@^9.2.0`, RTK `^2.5.0` | React 19 peer requirements | Required | Installed (9.3.0 / 2.12.0 range) |
| Remove maps / geolocation / picker from package.json | Out of scope for this app; do not restore | Required for dep set | Packages gone; **JS still imports** — later cleanup |
| Swift AppDelegate + drop ObjC entry | RN 0.87 iOS template | Required | `pod install` succeeded; compile passed this layer |
| iOS 15.1, Gemfile, plist flag, drop empty compiler env vars | RN 0.87 iOS template | Required | `bundle install` + `pod install` |
| Keep Podfile / tests target / Hermes / autolink | No evidence to change | Optional (kept) | Pods include Hermes + autolinked libs |
| `.xcode.env.local` Node path | Xcode scripts used missing `/opt/homebrew/bin/node` | Required on this machine | Build reached native compilation |
| Do not patch Yoga / third-party native source | Upgrade libraries instead | Required process | Followed for safe-area / screens / svg |
| safe-area-context `^5.8.1` | 4.14 Yoga `StyleLength::unit` vs RN 0.87 | Required | Yoga error gone |
| screens `^4.27.0` (was 4.0.0) | 4.0.0 failed RN 0.87 Fabric APIs (`ShadowNode::Shared`, etc.) | Required | That error gone |
| svg `^15.12.1` (was 15.8.0) | 15.8.0 `SharedImageManager` vs RN 0.87 | Required | That error gone |
| gesture-handler `^3.2.1` (was 2.20.2) | 2.x still `#import RCTRootContentView.h` (gone in RN 0.87); 2.32.0 still has it | Required | iOS Debug `xcodebuild` succeeded |
| Keep `react-native-actions-sheet` `^0.9.7` | 10.x needs Reanimated; 0.9.7 peers RNGH `*` | Required (locked) | iOS compile with RNGH 3.2.1 |
| Option A: relative imports only | Small tree; RN default-style tsconfig | Required (agreed) | `tsc --noEmit` exit 0 |
| ESLint = `@react-native/eslint-config` | Replace custom import/prettier-plugin/`all` stack | Required (agreed) | `eslint .` loads; leftover errors are app code |
| Do not enable experimental SwiftPM | Keep CocoaPods | Required (locked) | Pods still used |
| Android Gradle 9.4.1 | AGP 9.2.1 (RN 0.87.1) requires Gradle ≥ 9.4.1 | Required | `assembleDebug` succeeded |
| Android SDK/NDK/Kotlin catalog | Match `react-native/gradle/libs.versions.toml` + 0.87 template | Required | `assembleDebug` succeeded |
| `newArchEnabled=true` | RN 0.87 does not support disabling New Architecture | Required | Android Debug assemble; iOS already New Arch |
| `proguard-android-optimize.txt` | AGP 9 dropped `proguard-android.txt` | Required | Aligns with 0.87 app template |
| `MainApplication` `loadReactNative` | RN 0.87 host bootstrap (replace 0.75 SoLoader + gated `load()`) | Required | `assembleDebug` succeeded |
| Keep `MainActivity.onCreate(null)` | `react-native-screens` | Required (kept) | Not rewritten |
| `android.builtInKotlin=false` / `android.newDsl=false` | RN 0.87.1 template AGP 9 compatibility (not a local hack). AGP 9 built-in Kotlin clashes with template `kotlin-android`. Opt-outs are version-specific; revisit on a later RN upgrade / AGP 10 | Required for 0.87.1 | First assemble failed on duplicate `kotlin` extension; succeeded after these two properties |
| Do not upgrade AsyncStorage for this Android pass | First real blocker was Gradle 8.8 vs AGP 9.2.1, not Room | Required process | `assembleDebug` with existing `^2.0.0` |

## Dependency compatibility

| Package | Previous | Current (range / installed) | Why changed | Validated |
| --- | --- | --- | --- | --- |
| react-native | 0.75.4 | 0.87.1 | Migration target | Installed; iOS pods for 0.87 |
| react | 18.3.1 | 19.2.3 | RN 0.87 pairing | Installed |
| react-test-renderer | 18.3.1 | 19.2.3 | Match React | Installed |
| @react-native-community/cli (+ platforms) | (via RN) | 20.2.0 | RN 0.87 CLI as direct dep | Installed |
| @react-native/* (babel, metro, eslint, jest-preset, tsconfig) | 0.75.x | 0.87.1 | Match RN | Installed |
| typescript | (older) | ^6.0.3 | RN 0.87 toolchain | Installed 6.0.3 |
| react-redux | ^9.1.2 | ^9.2.0 (9.3.0) | React 19 peers | Install only |
| @reduxjs/toolkit | ^2.3.0 | ^2.5.0 (2.12.0) | React 19 peers | Install only |
| react-native-maps | present | **removed** | Out of scope | package.json only |
| @react-native-community/geolocation | present | **removed** | Out of scope | package.json only |
| @react-native-picker/picker | present | **removed** | Out of scope | package.json only |
| react-native-safe-area-context | ^4.14.0 (4.14.x) | ^5.8.1 / **5.9.1** | Yoga StyleLength on 4.x | iOS: Yoga error gone |
| react-native-screens | 4.0.0 | ^4.27.0 / **4.27.0** | RN 0.87 native APIs | iOS: 4.0.0 errors gone |
| react-native-svg | 15.8.0 | ^15.12.1 / **15.15.5** | SharedImageManager | iOS: that error gone |
| react-native-gesture-handler | ^2.20.2 / 2.20.2 | ^3.2.1 / **3.2.1** | 2.x imports removed `RCTRootContentView.h` | iOS Debug compile succeeded |

Unchanged unless a later build forces it: async-storage `^2.0.0` (Android Debug succeeded without upgrade), navigation 7, actions-sheet `^0.9.7`, json-server.

## Known issues

- Jest: leftover test issues (RTK/immer ESM, mock hoisting, RN DevMenu, snapshots/`act`, `apiClient.test.ts` parse). Not import aliases.
- Location Info.plist / geo UI copy still present (product cleanup).

## Validation

| Area | What was run | Result |
| --- | --- | --- |
| JS install | npm install after 0.87 pin + lock regen | Lock/install succeeded |
| iOS pods | `bundle install`, `bundle exec pod install` | Succeeded; Hermes on; maps/geo/picker pods gone |
| iOS NODE_BINARY | `xcodebuild` Debug generic iOS Simulator, `CODE_SIGNING_ALLOWED=NO` | Failed ReactNativeDependencies until `.xcode.env.local` |
| iOS native after Node fix | same `xcodebuild` | Reached third-party compile |
| safe-area 5.x | same `xcodebuild` | Yoga `StyleLength::unit` gone |
| screens 4.27.0 | same `xcodebuild` | 4.0.0 Fabric errors gone |
| svg 15.15.5 | same `xcodebuild` | SharedImageManager gone |
| RNGH 3.2.1 | same `xcodebuild` | iOS Debug **BUILD SUCCEEDED** |
| tsc before ignoreDeprecations | `npx tsc --noEmit` | **TS5101** `baseUrl` deprecated; no source check; IDE **TS17004** |
| tsc after relative imports | `npx tsc --noEmit` | exit 0 |
| Option A | rewrite imports; strip paths + module-resolver | RN default-style tsconfig; Babel is only `@react-native/babel-preset` |
| Android Debug | `cd android && ./gradlew assembleDebug` | **BUILD SUCCESSFUL** (~241 tasks, 158 executed, 83 up-to-date) |

### Import resolution (current)

Relative `../` / `./` only. TypeScript, Metro, Jest, and ESLint use default node/bundler resolution. No `paths`, no Babel aliases, no Jest `moduleNameMapper`.

## Android (0.87.1)

Migrated from a 0.75-era Android tree to the RN **0.87.1** toolchain. Source of truth: installed `node_modules/react-native/gradle/libs.versions.toml` and the 0.87.1 Android template. Not claimed future-proof beyond this RN version.

### Problem / cause / change

| Problem | Cause | Change |
| --- | --- | --- |
| Gradle 8.8 | AGP 9.2.1 needs Gradle ≥ 9.4.1 | Wrapper → `gradle-9.4.1-bin.zip` (`android/gradle/wrapper/gradle-wrapper.properties`) |
| SDK/NDK/Kotlin still 0.75 | Catalog is minSdk 24, compileSdk 37, targetSdk 36, buildTools 37.0.0, NDK 27.1.12297006, Kotlin 2.2.0 | `android/build.gradle` `ext` |
| `newArchEnabled=false` | Unsupported since RN 0.82; 0.87 requires New Arch | `android/gradle.properties` → `true` |
| `proguard-android.txt` | AGP 9 dropped that default name | `android/app/build.gradle` → `proguard-android-optimize.txt` |
| Duplicate `kotlin` extension | AGP 9 built-in Kotlin vs template `apply plugin: "org.jetbrains.kotlin.android"` | Template flags `android.builtInKotlin=false` and `android.newDsl=false` in `gradle.properties`. Keep the Kotlin plugin. |
| 0.75 `MainApplication` | SoLoader + conditional `load()` is not the 0.87 host | `getDefaultReactHost` + `loadReactNative(this)`. Kept `com.taskmanager` and PackageList autolink. |

`settings.gradle` was already autolink-compatible; not changed. `MainActivity.kt` not rewritten.

### Validation

```
cd android && ./gradlew assembleDebug
```

**BUILD SUCCESSFUL.** AsyncStorage / Room / KSP were not added or upgraded.

### Approach that worked

1. Analyze Android vs installed RN 0.87.1 (no edits, no Gradle).
2. Apply one toolchain group (wrapper, catalog, New Arch, ProGuard, `MainApplication`).
3. One build checkpoint; fix only the first meaningful error (Kotlin plugin clash → the two template properties).
4. One more `assembleDebug` → success.

Avoided: treating AsyncStorage `StorageSupplier.kt` / `Unresolved reference 'room'` as the first blocker, then looping dependency/Gradle changes. That was reverted. Lesson: use the **first** configuration/compiler diagnostic; do not upgrade a library because its name appeared in an earlier or later error summary.

Rebuild commands:

```
xcodebuild -workspace ios/TaskManager.xcworkspace -scheme TaskManager -configuration Debug \
  -sdk iphonesimulator -destination 'generic/platform=iOS Simulator' CODE_SIGNING_ALLOWED=NO build

cd android && ./gradlew assembleDebug
```
