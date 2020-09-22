declare const M: { [key: string]: any }

export function toast(text: string, classes = 'teal'): void {
  M.toast({ html: text, classes })
}
