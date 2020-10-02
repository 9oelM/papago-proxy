# papago-proxy (파파고 프록시)
This is a very simple implementation of papago proxy server, using headless Chrome.

## Why?
Sometimes you just want to test with Papago API without signing up for Naver Developers API... This is just for that. This means that you do not need a secret key.

## Usage
### Test

👉 https://papago-proxy.vercel.app/api/translate?text=hello%20from%20papago%20proxy

👉 https://papago-proxy.vercel.app/api/translate?text=%EC%95%88%EB%85%95%ED%95%98%EC%84%B8%EC%9A%94%20%EB%B0%98%EA%B0%91%EC%8A%B5%EB%8B%88%EB%8B%A4%20%EB%8B%B9%EC%8B%A0%EC%9D%98%20%EC%9D%B4%EB%A6%84%EC%9D%80%20%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80%EC%9A%94?%20%EC%A0%9C%20%EC%9D%B4%EB%A6%84%EC%9D%80%20%EA%B0%80%EB%82%98%EB%8B%A4%EB%9D%BC%EB%A7%88%EB%B0%94%EC%82%AC%EC%9E%85%EB%8B%88%EB%8B%A4.

(the free plan on Vercel is slow, might need to wait for about 6~7 secs)

### Specs
GET `/translate?text={text}&wait_for_msec={msec}`

querystrings: 
- `text`: **required**. text to be translated
- `wait_for_msec`: **optional**. custom option to wait on headless Chrome until translate is fully done. This can be set if the text is too long to be translated in a short time. This is to be removed later.

## Example

Request:
```
GET https://papago-proxy.vercel.app/api/translate?text=hello
```

Response:
```json
{
  "text": "안녕하십니까"
}
```

## Known limitations
- The free plan on vercel serverless functions only supports running up to 10 secs. It won't allow long sentences to be succesfully translated. The free plan runs quite slowly too, due to memory limitations.
- As far as I know, this must not be used for commercial purposes. Sign up for Naver developers API and use that if you want some commercial purpose.

## Cluster
`src/server/server.ts` is for using cluster on non-serverless environments. I doubt if it is worth using it.

## Todos
- More language options
- Deploy to AWS lambda or Azure for a better example
