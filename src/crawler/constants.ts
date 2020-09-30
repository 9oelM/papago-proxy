export namespace Consts {
  export const enum URLs {
    PAPAGO = 'https://papago.naver.com',
  }

  export const enum IDs {
    TRANSLATED_TEXT_ID = '#txtTarget',
    INCOMING_TEXT_INPUT_ID = '#txtSource',
    TRANSLATE_BUTTON = '#btnTranslate',
  }

  export const enum CONFIG {
    MAX_CONCURRENCY = 50,
  }

  export const ERROR_TEXT_NOT_FOUND = '#__ERROR__TEXT__NOT__FOUND#'
  export const ENTER = String.fromCharCode(13)
  export const DEFAULT_WAIT_MSECS = 1000;
}
