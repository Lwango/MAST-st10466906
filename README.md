```
# ST10466906 – React Native Restaurant Menu App

## Overview
A React Native app that lets a chef build a live menu by selecting pre-defined dishes or creating custom ones, then viewing them in a 3-column Home screen with live counts. No permanent storage – data lives only while the app is open (Part 2 requirement).

## Features
- Add menu items: name, description, price, course (Starters/Mains/Desserts)
- 9 pre-defined dishes (3 per course) + custom dish creator
- 3-column Home grid with live counts
- Inline “Missing info” banner for empty custom fields
- Changeable background image (Home screen only)

## Install & Run
```bash
cd MAST-st10466906
npm install
npx expo start
```
Scan QR with Expo Go or press `w` for web.

Change background: drop image into `assets/` and update line 21 in `src/screens/HomeScreen.tsx`.

## User Flow
1. Home → 3-column menu with counts  
2. Tap “+” → AddMenuScreen  
3. Tap sample dishes (red = selected)  
4. Fill custom form → course buttons → “Add to Menu”  
5. “Missing info” banner if custom fields empty  
6. Auto back to Home → new dish appears instantly

## Key Files
```
src/screens/HomeScreen.tsx        // 3-column menu + background
src/screens/AddMenuScreen.tsx     // samples + custom creator
src/data/sampleDishes.ts          // 9 pre-made dishes
src/types/MenuItem.ts             // dish interface
assets/bg.jpg                     // background image
App.tsx                           // navigation stack
```

## Tech Stack
- React Native 0.81.5  
- TypeScript  
- Expo CLI  
- React Navigation  

## References (Harvard)
Kimia, 2025. Moonshot AI – Kimi Chat. [Online] Available at: https://kimi.moonshot.cn [Accessed 20 October 2025].  
Google LLC, 2025. Google Search. [Online] Available at: https://www.google.com [Accessed 13 October 2025].  
YouTube, 2025. React Native Tutorials. [Online] Available at: https://www.youtube.com [Accessed 20 October 2025].  
Burger King Corporation, 2025. Menu & Nutritional Information. [Online] Available at: https://www.burgerking.com [Accessed 10 October 2025].

[](https://github.com/Lwango/MAST-st10466906.git)

End of README – ST10466906
```
