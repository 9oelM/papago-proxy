# papago-proxy

This is a very simple implementation of papago proxy server.

## Usage

GET `/translate?text={text}&wait_for_msec={msec}`

querystrings: 
- `text`: required. text to be translated
- `wait_for_msec`: optional. custom option to wait on headless Chrome until translate is fully done. This can be set if the text is too long to be translated in a short time. This is to be removed later.

## Example

Request:
```
GET localhost:3000/translate?text=hello
```

Response:
```json
{
  "text": "안녕하십니까"
}
```
