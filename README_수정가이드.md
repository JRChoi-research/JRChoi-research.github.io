# 홈페이지 폴더 구성 및 수정 가이드

## 📁 폴더 구조

```
website/
├── index.html              ← 메인 페이지 (Home)
├── research.html           ← 연구 페이지
├── publications.html       ← 논문 목록 페이지
├── people.html             ← About 페이지 (프로필, 학력, 경력)
├── contact.html            ← 연락처 페이지
│
├── css/
│   └── style.css           ← 스타일시트
│
├── js/
│   └── main.js             ← JavaScript (애니메이션, 메뉴 등)
│
└── assets/
    └── images/
        ├── profile/
        │   ├── Profile.jpg         ← 프로필 사진 (권장: 400x400px 이상)
        │   └── Affiliation.png     ← 소속 기관 로고 (ETRI)
        │
        ├── research/
        │   ├── research_01.png     ← 연구 1 대표 이미지
        │   ├── research_02.png     ← 연구 2 대표 이미지
        │   ├── research_03.png     ← 연구 3 대표 이미지
        │   └── research_04.png     ← 연구 4 대표 이미지
        │
        └── publications/
            ├── pub_sci_adv_2021.png      ← Science Advances 논문 ToC
            ├── pub_nano_energy_2020.png  ← Nano Energy 논문 ToC
            ├── pub_acs_ami_2019.png      ← ACS AMI 2019 논문 ToC
            ├── pub_acs_ami_2023.png      ← ACS AMI 2023 논문 ToC
            ├── pub_afm_2022.png          ← Adv. Funct. Mater. 논문 ToC
            └── pub_amt_2022.png          ← Adv. Mater. Tech. 논문 ToC
```

---

## 🖼️ 이미지 수정 방법

### 1. 프로필 사진 변경
- 파일 위치: `assets/images/profile/Profile.jpg`
- 새 사진을 같은 이름(`Profile.jpg`)으로 덮어씌우기
- 권장 크기: 400x400px 이상, 정사각형 비율

### 2. 연구 이미지 변경
- 파일 위치: `assets/images/research/`
- 파일명 규칙: `research_01.png`, `research_02.png`, ...
- 권장 크기: 가로 900px 이상

### 3. 논문 ToC 이미지 변경
- 파일 위치: `assets/images/publications/`
- 파일명은 자유롭게 지정 가능 (HTML에서 경로만 맞추면 됨)
- 권장 크기: 가로 320px 이상

---

## 📝 텍스트 수정 방법

### HTML 파일 열기
- 메모장, VS Code, Sublime Text 등 텍스트 에디터로 열기

### 자주 수정하는 부분

#### 1. 연구 제목/설명 변경 (index.html, research.html)
```html
<h3 class="research-card-title">여기에 연구 제목</h3>
<p class="research-card-description">
    여기에 연구 설명
</p>
<span class="research-card-meta">저널명, 년도</span>
```

#### 2. 논문 추가 (publications.html)
아래 코드를 복사해서 `<div class="publication-list-v2">` 안에 추가:
```html
<article class="pub-item fade-up">
    <div class="pub-image">
        <img src="assets/images/publications/새논문이미지.png" alt="ToC Image">
    </div>
    <div class="pub-content">
        <h3 class="pub-title">논문 제목</h3>
        <p class="pub-journal">저널명</p>
        <p class="pub-year">년도</p>
        <a href="논문링크URL" target="_blank" rel="noopener" class="pub-link">View Paper →</a>
    </div>
</article>
```

#### 3. 논문에 뱃지 추가 (Cover Image 등)
```html
<article class="pub-item featured fade-up">  <!-- featured 클래스 추가 -->
    <div class="pub-image">
        <img src="이미지경로" alt="ToC Image">
    </div>
    <div class="pub-content">
        <span class="pub-badge">Cover Image</span>  <!-- 이 줄 추가 -->
        <h3 class="pub-title">논문 제목</h3>
        ...
    </div>
</article>
```

#### 4. 학력/경력 추가 (people.html)
```html
<div class="timeline-item">
    <span class="timeline-year">년도</span>
    <h3 class="timeline-title">직책 또는 학위</h3>
    <p class="timeline-subtitle">
        기관명<br>
        추가 정보
    </p>
</div>
```

---

## 🔗 링크 수정

### Google Scholar 링크
모든 HTML 파일에서 아래 부분 찾아서 수정:
```html
href="https://scholar.google.co.kr/citations?user=5PSf15cAAAAJ&hl=ko&oi=ao"
```

### 이메일 링크
```html
href="mailto:cjr1992@etri.re.kr"
```

### 논문 링크
publications.html에서:
```html
<a href="https://실제논문URL" target="_blank" rel="noopener" class="pub-link">View Paper →</a>
```

---

## 🎨 색상 변경 (선택사항)

`css/style.css` 파일 상단의 `:root` 부분에서 색상 변경:
```css
:root {
    --color-slate-blue: #5b6b8c;    /* 메인 색상 (네이비/슬레이트 블루) */
    --color-accent: #8fbc8f;         /* 강조 색상 (연두색) */
    --color-beige-light: #f5f0e6;   /* 배경 색상 (베이지) */
}
```

---

## ⚠️ 주의사항

1. **파일명에 한글 사용 금지** - 이미지 파일명은 영문으로
2. **이미지 용량** - 웹 최적화를 위해 각 이미지 500KB 이하 권장
3. **백업** - 수정 전 원본 파일 백업해두기
4. **경로 확인** - 이미지 경로는 대소문자 구분함 (Linux 서버의 경우)

---

## 🚀 업로드 방법

1. 모든 파일을 웹 서버에 업로드
2. 폴더 구조 유지 (css/, js/, assets/ 폴더 구조 그대로)
3. index.html이 루트 폴더에 있어야 함

문의사항이 있으면 언제든 물어보세요!
