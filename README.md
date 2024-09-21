# client

# 개발 시작하기 전 필수 셋팅

## 개발 환경 설정

### 최초 설정

#### .env 파일 만들기

`.env` 파일을 만들어 아래와 같은 형식으로 내용을 설정합니다. (필수)

```bash
# GPG 키를 만들 때 설정했던 email. 부등호 기호는 넣지 않음
# ex) GPG_EMAIL=sample@example.com
GPG_EMAIL=<gpg_email>
# GPG 키를 만들 때 설정했던 비밀번호. 부등호 기호는 넣지 않음
# ex) GPG_PASSWORD=12345678
GPG_PASSWORD=<gpg_password>
```

#### gpg 키 생성하기

[컨플루언스*GPG*키*생성*가이드](https://tribe-forus.atlassian.net/wiki/spaces/PM/pages/13795548/.env#gpg-%ED%82%A4-%EB%A7%8C%EB%93%A4%EA%B8%B0) 참고

#### gpg 키 내보낸 후 기존 팀원에게 등록 요청

[컨플루언스*GPG*키*내보내기*가이드](https://tribe-forus.atlassian.net/wiki/spaces/PM/pages/13795548/.env#2%29-%EA%B3%B5%EA%B0%9C-%ED%82%A4-%EB%82%B4%EB%B3%B4%EB%82%B4%EA%B8%B0) 참고

### 개발 환경 설정 스크립트

```bash
yarn setup
```

### 실행 방법

```bash
yarn dev
```

## 설치 패키지 (vscode 익스텐션)

- Prettier (https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- ESLint (https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- Tailwind CSS IntelliSense (https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
