# Building for Apps in Toss 02: Revising Ireonna’s temperament descriptions and conversation cards

**Development notes: 15–16 October 2026 · Written: 20 October 2026**

I'm building Ireonna, a temperament test app, for Apps in Toss. The first result screen said 추진표현형—roughly, “Driven–Expressive.” I couldn't tell much about the temperament from that name alone.

In [the previous post](/en/builds/ireonna-build-log), I'd made the first screens and tried them. The buttons took me to the right places, but the explanations on the results screen still needed work.

## Adding the traditional temperament names

Expressive, Driven, Reflective, Steady. I'd chosen these labels to make the ideas easier to understand. But I still needed to read the descriptions, so the names might be even less helpful to someone new to the test. I asked AI to include the traditional names: sanguine, choleric, melancholic, and phlegmatic. Seeing “Choleric · Driven” together might help someone connect it to a term they'd heard before.

![Original Korean development screenshot showing traditional temperament names beside descriptive labels](/images/ireonna-build-log-02/2026-10-15_10_result-after-names.jpg)

*Captured 15 October 2026 · Original Korean development screen after the label change. The scores come from test answers.*

Even then, “high scores in choleric and sanguine” felt vague. What might that combination look like at work or with friends? Some examples would help me understand it.

## Asking for everyday examples

This time, I asked:

> Explain the characteristics of a primary and secondary temperament together on the results screen. Everyday examples would make them easier to understand.

The request above is translated from Korean. AI added examples about starting a team project and planning a trip with friends: arranging dates and transport while sharing photos of places to visit. I found those easier to picture than descriptions such as “action and execution” or “interaction and expression.”

![Original Korean screenshot illustrating a choleric–sanguine combination through work and travel examples](/images/ireonna-build-log-02/2026-10-15_12_combination-daily-examples.jpg)

*Captured 15 October 2026 · Part of the combination explanation. These are examples written for the app, not accounts from real users.*

## Revising the conversation cards, too

Reading the examples reminded me of the conversation cards already in the app. Knowing my temperament wouldn't necessarily help me turn down a manager's request or tell a friend I'd been hurt. I wanted people to be able to choose a sentence for situations like those.

Some people might prefer a gentle approach; others might be more comfortable being brief and direct. I wanted people to be able to pick wording that sounded like them. I also wanted the card to include **“Please speak to me like this”** alongside what they wanted to say.

I asked for a more specific sequence: read the temperament explanation, choose a situation, then pick and edit a sentence. For an extra-work request, I could add the work already on my plate and how much help I could offer to draft a reply.

![Original Korean development screenshot of an extra-work reply using example tasks and a current workload](/images/ireonna-build-log-02/2026-10-15_06_work-reply.jpg)

*Captured 15 October 2026 · An extra-work reply draft. The tasks and schedule are example inputs used to check the flow.*

I still need to check whether those sentences would be useful in an actual conversation. Something can look fine on a screen and feel awkward to say out loud.

In [the next post](/en/builds/ireonna-build-log-03), I'll write about changing the home screen and the result card design. I ended up rewriting quite a bit of the card text, too.
