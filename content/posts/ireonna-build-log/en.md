# Ireonna build diary 01: turning my own content into an app

**Development: 15 October 2026 · Written: 16 October 2026**

“What if I turned my own content into an app inside Toss?”

The [café training game](/en/builds/cafe-first-day) and [photo map](/en/builds/where-was-it) from my first two posts each run as a single HTML file. This time, I wanted to turn my existing temperament test and class materials into an app.

I looked into Apps in Toss, a platform for offering services inside the Toss app, and called the app **Ireonna (이런나)**, a Korean name that loosely means “this is me.” For this project, I wrote a plan for what I wanted and gave it to AI. [Apps in Toss developer documentation](https://developers-apps-in-toss.toss.im/)

## Starting with content I already had

I brought out the temperament test I’d made for MyEnergyType and materials from my self-understanding classes. They explore what gives us energy in different situations and what feels comfortable when talking with other people.

I wanted to take it a little further than reading a result and thinking, “That sounds like me.” Perhaps there was a way to use that understanding when finding the words to say something.

Take being asked to do extra work. There’s already a full schedule, and another request arrives. It might help to work on a sentence such as, “If you let me know when you need it, I’ll check it against my current schedule.”

So I decided to add **conversation cards for putting what I need into words** alongside the test. I pictured those moments when I’ve composed a whole explanation in my head, but all that comes out is, “Oh. Sure…”

## Giving Codex a plan this time

On 15 October 2026, I wrote a planning document, or PRD. I set out what people could choose on the first screen and what would happen after they answered the questions. I started by working out how I wanted to use the material on screen.

I gave that document to Codex, an AI coding assistant, and asked it to build the app. A short version of the request was:

> Please build an app for Apps in Toss based on this planning document.

The home screen offered two ways to start. **Explore my temperament** led to a 40-question test. **Make a sentence for right now** let people choose a situation and make a conversation card.

I wanted people who only needed a sentence to be able to start without taking the test. Coming in to make one small request and finding 40 questions at the door would be a bit much.

![An English reading copy of the early Korean home screen, showing two ways to start](/images/ireonna-build-log/en/01-home-reading.jpg)

*English reading copy of the Korean screen captured on 15 October 2026. The original placed “Make a sentence for right now” and “Explore my temperament” side by side. This translated reference was made for the post; the app itself is in Korean.*

Once there was a screen to try, I asked:

> Run the app and open it in a browser so I can try it myself.

I found the start buttons, answered questions, and moved to the next screen. Writing the plan had meant thinking about the features I wanted. Clicking through the app made me look at what to press next and whether the words on screen made sense.

Giving AI the plan still left me with things to read and decisions to make. It was good to have actual buttons to press, though.

## Reading the words on the card

I tried the conversation card with an example situation. Answering the questions produces wording that I can edit. The example for being asked to take on extra work produced this card.

![An English reading copy of an example conversation card, with a request and a commitment from the speaker](/images/ireonna-build-log/en/02-conversation-card-reading.jpg)

*English reading copy of a PNG exported by the Korean app on 15 October 2026, using example answers. Below the request is something the speaker will do as well. The original export is in Korean.*

The part I paid particular attention to was **What I’ll do, too**.

I put the request to the other person at the top and my own commitment underneath: if I can’t decide straight away, I’ll say when I can give an answer. A card asking for consideration would be a little awkward if it only created more work for the other person.

So far, I’ve checked that the words appear on screen and in the card. Whether people would reach for it during a difficult conversation is still an open question. That needs to come from people who have tried it.

## Deciding to revisit the temperament labels

As I tried the app, I read the temperament labels again: 표현형, 추진형, 성찰형, 안정형—roughly Expressive, Driven, Reflective, and Steady. I’d chosen those words to make the ideas easier to understand. Being familiar to me didn’t necessarily make them clear to someone seeing them for the first time.

I decided to add explanations and everyday examples beside the names. I’ll cover how I changed those labels and explanations in the next post.

I’m currently developing the app in a browser on my computer. Testing it inside the Toss app, review, and release are still ahead. The images in this post show a development version and example material.

This time, I organized material I already had, gave it to AI, and tried the screens that came back. I asked for an app and ended up revisiting my own explanations, too.
