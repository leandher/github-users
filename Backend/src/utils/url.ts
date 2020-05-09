import parser from 'parse-link-header'

export function parse (url: string): any {
  const tpl = parser(url)
  return tpl
}
