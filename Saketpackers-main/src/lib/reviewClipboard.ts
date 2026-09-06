// Robust copy-to-clipboard with a fallback for non-secure / older contexts.
async function readClipboard(): Promise<string | null> {
  try {
    if (navigator.clipboard && navigator.clipboard.readText) {
      return await navigator.clipboard.readText()
    }
  } catch {
    /* ignore */
  }
  return null
}

export async function copyText(text: string): Promise<boolean> {
  const value = text.trim()
  if (!value) return false

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value)
      const readBack = await readClipboard()
      if (readBack === value) return true
    }
  } catch {
    /* fall through to execCommand */
  }

  try {
    const ta = document.createElement('textarea')
    ta.value = value
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.top = '-1000px'
    ta.style.opacity = '0'
    document.body.appendChild(ta)

    const sel = window.getSelection()
    const prevRange = sel && sel.rangeCount ? sel.getRangeAt(0) : null

    ta.select()
    ta.setSelectionRange(0, value.length)
    const ok = document.execCommand('copy')

    document.body.removeChild(ta)
    if (sel && prevRange) {
      sel.removeAllRanges()
      sel.addRange(prevRange)
    }
    return ok
  } catch {
    return false
  }
}
