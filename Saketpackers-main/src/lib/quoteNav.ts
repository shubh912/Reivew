export function goToQuote(navigate: (to: string) => void) {
  const el = document.getElementById('quote');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    navigate('/contact#quote');
  }
}
