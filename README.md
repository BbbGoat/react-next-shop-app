## 🛒 이커머스 쇼핑몰 사이트

Next.js로 개발한 대규모 이커머스 쇼핑몰 사이트입니다.<br>
firebase를 이용해서 이메일과 OAuth 소셜 로그인 기능을 구현하였으며<br>
대량의 상품 데이터와 이미지를 firestore Database, storage에 저장하고 연동했습니다.<br>
상품의 결제기능은 TossPayment 테스트용 API를 사용했으며<br>
관리자 페이지에서 상품의 배송상태, 결제내용, 신규상품등록 등을 다룰 수 있습니다.<br>
엄격한 코드를 위해 typescript를 적용했으며 배포는 vercel을 이용했습니다.<br>

✨ [`쇼핑몰 바로가기`](https://react-next-dcode-app.vercel.app/)

<!-- 
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
``` -->

## 📇 사용언어

개발: Next.js / typescript
스타일링: sass
데이터베이스: firebase
상태관리: redux-toolkit
라이브러리: cartjs notiflix toastify swiper simple-star-rating ... etc
배포: vercel