# 2025-12-15: 개인 연구 홈페이지 구현

## 요구사항
Hunpyo Ju (주훈표) 연구자 개인 홈페이지 제작
- 기존 Google Sites 홈페이지 대체
- Apple 스타일 라이트 모드 디자인
- GSAP 스크롤 애니메이션
- 콘텐츠 보호 (드래그/우클릭 방지)

## 구현 내용

### 1. 페이지 구조 (5개 HTML 파일)
- **index.html**: 메인 페이지 (Hero + Featured Research + Latest Work + CTA)
- **research.html**: 연구 프로젝트 상세 (4개 프로젝트 + 비디오/이미지)
- **publications.html**: 논문 목록 (11편 + Cover Images 갤러리)
- **people.html**: About 페이지 (프로필 + 학력/경력 타임라인)
- **contact.html**: 연락처 정보 (이메일 복사 기능)

### 2. 디자인 시스템

**컬러 팔레트 (라이트 모드)**
| 용도 | 컬러명 | HEX |
|------|--------|-----|
| 배경 (메인) | Off White | #f5f5f7 |
| 배경 (섹션) | Pure White | #FFFFFF |
| 포인트 | Electric Blue | #007AFF |
| 포인트 보조 | Soft Cyan | #5AC8FA |
| 텍스트 (기본) | Charcoal | #1d1d1f |
| 텍스트 (보조) | Gray | #6e6e73 |
| 구분선/보더 | Light Gray | #d2d2d7 |

**타이포그래피**
- 헤드라인: Noto Sans KR (700 weight)
- 본문: Noto Sans KR (300-600 weight)

### 3. 주요 기능

**ISSAD 약어 스타일링**
- 홈페이지 타이틀 "Innovative Soft Systems for Active Deformation"
- 첫 글자(I, S, S, A, D)에 포인트 색상 적용

**Cover Images 갤러리**
- Publications 페이지 상단에 저널 표지 이미지 전시
- Advanced Functional Materials 2023, Soft Robotics 2018

**Publications 레이아웃**
- 2-column 그리드 (ToC 이미지 320px + 내용)
- Cover Image/Frontispiece 배지 표시
- In Prep. 플레이스홀더

**콘텐츠 보호**
- 텍스트 선택 방지 (user-select: none)
- 이미지 드래그 방지
- 우클릭 메뉴 차단

**비디오 자동재생**
- Research 페이지 데모 비디오
- 스크롤 시 자동 재생/정지 (Intersection Observer)

### 4. 스크롤 애니메이션 (GSAP ScrollTrigger)

| 요소 | 효과 |
|------|------|
| Hero | 페이지 로드 시 순차적 Fade In |
| 섹션 진입 | Fade Up (40px → 0) |
| Research Cards | 호버 시 Transform + Shadow |
| Cover Images | 호버 시 Scale Up |

### 5. 기술 스택
- HTML5 / CSS3 / JavaScript (ES6+)
- GSAP 3.12.2 + ScrollTrigger
- Google Fonts (Noto Sans KR)
- 반응형 디자인 (PC/Tablet/Mobile)

## 수정 파일
```
WebPage_v2.0/
├── index.html
├── research.html
├── publications.html
├── people.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── assets/
    └── images/
        ├── research/ (연구 이미지 + MP4 비디오)
        ├── publications/ (ToC + Cover 이미지)
        └── profile/ (프로필 사진)
```

## 주요 수정 이력

### Session 1: 초기 구현
- 5개 페이지 전체 구조 구현
- GSAP 애니메이션 적용
- 콘텐츠 보호 기능

### Session 2: 세부 조정
- ToC 이미지 파일명 수정 (#1 → pub1, URL 인코딩 이슈 해결)
- Cover Images 섹션 research → publications 이동
- ISSAD 약어 스타일링 추가
- 저널 링크 추가
- 폰트 변경 (Playfair Display → Noto Sans KR, & 문자 이슈)
- 넘버링 배지 추가 후 제거 (사용자 피드백)
- 소제목 크기 조정

## 테스트 결과
- ✅ 브라우저에서 정상 렌더링
- ✅ ToC 이미지 정상 표시
- ✅ 비디오 자동재생 동작
- ✅ 스크롤 애니메이션 동작
- ✅ 반응형 레이아웃 (PC/태블릿/모바일)
- ✅ 콘텐츠 보호 기능 동작

## 외부 링크
- Google Scholar: https://scholar.google.com/citations?user=K3CZhbIAAAAJ&hl=ko
- Email: hunpyo@etri.re.kr

## 법적 사항
- 모든 폰트: Google Fonts (OFL 라이선스, 상업적 사용 무료)
- 모든 코드: 직접 작성 (저작권 문제 없음)
- 연구 이미지/비디오: 본인 저작물
