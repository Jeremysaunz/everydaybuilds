# Ireonna, a temperament test app (part 03): I redesigned the cards and fixed the text and buttons, too

**Development notes: 15–21 October 2026 · Written: 22 October 2026**

I wanted to turn the test results into cards people could post on Instagram. I asked for different colors and short, clever wording. Some of the text sounded good, but I had to read it a few times to work out what it meant.

In [the previous post](/en/builds/ireonna-build-log-02), I revised the temperament descriptions and the content of the conversation cards. This time, I changed the home screen and result card design. I also rewrote some text and fixed a button that wasn't visible on a phone-sized screen.

## Adding card previews to the home screen

The first home screen had an example card and two starting buttons. I changed it several times as I added features. I wanted to give visitors a better idea of the cards they could get after the test. A few examples might explain the app more easily than a description alone.

I looked at other websites for reference and changed things such as the background colors and heading size. I also added a way to browse a few cards before starting the test.

![Before: the original Korean home screen from 15 October](/images/ireonna-build-log-03/2026-10-15_home-before.jpg)
![After: the Korean home screen with card previews on 21 October](/images/ireonna-build-log-03/2026-10-21_home-after.jpg)

*Original Korean web captures: 15 October 2026 on the left, 21 October on the right. Their widths are 360 and 390px; the later screen has an existing test result saved. Tap an image to open the original.*

## I wasn't sure what my own card meant

One result card said, “Even directness needs warmth.” I had a rough idea of what that meant, but it didn't tell me much about the temperament. I felt I needed to explain a sentence in my own app.

I asked AI to look at how other services and public social posts described similar things. I wasn't looking for sentences to copy. I wanted ideas for explaining temperament in everyday language.

We changed the line to “I make plans and bring people together.” The example dialogue became “Sounds good. Let's do it together. I'll take this part.” I could see straight away that it was describing someone who plans things and gets people involved.

![Before: a Korean result card with an abstract headline](/images/ireonna-build-log-03/2026-10-17_card-before.jpg)
![After: the same combination with an everyday description and spoken example](/images/ireonna-build-log-03/2026-10-17_card-after.jpg)

*Captured 17 October 2026 · Before and after the copy change for the same choleric–sanguine combination, using test answers. The screenshots remain in their original Korean.*

## The Next button was off-screen on mobile

After revising the text, I tried the test at a phone-sized width. I chose an answer, but couldn't see Next. I had to scroll down to reach it. The question and answers were too long to fit on one screen.

I shortened the questions and reduced the space used by menus and gaps during the test. I fixed Next to the bottom of the screen. When I opened it again at the same size, all five answers and the button were visible together. I also adjusted cramped text boxes and places where text was being cut off.

![Before: a Korean test screen with some choices and Next below the visible area](/images/ireonna-build-log-03/2026-10-21_quiz-before.jpg)
![After: all five choices and a fixed Next button on the Korean test screen](/images/ireonna-build-log-03/2026-10-21_quiz-after.jpg)

*Captured 21 October 2026 · Both screens are 390 × 700px. The question wording changed along with the layout.*

I'd started by asking for a better-looking design. Once I tried it, I could point out the particular things I wanted changed: describe the temperament through everyday behavior, and keep the answers and Next visible together on the test screen.

I still need to test it inside Toss and go through the registration process. I'll write about that in the next post.
