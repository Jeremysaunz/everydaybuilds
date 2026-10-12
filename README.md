# Everyday Builds

한 사람의 필요에서 출발해 AI로 작은 도구를 만들고 확인하는 과정을 한국어와 영어로 기록하는 블로그입니다.

## 실행

Node.js 22.13 이상에서 `npm ci`, `npm run dev` 순서로 실행합니다. 실행 안내에 표시된 주소를 엽니다. 첫 화면은 한국어로 연결됩니다. 기본 개발·빌드·실행 명령은 표준 Next.js를 사용합니다.

- `/ko`, `/en`: 홈
- `/ko/builds`, `/en/builds`: 만든 이야기 목록
- `/ko/builds/cafe-first-day`, `/en/builds/cafe-first-day`: 첫 글의 두 언어 버전
- `/ko/about`, `/en/about`: 소개
- `/ko/privacy`, `/en/privacy`: 현재 서비스 구성에 맞춘 개인정보 안내
- `/ko/contact`, `/en/contact`: 문의 이메일을 설정했을 때 공개

## 현재 콘텐츠

첫 실제 제작 글은 **카페 신입 교육 게임을 말로 부탁해 만들었어요**입니다. /ko/builds/cafe-first-day와 /en/builds/cafe-first-day에서 같은 글을 제공합니다. 제작 완료 수는 1/20이며, 실제 매장에 도입했거나 교육 효과를 측정했다는 의미는 아닙니다.

기존 기획 예시 세 편은 제거했습니다. 현재 게시글은 카페 교육 게임 한 편이며, 삭제한 예시의 주소는 404를 반환합니다.

홈은 짧은 소개와 실제 게시글 카드로 구성합니다. `lib/landing-copy.ts`에서 두 언어의 소개를 관리하며, 최신 세 편까지 자동으로 표시합니다. 아이디어 예시, 제작 단계, 별도 운영자 소개, 문의 유도 구간은 홈에서 제거했습니다. 만든 이야기 목록에도 실제 글만 표시합니다.

카페 첫날은 한국어 페이지에서 /tools/cafe-first-day.html, 영어 페이지에서 /tools/cafe-first-day-en.html로 체험하거나 다운로드합니다. 두 파일 모두 한국어와 영어를 포함하며, 최초 표시 언어만 다릅니다. 오른쪽 위의 한국어 / English 버튼으로 파일 안에서 전환합니다. 외부 스크립트나 번역 서버 없이 작동합니다. 언어를 바꿔도 실습, 퀴즈, 체크리스트, 작성 중인 레시피가 유지됩니다. 직접 입력한 이름·메모·제조 단계는 자동 번역하지 않습니다. 기존 언어별 저장 키는 보존하고 새 다국어 버전의 진행 상태는 같은 브라우저에서 공유합니다. 광고, 분석 도구, 회원 가입, 댓글, 관리 화면은 포함되지 않습니다.

## 글 추가·수정

실제 제작 글의 본문은 content/posts/글-slug/ko.md와 en.md에 따로 보관합니다. 제목, 요약, 상태 등의 메타데이터는 lib/posts.ts에서 관리하고 각 글의 본문은 Markdown으로 읽습니다. Markdown의 제목·강조·인용·이미지·링크를 본문으로 표시하고 목차를 자동으로 만듭니다. 이미지 주소는 /images/글-slug/파일명으로 작성하고 실제 파일은 public/images/에 둡니다.

첫 글은 전달받은 완성 원고를 보존하고 웹용 이미지·파일 링크만 바꾼 복사본입니다. 이후 수정은 한국어와 영어 원고에 함께 반영합니다. 새 이미지의 크기는 components/markdown-article.tsx에 추가할 수 있습니다.

상태 built는 제작 완료를 뜻합니다. 매장에서 실제로 계속 사용하는지 확인되지 않은 첫 글에는 using을 사용하지 않습니다.


- `programId`: 같은 프로그램의 제작·개선 글에 공통으로 사용하는 식별자
- `status`: `built`(제작 완료), `using`(계속 사용), `improving`(개선 예정), `stopped`(사용 중단)
- `completed`: 실제 제작이 끝났을 때만 `true`
- `updatedAt`: 글의 최종 수정일
- `verifiedAt`: 실제 작동을 확인한 날
- `tools`: 실제 제작에 사용한 도구
- `publicUrl`: 공개 배포했을 때만 설정

같은 프로그램의 후속 글은 같은 `programId`를 사용하면 글 수와 관계없이 프로그램 한 개로 집계합니다. 게시글이 하나일 때는 같은 글을 다시 가리키는 다음 글 링크를 표시하지 않습니다.

## 운영 정보

`lib/site-config.ts`에서 운영자와 `contactEmail`을 관리합니다. 사이트 주소는 `NEXT_PUBLIC_SITE_URL` 환경 변수를 우선 사용하고, 없으면 `https://everydaybuilds.blog`를 사용합니다. 이 주소가 검색용 대표 주소(canonical), 언어별 주소, 사이트맵, robots.txt에 함께 반영됩니다. `everydaybuilds.vercel.app`과 `www.everydaybuilds.blog`로 들어온 방문은 `next.config.ts`에서 같은 경로의 `everydaybuilds.blog`로 영구 이동시킵니다.

문의 이메일은 `actslim@gmail.com`입니다. 이 값이 있으면 하단 문의 링크, 문의 페이지, 개인정보 안내의 연락처가 함께 표시되고, 비우면 함께 숨겨집니다. 이메일 링크는 방문자의 이메일 앱을 여는 방식이며 전송을 대신하지 않습니다.

광고나 분석 도구를 추가할 때는 실제 구성에 맞게 개인정보 안내를 수정합니다. 애드센스 신청 준비는 별도로 점검합니다. 도메인과 상표 확인은 별도 업무입니다.

## 확인

`npx tsc --noEmit`으로 타입을 확인합니다. `npm run build`는 Vercel에서 사용하는 Next.js 빌드 결과를 `.next`에 만들고, `npm start`로 해당 결과를 실행합니다.

## Vercel 배포

GitHub 저장소의 루트에 `package.json`과 `app/`이 있으므로 Vercel의 Root Directory는 기본값인 저장소 루트로 둡니다. 로컬 폴더 이름이 `site/`라는 이유로 Root Directory에 `site`를 넣지 않습니다.

Framework Preset은 **Next.js**, Build Command는 `npm run build`, Install Command는 `npm ci`입니다. Output Directory는 기본값을 사용합니다. `main`에 푸시하면 연결된 `everydaybuilds` 프로젝트가 배포됩니다.

기존 Sites 배포를 위한 도구도 보관합니다. 필요한 경우 `npm run dev:sites`, `npm run build:sites`, `npm run start:sites`를 사용합니다. Sites 빌드는 `dist/`에 만들어지며 Vercel 배포에 사용하지 않습니다. 배포 플랫폼이 바뀌면 개인정보 안내도 실제 운영 환경에 맞게 수정합니다.

## 이미지

홈과 목록에는 `public/images/cafe-first-day/`의 실제 제작 화면을 사용합니다. 첫 글의 한국어 캡처 네 장은 전달받은 원본을 그대로 복사했습니다. 원본 HTML은 `content/tools/cafe-first-day.ko.html`에 보관하고, 공개 HTML에는 다국어 전환 기능을 추가했습니다. 이전 작업대 일러스트는 홈에서 사용하지 않습니다.

영어판은 `public/images/cafe-first-day/en/`의 `*-v2.png` 번역 이미지 네 장을 사용합니다. 원래 한국어 캡처를 바탕으로 문구를 영어로 옮긴 파생 이미지이며, 영어 글에 이를 표시합니다. 이미지 편집 기준과 프롬프트는 `docs/cafe-english-localization.md`에 보관합니다.

게임 번역은 `content/tools/cafe-first-day.en.json`에서 관리합니다. `python3 scripts/localize-cafe-game.py`로 보관한 한국어 원본과 번역, `scripts/cafe-game-*.js.txt`의 언어 전환·상태 보존 코드를 묶어 두 다국어 HTML을 다시 만듭니다. 재료 동작은 두 언어로 판별하며, 영어 UI 번역이 누락되면 생성이 실패합니다. `node scripts/verify-cafe-game.mjs`로 파일의 독립성, JavaScript 구문과 상태 보존을 검사합니다. 자세한 동작과 확인 범위는 `docs/cafe-bilingual-html.md`를 참고합니다.

영어 문구는 홈·첫 글·소개·문의·체험 게임과 번역 캡처까지 재검수했습니다. 최신 이미지 경로와 편집 프롬프트는 `docs/english-copy-review.md`에 기록했습니다. 상단 메뉴는 한국어에서 “만든 이야기”, 영어에서 “Journal”로 표시하며 스크롤 중에도 보이도록 고정했습니다.
