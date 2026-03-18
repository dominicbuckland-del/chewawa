export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  author: string
  publishedAt: string
  tags: string[]
  readTime: number
}

export const blogPosts: BlogPost[] = [
  {
    id: 'blog_1',
    title: 'Why Small Breed Dogs Lose Their Teeth (And How to Prevent It)',
    slug: 'small-breed-dental-disease',
    excerpt: 'Small breeds develop periodontal disease at 5x the rate of larger dogs. Here is what is actually happening in their mouths and what you can do about it.',
    content: `Small breed dogs — Chihuahuas, Maltese, Yorkies, Pomeranians, Toy Poodles — are disproportionately affected by dental disease. By age 3, most small dogs already show signs of periodontal problems. By age 5, many have lost teeth.

## The anatomy problem

Small breeds have the same number of teeth (42) as a German Shepherd, crammed into a jaw a fraction of the size. This overcrowding creates tight gaps where food particles and bacteria accumulate. Brushing rarely reaches these spaces, and most standard dental chews are too large for small breed jaws.

## What periodontal disease actually looks like

Stage 1 starts with gingivitis — red, inflamed gums that bleed easily. Most owners miss this because they are not regularly checking their dog's mouth. Stage 2 involves early bone loss around the tooth roots. By Stage 3, significant bone loss makes teeth loose. Stage 4 means extraction.

The progression from Stage 1 to Stage 3 can happen in under 12 months in small breeds.

## What works

Daily mechanical cleaning is the gold standard. VOHC-accepted dental chews provide a textured surface that scrapes plaque before it mineralises into tartar. For small breeds, the chew must be:

- Sized for jaws under 10kg
- Soft enough to prevent tooth fractures
- Textured enough to provide cleaning action
- Given daily for consistent prevention

Professional dental cleanings under anaesthesia remain important, but daily chewing between cleanings is what prevents the rapid progression small breeds experience.

## The cost reality

A professional dental cleaning with extractions can cost $800-2,000 in Australia. A daily dental chew costs roughly $1 per day. The maths is straightforward.`,
    coverImage: '/images/blog/small-breed-dental.jpg',
    author: 'Chewawa Team',
    publishedAt: '2026-03-15',
    tags: ['small breeds', 'dental health', 'prevention'],
    readTime: 4,
  },
  {
    id: 'blog_2',
    title: 'The Complete Dental Care Guide for Chihuahuas in Australia',
    slug: 'chihuahua-dental-care-guide',
    excerpt: 'Chihuahuas have the highest rate of dental disease of any breed. Here is a practical guide to keeping their teeth healthy in the Australian climate.',
    content: `Chihuahuas are the most popular toy breed in Australia and, unfortunately, the most prone to dental disease. Their tiny jaws, retained baby teeth, and genetic predisposition create a perfect storm for oral health problems.

## Why Chihuahuas are different

Chihuahuas frequently retain deciduous (baby) teeth well past the normal shedding age. When adult teeth grow in alongside retained baby teeth, it creates double rows that trap food and bacteria at an accelerated rate. Your vet should check for retained teeth at every visit.

Their jaw structure also means the roots of their teeth are proportionally shorter than larger breeds, making them more susceptible to loosening once bone loss begins.

## Australian-specific considerations

Australia's climate means more outdoor time and more exposure to sticks, bark, and hard surfaces that Chihuahuas may chew on. These are significantly harder than appropriate chews and can fracture their delicate teeth.

The Australian vet dental cleaning cost is typically $600-1,500 for small breeds depending on extractions needed. Pet insurance in Australia rarely covers dental beyond accident-related damage.

## A practical daily routine

1. Morning: One size-appropriate soft dental chew (never hard bones or antlers)
2. Evening: 30 seconds of brushing with enzymatic pet toothpaste if your dog tolerates it
3. Weekly: Check gums for redness, swelling, or bleeding
4. Annually: Professional dental assessment at your vet
5. Avoid: Cooked bones, hard nylon chews, and anything that does not flex when pressed

## Signs you need to see a vet now

- Drooling more than usual
- Dropping food while eating
- Pawing at the mouth
- Visible swelling on one side of the face
- Reluctance to have their head touched
- Bad breath that has recently worsened (chronic bad breath is also a concern, but a sudden change is urgent)`,
    coverImage: '/images/blog/chihuahua-dental.jpg',
    author: 'Chewawa Team',
    publishedAt: '2026-03-12',
    tags: ['chihuahua', 'dental care', 'breed guide'],
    readTime: 5,
  },
  {
    id: 'blog_3',
    title: 'French Bulldog Dental Problems: Why Standard Chews Do Not Work',
    slug: 'french-bulldog-dental-problems',
    excerpt: 'Flat-faced breeds like Frenchies cannot use standard dental chews effectively. Here is what to look for instead.',
    content: `French Bulldogs are the fastest-growing breed in Australia. They are also one of the most challenging when it comes to dental care. Their brachycephalic (flat-faced) skull structure creates unique problems that most dental products simply were not designed for.

## The jaw structure problem

A Frenchie's mandible is shorter and wider than a standard dog's jaw. This means:

- Elongated chew sticks are difficult to grip and position correctly
- The chewing angle is different — they tend to use the sides of their mouths more
- Their breathing is already compromised, so anything that requires extended forward grip can cause respiratory distress
- Teeth are often crowded and rotated due to the compressed jaw

## What does not work

Standard dental sticks, rawhide rolls, and long-format chews are designed for dogs with protruding muzzles. When a Frenchie tries to use these, they either cannot grip them effectively or they adopt compensating chewing patterns that do not clean teeth properly.

Hard chews (antlers, bones, nylon) are especially risky because Frenchies tend to bite down with excessive force on surfaces they cannot properly grip, increasing fracture risk.

## What actually works for flat-faced breeds

The ideal chew for a brachycephalic dog is:

- Flat and wide rather than elongated
- Does not require forward-reaching grip
- Soft enough to prevent tooth fractures on a compressed jaw
- Short chewing duration (Frenchies should not chew for extended periods due to breathing)
- Textured on flat surfaces for plaque removal

## The bigger picture

Frenchie dental care needs to be part of a broader brachycephalic health management plan. Regular vet checks, monitoring for BOAS (Brachycephalic Obstructive Airway Syndrome), and appropriate exercise levels all play into their overall quality of life. Dental disease compounds breathing problems — infected teeth and gums create inflammation that can further restrict already compromised airways.`,
    coverImage: '/images/blog/frenchie-dental.jpg',
    author: 'Chewawa Team',
    publishedAt: '2026-03-08',
    tags: ['french bulldog', 'brachycephalic', 'dental care'],
    readTime: 4,
  },
  {
    id: 'blog_4',
    title: 'What the VOHC Seal Actually Means (And Why Most Dog Chews Do Not Have It)',
    slug: 'what-vohc-seal-means',
    excerpt: 'Only a handful of dental products carry the VOHC seal of acceptance. Here is what the seal requires and why it matters for your dog.',
    content: `Walk down the pet aisle at any Australian supermarket or pet store and you will see dozens of products claiming to clean teeth. Very few of them can actually prove it.

## What is the VOHC?

The Veterinary Oral Health Council is an independent body that evaluates pet dental products against strict scientific criteria. A product earns the VOHC seal only after demonstrating, through controlled clinical trials, that it reduces plaque or tartar (or both) by a meaningful percentage.

The trials follow specific protocols: real dogs, measured plaque scores before and after, control groups, and statistical analysis. Products cannot buy the seal — they must earn it through evidence.

## Why most products do not have it

The VOHC evaluation process is expensive and time-consuming. Companies must fund their own clinical trials, which can take months and cost tens of thousands of dollars. Many pet treat manufacturers simply do not invest in this level of evidence because they can sell products with vague dental claims regardless.

Claims like "helps clean teeth" or "supports dental health" require no evidence. The VOHC seal does.

## What to look for in Australia

When shopping for dental chews in Australia, look for:

1. The VOHC seal of acceptance on the packaging
2. Specific claims about plaque or tartar reduction with percentages
3. Named active ingredients (like delmopinol or sodium hexametaphosphate)
4. Size-specific formulations rather than one-size-fits-all
5. Feeding guidelines based on dog weight

## The Australian regulatory landscape

Australia's APVMA (Australian Pesticides and Veterinary Medicines Authority) regulates veterinary products, but dental chews often fall into a grey area between "treats" and "therapeutic goods." This means the bar for marketing claims is lower than for actual medications. The VOHC provides an independent standard that cuts through the noise.

## Our position

Every daily dental chew in the Chewawa range carries the VOHC seal of acceptance. We believe if a product claims to clean teeth, it should be able to prove it.`,
    coverImage: '/images/blog/vohc-seal.jpg',
    author: 'Chewawa Team',
    publishedAt: '2026-03-05',
    tags: ['VOHC', 'dental science', 'education'],
    readTime: 5,
  },
  {
    id: 'blog_5',
    title: 'Maltese, Cavaliers, and Dachshunds: Dental Care for Australia\'s Most Popular Small Breeds',
    slug: 'popular-small-breeds-dental-care',
    excerpt: 'A breed-by-breed dental care guide for the small breeds Australian families love most.',
    content: `Australia's most popular small breeds each have unique dental challenges. Here is what to know about three breeds that consistently top adoption and ownership lists.

## Maltese

Maltese are among the smallest breeds commonly kept in Australia, typically weighing 3-4kg. Their dental issues stem from:

- Extremely crowded teeth in a tiny jaw
- High incidence of retained baby teeth
- Genetic predisposition to early-onset periodontal disease
- White facial hair that stains from tear ducts, often linked to dental infections

Maltese benefit from the softest dental chews available. Their teeth are fragile, and their jaw strength is minimal. A chew that a Labrador can handle in seconds is completely inappropriate for a Maltese.

Daily dental chewing should start from 6 months of age. Annual professional cleanings are recommended starting at age 2 — earlier if your vet identifies retained teeth or early gingivitis.

## Cavalier King Charles Spaniels

Cavaliers have a unique combination of risk factors:

- Heart disease (MMVD) is the breed's primary health concern, and dental disease directly worsens cardiac outcomes
- Bacteria from periodontal infections can enter the bloodstream and damage heart valves
- Anaesthesia for dental cleanings carries higher risk in Cavaliers with existing heart conditions
- This makes daily preventive care even more critical

For Cavalier owners, the goal is to minimise the need for professional dental cleanings by maximising daily prevention. A VOHC-accepted daily chew is the most reliable tool.

If your Cavalier has been diagnosed with a heart murmur, discuss dental care strategy with your vet. Prevention becomes non-negotiable once heart disease is present.

## Dachshunds

Dachshunds have a unique jaw shape — long and narrow — that creates different dental challenges from other small breeds:

- The elongated jaw means teeth are more spaced than in Chihuahuas or Maltese
- However, their narrow snout means chews must be appropriately sized
- Dachshunds are strong chewers relative to their size
- Their independent personality means they often refuse brushing, making chews the primary dental tool

Dachshunds can typically handle slightly firmer chews than toy breeds, but they should still be size-appropriate. A medium-firmness chew in a small-breed size tends to work well.

## Common thread

All three breeds share one critical need: daily dental intervention starting young. The cost of prevention — roughly $1-2 per day with a quality dental chew — is a fraction of the $1,000-2,000 a professional dental cleaning costs in Australian veterinary clinics. For breeds with compounding health factors (like Cavaliers), prevention is not just economical, it is medically necessary.`,
    coverImage: '/images/blog/popular-small-breeds.jpg',
    author: 'Chewawa Team',
    publishedAt: '2026-03-01',
    tags: ['maltese', 'cavalier', 'dachshund', 'breed guide'],
    readTime: 6,
  },
]

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug)
}
