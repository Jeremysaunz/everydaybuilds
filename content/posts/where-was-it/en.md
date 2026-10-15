# I built a photo map to find things at home

“Where did I put the charger?”

What if, instead of opening every drawer, you could search for an item by name and see its location in a photo? That was the idea for this tool.

Like the [café training game in my first post](/en/builds/cafe-first-day), it runs as a single HTML file. This time, I tried asking for one more thing: **a tool I could fill with my own photos and item names**.

## Describing the input and what I wanted to happen

My first request was:

> Make an item-location map as a single HTML file. I want to add a photo of a cabinet, mark where things are, and search for them by name.

It wasn’t a long list of features. But it covered what I would put in, what I would do, and what I wanted to see.

- **Input:** A cabinet photo and item names
- **Action:** Mark an item’s position on the photo and search by name
- **Result:** Show where the item is in the photo

These three points gave me a starting point for explaining the tool to AI.

![Searching for a phone charger in the first version of the item map](/images/where-was-it/en/01-first-map.jpg)

*The first version, translated into English and recaptured. Searching for “charger” highlights its saved location. The cabinet is a sample illustration, not a photo of my home.*

The result let me add a photo and label the spots where things were stored. I could also save other search terms, so “cable” or “USB” would find the phone charger.

## Changing the look and the features

The first screen had a quiet color palette. I wanted stronger colors and a character. I also thought children might use it as a game.

I wanted to cover more than one cabinet, too. Things are stored all over a home. Here’s a shorter version of what I asked next:

> I’d like a character and bolder colors. Children might be able to use it as a game, too. Please let me add photos of different rooms, such as a bedroom or closet, and switch between them.

![The English item map with a purple character, room cards, and a search result](/images/where-was-it/en/02-rooms-and-search.jpg)

*After the changes: brighter colors, a character, room cards, and a search across rooms. Bedroom and Closet are still waiting for photos. This and the next screenshot come from the English app.*

Each room could now have its own photo. Searching across the home and selecting a result would take me to the room where that item was stored.

It helped to **separate how the tool should look from what it should do**. “Bolder colors and a character” described the design. “Multiple rooms and search” described the features. Keeping those requests separate made it easier to say what needed changing.

## Using the same information for a finding game

The idea of children using the tool led to a game for finding the saved items.

![A finding-game question with a room hint and numbered spots on the cabinet](/images/where-was-it/en/03-finding-game.jpg)

*Tap the numbered spot where the item belongs. If you get it wrong, try again. A hint shows the room and location note.*

The game uses the same photos and names as the search tool. Instead of typing a name, you answer a question by finding its spot. A round has up to five items and no time limit.

I checked finding an item, viewing a hint, and completing a round. I still need to try it with a child to see whether they enjoy it.

## Using the same approach for your own tool

Changing the photos and names would make this useful in other places, such as classroom cubbies or shared supplies at work.

When asking for a new tool, try filling in these three blanks:

> The input will be ___. When the user ___, show ___. Please make it a single HTML file I can open and use.

You don’t need a lot of information to start. Open the [item-map HTML file](/tools/where-was-it-en.html) and try one photo with three items.

Check that a search shows the right spot, that another name such as “cable” also finds the charger, and that changing a location updates the result. If something is missing, describe what happened and ask for a change.

Photos and item details are saved **in the browser you use**, rather than inside the HTML file. To move to another device, use **Back up map** and take the map backup with you. Before sharing a screenshot, check for addresses, faces, or anything else you’d rather keep private.

This time, the useful step was asking for a small tool I could fill with my own information. **Input, action, result.** Those three points are a practical way to write the first request for your next tool.

*The prompts are translated from Korean. The second is a summary of the original request, as noted above.*
