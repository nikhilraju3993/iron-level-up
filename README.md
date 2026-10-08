# Iron Level Up

Design a modern, interactive fitness application called "IRONLEVEL" for people who want to track and improve their workouts.

Core Concept

The app should make strength training feel like a game and a progression journey, rather than a boring workout tracker. Users should be able to choose between Bodybuilding and Powerlifting, select their experience level, follow structured programs, track their progress, and unlock achievements.

Dashboard

Create a clean but exciting dashboard with:

User profile and profile picture

Current fitness level

Weekly workout streak

Total workouts completed

Current body weight

Personal records (PRs)

Weekly progress

XP / experience points

Level progression bar

Current workout

Quick "Start Workout" button

At the top of the dashboard, prominently display two large sections:

🏋️ BODYBUILDING

Focus on:

Muscle growth

Hypertrophy

Aesthetic physique

Exercise variety

Muscle-group tracking

🏆 POWERLIFTING

Focus on:

Squat

Bench Press

Deadlift

Strength progression

1RM tracking

Competition preparation

Make these two sections visually distinct while keeping the overall design consistent.

Program Levels

Each training category should have three difficulty levels:

BEGINNER

For people new to structured training.

Include:

Beginner-friendly exercises

3–4 training days per week

Basic movement patterns

Simple progression

Technique-focused workouts

INTERMEDIATE

For people with consistent training experience.

Include:

4–5 training days per week

Progressive overload

More exercise variation

Volume management

Strength and hypertrophy progression

ADVANCED

For experienced lifters.

Include:

5–6 training days per week

Advanced programming

Periodization

RPE/RIR tracking

Deload weeks

Advanced progression systems

PR tracking

Workout Screen

Create an engaging workout interface where users can:

See today's workout

View exercises

See sets × reps

Enter weight used

Enter reps completed

Track RPE/RIR

Start rest timer

Mark sets as completed

Add notes

Replace exercises

See previous performance

Automatically calculate progression

Example:

Bench Press
Previous: 60 kg × 5
Today: 62.5 kg × 5
Target: 65 kg × 5

Show a small progress indicator after completing the set.

Gamification

Make the application fun and motivating.

Add:

XP system

Levels

Workout streaks

Achievements

Badges

Daily challenges

Weekly challenges

PR celebrations

Workout completion animations

Personal milestones

Leaderboard option

"Level Up" animations

Example achievements:

🔥 First Workout
💪 10 Workouts Completed
🏆 First PR
⚡ 7-Day Streak
🦾 100 kg Deadlift
👑 500 kg Total
🔥 50 Workouts Completed

When users hit a new PR, show a satisfying celebration screen with confetti and:

NEW PERSONAL RECORD!

Progress Page

Create a detailed analytics section showing:

Body weight graph

Strength progression

1RM progression

Volume progression

Workout frequency

Muscle-group volume

Personal records

Weekly/monthly/yearly statistics

For powerlifters, show:

SQUAT → BENCH → DEADLIFT → TOTAL

For bodybuilders, show:

Chest → Back → Shoulders → Arms → Legs

Exercise Library

Create an exercise database with:

Exercise name

Muscle group

Equipment

Difficulty

Instructions

Sets/reps recommendations

Video/image placeholder

Personal best

Previous performance

Allow users to search and filter exercises.

Personalization

During onboarding ask:

What is your goal?

Build Muscle

Get Stronger

Lose Fat

Improve Athletic Performance

Choose training style:

Bodybuilding

Powerlifting

Experience:

Beginner

Intermediate

Advanced

Training days per week

Available equipment

Current body weight

Main lifts / current strength levels

Then automatically recommend an appropriate program.

Visual Design

Make the UI feel like a combination of a premium fitness app + gaming progression system.

Style:

Dark modern interface

Black/charcoal background

Strong accent colors

Large bold typography

Clean cards

Subtle gradients

Smooth animations

Progress bars

Circular statistics

Modern icons

High-quality fitness imagery

Use different accent colors for Bodybuilding and Powerlifting while maintaining one consistent brand identity.

Avoid making it look like a generic gym app.

The interface should feel:
POWERFUL + PREMIUM + SPORTY + GAMIFIED + MOTIVATING

Navigation

Use a simple bottom navigation bar:

Home | Workout | Programs | Progress | Profile

Make the application responsive for both mobile and desktop.

Important UX Principle

The user should always know:

What am I doing today? → How much should I lift? → How am I progressing? → What should I do next?

Keep the interface simple enough for beginners but powerful enough for serious lifters.

Add realistic sample workout data so the prototype feels like a real application rather than an empty UI.

Give the application a polished, production-ready appearance with consistent spacing, typography, icons, cards, animations, and interactive states.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/01d8052a-d210-5bfe-8dfb-d445a44cd123).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
