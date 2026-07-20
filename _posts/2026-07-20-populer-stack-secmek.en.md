---
layout: post
lang: en
permalink: /en/blog/populer-stack-secmek/
translation_url: /blog/populer-stack-secmek/
title: "Choosing a Popular Tech Stack: Why Not Niche?"
date: 2026-07-20
summary: "AI writes its best code in the technologies it has seen most in its training data. On why stack choice in vibe coding should lean 'boring and mainstream' — with a real example from the series project."
tags: [vibe-coding, tech-stack, ai]
draft_series: "Vibe Coding Journey"
roadmap_topic: "Choosing a Popular Tech Stack: Why Not Niche?"
---

> The sixth post in the "Vibe Coding Journey" series. The planning chapter is
> done; now we move to code and standards. First question: which technologies
> will you work with?

When you write code on your own, technology choice is largely a matter of
taste. In vibe coding, a new factor enters the equation: how well the model
knows that technology. That's why the advice at this stop of the series will
sound boring — pick what's popular and mainstream, stay away from what's
niche.

## What does the model know well?

Large language models are trained on publicly available code. The more
widespread a framework is, the more examples of it exist in the training
data: official docs, open-source projects, Stack Overflow answers, blog
posts. In technologies like React, Python, and PostgreSQL, the model has seen
millions of examples; it produces what you're asking for in the shape it has
already been written thousands of times.

In a niche or very new framework, that pool of examples is thin. The model
still answers — but it fills the gaps with guesses.

The series' invoice-tracking project is itself a quiet example of this
principle: from the start we've been working with plain Node.js and built-in,
"boring" tools like `node:test`. Across five posts, we haven't hit a single
made-up API call in the agents' generated code — that's not a coincidence,
it's a consequence of the ground we chose.

## The cost of going niche

Those guesses hurt in three practical ways. First, the model invents APIs
that don't exist: function names, parameters, and config keys look plausible
but aren't real. Second, it mixes versions: for a library it has seen few
examples of, it can blend old and new APIs in the same file. Third, and most
insidious: verifying the generated code gets harder too. In a popular stack,
searching an error message turns up dozens of solutions; in a niche stack,
you're usually alone.

It's no coincidence that the app builders
[covered earlier in the series]({{ '/en/blog/vibe-coding-araclari/' | relative_url }})
install the same popular technologies by default; the people building those
tools also know the model performs best on the ground it knows best.

## If unsure, ask the model

You can also get AI's help with stack choice — as long as you ask the
question right. The next big step in our invoice-tracking project's plan is a
web interface; I actually asked:

```text
My invoice tracking project is a dependency-free Node.js REST
service (in-memory store, tests with node:test). I now want to add
a small web interface on top: invoice list, an add form, a due-date
summary. Recommend a widespread, well-documented tech stack that is
well represented in your training data. Don't recommend niche or
very new frameworks. Write a one-sentence rationale for each choice.
```

The answer that came back (translated from the actual run):

```text
- React (with Vite) — the de facto standard for component-based
  UIs; huge community, examples and documentation.
- Vite — near zero-config, fast dev server and build tool; the
  mature successor to Create React App.
- React Router — the standard routing library for moving between
  pages like invoice list/detail.
- Plain fetch API — built into the browser for calling the REST
  service; no extra dependency needed.
- CSS Modules or plain CSS — enough for a small interface; easy to
  learn and supported everywhere.

If you want to stay even lighter, plain HTML + vanilla JavaScript
is more than enough at this scale; but if you're planning to grow,
React is the safe choice.
```

Not a single surprise in the list — and that's exactly the point. Asking for
the technology the model "knows best" rather than "the coolest" is the whole
trick of this prompt. The caveat at the end is worth noting too: at this
scale, plain HTML + vanilla JavaScript also does the job. The far end of
boring and mainstream is using no framework at all.

## If a niche stack is a must

Sometimes you don't have a choice: the team already uses a niche framework,
or the problem genuinely requires a special tool. That doesn't mean you can't
do vibe coding; it means you have to close the gap yourself. Bring the
framework's current documentation into context — paste the relevant pages
into the session or summarize them in the project context file. Also state
the version you're using explicitly; since the model can drift into old API
patterns even in popular frameworks, this is a good habit in every case:

```text
## Stack
- Web framework: <name and version>
- Database: <name and version>
- Don't suggest any API without a stated version; ask if unsure.
```

And review generated code in a niche stack even more carefully: this is where
the model's likelihood of making things up is highest.

## Summary

In vibe coding, stack choice is no longer only about what you know — it's
also about what the model knows. Popular, "boring" technologies give the
model firmer ground; niche choices grow the risk of invented APIs and mixed
versions. If niche is a must, move the docs into context, pin the versions,
tighten the review.

---

*Next post: Setting Standards Early: Review the First Outputs Carefully*
