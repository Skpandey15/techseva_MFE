// Async boundary — do NOT import React or any shared singleton here.
// This dynamic import allows Module Federation to negotiate
// the shared scope before any shared module is evaluated.
import('./bootstrap')
