# FARaD: Fast Async Reviews and Development

## Motivation

During the 2024 and 2025 seasons, Team 20 experimented with "new" git workflows in an attempt to streamline development and make the process easier after some experience in the 2023 season. While many improvements were made, there was still some unexpected struggles faced with git development. One of the identified areas of improvement was with education and culture around git. This document attempts to codify some of the workflows to fix that.

## Background

As of 2025, these are the workflows used to improve our git workflow:

- Automated CI workflows via GitHub Actions to ensure code, at a minimum, is formatted and compiles
- Branch protection on `main` to prevent unreviewed code from making it to main
- A standard of ensuring `main` is never broken
- Using intermediate "staging"/"pre-main" branches where almost complete code is actively worked on to ensure main works
- Pull requests for reviewing code
- Use of squash and merge to keep git history clean
- Ensuring code is pushed after meetings/practice field days so people can review the code
- Rebasing and force pushes to update branches

These workflows helped with code review and development, but there were some flaws with it:

- First, updating main is hard because rebasing and force pushing is incredibly difficult to deal with when multiple people are working on one branch. You constantly have to tell people to delete their branches, fetch, and then checkout the branch again, which is a pain.
  - Note that we could use merge commits, but the author has a strong dislike of merge commits due to bad experiences with conflict resolution causing critical code to be accidentally removed. Rebase and merge feels "safer" due to the fact you're reapplying every commit on top.
- Intermediate branches mean the purpose of branch protection is totally bypassed and unreviewed code gets in.
- Additionally, it's kinda redundant to have main, and then another branch that's a _de facto_ main.

These problems are a result from attempting to do collaborative programming in an ad-hoc fashion while also trying requiring everyone to have updated code and from a desire to keep main functional.

One side workflow that was attempted was the use of small, targeted pull requests to main that would be reviewed quickly by notifying one of the lead reviewers, either in-person or digitally. This seemed to work decently and is now the basis of FARaD.

## FARaD: a new git workflow

FARaD solves these problems by encouraging heavy branching, fast reviews on pull requests, and a looser criteria for merging into main. It solves two problems: async work and merging into main.

### Working collaboratively and asynchronously with branches

Typically, every mechanism typically gets a branch, because that makes logical sense and matches the concept of feature branches. One issue with the previous collaborative workflow is too many people kept changing code on the same branch and it made updating harder and introduced lots of merge commits. To fix this, one person needs to become the maintainer of the branch, typically the original author. This person essentially needs to gatekeep the branch, prevent unauthorized changes, and review all incoming changes.

For in-development branches, here's the workflow for two people trying to collaborate:

1. Developer A has pushed a branch implementing some mechanism.
2. Developer B wants to make changes. They communicate that they want to make changes and get approval from Developer A to make changes. They branch off Developer A's branch, commit changes, make a pull request, and then notify Developer A, starting the review process.
3. Developer A responds quickly and the two devs discuss and review the changes.
4. When the discussion is finished, the PR is either merged or rejected. The branch is then deleted and if it was merged, everyone updates their branches.

This entire workflow should ideally happen within the span of a day. In-development branches move fast, and people can continue working on branches asynchronously. Changes should be relatively small and easy to review so they can be incorporated fast. This process breaks down if people do not respond quickly because changes can be made in the meantime, and it makes keeping the changes updated harder.

Note: the above workflow can and should be bypassed if possible by literally working with the person in real life. The entire idea is to move fast, and it's much faster to work in real life and avoid merge conflicts than if you do _everything_ in branches. The above workflow is best suited for say, finishing some work after a meeting is over, making a PR for it, and then merge by the start of the next meeting.

### Criteria for merging into main

For main, the criteria for whether or not to merge a branch in has been loosened. Ideally, the code still needs to work, but it previously required a physical test to be done on a robot. This is difficult because the robot simply isn't done until late in the season, and normal git workflows don't apply at that point. So instead, the minimum criteria is that the code must've been tested and verified to work in sim. Hacks to "make it work" are disallowed, especially if they are sim-specific. The sim behavior should match real life, but the exact physics may not be the same. Once sim behavior has been validated, the branch can be merged into main.

Tests on the physical robot are, of course, still needed. The idea here is that if the physical robot behaves differently, a branch should be made to fix the behavior and make sim match real life (no point in having different behavior between the two). Following the workflow above, these changes should be PRed, reviewed, and merged quickly. And once a physical test has been performed and the code validated, changing that code should be done with more caution. The code has been confirmed to work at that point, and changes could break it. Sim of course should be used to validate behavior ahead of time, but it may not be enough to cover all cases (some sensors may not be simulated, so you might not be able to verify that behavior.) If behavior can't be validated in sim, it should require a physical test before merging.

### Updating branches

TODO: what to do about rebases?

## Final remarks

If you are familiar with Agile/Scrum/extreme programming, you may notice some similarities. One key difference is that FARaD is a set of guidelines, _not something you must adhere to_. Exceptions will be necessary at times, and you shouldn't feel pressured to follow FARaD in those cases if you know what you're doing will be better. However, bypassing FARaD all the time might lead to unorganized work, so you'll need to use good judgment to decide how to best develop robot code.
