import { type PricingPlan } from "@/types"

export const pricingPlans: PricingPlan[] = [
  {
    id: "basic",
    name: "Basic",
    description: "Perfect for when you are just getting started",
    features: ["Up to 5 projects", "Basic analytics and reporting"],
    limitations: [
      "No custom branding",
      "No commercial license",
      "Limited customer support",
      "No access to new features",
    ],
    stripePriceId: "",
    prices: {
      monthly: 9,
      yearly: 84,
    },
    stripeIds: {
      monthly: undefined,
      yearly: undefined,
    },
  },
  {
    id: "standard",
    name: "Standard",
    description: "Perfect for when you are starting to grow",
    features: [
      "Up to 10 projects",
      "Commercial license",
      "Advanced analytics and reporting",
      "Priority customer support",
      "Exclusive training materials",
    ],
    limitations: ["No custom branding", "Limited customer support"],
    stripePriceId: "",
    prices: {
      monthly: 19,
      yearly: 180,
    },
    stripeIds: {
      monthly: undefined,
      yearly: undefined,
    },
  },
  {
    id: "premium",
    name: "Premium",
    description: "Perfect for seriously scaling your business",
    features: [
      "Unlimited projects",
      "Commercial licence",
      "Real-time analytics and reporting",
      "Exclusive training materials",
      "24/7 custommer support",
      "Personal branding",
    ],
    limitations: [],
    stripePriceId: "",
    prices: {
      monthly: 29,
      yearly: 240,
    },
    stripeIds: {
      monthly: undefined,
      yearly: undefined,
    },
  },
]
