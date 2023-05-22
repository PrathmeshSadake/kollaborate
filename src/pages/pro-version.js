import { signIn, signOut, useSession } from "next-auth/react";
import React, { useState } from "react";

import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";

const navigation = [
  { name: "Solutions", href: "#" },
  { name: "Pricing", href: "#" },
  { name: "Docs", href: "#" },
  { name: "Company", href: "#" },
];
const plans = [
  {
    title: "Starter",
    featured: false,
    description: "All your essential business finances, taken care of.",
    priceMonthly: 5,
    priceYearly: 56,
    mainFeatures: [
      { id: 1, value: "Basic invoicing" },
      { id: 2, value: "Easy to use accounting" },
      { id: 3, value: "Mutli-accounts" },
    ],
  },
  {
    title: "Scale",
    featured: true,
    description: "The best financial services for your thriving business.",
    priceMonthly: 19,
    priceYearly: 220,
    mainFeatures: [
      { id: 1, value: "Advanced invoicing" },
      { id: 2, value: "Easy to use accounting" },
      { id: 3, value: "Mutli-accounts" },
      { id: 4, value: "Tax planning toolkit" },
      { id: 5, value: "VAT & VATMOSS filing" },
      { id: 6, value: "Free bank transfers" },
    ],
  },
  {
    title: "Growth",
    featured: false,
    description: "Convenient features to take your business to the next level.",
    priceMonthly: 12,
    priceYearly: 140,
    mainFeatures: [
      { id: 1, value: "Basic invoicing" },
      { id: 2, value: "Easy to use accounting" },
      { id: 3, value: "Mutli-accounts" },
      { id: 4, value: "Tax planning toolkit" },
    ],
  },
];
const features = [
  {
    title: "Tax Savings",
    tiers: [
      { title: "starter", value: true },
      { title: "popular", featured: true, value: true },
      { title: "intermediate", value: true },
    ],
  },
  {
    title: "Easy to use accounting",
    tiers: [
      { title: "starter", value: true },
      { title: "popular", featured: true, value: true },
      { title: "intermediate", value: true },
    ],
  },
  {
    title: "Multi-accounts",
    tiers: [
      { title: "starter", value: "3 accounts" },
      { title: "popular", featured: true, value: "Unlimited accounts" },
      { title: "intermediate", value: "7 accounts" },
    ],
  },
  {
    title: "Invoicing",
    tiers: [
      { title: "starter", value: "3 invoices" },
      { title: "popular", featured: true, value: "Unlimited invoices" },
      { title: "intermediate", value: "10 invoices" },
    ],
  },
  {
    title: "Exclusive offers",
    tiers: [
      { title: "starter", value: false },
      { title: "popular", featured: true, value: true },
      { title: "intermediate", value: true },
    ],
  },
  {
    title: "6 months free advisor",
    tiers: [
      { title: "starter", value: false },
      { title: "popular", featured: true, value: true },
      { title: "intermediate", value: true },
    ],
  },
  {
    title: "Mobile and web access",
    tiers: [
      { title: "starter", value: false },
      { title: "popular", featured: true, value: true },
      { title: "intermediate", value: false },
    ],
  },
];
const perks = [
  {
    title: "24/7 customer support",
    tiers: [
      { title: "starter", value: true },
      { title: "popular", featured: true, value: true },
      { title: "intermediate", value: true },
    ],
  },
  {
    title: "Instant notifications",
    tiers: [
      { title: "starter", value: true },
      { title: "popular", featured: true, value: true },
      { title: "intermediate", value: true },
    ],
  },
  {
    title: "Budgeting tools",
    tiers: [
      { title: "starter", value: true },
      { title: "popular", featured: true, value: true },
      { title: "intermediate", value: true },
    ],
  },
  {
    title: "Digital receipts",
    tiers: [
      { title: "starter", value: true },
      { title: "popular", featured: true, value: true },
      { title: "intermediate", value: true },
    ],
  },
  {
    title: "Pots to separate money",
    tiers: [
      { title: "starter", value: false },
      { title: "popular", featured: true, value: true },
      { title: "intermediate", value: true },
    ],
  },
  {
    title: "Free bank transfers",
    tiers: [
      { title: "starter", value: false },
      { title: "popular", featured: true, value: true },
      { title: "intermediate", value: false },
    ],
  },
  {
    title: "Business debit card",
    tiers: [
      { title: "starter", value: false },
      { title: "popular", featured: true, value: true },
      { title: "intermediate", value: false },
    ],
  },
];
const faqs = [
  {
    id: 1,
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  // More questions...
];
const footerNavigation = {
  solutions: [
    { name: "Marketing", href: "#" },
    { name: "Analytics", href: "#" },
    { name: "Commerce", href: "#" },
    { name: "Insights", href: "#" },
  ],
  support: [
    { name: "Pricing", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "Guides", href: "#" },
    { name: "API Status", href: "#" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Jobs", href: "#" },
    { name: "Press", href: "#" },
    { name: "Partners", href: "#" },
  ],
  legal: [
    { name: "Claim", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: (props) => (
        <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
          <path
            fillRule='evenodd'
            d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
            clipRule='evenodd'
          />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "#",
      icon: (props) => (
        <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
          <path
            fillRule='evenodd'
            d='M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z'
            clipRule='evenodd'
          />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "#",
      icon: (props) => (
        <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
          <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "#",
      icon: (props) => (
        <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
          <path
            fillRule='evenodd'
            d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
            clipRule='evenodd'
          />
        </svg>
      ),
    },
    {
      name: "Dribbble",
      href: "#",
      icon: (props) => (
        <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
          <path
            fillRule='evenodd'
            d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z'
            clipRule='evenodd'
          />
        </svg>
      ),
    },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProVersion = () => {
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const { data, status } = useSession();

  const goToCheckout = async () => {
    setIsCheckoutLoading(true);
    const res = await fetch(`/api/stripe/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { redirectUrl } = await res.json();
    if (redirectUrl) {
      window.location.assign(redirectUrl);
    } else {
      setIsCheckoutLoading(false);
      console.log("Error creating checkout session");
    }
  };

  return (
    <main className='bg-white'>
      {status === "loading" && <p>Loading...</p>}
      {/* {status === "unauthenticated" && (
        <button onClick={() => signIn()}>Sign In</button>
      )} */}
      {/* {status === "authenticated" && (
        <button onClick={() => signOut()}>Sign Out</button>
      )} */}
      {data && (
        <div className='bg-gray-900 py-6'>
          <div>
            <div className='relative mx-auto max-w-2xl px-6 pt-16 text-center lg:max-w-7xl lg:px-8'>
              <h1 className='text-4xl font-bold tracking-tight text-white sm:text-6xl'>
                <span className='block lg:inline'>Simple pricing,</span>
                <span className='block lg:inline'>no commitment.</span>
              </h1>
              <p className='mt-4 text-xl text-indigo-100'>
                Everything you need, nothing you don't. Pick a plan that best
                suits your business.
              </p>
            </div>
            <h2 className='sr-only'>Plans</h2>
            {/* Toggle */}
            <div className='relative mt-12 flex justify-center sm:mt-16'>
              <div className='flex rounded-lg bg-gray-500 p-0.5'>
                <div className='relative whitespace-nowrap rounded-md border-gray-500 bg-gray-800 py-2 px-6 text-sm font-medium text-gray-200 shadow-sm focus:z-10'>
                  Monthly billing
                </div>
              </div>
            </div>
            {/* Cards */}
            <div className='relative mx-auto mt-8 max-w-2xl px-6 pb-8 sm:mt-12 lg:max-w-7xl lg:px-8 lg:pb-0'>
              {/* Decorative background */}
              <div
                aria-hidden='true'
                className='absolute inset-0 top-4 bottom-6 left-8 right-8 hidden rounded-tl-lg rounded-tr-lg bg-indigo-700 lg:block'
              />

              <div className='relative space-y-6 lg:grid lg:grid-cols-3 lg:space-y-0'>
                {plans.map((plan) => (
                  <div
                    key={plan.title}
                    className={classNames(
                      plan.featured
                        ? "bg-white ring-2 ring-indigo-700 shadow-md"
                        : "bg-indigo-700 lg:bg-transparent",
                      "pt-6 px-6 pb-3 rounded-lg lg:px-8 lg:pt-12"
                    )}
                  >
                    <div>
                      <h3
                        className={classNames(
                          plan.featured ? "text-indigo-600" : "text-white",
                          "text-base font-semibold"
                        )}
                      >
                        {plan.title}
                      </h3>
                      <div className='flex flex-col items-start sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-start'>
                        <div className='mt-3 flex items-center'>
                          <p
                            className={classNames(
                              plan.featured ? "text-indigo-600" : "text-white",
                              "text-4xl font-bold tracking-tight"
                            )}
                          >
                            ${plan.priceMonthly}
                          </p>
                          <div className='ml-4'>
                            <p
                              className={classNames(
                                plan.featured ? "text-gray-700" : "text-white",
                                "text-sm"
                              )}
                            >
                              USD / mo
                            </p>
                            <p
                              className={classNames(
                                plan.featured
                                  ? "text-gray-500"
                                  : "text-indigo-200",
                                "text-sm"
                              )}
                            >
                              Billed yearly (${plan.priceYearly})
                            </p>
                          </div>
                        </div>
                        <a
                          href='#'
                          className={classNames(
                            plan.featured
                              ? "bg-indigo-600 text-white hover:bg-indigo-700"
                              : "bg-white text-indigo-600 hover:bg-indigo-50",
                            "mt-6 w-full inline-block py-2 px-8 border border-transparent rounded-md shadow-sm text-center text-sm font-medium sm:mt-0 sm:w-auto lg:mt-6 lg:w-full"
                          )}
                        >
                          Buy {plan.title}
                        </a>
                      </div>
                    </div>
                    <h4 className='sr-only'>Features</h4>
                    <ul
                      role='list'
                      className={classNames(
                        plan.featured
                          ? "border-gray-200 divide-gray-200"
                          : "border-indigo-500 divide-indigo-500 divide-opacity-75",
                        "mt-7 border-t divide-y lg:border-t-0"
                      )}
                    >
                      {plan.mainFeatures.map((mainFeature) => (
                        <li
                          key={mainFeature.id}
                          className='flex items-center py-3'
                        >
                          <CheckIcon
                            className={classNames(
                              plan.featured
                                ? "text-indigo-500"
                                : "text-indigo-200",
                              "w-5 h-5 flex-shrink-0"
                            )}
                            aria-hidden='true'
                          />
                          <span
                            className={classNames(
                              plan.featured ? "text-gray-600" : "text-white",
                              "ml-4 text-sm font-medium"
                            )}
                          >
                            {mainFeature.value}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProVersion;
