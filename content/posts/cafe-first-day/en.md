# Vibe coding with ChatGPT: building a café training game

Have you used AI for restaurant ideas or help with an email? What about asking it to build a program?

For a while, I used ChatGPT for exactly what the name suggests: chatting. That alone seemed pretty impressive.

Then I started asking it to build the small programs I’d often wished I had.

My first build was **a game for new café staff to practice the steps for making drinks**. I described what I wanted, tried the result, and asked for changes.

That’s **vibe coding**: you describe what you want, and AI writes the code.

The finished game is available through **Try the game** at the top of this post.

### Tools and time

**AI used** ChatGPT

**Time** Less than an hour of spare time

**Exchanges** Three or four

**Result** A single HTML file that opens in a web browser. No installation or account required.

## An idea at a café I often visited

I was at a café I often visited when the idea came to me.

When new staff join a café, they have to learn the steps for each drink: read the order, choose the cup, and remember which ingredient goes in first. I thought a game could help them practice that sequence.

The same idea could apply to getting ready for school, learning to use a phone, or training a new coworker. Each involves **a sequence of steps to learn**.

## The first prompt:

My first prompt was along these lines:

> I want to make a game that lets new café staff practice the steps for making drinks. Please make it a single HTML file that I can open and use.

An HTML file opens in your web browser. There’s nothing to install; you open the file and it runs.

This was the first result.

*The original screenshots were in Korean. The versions below have English text.*

![The first version of the café training game](/images/cafe-first-day/en/01-first-result-v2.png)

*The first screen: read an order, choose a cup, and pick the steps to make a drink.*

The game worked. I was less sure whether it covered enough to be useful for training new staff.

## The second prompt: adding training content

I don’t know much about training café staff. I asked ChatGPT to check whether the game was missing anything and whether new users might get stuck.

> Please check whether the training is missing anything a new staff member would need. Make the game easier to use and improve the design too.

![The start screen after improving the training flow](/images/cafe-first-day/en/03-training-flow-v2.png)

*Start with the basics, read the café’s recipes, then try making a drink.*

You could now choose which drinks to practice, follow the guidance, or try it from memory. The game also covered checking orders, keeping things clean, and handling mistakes—topics I hadn’t included in the first request.

A trainer would need to check the content before using it at a café.

## The third prompt: adding ingredients to a cup

Up to this point, you practiced by pressing buttons labeled with the steps for making a drink.

![The practice screen before adding ingredients directly to the cup](/images/cafe-first-day/en/05-before-cup-v2.png)

*You picked what to do next from a set of written options.*

Just pressing buttons felt a bit limited. I thought it would feel more like a game if you could see ice and milk going into the cup. So I sent another request.

> It would feel more like a game if you could put ice, milk, and espresso directly into a cup and see the drink being made. Please make it work that way too.

![The cup after adding ice, milk, and espresso](/images/cafe-first-day/en/06-interactive-cup-v2.png)

*Click an ingredient or drag it into the cup to make the drink. The cup is an illustration of the process; follow the café’s recipe for real amounts.*

Ice piles up in the cup, while milk and espresso appear as layers of different colors. If you get the steps out of order, you can empty the cup and start again. You can now practice by filling the cup yourself.

## Testing and making changes

The first prompt didn’t include basics questions or an interactive cup. I started with a game for choosing the steps, then added training content and a way to fill the cup.

After each change, I ran the game myself. I checked that I could add ingredients, empty the cup and start again, and pause and resume.

If something goes wrong, describe what happens: “Nothing happens when I tap the button.” “The text is too small on my phone.”

## Planning your own tool

A task you explain repeatedly or a checklist you keep on paper could be a starting point. When writing the first prompt, it helps to outline four things:

**Who** will use it? **When**? **What** should they be able to do? **How** do you want to open it?

For example:

> I want to make a packing checklist my family can use together before a trip. We should be able to add items and check them off as we pack. Please make it an HTML file I can open in my phone’s browser.

> I want a checklist that helps my elementary-school child get ready for school on their own. When they tap brushing teeth, getting dressed, and packing their bag, a little message of praise should appear. Please use big buttons that are easy for a child to tap, and make it an HTML file that opens in a browser.

> I need a calculator for splitting a group bill. When I enter the number of people and the total spent, it should show how much each person owes, with a copy button so I can paste the result into our group chat. Please make it a single HTML file.

### Opening and sharing the file

If ChatGPT replies with a long block of code, ask, “Please give me a downloadable HTML file.” Double-click the file to open it in your browser. You can make the same request with other AI tools, such as Claude.

The file can be opened in a browser on a computer or phone. You can send it through a messaging app, though apps handle files differently on phones. For a group, it’s often easier to put the file online and share a link.

## The finished file

You can open the [Café First Day HTML file](/tools/cafe-first-day-en.html) and try it yourself.

I’ll keep a record here of the programs I build and the changes I make.

*The three prompts for this game are translated from Korean. The first two are lightly edited for readability.*
