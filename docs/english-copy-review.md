# 영어 문구 재검수 — 2026-10-12

- 범위: 홈, 상단 메뉴, 글 목록, 첫 글 전체, 소개·문의·개인정보 안내, 체험 게임의 안내·버튼·피드백, 번역 캡처 네 장.
- 원칙: 한국어 원고의 경험과 기능을 유지하고, 영어판은 작성자의 일인칭 말투와 자연스러운 영어로 다듬는다. 실제 카페 운영이나 교육 효과에 관한 새 주장을 추가하지 않는다.
- 대표 수정: 글 제목을 `I asked AI to build a café training game`으로, 문의 제목을 `Have a question or an idea?`로 수정했다. 게임의 `Guided learning`은 `Guided practice`, `Next preparation step?`는 `What comes next?`로 다듬었다.
- 게임 번역 사전에서 78개 문구를 다듬고, 작업 단계와 JSON 내보내기·불러오기·파일 크기 오류의 표현을 수정했다.
- 개인정보 안내에서 이미 제거된 요청문 복사 버튼 설명을 두 언어에서 삭제했다.
- 이미지 방식: 내장 ImageGen의 `text-localization` 편집. CLI/API 모드를 사용하지 않았다. 이전 영어 번역 이미지는 유지하고 아래 v2 이미지를 새로 저장했다.

## 현재 웹페이지에서 사용하는 이미지

- `public/images/cafe-first-day/en/01-first-result-v2.png`
- `public/images/cafe-first-day/en/03-training-flow-v2.png`
- `public/images/cafe-first-day/en/05-before-cup-v2.png`
- `public/images/cafe-first-day/en/06-interactive-cup-v2.png`

한국어 원본과 그 점수·주문 번호·제조 단계는 유지했다. 번역 이미지라는 안내를 영어 글에 계속 표시한다.

## 최종 이미지 편집 프롬프트

```json
[
  {
    "file": "01-first-result.png",
    "prompt": "Use case: text-localization. Edit target: the attached English-localized screenshot of a historical Korean café training game, for a bilingual blog. Proofread ONLY the specified English text. Keep the exact original layout, café-green and cream palette, typography hierarchy, margins, controls, images and ALL game state and numbers. No redesign, no extra features, no cropped content, no watermark. Render the replacements legibly, verbatim, with natural line wrapping. Preserve all other text and visual elements.\nReplace these texts:\n'First order. Stay calm.' -> 'Your first order. One step at a time.' (keep two lines)\n'PRACTICE MAKES CALM' -> 'PRACTICE BUILDS CONFIDENCE'\n'Read the drink' -> 'Read the order'\n'Drink-making sequence practice for new café staff' -> 'Drink-making practice for new café staff'\n'You can try again after mistakes.' -> 'Made a mistake? Try again.' within its existing paragraph.\n'Start 5-order practice' -> 'Practice 5 orders'\n'Separate cups for cold and hot drinks.' -> 'Choose a cup for a hot or cold drink.'\n'Choose ingredients and tasks in order.' -> 'Follow the recipe step by step.'\nPreserve the left Before you begin recipe-warning paragraph and the bottom offline HTML explanation. Preserve 1 completed session and both scores 98. Preserve no interactive cup in this first version."
  },
  {
    "file": "03-training-flow.png",
    "prompt": "Use case: text-localization. Edit target: the attached English-localized screenshot of a historical Korean café training game, for a bilingual blog. Proofread ONLY the specified English text. Keep the exact original layout, café-green and cream palette, typography hierarchy, margins, controls, images and ALL game state and numbers. No redesign, no extra features, no cropped content, no watermark. Render the replacements legibly, verbatim, with natural line wrapping. Preserve all other text and visual elements.\nReplace these texts:\n'Learn slowly. Make each cup right.' -> 'Take your time. Get each drink right.'\n'First order. Stay calm.' -> 'Your first order. One step at a time.' (keep two lines)\n'Learn the basics and make each cup accurately.' -> 'Learn the basics and get each drink right.'\n'Asking when unsure is a barista skill too.' -> 'Knowing when to ask is part of being a good barista.'\n'Choose drink practice' -> 'Choose drinks to practice'\n'Guided learning' -> 'Guided practice' (both occurrences)\n'See standards and the next step.' -> 'Follow the recipe with step-by-step guidance.'\n'Check your memory without hints.' -> 'Try it from memory, without hints.'\n'Only café-entered quantities are tested. Verify example recipes before real training.' -> 'Measurement questions use the quantities entered in Café settings. Have your trainer check the sample recipes before using them for training.'\n'Start selected drinks' -> 'Start practice'\n'First-try basics answers' -> 'Correct on first try'\n'Practice scores are for review. Check actual preparation with your trainer.' -> 'Practice scores are for review. Have your trainer check your hands-on work.'\nKeep 0 / 9 scenarios, 6 drinks, 0 verified recipes, 5 orders selected, all six selected drinks and practice stats 0,0,0 / 0 exactly."
  },
  {
    "file": "05-before-cup.png",
    "prompt": "Use case: text-localization. Edit target: the attached English-localized screenshot of a historical Korean café training game, for a bilingual blog. Proofread ONLY the specified English text. Keep the exact original layout, café-green and cream palette, typography hierarchy, margins, controls, images and ALL game state and numbers. No redesign, no extra features, no cropped content, no watermark. Render the replacements legibly, verbatim, with natural line wrapping. Preserve all other text and visual elements.\nReplace these texts:\n'Learn slowly. Make each cup right.' -> 'Take your time. Get each drink right.'\n'Guided learning' -> 'Guided practice'\n'Next preparation step?' -> 'What comes next?'\n'Choose step 1 / 5.' -> 'Step 1 of 5: choose the next action.'\n'Check café standard' -> 'Check your café’s cup size'\n'Prepare a hot cup' -> 'Prepare a cup for a hot drink'\n'Pour filtered water' -> 'Pour in filtered water'\n'Close the lid and wipe the cup exterior' -> 'Secure the lid and wipe the outside of the cup'\n'Choose one step at a time in recipe order.' -> 'Follow the recipe one step at a time.'\n'Practice scores are for review. Check actual preparation with your trainer.' -> 'Practice scores are for review. Have your trainer check your hands-on work.'\nKeep Iced Americano ticket #01, 1 / 3 orders, step 1 / 5, progress 3 / 4, 0 mistakes, and all seven written-step choices. Do not add a cup or ingredient station."
  },
  {
    "file": "06-interactive-cup.png",
    "prompt": "Use case: text-localization. Edit target: the attached English-localized screenshot of a historical Korean café training game, for a bilingual blog. Proofread ONLY the specified English text. Keep the exact original layout, café-green and cream palette, typography hierarchy, margins, controls, images and ALL game state and numbers. No redesign, no extra features, no cropped content, no watermark. Render the replacements legibly, verbatim, with natural line wrapping. Preserve all other text and visual elements.\nReplace these texts:\n'Learn slowly. Make each cup right.' -> 'Take your time. Get each drink right.'\n'Guided learning' -> 'Guided practice'\n'Next preparation step?' -> 'What comes next?'\n'Task 5 / 5 · Use the ingredients and tools directly.' -> 'Step 5 of 5 · Use the ingredients and tools to make the drink.'\n'Check café standard' -> 'Check your café’s cup size'\n'Close the lid and wipe the cup exterior.' -> 'Secure the lid and wipe the outside of the cup.' (recipe guide)\n'Close the lid and wipe the exterior.' -> 'Secure the lid and wipe the outside of the cup.' (finish-cup card)\n'Cup volume and color show the sequence only. Follow your café recipe for actual measurements.' -> 'The cup’s fill level and colors illustrate the steps. Follow your café’s recipe for actual quantities.'\n'Practice scores are for review. Check actual preparation with your trainer.' -> 'Practice scores are for review. Have your trainer check your hands-on work.'\nKeep Iced Café Latte ticket #03, 3 / 3 orders, step 5 / 5, progress 3 / 4, 0 mistakes, cup with ice/milk/espresso layers and no lid, four completed steps, all five ingredient/tool cards including the unfinished Finish cup card exactly. Keep all colors and illustrations."
  }
]
```

## 교육 흐름 이미지의 추가 수정

Use case: text-localization. Edit only one missed label in this English café training screenshot. In the third small pathway card below the hero, replace 'Guided learning or Solo practice' with the exact text 'Guided practice or solo practice'. Do not change any other text, typography, imagery, layout, colors, margins, numbers, progress, selections or game state. Keep the revised two-line headline, all English text and all zero-valued practice statistics exactly as supplied. Make a faithful copy with only that single text replacement.


## 확인 결과

- 프로덕션 빌드와 수정한 TSX 파일의 ESLint 검사 통과.
- 한·영 페이지 9곳의 응답·문구와 v2 이미지 네 장의 실제 제공 파일 확인.
- 320px 화면에서 한·영 메뉴, 영어 글, 영어 게임 홈과 설정 화면의 가로 넘침 없음.
- 고정 헤더 아래에서 글 목차 이동이 정상이며 제목을 가리지 않음.
- 영어 게임 JavaScript 구문과 변경된 레시피 문장의 재료·도구 동작 판별 10개 확인.
- 게임의 레시피 개수, 제조 단계 수, 결과 인쇄·파일 크기 오류·JSON 버튼 문구도 확인.
- 한국어 게임은 제공받은 원본과 바이트 단위로 동일.
- 커밋·푸시·배포 없이 로컬 변경 상태로 유지.
