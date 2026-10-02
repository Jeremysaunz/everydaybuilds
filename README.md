# Everyday Builds

한국어와 영어로 작은 프로그램의 제작·사용·개선을 기록하는 블로그입니다.

## 실행

Node.js 22.13 이상에서 `npm ci`, `npm run dev` 순서로 실행합니다. 실행 안내에 표시된 주소를 엽니다. 첫 화면은 한국어로 연결됩니다. 기본 개발·빌드·실행 명령은 표준 Next.js를 사용합니다.

- `/ko`, `/en`: 홈
- `/ko/builds`, `/en/builds`: 제작 기록 목록
- `/ko/builds/just-today`, `/en/builds/just-today`: 같은 글의 두 언어 버전
- `/ko/about`, `/en/about`: 소개
- `/ko/privacy`, `/en/privacy`: 현재 서비스 구성에 맞춘 개인정보 안내
- `/ko/contact`, `/en/contact`: 문의 이메일을 설정했을 때 공개

## 현재 콘텐츠

세 편 모두 **제작 전 기획 예시**입니다. 실제 사용 결과나 검증 수치를 주장하지 않습니다. 검색 엔진에 실제 제작 후기로 노출되지 않도록 예시 상세 페이지에는 `noindex`를 적용했고 사이트맵에서도 제외합니다. 제작 완료 수는 현재 0/20입니다.

프로그램 자체, 광고, 분석 도구, 회원 가입, 댓글, 관리 화면은 이 블로그에 포함되지 않습니다.

## 글 추가·수정

`lib/posts.ts`가 두 언어 글의 원본입니다. 글마다 같은 `slug` 안에 `ko`와 `en`을 함께 관리합니다. `sections`에는 불편, 요구, 제작, 확인, 사용, 개선, 현재 상태 순서의 내용을 넣습니다. 실제 경험이 생긴 후에만 `kind: "experience"`로 변경합니다.

- `programId`: 같은 프로그램의 제작·개선 글에 공통으로 사용하는 식별자
- `status`: `planned`(제작 전), `using`(계속 사용), `improving`(개선 예정), `stopped`(사용 중단)
- `completed`: 실제 제작이 끝났을 때만 `true`
- `updatedAt`: 글의 최종 수정일
- `verifiedAt`: 실제 작동을 확인한 날
- `tools`: 실제 제작에 사용한 도구
- `publicUrl`: 공개 배포했을 때만 설정

예시를 추가해도 제작 완료 수는 늘지 않습니다. 같은 프로그램의 후속 글은 같은 `programId`를 사용하면 글 수와 관계없이 프로그램 한 개로 집계합니다. 실제 제작 기록은 목록에서 기획 예시와 분리되고 홈에 우선 표시됩니다.

## 운영 정보

`lib/site-config.ts`에서 운영자와 `contactEmail`을 관리합니다. 사이트 주소는 `NEXT_PUBLIC_SITE_URL` 환경 변수를 우선 사용하고, Vercel에서는 `VERCEL_PROJECT_PRODUCTION_URL`을 사용합니다. 도메인을 연결한 뒤 `NEXT_PUBLIC_SITE_URL`을 실제 주소로 설정하면 검색용 주소와 사이트맵에 함께 반영됩니다.

현재 문의 이메일은 지정되지 않았습니다. 실제 주소를 입력하면 문의 메뉴, 문의 페이지, 개인정보 안내의 연락처가 함께 활성화됩니다. 이메일 링크는 방문자의 이메일 앱을 여는 방식이며 전송을 대신하지 않습니다.

광고나 분석 도구를 추가할 때는 실제 구성에 맞게 개인정보 안내를 수정합니다. 예시 콘텐츠만으로 공개 블로그나 애드센스 신청 준비가 완료된 것은 아닙니다. 도메인과 상표 확인은 별도 업무입니다.

## 확인

`npx tsc --noEmit`으로 타입을 확인합니다. `npm run build`는 Vercel에서 사용하는 Next.js 빌드 결과를 `.next`에 만들고, `npm start`로 해당 결과를 실행합니다.

## Vercel 배포

GitHub 저장소의 루트에 `package.json`과 `app/`이 있으므로 Vercel의 Root Directory는 기본값인 저장소 루트로 둡니다. 로컬 폴더 이름이 `site/`라는 이유로 Root Directory에 `site`를 넣지 않습니다.

Framework Preset은 **Next.js**, Build Command는 `npm run build`, Install Command는 `npm ci`입니다. Output Directory는 기본값을 사용합니다. `main`에 푸시하면 연결된 `everydaybuilds` 프로젝트가 배포됩니다.

기존 Sites 배포를 위한 도구도 보관합니다. 필요한 경우 `npm run dev:sites`, `npm run build:sites`, `npm run start:sites`를 사용합니다. Sites 빌드는 `dist/`에 만들어지며 Vercel 배포에 사용하지 않습니다. 배포 플랫폼이 바뀌면 개인정보 안내도 실제 운영 환경에 맞게 수정합니다.

## 이미지

`public/workbench.jpg`는 이 프로젝트를 위해 AI로 생성한 작업대 일러스트입니다. 실제 프로그램 화면이 아닙니다. 카드의 작은 화면은 기획을 설명하는 HTML 구성 예시입니다.
