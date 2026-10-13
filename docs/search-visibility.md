# Everyday Builds 검색 노출 작업

작업일: 2026-10-13. 현재 실제 제작 도구는 카페 첫날 1개, 제작기는 한국어·영어 각 1편이다. 검색 순위·검색량·유입 실적은 아직 확인되지 않았다.

## 검색어와 목적을 연결하는 방식

| 검색 의도 | 우선 검토할 검색어 | 제공 페이지 |
| --- | --- | --- |
| 실제 도구 체험 | 카페 신입 교육 게임, 음료 제조 순서 연습, 카페 레시피 연습 | `/ko/tools/cafe-first-day` + 실제 게임 |
| 카페 초보의 사용 질문 | 카페 알바 레시피 외우기, 카페 신입 교육 | 안내 페이지의 사용법과 질문 답변. 교육 성과를 보장하지 않는다. |
| AI로 만드는 과정 | AI로 HTML 게임 만들기, AI 카페 교육 게임 만들기, AI로 작은 도구 만들기 | `/ko/builds/cafe-first-day`, 홈과 제작기 목록 |
| 영어 사용자의 도구 탐색 | café staff training game, drink-making practice game | `/en/tools/cafe-first-day` + 영어 게임 |
| 영어 사용자의 제작 탐색 | build an HTML game with AI, café training game with AI | `/en/builds/cafe-first-day` |

검색 결과의 주제와 실제 콘텐츠를 비교한 후보다. 검색량 도구로 수치를 확인한 키워드가 아니며, 고검색량·낮은 경쟁도·상위 노출이라고 표현하지 않는다. 광범위한 ‘AI’보다 한 가지 필요에 답하는 구체적인 검색어를 우선한다.

2026-10-13 공개 검색에서 ‘카페 알바 레시피 교육’ 계열에는 레시피 암기와 실제 근무 경험을 다루는 글이 보였고, ‘AI HTML 게임 만들기’에는 만드는 과정과 게임 예제를 보여주는 글이 보였다. 영어 검색에서는 [BaristaPractice](https://baristapractice.com/)와 [My Barista Trainer](https://mybaristatrainer.com/)처럼 레시피 연습을 중심으로 한 실제 제품도 확인했다. 순위나 시장 규모를 측정한 결과는 아니다.

## 적용 내용

- 공개 페이지를 빌드 때 정적으로 렌더링해 본문·검색 메타데이터를 완성된 HTML로 전달한다. 루트 `/`는 한국어 홈으로 영구 이동한다.
- 기존 원고·홈 화면을 유지하면서 검색 제목과 설명을 보완했다. 검색 제목은 글에 나온 경험과 기능을 표현한다.
- 제작기와 별도로 한국어·영어 도구 안내를 제공한다. 기능, 시작 순서, 저장 방식, 사용 한계와 질문 답변을 서버에서 렌더링한다.
- 사이트·작성자·제작기·도구·탐색 경로 정보를 JSON-LD로 제공한다. 실제 별점·후기·교육 성과·게시일을 만들지 않는다.
- Open Graph 이미지, Twitter 카드, 대표 주소와 한국어·영어·기본 언어의 alternate 링크를 제공한다.
- sitemap.xml에 도구 안내와 HTML 게임을 추가했다. 수정일은 실제로 확인한 콘텐츠에만 넣으며, 매 요청마다 현재 시각으로 바꾸지 않는다.
- 한국어·영어 RSS를 추가하고 페이지에서 발견할 수 있게 연결했다.
- 게임 생성 스크립트에서 대표 주소·언어 링크·검색 설명·공유 이미지와 초기 HTML 설명을 생성한다. JavaScript 실행 후에는 같은 영역에 실제 게임이 표시된다. 게임을 재생성해도 설정이 유지된다.
- OAI-SearchBot을 명시적으로 허용한다. 기존 전체 로봇 허용 정책을 유지한다. 이 작업은 AI 학습 정책을 새로 결정하지 않는다.
- `/llms.txt`는 공개 페이지의 보조 안내다. 필수 규격이나 AI 검색 순위 향상 수단으로 취급하지 않는다.

## 검색 서비스 등록: 소유자 계정에서 확인할 일

코드 적용과 검색 서비스 등록은 서로 다른 상태다. 2026-10-13 사용자가 Google Search Console과 네이버 서치어드바이저에 아직 등록하지 않았다고 확인했다. Bing 등록 상태는 미확인이다.

1. [Google Search Console](https://search.google.com/search-console)에 `everydaybuilds.blog`를 추가하거나 기존 속성을 연다. 도메인 속성은 DNS로 확인한다. URL 접두어 속성은 HTML 메타 태그도 사용할 수 있다.
2. [네이버 서치어드바이저](https://searchadvisor.naver.com/)에 `https://everydaybuilds.blog`를 등록하고 소유권을 확인한다.
3. [Bing Webmaster Tools](https://www.bing.com/webmasters/)에서 사이트를 등록하거나 확인된 Search Console 속성을 가져온다.
4. 세 서비스에 `https://everydaybuilds.blog/sitemap.xml`을 제출한다. 네이버에는 `https://everydaybuilds.blog/ko/feed.xml`도 RSS로 제출할 수 있다.
5. 홈, 첫 제작기, 도구 안내의 URL을 검사하고 색인 상태를 확인한다. 사이트맵에 들어갔다고 색인이 완료된 것은 아니다.

메타 태그 방식이면 서비스 화면에서 제공한 **content 값만** 다음 Vercel Production 환경 변수에 넣고 재배포한다. 코드가 설정되지 않은 값을 만들어 표시하지 않는다.

- `GOOGLE_SITE_VERIFICATION`
- `NAVER_SITE_VERIFICATION`
- `BING_SITE_VERIFICATION`

DNS 확인이 이미 끝났다면 추가 메타 태그는 필요 없다. 계정 비밀번호나 인증 토큰은 문서에 저장하지 않는다.

## 다음 글에도 적용할 운영 기준

새 도구는 기존 아이디어 문서의 사용자 우선순위를 따른다. 사용자가 실제로 눌러볼 수 있는 도구, 제작 화면, 요청문과 확인 결과를 먼저 확보한 뒤 글을 쓴다. 키워드별로 비슷한 페이지를 여러 개 만들지 않는다.

모임 회비 정산 계산기라면 ‘모임 회비 정산’, ‘회비 정산 계산기’에 답하는 사용 안내와 실제 계산기를, 습관 기록표라면 ‘습관 기록표’, ‘하루 빠져도 이어가는 습관 기록’에 답하는 안내와 실제 도구를 연결한다. 아직 제작하지 않은 도구는 완료된 사례로 공개하지 않는다.

등록 후 충분한 데이터가 모이면 Search Console에서 페이지별 검색어·노출·클릭·CTR을 확인한다. 노출이 생긴 검색어와 페이지의 답변이 맞는지 먼저 검토하고, 제목·도입부·사용 설명을 조정한다. 현재 수치와 전후 비교 기준은 미확인 상태다.

## 확인 명령

```sh
node node_modules/typescript/bin/tsc --noEmit
node scripts/verify-cafe-game.mjs
npm run build
npm start -- --hostname 127.0.0.1 --port 3000
node scripts/verify-seo.mjs
# 공개 배포 이후
SEO_TEST_BASE_URL=https://everydaybuilds.blog node scripts/verify-seo.mjs
```

## 공식 근거

- [Google AI 검색 기능과 웹사이트](https://developers.google.com/search/docs/appearance/ai-features): 기본 SEO, 크롤링 허용, 내부 링크, 텍스트 본문, 실제 화면과 일치하는 구조화 데이터가 토대다. 특별한 AI 파일이나 스키마가 필수는 아니다. 색인·노출은 보장되지 않는다.
- [OpenAI 검색 로봇](https://developers.openai.com/api/docs/bots): OAI-SearchBot은 검색에 사용하며 GPTBot의 학습 설정과 구분된다.
- [네이버 RSS 및 사이트맵 제출](https://searchadvisor.naver.com/guide/request-feed): 사이트맵·RSS 제출은 콘텐츠 발견을 돕는다.

## 이번 작업의 검증 상태

2026-10-13 로컬 검증:

- Next.js 프로덕션 빌드 성공. 한국어·영어 공개 페이지 14개를 정적 HTML로 생성했다.
- 타입 검사와 `git diff --check` 통과.
- `verify-seo.mjs` 통과: 14개 페이지의 대표 주소, 언어 링크, 공유 이미지, JSON-LD, HTML 게임의 초기 본문, RSS, 사이트맵, robots, 보조 안내와 잘못된 주소의 404를 확인했다.
- 기존 게임 검증 통과: 양 언어의 실행 구문, 사용자 레시피·진행 상태·퀴즈·체크리스트의 언어 전환 보존과 재료 동작을 확인했다.
- 브라우저에서 한국어·영어 사용 안내 전환 → 영어 게임 실행 → 한국어 게임 전환을 확인했다. 오류 로그는 없었다.
- 기존 제작기 원고, 보관된 게임 원본, 언어 전환·기록 보존 런타임의 변경은 없다.

2026-10-13 사용자가 GitHub main 커밋·푸시와 everydaybuilds.blog 운영 배포를 명시적으로 승인했다. SEO 구현 커밋 `b878775`를 기존 GitHub → Vercel 연결로 배포했으며, 해당 production 배포 `dpl_FLyrpDsvqMDKGL2ncbrAxF2FaPK8`의 READY 상태와 everydaybuilds.blog 도메인 연결을 확인했다.

공개 사이트에서도 `verify-seo.mjs`의 전체 검사가 통과했다. 루트 주소는 `/ko`로 HTTP 308 영구 이동한다. Vercel이 HTML 태그에 배포 ID 속성을 추가하므로 검사 코드는 속성 순서에 의존하지 않고 실제 lang 값을 읽도록 보완했다.

검색 서비스 등록과 사이트맵 제출은 소유자 계정에서 별도로 진행해야 한다. Google Search Console과 네이버는 사용자 확인에 따라 미등록 상태이며, 현재 실제 색인·검색 노출·클릭 성과를 확인했다고 판단하지 않는다.
