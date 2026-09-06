import { SERVICES, HIGHLIGHTS, IMPROVEMENTS, type Service } from './reviewData'

/* ------------------------------------------------------------------ *
 *  Review composer
 *  Generates a unique, natural-sounding Google review from a rating,
 *  a service, liked attributes and improvement points.
 * ------------------------------------------------------------------ */

export type Tone = 'pos' | 'mix' | 'low'

interface ComposeInput {
  rating: number
  serviceId: string
  liked: string[]
  improve: string[]
}

interface Ctx {
  rating: number
  tone: Tone
  svc: Service
  attrs: string[]
  imps: string[]
  localPhrase: PoolItem | null
  localSentence: PoolItem | null
}

interface PoolItem {
  id: string
  t: string
}

const randInt = (n: number) => Math.floor(Math.random() * n)
const pick = <T,>(arr: T[]): T => arr[randInt(arr.length)]
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

function shuffle<T,>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = randInt(i + 1)
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Pick an item from a pool, preferring ones not already used (by id).
function pickUnused(pool: PoolItem[], used: Set<string>): PoolItem {
  const filtered = pool.filter((o) => !used.has(o.id))
  return pick(filtered.length ? filtered : pool)
}

/* ------------------------- sentence pools ------------------------- */

const POS_OPEN: PoolItem[] = [
  { id: 'po1', t: 'Very happy with {svc}.' },
  { id: 'po2', t: "We chose them for {svc} and I'm glad we did." },
  { id: 'po3', t: '{SVC} was handled well right from the start.' },
  { id: 'po4', t: 'Happy to recommend them for {svc}.' },
  { id: 'po5', t: '{SVC} needed to be handled properly, and it was.' },
  { id: 'po6', t: 'Good decision going with them for {svc}.' },
  { id: 'po7', t: 'No complaints at all about {svc}.' },
  { id: 'po8', t: 'They made {svc} far easier than I expected.' },
  { id: 'po9', t: 'Very pleased with how {svc} turned out.' },
  { id: 'po10', t: 'Organised and professional — {svc} went the way it should.' },
  { id: 'po11', t: 'This is a good call for {svc}.' },
  { id: 'po12', t: '{SVC} went better than expected.' },
  { id: 'po13', t: 'Reliable and easy to deal with for {svc}.' },
  { id: 'po14', t: 'Very glad we went with them for {svc}.' },
  { id: 'po15', t: 'Simple, clean, and well handled — {svc} with no stress.' },
  { id: 'po16', t: 'Exceeded what I expected from {svc}.' },
]

const POS_FIVE: PoolItem[] = [
  { id: 'pf1', t: 'Five stars for {svc}.' },
  { id: 'pf2', t: "Can't fault it — {svc} was excellent." },
  { id: 'pf3', t: "Best experience I've had with {svc}." },
  { id: 'pf4', t: 'Absolutely first class for {svc}.' },
]

const POS_SVC: PoolItem[] = [
  { id: 'ps1', t: 'Everything was packed, loaded, and moved without any fuss.' },
  { id: 'ps2', t: 'The crew arrived prepared and got through the work smoothly.' },
  { id: 'ps3', t: 'The whole job was organised properly, start to finish.' },
  { id: 'ps4', t: 'They handled the loading, transport, and unloading as one smooth process.' },
  { id: 'ps5', t: 'From the first item to the last, it was all looked after.' },
  { id: 'ps6', t: 'The team worked carefully and kept things moving the whole time.' },
  { id: 'ps7', t: 'Loading was quick and everything was on its way before long.' },
  { id: 'ps8', t: 'They came prepared and got everything done in one go.' },
  { id: 'ps9', t: 'Everything was accounted for and handled in a single clean run.' },
  { id: 'ps10', t: "The move went much smoother than I'd have managed on my own." },
  { id: 'ps11', t: 'Nothing was left pending and nothing had to be chased.' },
  { id: 'ps12', t: 'They worked steadily and finished everything they had started.' },
]

const POS_ATTR: PoolItem[] = [
  { id: 'pa1', t: 'I really appreciated {a}.' },
  { id: 'pa2', t: '{A} was the part that stood out.' },
  { id: 'pa3', t: 'What I liked most was {a}.' },
  { id: 'pa4', t: '{A} made a real difference.' },
  { id: 'pa5', t: '{A} deserves a special mention.' },
  { id: 'pa6', t: 'I was impressed by {a}.' },
  { id: 'pa7', t: "{A} is something I'm grateful for." },
  { id: 'pa8', t: '{A} was exactly what I was hoping for.' },
  { id: 'pa9', t: 'Also worth mentioning is {a}.' },
  { id: 'pa10', t: 'Another plus was {a}.' },
  { id: 'pa11', t: "I noticed {a}, which isn't always a given." },
  { id: 'pa12', t: 'Have to mention {a} as well.' },
  { id: 'pa13', t: '{A} is worth highlighting.' },
  { id: 'pa14', t: "It's the small things — {a}." },
  { id: 'pa15', t: 'On top of that, there was {a}.' },
]

const POS_MULTI: PoolItem[] = [
  { id: 'pm1', t: 'I also liked {a1} and {a2}.' },
  { id: 'pm2', t: '{A1} and {a2} both stood out.' },
  { id: 'pm3', t: 'Besides that, {a1} and {a2} were spot on.' },
  { id: 'pm4', t: '{A1}, {a2} and {a3} were the highlights for me.' },
  { id: 'pm5', t: "I'd add {a1} and {a2} to the list of things done well." },
  { id: 'pm6', t: 'Two things especially: {a1} and {a2}.' },
  { id: 'pm7', t: 'I also noticed {a1}, along with {a2}.' },
  { id: 'pm8', t: 'A couple more worth noting — {a1} and {a2}.' },
  { id: 'pm9', t: '{A1} and {a2} were both noticeably good.' },
]

const POS_QUAL: PoolItem[] = [
  { id: 'pq1', t: 'Overall, a very good service.' },
  { id: 'pq2', t: 'Would happily use them again.' },
  { id: 'pq3', t: 'Highly recommended.' },
  { id: 'pq4', t: 'Definitely booking them again next time.' },
  { id: 'pq5', t: 'Absolutely worth it.' },
  { id: 'pq6', t: 'A solid experience all round.' },
  { id: 'pq7', t: "I'd use them again without a second thought." },
  { id: 'pq8', t: 'Very satisfied with how it was handled.' },
  { id: 'pq9', t: 'No hesitation in recommending them.' },
]

const POS_CLOSE: PoolItem[] = [
  { id: 'pc1', t: 'Thanks for making it easy.' },
  { id: 'pc2', t: 'Thank you to the team for the smooth work.' },
  { id: 'pc3', t: 'Keep up the good work.' },
  { id: 'pc4', t: 'Thanks again for the careful handling.' },
  { id: 'pc5', t: 'Appreciated the professionalism.' },
  { id: 'pc6', t: 'Will happily recommend you to friends and family.' },
  { id: 'pc7', t: 'Appreciate the effort from everyone involved.' },
]

const MIX_OPEN: PoolItem[] = [
  { id: 'mo1', t: 'Decent service for {svc}, with a couple of things to improve.' },
  { id: 'mo2', t: '{SVC} was mostly fine, though not flawless.' },
  { id: 'mo3', t: 'Mixed feelings about {svc}.' },
  { id: 'mo4', t: 'An average experience overall for {svc}.' },
  { id: 'mo5', t: 'Some parts of {svc} were good, others need work.' },
  { id: 'mo6', t: "Fair service, but there's clearly room to do better." },
  { id: 'mo7', t: 'It was okay for {svc}, nothing more than that.' },
]

const MIX_ATTR: PoolItem[] = [
  { id: 'ma1', t: 'On the positive side, {a}.' },
  { id: 'ma2', t: 'I did appreciate {a}.' },
  { id: 'ma3', t: '{A} was good.' },
  { id: 'ma4', t: "Credit where it's due — {a}." },
  { id: 'ma5', t: 'The good part was {a}.' },
]

const MIX_IMP: PoolItem[] = [
  { id: 'mi1', t: 'At the same time, {i} could be better.' },
  { id: 'mi2', t: '{I} needs some attention.' },
  { id: 'mi3', t: "I'd like to see {i} improve." },
  { id: 'mi4', t: "On the other hand, {i} wasn't great." },
  { id: 'mi5', t: 'That said, {i} let the experience down a little.' },
  { id: 'mi6', t: 'My main complaint would be {i}.' },
]

const MIX_SVC: PoolItem[] = [
  { id: 'ms1', t: 'The work was carried out from start to finish.' },
  { id: 'ms2', t: 'Everything was picked up, moved, and delivered.' },
  { id: 'ms3', t: 'The job was completed in the end.' },
  { id: 'ms4', t: 'They did finish what they started.' },
  { id: 'ms5', t: "The move happened, but it wasn't without friction." },
]

const MIX_QUAL: PoolItem[] = [
  { id: 'mq1', t: 'So a fair, middle-of-the-road experience.' },
  { id: 'mq2', t: "There's a decent base to build on." },
  { id: 'mq3', t: 'Serviceable, but not memorable.' },
]

const MIX_CLOSE: PoolItem[] = [
  { id: 'mc1', t: 'Hope they tighten this up going forward.' },
  { id: 'mc2', t: 'Room to improve, but the potential is there.' },
  { id: 'mc3', t: 'Happy to give them another chance.' },
  { id: 'mc4', t: 'Would consider them again if things get more consistent.' },
  { id: 'mc5', t: 'Sharing this in the hope it helps them improve.' },
]

const LOW_OPEN: PoolItem[] = [
  { id: 'lo1', t: 'Not satisfied with {svc}.' },
  { id: 'lo2', t: "{SVC} didn't go the way it should have." },
  { id: 'lo3', t: 'I expected better for {svc}.' },
  { id: 'lo4', t: 'Honest feedback: {svc} fell short for us.' },
  { id: 'lo5', t: 'Unfortunately {svc} was a disappointing experience.' },
  { id: 'lo6', t: 'We had a poor experience with {svc}.' },
]

const LOW_IMP: PoolItem[] = [
  { id: 'li1', t: '{I} was the main issue.' },
  { id: 'li2', t: 'The biggest problem was {i}.' },
  { id: 'li3', t: 'I struggled with {i}.' },
  { id: 'li4', t: '{I} needs real improvement.' },
  { id: 'li5', t: 'The part that bothered me most was {i}.' },
]

const LOW_ATTR: PoolItem[] = [
  { id: 'lt1', t: 'To be fair, I have no complaint about {a}.' },
  { id: 'lt2', t: 'The one good thing was {a}.' },
  { id: 'lt3', t: "I'll give credit for {a}." },
]

const LOW_QUAL: PoolItem[] = [
  { id: 'lq1', t: 'Overall, below the standard a good mover should deliver.' },
  { id: 'lq2', t: "I can't rate the experience highly." },
  { id: 'lq3', t: "It wasn't the standard I was hoping for." },
]

const LOW_CLOSE: PoolItem[] = [
  { id: 'lc1', t: 'Hoping the feedback is taken on board.' },
  { id: 'lc2', t: 'Sharing this so it gets looked at.' },
  { id: 'lc3', t: "I'd need to see real improvement before booking again." },
  { id: 'lc4', t: "Not something I can recommend in its current state." },
]

const EMOJI = [' \u2b50', ' \ud83d\udc4d', ' \ud83d\ude9b', ' \ud83e\udd6c']


/* ---------------------- Ayodhya local phrases --------------------- *
 * Local wording is deliberately varied and limited to ONE phrase per
 * draft. These are customer-editable suggestions, not claims that must
 * appear in every review.
 */
const AYODHYA_PHRASES: PoolItem[] = [
  { id: 'ay01', t: 'a reliable packers and movers service in Ayodhya' },
  { id: 'ay02', t: 'one of the better packers and movers in Ayodhya' },
  { id: 'ay03', t: 'a professional moving service in Ayodhya' },
  { id: 'ay04', t: 'a good packing service in Ayodhya' },
  { id: 'ay05', t: 'a dependable moving service in Ayodhya' },
  { id: 'ay06', t: 'a good option for shifting in Ayodhya' },
  { id: 'ay07', t: 'a professional team for shifting in Ayodhya' },
  { id: 'ay08', t: 'a reliable option for local shifting in Ayodhya' },
  { id: 'ay09', t: 'a good choice for home shifting in Ayodhya' },
  { id: 'ay10', t: 'a dependable choice for relocation in Ayodhya' },
  { id: 'ay11', t: 'a smooth shifting experience in Ayodhya' },
  { id: 'ay12', t: 'a positive experience with movers in Ayodhya' },
  { id: 'ay13', t: 'a well-organised moving service in Ayodhya' },
  { id: 'ay14', t: 'a convenient option for moving in Ayodhya' },
  { id: 'ay15', t: 'a trusted option for packing and shifting in Ayodhya' },
  { id: 'ay16', t: 'a helpful team for relocation in Ayodhya' },
  { id: 'ay17', t: 'a straightforward shifting service in Ayodhya' },
  { id: 'ay18', t: 'a satisfactory packers service in Ayodhya' },
  { id: 'ay19', t: 'a good experience with a moving company in Ayodhya' },
  { id: 'ay20', t: 'a capable team for household shifting in Ayodhya' },
  { id: 'ay21', t: 'a professional packing team in Ayodhya' },
  { id: 'ay22', t: 'a reliable team for household moves in Ayodhya' },
  { id: 'ay23', t: 'a good local moving experience in Ayodhya' },
  { id: 'ay24', t: 'a well-handled relocation in Ayodhya' },
  { id: 'ay25', t: 'a convenient pack-and-move service in Ayodhya' },
  { id: 'ay26', t: 'a decent moving service in Ayodhya' },
  { id: 'ay27', t: 'a responsive packers team in Ayodhya' },
  { id: 'ay28', t: 'a helpful moving service in Ayodhya' },
  { id: 'ay29', t: 'a practical choice for shifting in Ayodhya' },
  { id: 'ay30', t: 'a professional relocation service in Ayodhya' },
  { id: 'ay31', t: 'a reliable team for moving goods in Ayodhya' },
  { id: 'ay32', t: 'a good experience with packers in Ayodhya' },
  { id: 'ay33', t: 'a smooth local relocation in Ayodhya' },
  { id: 'ay34', t: 'a well-coordinated move in Ayodhya' },
  { id: 'ay35', t: 'a convenient service for household shifting in Ayodhya' },
  { id: 'ay36', t: 'a professional service for local shifting in Ayodhya' },
  { id: 'ay37', t: 'a dependable service for moving household goods in Ayodhya' },
  { id: 'ay38', t: 'a useful option for anyone shifting in Ayodhya' },
  { id: 'ay39', t: 'a good team for packing and moving in Ayodhya' },
  { id: 'ay40', t: 'a solid local moving service in Ayodhya' },
  { id: 'ay41', t: 'a careful packing and moving team in Ayodhya' },
  { id: 'ay42', t: 'a reliable service for relocation in Ayodhya' },
  { id: 'ay43', t: 'a professional choice for moving in Ayodhya' },
  { id: 'ay44', t: 'a good option for household relocation in Ayodhya' },
  { id: 'ay45', t: 'a convenient service for local moves in Ayodhya' },
  { id: 'ay46', t: 'a dependable option for packers and movers in Ayodhya' },
  { id: 'ay47', t: 'a positive moving experience in Ayodhya' },
  { id: 'ay48', t: 'a straightforward relocation service in Ayodhya' },
  { id: 'ay49', t: 'a capable moving team in Ayodhya' },
  { id: 'ay50', t: 'a well-managed shifting service in Ayodhya' },
  { id: 'ay51', t: 'a good service for moving locally in Ayodhya' },
  { id: 'ay52', t: 'a dependable packing service in Ayodhya' },
  { id: 'ay53', t: 'a professional option for household moves in Ayodhya' },
  { id: 'ay54', t: 'a smooth pack-and-shift experience in Ayodhya' },
  { id: 'ay55', t: 'a responsive relocation team in Ayodhya' },
  { id: 'ay56', t: 'a practical packers and movers option in Ayodhya' },
  { id: 'ay57', t: 'a good team for local relocation in Ayodhya' },
  { id: 'ay58', t: 'a reliable household shifting service in Ayodhya' },
  { id: 'ay59', t: 'a professional moving team in Ayodhya' },
  { id: 'ay60', t: 'a satisfactory relocation experience in Ayodhya' },
]

const AYODHYA_SENTENCES: PoolItem[] = [
  { id: 'ays01', t: 'For anyone looking for a reliable moving service in Ayodhya, this was a good experience.' },
  { id: 'ays02', t: 'Our shifting experience in Ayodhya was smooth and well organised.' },
  { id: 'ays03', t: 'I was happy with the service we received for our move in Ayodhya.' },
  { id: 'ays04', t: 'The team handled our shifting work professionally in Ayodhya.' },
  { id: 'ays05', t: 'This was a good option for our shifting needs in Ayodhya.' },
  { id: 'ays06', t: 'The overall moving experience in Ayodhya was better than expected.' },
  { id: 'ays07', t: 'The service worked well for our relocation in Ayodhya.' },
  { id: 'ays08', t: 'I would consider them again for a move in Ayodhya.' },
  { id: 'ays09', t: 'The team made our local shifting work easier in Ayodhya.' },
  { id: 'ays10', t: 'Our household move in Ayodhya was handled in a fairly organised way.' },
  { id: 'ays11', t: 'Good experience overall with this moving service in Ayodhya.' },
  { id: 'ays12', t: 'The packing and shifting process was handled well for our move in Ayodhya.' },
  { id: 'ays13', t: 'For our relocation in Ayodhya, the team was helpful and professional.' },
  { id: 'ays14', t: 'The service was convenient for our shifting requirements in Ayodhya.' },
  { id: 'ays15', t: 'I had a positive experience using a packers service in Ayodhya.' },
  { id: 'ays16', t: 'The move was completed without too much hassle in Ayodhya.' },
  { id: 'ays17', t: 'Their team was useful for our household shifting in Ayodhya.' },
  { id: 'ays18', t: 'The relocation went reasonably smoothly for us in Ayodhya.' },
  { id: 'ays19', t: 'A good experience for a local move in Ayodhya.' },
  { id: 'ays20', t: 'The team was responsive during our move in Ayodhya.' },
  { id: 'ays21', t: 'The service was suitable for our packing and moving needs in Ayodhya.' },
  { id: 'ays22', t: 'Our move in Ayodhya was handled with reasonable care.' },
  { id: 'ays23', t: 'I found the relocation service useful for our move in Ayodhya.' },
  { id: 'ays24', t: 'The overall process was fairly straightforward for our move in Ayodhya.' },
  { id: 'ays25', t: 'The team coordinated our shifting work well in Ayodhya.' },
  { id: 'ays26', t: 'The packing and transport work was completed smoothly in Ayodhya.' },
  { id: 'ays27', t: 'Our local relocation was easier with their team in Ayodhya.' },
  { id: 'ays28', t: 'I appreciated having a professional moving team for our shift in Ayodhya.' },
  { id: 'ays29', t: 'The experience was positive overall for our relocation in Ayodhya.' },
  { id: 'ays30', t: 'For our move in Ayodhya, the service was convenient and easy to coordinate.' },
]

const LOCAL_TRIGGER_CHANCE = 0.58

/* --------------------------- blueprints --------------------------- */

type Slot = 'OPEN' | 'SVC' | 'ATTR' | 'MIX' | 'IMP' | 'QUAL' | 'LOCAL' | 'CLOSE'

const BLUE_POS: Slot[][] = [
  ['OPEN', 'SVC', 'ATTR', 'ATTR', 'CLOSE'],
  ['OPEN', 'ATTR', 'CLOSE'],
  ['OPEN', 'SVC', 'MIX', 'CLOSE'],
  ['SVC', 'ATTR', 'ATTR', 'QUAL', 'CLOSE'],
  ['OPEN', 'ATTR', 'ATTR', 'QUAL'],
  ['ATTR', 'OPEN', 'SVC', 'CLOSE'],
  ['OPEN', 'MIX', 'QUAL', 'CLOSE'],
  ['SVC', 'OPEN', 'ATTR', 'CLOSE'],
  ['OPEN', 'SVC', 'ATTR', 'MIX', 'QUAL', 'CLOSE'],
  ['OPEN', 'ATTR', 'ATTR', 'ATTR', 'CLOSE'],
  ['OPEN', 'SVC', 'ATTR', 'ATTR', 'QUAL', 'CLOSE'],
  ['OPEN', 'ATTR', 'SVC', 'ATTR', 'CLOSE'],
  ['SVC', 'MIX', 'QUAL', 'CLOSE'],
  ['OPEN', 'ATTR', 'QUAL', 'CLOSE'],
  ['OPEN', 'SVC', 'ATTR', 'CLOSE'],
  ['OPEN', 'SVC', 'CLOSE'],
  ['OPEN', 'MIX', 'CLOSE'],
  ['OPEN', 'SVC', 'ATTR', 'QUAL'],
]

const BLUE_MIX: Slot[][] = [
  ['OPEN', 'ATTR', 'IMP', 'CLOSE'],
  ['OPEN', 'ATTR', 'IMP', 'QUAL', 'CLOSE'],
  ['OPEN', 'IMP', 'ATTR', 'CLOSE'],
  ['OPEN', 'SVC', 'ATTR', 'IMP', 'CLOSE'],
  ['OPEN', 'ATTR', 'IMP', 'IMP', 'CLOSE'],
  ['OPEN', 'MIX', 'IMP', 'CLOSE'],
  ['OPEN', 'IMP', 'ATTR', 'QUAL', 'CLOSE'],
  ['SVC', 'ATTR', 'IMP', 'CLOSE'],
]

const BLUE_LOW: Slot[][] = [
  ['OPEN', 'IMP', 'CLOSE'],
  ['OPEN', 'IMP', 'IMP', 'CLOSE'],
  ['OPEN', 'IMP', 'ATTR', 'IMP', 'CLOSE'],
  ['OPEN', 'IMP', 'QUAL', 'CLOSE'],
  ['OPEN', 'ATTR', 'IMP', 'CLOSE'],
  ['OPEN', 'IMP', 'IMP', 'QUAL', 'CLOSE'],
]

/* --------------------------- fill logic --------------------------- */

// Replace placeholders in a template with real phrases.
function fill(tpl: string, ctx: Ctx, usedPhrases: Set<string>): string {
  const availAttrs = ctx.attrs.filter((a) => !usedPhrases.has(a))
  const attrs = availAttrs.length ? availAttrs : ctx.attrs
  const availImps = ctx.imps.filter((a) => !usedPhrases.has(a))
  const imps = availImps.length ? availImps : ctx.imps

  const a = attrs.length ? pick(attrs) : ''
  const a1 = ctx.attrs[0] ?? ''
  const a2 = ctx.attrs[1] ?? ctx.attrs[0] ?? ''
  const a3 = ctx.attrs[2] ?? ctx.attrs[1] ?? ctx.attrs[0] ?? ''
  const i = imps.length ? pick(imps) : ''

  if (/\{[aA]\}/.test(tpl) && a) usedPhrases.add(a)
  if (/\{a[123]\}|\{A1\}/.test(tpl)) [a1, a2, a3].forEach((x) => x && usedPhrases.add(x))
  if (/\{[iI]\}/.test(tpl) && i) usedPhrases.add(i)

  return tpl
    .replace(/\{SVC\}/g, () => cap(pick(ctx.svc.refs)))
    .replace(/\{svc\}/g, () => pick(ctx.svc.refs))
    .replace(/\{A1\}/g, () => cap(a1))
    .replace(/\{A\}/g, () => cap(a))
    .replace(/\{a1\}/g, () => a1)
    .replace(/\{a2\}/g, () => a2)
    .replace(/\{a3\}/g, () => a3)
    .replace(/\{a\}/g, () => a)
    .replace(/\{I\}/g, () => cap(i))
    .replace(/\{i\}/g, () => i)
    .replace(/\{LOCAL\}/g, () => ctx.localPhrase?.t ?? '')
}

// Turn a slot into a concrete pool item (or null if impossible).
function resolveSlot(slot: Slot, ctx: Ctx, usedIds: Set<string>): PoolItem | null {
  switch (slot) {
    case 'OPEN':
      if (ctx.tone === 'pos') return ctx.rating === 5 && Math.random() < 0.28 ? pickUnused(POS_FIVE, usedIds) : pickUnused(POS_OPEN, usedIds)
      return ctx.tone === 'mix' ? pickUnused(MIX_OPEN, usedIds) : pickUnused(LOW_OPEN, usedIds)
    case 'SVC':
      return ctx.tone === 'mix' ? pickUnused(MIX_SVC, usedIds) : pickUnused(POS_SVC, usedIds)
    case 'ATTR':
      if (!ctx.attrs.length) return null
      if (ctx.tone === 'pos') return pickUnused(POS_ATTR, usedIds)
      return ctx.tone === 'mix' ? pickUnused(MIX_ATTR, usedIds) : pickUnused(LOW_ATTR, usedIds)
    case 'MIX':
      if (ctx.attrs.length < 2) return resolveSlot('ATTR', ctx, usedIds)
      return ctx.tone === 'pos' ? pickUnused(POS_MULTI, usedIds) : pickUnused(MIX_ATTR, usedIds)
    case 'IMP':
      if (!ctx.imps.length) return null
      return pickUnused(ctx.tone === 'low' ? LOW_IMP : MIX_IMP, usedIds)
    case 'QUAL':
      if (ctx.tone === 'pos') return pickUnused(POS_QUAL, usedIds)
      return ctx.tone === 'mix' ? pickUnused(MIX_QUAL, usedIds) : pickUnused(LOW_QUAL, usedIds)
    case 'LOCAL':
      if (!ctx.localSentence && !ctx.localPhrase) return null
      return ctx.localSentence ?? ctx.localPhrase
    case 'CLOSE':
      if (ctx.tone === 'pos') return pickUnused(POS_CLOSE, usedIds)
      return ctx.tone === 'mix' ? pickUnused(MIX_CLOSE, usedIds) : pickUnused(LOW_CLOSE, usedIds)
    default:
      return null
  }
}

// Choose a blueprint whose slot counts fit the available attrs/imps.
function chooseBlueprints(tone: Tone, ctx: Ctx): Slot[][] {
  const pool = tone === 'pos' ? BLUE_POS : tone === 'mix' ? BLUE_MIX : BLUE_LOW
  const count = (bp: Slot[], kinds: Slot[]) => bp.filter((s) => kinds.includes(s)).length
  const filtered = pool.filter(
    (bp) => count(bp, ['ATTR', 'MIX']) <= Math.max(1, ctx.attrs.length) && count(bp, ['IMP']) <= Math.max(1, ctx.imps.length),
  )
  return filtered.length ? filtered : pool
}

/* ------------------------ sentence cleanup ------------------------ */

function tidy(s: string): string {
  let t = s.replace(/\s+/g, ' ').trim()
  t = t.replace(/([.!?,;:])\1+$/, '$1')
  if (!/[.!?:;]$/.test(t)) t += '.'
  return cap(t)
}

/* -------------------------- composition --------------------------- */

function composeOnce(ctx: Ctx, usedIds: Set<string>): { text: string; words: number; ids: string[] } {
  const blueprints = chooseBlueprints(ctx.tone, ctx)
  let bp = pick(blueprints)
  if (ctx.localPhrase || ctx.localSentence) {
    const localSlot: Slot = 'LOCAL'
    const insertAt = Math.min(1 + randInt(2), bp.length)
    bp = [...bp.slice(0, insertAt), localSlot, ...bp.slice(insertAt)]
  }

  const ids: string[] = []
  const sentences: string[] = []
  const usedPhrases = new Set<string>()

  for (const slot of bp) {
    const item = resolveSlot(slot, ctx, usedIds)
    if (!item) continue
    const s = tidy(fill(item.t, ctx, usedPhrases))
    if (!sentences.includes(s)) {
      ids.push(item.id)
      sentences.push(s)
    }
  }

  // Occasionally append a closing line.
  if (sentences.length >= 3 && Math.random() < 0.22) {
    const closer = pick(ctx.tone === 'pos' ? POS_CLOSE : ctx.tone === 'mix' ? MIX_CLOSE : LOW_CLOSE)
    if (!ids.includes(closer.id)) {
      ids.push(closer.id)
      sentences.push(tidy(fill(closer.t, ctx, usedPhrases)))
    }
  }

  let text = sentences.join(' ')
  if (Math.random() < 0.12) text += pick(EMOJI)

  return { text, words: text.split(/\s+/).filter(Boolean).length, ids }
}

/* --------------------- similarity / uniqueness -------------------- */

function normalizeKey(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()
}

function bigrams(words: string[]): string[] {
  const out: string[] = []
  for (let i = 0; i < words.length - 1; i++) out.push(words[i] + ' ' + words[i + 1])
  return out
}

function similarity(a: string, b: string): number {
  const wa = normalizeKey(a).split(' ').filter(Boolean)
  const wb = normalizeKey(b).split(' ').filter(Boolean)
  if (!wa.length || !wb.length) return 0

  const sa = new Set(wa)
  const sb = new Set(wb)
  let commonW = 0
  sa.forEach((w) => sb.has(w) && commonW++)
  const unionW = sa.size + sb.size - commonW
  const wordScore = unionW ? commonW / unionW : 0

  const ba = new Set(bigrams(wa))
  const bb = new Set(bigrams(wb))
  let commonB = 0
  ba.forEach((w) => bb.has(w) && commonB++)
  const unionB = ba.size + bb.size - commonB
  const bigramScore = unionB ? commonB / unionB : 0

  return 0.45 * wordScore + 0.55 * bigramScore
}

/* --------------------- localStorage history ----------------------- */

const HISTORY_KEY = 'spm_hist_v1'
const LAST_KEY = 'spm_last_v1'

export interface HistoryEntry {
  t: string
  ids: string[]
  ts: number
}

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* ignore */
  }
}

function getHistory(): HistoryEntry[] {
  const h = load<HistoryEntry[]>(HISTORY_KEY, [])
  return Array.isArray(h) ? h : []
}

function pushHistory(entry: HistoryEntry) {
  const hist = getHistory().filter((x) => normalizeKey(x.t) !== normalizeKey(entry.t))
  hist.push(entry)
  save(HISTORY_KEY, hist.slice(-40))
  save(LAST_KEY, entry)
}

const sessionSeen = new Set<string>()

/* ---------------------------- generate ---------------------------- */

export function buildContext(input: ComposeInput): Ctx {
  const svc = SERVICES.find((s) => s.id === input.serviceId) ?? SERVICES[0]
  const rating = Math.min(5, Math.max(1, input.rating || 5))

  const attrs = shuffle(
    input.liked
      .map((id) => HIGHLIGHTS.find((h) => h.id === id)?.phrases)
      .filter((p): p is string[] => Array.isArray(p))
      .map((p) => pick(p)),
  )
  const imps = shuffle(
    input.improve
      .map((id) => IMPROVEMENTS.find((h) => h.id === id)?.phrases)
      .filter((p): p is string[] => Array.isArray(p))
      .map((p) => pick(p)),
  )

  const tone: Tone = rating >= 4 ? 'pos' : rating === 3 ? 'mix' : 'low'
  const useLocal = Math.random() < LOCAL_TRIGGER_CHANCE
  const localSentence = useLocal && Math.random() < 0.45 ? pick(AYODHYA_SENTENCES) : null
  const localPhrase = useLocal && !localSentence ? pick(AYODHYA_PHRASES) : null

  return { rating, svc, attrs: attrs.slice(0, 4), imps: imps.slice(0, 2), tone, localPhrase, localSentence }
}

export interface GeneratedReview {
  text: string
  words: number
  ids: string[]
}

export function generateReview(input: ComposeInput): GeneratedReview {
  const ctx = buildContext(input)
  const last = load<HistoryEntry | null>(LAST_KEY, null)
  const usedIds = new Set<string>(last?.ids ?? [])
  const historyTexts = getHistory().map((h) => h.t)

  let best: { text: string; words: number; ids: string[] } | null = null
  let bestScore = Number.POSITIVE_INFINITY

  for (let i = 0; i < 16; i++) {
    const cand = composeOnce(ctx, usedIds)
    const key = normalizeKey(cand.text)
    let score = 0
    for (const t of historyTexts) score = Math.max(score, similarity(cand.text, t))
    for (const t of sessionSeen) score = Math.max(score, similarity(cand.text, t))
    if (best && cand.text === best.text) score = 1

    if (score < 0.42 && !sessionSeen.has(key)) {
      best = cand
      break
    }
    if (score < bestScore) {
      bestScore = score
      best = cand
    }
  }

  if (!best) best = { text: 'Thank you.', words: 2, ids: [] }

  const key = normalizeKey(best.text)
  sessionSeen.add(key)
  if (sessionSeen.size > 200) {
    const first = sessionSeen.values().next().value
    if (first) sessionSeen.delete(first)
  }

  pushHistory({ t: best.text, ids: best.ids, ts: Date.now() })

  return { ...best, ids: [...best.ids, `s${bestScore.toFixed(2)}`] }
}

export function lengthLabel(words: number): string {
  return words < 20 ? 'Short' : words < 45 ? 'Balanced' : 'Detailed'
}
