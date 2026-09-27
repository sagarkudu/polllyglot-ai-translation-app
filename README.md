# 🦜 PollyGlot

PollyGlot is an AI-powered translation application built with React, Node.js, Express, and OpenAI.

Users can enter text, select a target language, and receive an AI-generated translation through a secure backend API.

## Tech Stack

- React + Vite
- JavaScript
- Node.js
- Express.js
- OpenAI API
- REST API
- CSS

## Architecture

React Frontend → Express Backend → OpenAI API → Translation Result

                  POLLYGLOT
                     │
          ┌──────────┴──────────┐
          │                     │
       FRONTEND              BACKEND
       React                 Express
          │                     │
          │ POST /api/translate │
          ├────────────────────►│
          │                     │
          │                     ▼
          │                  OpenAI
          │                     │
          │                     │
          │◄────────────────────┤
          │    translation      │
          ▼
      Result Screen

