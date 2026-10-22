// Reuse Michelle's verified existing Tally forms. No signup records or secrets live here.
export const penpalDeliveryNote = "If you’re in the United States, I might send you a physical letter. If you’re outside the US, I’ll send you an email."

export const signupForms = {
  magazine: {
    id: "zxP9JM",
    title: "The magazine waitlist",
    publicUrl: "https://tally.so/r/zxP9JM",
    pagePath: "/magazine",
    embedUrl: "https://tally.so/embed/zxP9JM?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1",
    height: 649,
  },
  penpals: {
    id: "68alRY",
    title: "Pen pal interest signup",
    publicUrl: "https://tally.so/r/68alRY",
    pagePath: "/penpals",
    embedUrl: "https://tally.so/embed/68alRY?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1",
    height: 1161,
  },
} as const
