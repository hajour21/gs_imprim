<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/6e98b2ab-a137-466d-99f4-9b7d9f092fc5

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Local Firebase

Prerequisite: install a JDK so that the Firestore emulator can run.

Start the Firebase emulators in one terminal:

`npm run emulators`

Then start the application in another terminal:

`npm run dev`

The local Firebase Emulator UI is available at http://127.0.0.1:4000.
When deploying, set the `VITE_FIREBASE_*` variables with the Firebase web app configuration and set `VITE_USE_FIREBASE_EMULATORS=false`.
