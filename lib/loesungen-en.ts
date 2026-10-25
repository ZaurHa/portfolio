/**
 * Englische Lösungsseiten (/en/solutions/<slug>) und internationaler Angebotskatalog.
 * Zielgruppe: kleine und mittlere Firmen und Agenturen außerhalb Deutschlands sowie internationale Firmen in Deutschland.
 * Faktenbasis: reports/Neue Angebote für BrandWerkX.md und die Projektseite. Preise wie freigegeben (Vorschläge, Zaur bestätigt).
 * Regeln: keine Gedankenstriche, Überschriften ohne Schlusspunkt, keine Kundennamen, keine Lieferzeiten.
 */
import type { Loesung, KatalogFamilie } from "./loesungen-typen";

export const loesungenEn: Loesung[] = [
  // ------------------------------------------------------------ AI phone assistant
  {
    key: "ki-telefon",
    lang: "en",
    slug: "ai-phone-assistant",
    label: "AI phone assistant",
    familie: "Reachability",
    metaTitle: "AI phone assistant and AI receptionist | from €490",
    metaDescription:
      "AI phone assistant that answers inbound calls, asks your questions and sends you a summary. EU-hosted and GDPR-minded. Setup from €490, then from €99/month.",
    eyebrow: "AI · Reachability",
    h1: "AI phone assistant for the calls you can't take",
    intro:
      "I set up an AI phone assistant that answers inbound calls when you can't, asks the questions your business needs and sends you a short summary by email or Telegram. It is made for service businesses that lose jobs to missed calls. Setup from €490, then from €99 a month for operation and support.",
    preise: [
      { betrag: "from €490", wofuer: "setup, one-off" },
      { betrag: "from €99/month", wofuer: "operation and support, call minutes agreed per project" },
    ],
    fuer: [
      "Trades and home services",
      "Moving and transport companies",
      "Car repair workshops",
      "Property managers",
      "Cleaning and facility services",
    ],
    sections: [
      {
        title: "What the assistant does",
        bullets: [
          "Answers inbound calls with a greeting and questions written for your business.",
          "Asks for the details you need before you call back, for example address, type of job and preferred date, or vehicle and fault.",
          "Sends you a short summary of every call by email or Telegram.",
          "Books appointments, if your calendar or booking tool can be connected.",
          "Puts urgent calls through to your mobile or takes a message.",
        ],
      },
      {
        title: "The value is in the questions, not the voice",
        text: "Plain AI answering services are easy to find and cheap. What saves you time is a conversation built for your trade: a moving enquiry that arrives with floor, volume and moving date, or a workshop call that arrives with vehicle and fault. I write that conversation for your business and adjust it as the calls come in.",
      },
      {
        title: "EU-hosted, set up and looked after by me",
        text: "I don't build a voice platform from scratch. I set up a partner platform hosted in the EU, write the conversation and connect it to your email, Telegram or calendar. In the first four weeks I read every call summary and adjust the script where the assistant gets things wrong. Every plan includes a fallback to your mobile, the platform's own support and a response time written into the contract.",
      },
      {
        title: "Rules built in from the first call",
        bullets: [
          "The assistant says it is an AI at the start of every call. In the EU, Article 50 of the AI Act has required this since 2 August 2026, and a note in your legal notice is not enough.",
          "Calls are only recorded with the caller's prior consent.",
          "Inbound calls only: in the US, AI voice calls need the prior express consent of the person called, so I don't set up outbound calling.",
          "Data processing agreements cover the whole chain down to the voice platform.",
          "I deliver the technology, not legal advice. You or your lawyer check the wording of notices and consent texts.",
        ],
      },
    ],
    ablauf: [
      "Free call: We go through your calls: who calls, what they need and what you want to know before you call back.",
      "Script and setup: I write the conversation for your business, set up the EU-hosted platform and connect email, Telegram or your calendar.",
      "Test calls: You call the assistant yourself and try the tricky cases. Only then do calls from your number go to it.",
      "First weeks and care: In the first four weeks I read every call summary and adjust the script. After that I look after it for the monthly fee.",
    ],
    faqs: [
      {
        q: "How much does an AI phone assistant cost?",
        a: "Setup starts at €490 one-off, and operation and support start at €99 a month. How many call minutes the plan covers is agreed per project, based on your call volume. I charge no VAT under the German small business rule (§ 19 UStG).",
      },
      {
        q: "Is an AI receptionist GDPR compliant?",
        a: "It can be, if it is set up and run for it. I use an EU-hosted platform, data processing agreements down to the voice platform, recordings only with consent and only the data you need. I deliver the technology, not legal advice, so your data protection adviser has the final word.",
      },
      {
        q: "Does the caller know they are talking to an AI?",
        a: "Yes. The assistant says it is an AI at the start of every call. In the EU, Article 50 of the AI Act has required this since 2 August 2026, and a note in your legal notice is not enough.",
      },
      {
        q: "Can the AI assistant make outbound calls?",
        a: "No, I only set up assistants for inbound calls. In the US, the FCC has confirmed that the TCPA, the law on automated and artificial voice calls, applies to AI-generated voices, so outbound AI calls need the prior express consent of the person called. Each unlawful call can cost 500 to 1,500 USD in damages.",
      },
      {
        q: "Which languages can the assistant speak?",
        a: "I write and test conversations in German, English and Russian, the languages I speak myself. Other languages depend on what the voice platform supports, and I check that before we agree on a price.",
      },
      {
        q: "Can I keep my phone number?",
        a: "Yes, in most setups. Your number forwards calls to the assistant, for example when you don't pick up or outside opening hours, so callers dial the number they already know.",
      },
      {
        q: "What happens when the assistant can't answer a question?",
        a: "It takes a message or puts the caller through to your mobile, depending on how we set it up. You get a summary either way, so you can call back with the details at hand.",
      },
      {
        q: "Who helps if something goes wrong during the day?",
        a: "During the day, calls fall back to your mobile and the platform has its own support. I'm in Germany (CET) and work on client projects in the evenings and at weekends, so I reply the same evening or the next business day. That response time is written into the contract.",
      },
    ],
    related: ["ki-chatbot", "buero-automatisierung", "mehrsprachige-websites"],
    thema: "AI phone assistant",
  },

  // ------------------------------------------------------------ AI website chatbot
  {
    key: "ki-chatbot",
    lang: "en",
    slug: "ai-chatbot",
    label: "AI website chatbot",
    familie: "Reachability",
    metaTitle: "AI chatbot for your website | GDPR-minded, from €500",
    metaDescription:
      "AI chatbot for your website that answers only from content you approved, takes enquiries and sends them to you. Setup from €500, then from €29/month.",
    eyebrow: "AI · Reachability",
    h1: "AI chatbot for your website that answers from your own content",
    intro:
      "I set up an AI chatbot on your website that answers visitors' questions from content you have approved, takes enquiries and sends them to you by email or Telegram. It suits businesses that get the same questions every day, and it can answer in German, English or Russian. Setup from €500, then from €29 a month for operation and care of the knowledge base.",
    preise: [
      { betrag: "from €500", wofuer: "setup, one-off" },
      { betrag: "from €29/month", wofuer: "operation and knowledge base care" },
    ],
    fuer: [
      "Service and trade businesses",
      "Hotels and holiday rentals",
      "B2B suppliers and manufacturers",
      "Agencies and consultancies",
      "Property managers",
    ],
    sections: [
      {
        title: "What the chatbot does",
        bullets: [
          "Answers questions about your services, process, service area and opening hours from content you have approved.",
          "Takes enquiries with name, contact details and request, and sends them to you by email or Telegram.",
          "Says it is an AI in its first message.",
          "Says so when it doesn't know the answer, and passes the question on to you instead of guessing.",
        ],
      },
      {
        title: "No invented prices or dates",
        text: "A chatbot that guesses is worse than no chatbot. Mine answers only from a knowledge base built from your website and the documents you approve. Prices and dates come only from that content, so keeping it current matters. That is why updating the knowledge base is part of the monthly care, within a fixed time budget we agree.",
      },
      {
        title: "Same content as your website",
        text: "The chatbot uses the content your website already has, plus anything you add, such as an FAQ or a price list. That keeps the setup small and the answers in line with your site. If you also use an AI phone assistant from me, both can work from the same approved content.",
      },
      {
        title: "GDPR and the EU AI Act",
        bullets: [
          "The chatbot says it is an AI in its first message, as Article 50 of the EU AI Act has required since 2 August 2026.",
          "The chatbot and its chat logs are hosted in the EU.",
          "Data processing agreements with the AI model and hosting providers.",
          "It only collects the data an enquiry needs.",
          "I deliver the technology, not legal advice. Your privacy policy stays with you or your adviser.",
        ],
      },
    ],
    ablauf: [
      "Free call: We look at the questions you get most often and where enquiries should go.",
      "Knowledge base: I build it from your website and the documents you approve, and you check the answers.",
      "Setup and test: I add the chatbot to your website, connect email or Telegram and test it with real questions.",
      "Live and care: Once it is live, I keep the knowledge base current as part of the monthly plan.",
    ],
    faqs: [
      {
        q: "How much does an AI chatbot for a website cost?",
        a: "Setup starts at €500 one-off, plus from €29 a month for operation and care of the knowledge base. The final price depends on how much content the chatbot needs and where enquiries should go. I charge no VAT under the German small business rule (§ 19 UStG).",
      },
      {
        q: "Is an AI chatbot GDPR compliant?",
        a: "It can be, if it is set up for it. The chatbot and its chat logs are hosted in the EU, the providers involved sign data processing agreements, and it only collects what an enquiry needs. I deliver the technology, not legal advice, so your privacy policy and final checks stay with you or your adviser.",
      },
      {
        q: "Does a chatbot have to say it is an AI?",
        a: "Yes, in the EU it does. Since 2 August 2026, Article 50 of the AI Act requires that people know at the start when they are talking to an AI. My chatbots say so in their first message.",
      },
      {
        q: "Can an AI chatbot give wrong answers?",
        a: "Yes, any AI can, so I limit what it may say. Mine answers only from content you have approved, and when the answer isn't there it says so and passes the question to you. Prices and dates come only from that content.",
      },
      {
        q: "Does it work with my existing website?",
        a: "In most cases, yes. The chatbot is added with a small script, which most website builders and content management systems allow. I check your site in the first call.",
      },
      {
        q: "Which languages does the chatbot speak?",
        a: "It answers in German, English and Russian, and I test the answers in all three because I speak them. AI models handle other languages too, but I only promise the ones I can check myself.",
      },
      {
        q: "Where do the enquiries go?",
        a: "To you, by email or Telegram, with the visitor's question and contact details. Other tools, such as a CRM, can often be connected too, and I check yours in the first call.",
      },
      {
        q: "What does the monthly fee cover?",
        a: "Operation of the chatbot and care of its knowledge base within a fixed time budget, for example when prices or opening hours change. If a third-party provider charges by usage, I show you those costs upfront.",
      },
    ],
    related: ["ki-telefon", "mehrsprachige-websites", "buero-automatisierung"],
    thema: "AI website chatbot",
  },

  // ------------------------------------------------------------ Custom web apps
  {
    key: "web-apps",
    lang: "en",
    slug: "custom-web-apps",
    label: "Custom web apps",
    familie: "Workflows",
    metaTitle: "Custom web app development | fixed price per project",
    metaDescription:
      "Custom web app development at a fixed price: client portals, internal tools and PWAs that replace spreadsheets and paper. Fixed quote after a free call.",
    eyebrow: "Apps · Workflows",
    h1: "Custom web apps that replace spreadsheets, paper and group chats",
    intro:
      "I build custom web apps for small and mid-sized businesses: client portals, order and status tools, internal workflows and apps your team installs on their phones (PWA). You get a written fixed price after a free call, and the code belongs to you. Running costs for hosting, updates and security checks are part of the quote.",
    preise: [
      { betrag: "Fixed price after a free call", wofuer: "agreed in writing before work starts; the scope sets the price" },
    ],
    fuer: [
      "Field service and trade businesses",
      "Logistics and transport companies",
      "Repair and workshop businesses",
      "B2B suppliers with client orders",
      "Marketplaces and booking platforms",
    ],
    sections: [
      {
        title: "What I build",
        bullets: [
          "Client and status portals: clients place orders with photos, follow the status and download reports as PDF.",
          "Digital job folders: job lists, photos, signatures on the phone and handover reports as PDF.",
          "Internal tools that replace spreadsheets and paper forms, with an export to a spreadsheet.",
          "Apps with payments via Stripe, including marketplaces with Stripe Connect.",
          "PWAs: web apps your team installs on the home screen, without an app store.",
        ],
      },
      {
        title: "Fixed price, and the code belongs to you",
        text: "The first version gets a fixed price based on a written scope. The contract states scope, price, payment stages and a formal acceptance. Code, hosting and accounts run in your name, and you get handover documentation, so another developer could take over. Unlike many no-code platforms, there is no fee per user. Changes outside the scope get their own quote before I start.",
      },
      {
        title: "Built with AI tools, checked before handover",
        text: "I build with AI coding tools, and I check what they produce. AI-generated code is not secure by default: in a Cloud Security Alliance research note, 45% of AI-generated code samples failed security tests based on the OWASP standard. So every project includes automated scans of the code and its libraries, a test of the access rules and a careful check of login and permissions.",
      },
      {
        title: "What I have built",
        bullets: [
          "My own social app with video feed, live streaming and a shop, live on the App Store and as a web app.",
          "My own live auction app with real-time bidding and payments via Stripe Connect, in closed beta.",
          "My own professional network in German, Russian and English, with its data hosted in Frankfurt.",
          "An invoice reminder system for a client with many incoming invoices, running on a monitored server in Germany.",
        ],
      },
    ],
    ablauf: [
      "Free call: We go through the process that runs on paper, spreadsheets or group chats today and what the app must do.",
      "Written scope and fixed price: You get the scope, the price and the payment stages in writing. Work starts once you agree.",
      "Build and test: I build the first version, your team tests it with real cases, and we do the formal acceptance.",
      "Handover and operation: Code and accounts in your name, handover documentation, then hosting, updates and security checks for a monthly fee agreed in the quote.",
    ],
    faqs: [
      {
        q: "How much does a custom web app cost?",
        a: "It depends on the scope: how many workflows, users and integrations the app needs. After a free call you get a written fixed price before any work starts, including the running costs for hosting and security. I charge no VAT under the German small business rule (§ 19 UStG).",
      },
      {
        q: "How long does it take to build a web app?",
        a: "That depends on the scope, so I don't put a number on this page. You get a schedule together with the written scope and the fixed price. Keeping the first version to the core workflow keeps it small, and further features follow once your team uses it.",
      },
      {
        q: "Who owns the code?",
        a: "You do. Code, hosting and accounts run in your name, the source code handover is written into the contract, and you get handover documentation so another developer can take over if needed.",
      },
      {
        q: "Do I need a native app or is a web app enough?",
        a: "For most business tools a web app is enough. It runs in any browser, installs on the home screen as a PWA and needs no app store review. If you need to be in the App Store, I build with React Native and Expo; Apple's developer account for companies needs a legal entity with a D-U-N-S number and costs 99 USD a year.",
      },
      {
        q: "Do you build with AI tools?",
        a: "Yes, and I check what they produce. Automated scans of the code and its libraries, a test of the access rules and a careful check of login and permissions are part of every price.",
      },
      {
        q: "Can the app connect to tools we already use?",
        a: "Usually, yes, if the tool has an interface (API) or an export. Accounting software, CRMs, email and spreadsheets are common examples. I check your tools before I name a fixed price.",
      },
      {
        q: "Where is the app hosted?",
        a: "In the EU by default, with a data processing agreement. If your clients or your sector need a specific location, we agree it in the scope.",
      },
      {
        q: "Which time zone do you work in?",
        a: "I'm in Germany (CET) and work on client projects in the evenings and at weekends. My evening hours overlap with the business day on the US East Coast, and calls with clients in Europe, Israel or the Gulf are scheduled in advance. Most coordination runs in writing, and I reply the same evening or the next business day.",
      },
    ],
    related: ["buero-automatisierung", "white-label", "ki-chatbot"],
    thema: "Custom web app",
  },

  // ------------------------------------------------------------ Business automation
  {
    key: "buero-automatisierung",
    lang: "en",
    slug: "business-automation",
    label: "Business automation",
    familie: "Automation",
    metaTitle: "Business automation for invoices and admin | fixed price",
    metaDescription:
      "Business automation for invoices: collects them from your inbox, tracks due dates and sends payment reminders. EU-hosted. Fixed price after a free call.",
    eyebrow: "Office · Automation",
    h1: "Business automation for invoices, reminders and office work",
    intro:
      "I automate repetitive office work: collecting invoices from your inbox, keeping track of due dates and sending payment reminders. You get a monitored service on an EU server instead of another tool to learn. You get a written fixed price after a free call, monthly care included.",
    preise: [
      { betrag: "Fixed price after a free call", wofuer: "invoice inbox, payment reminders or bigger workflows, by scope" },
      { betrag: "Monthly care", wofuer: "monitoring and repairs, priced in the quote" },
    ],
    fuer: [
      "Owner-run businesses without office staff",
      "Companies with many incoming invoices",
      "Service companies with business clients",
      "Agencies and consultancies",
      "International firms with a German office",
    ],
    sections: [
      {
        title: "What I automate",
        bullets: [
          "Invoice inbox: new invoices are collected from your mailbox, due dates and early payment discounts are read out, and the documents go to your accounting software or accountant.",
          "Morning list: one email a day with every incoming invoice that is due soon.",
          "Payment reminders: reminders to clients who haven't paid your invoices, sent after your approval.",
          "Office assistant: a voice note or a photo of a letter becomes a task, a deadline or a receipt, with an overview every morning.",
          "Connections between your tools, for example from a form to a spreadsheet or from email to your CRM, built with n8n or Make where that fits.",
        ],
      },
      {
        title: "You approve, the system does the routine",
        text: "Automation should take work off your desk, not decisions. Someone on your side approves every reminder before it goes out, and nothing is booked or paid automatically. I don't do bookkeeping or tax advice: your accountant stays in charge and receives the documents in order.",
      },
      {
        title: "Already in use: invoice reminders on a German server",
        text: "For a business with many incoming invoices, a system I built collects the new invoices from the mailbox every day, detects the payment deadlines and sends accounting a short list every morning with everything due soon. It runs on its own server in Germany, is monitored around the clock, and no invoice is sent to an AI. My own assistant on Telegram turns voice messages and photos of letters into tasks and deadlines and sends me a briefing every morning.",
      },
      {
        title: "EU hosting, monitoring and clear data rules",
        bullets: [
          "Hosting in the EU and data processing agreements with every provider involved.",
          "Monitoring with an alert when a workflow fails, for example because a provider changed its interface.",
          "AI only where it helps: the invoice reminder system above works without it.",
          "Original files stay unchanged and go to your archive or accounting system.",
          "I use EU services where possible.",
        ],
      },
    ],
    ablauf: [
      "Free call: We look at where invoices, letters and reminders pile up today and which tools you already use.",
      "Scope and fixed price: You get in writing what is automated, where the data goes and what it costs.",
      "Setup and test run: I set it up on an EU server, and it runs alongside your current process before you switch over.",
      "Operation and monitoring: For a monthly fee I monitor it and repair it when a provider changes something.",
    ],
    faqs: [
      {
        q: "How much does business automation cost?",
        a: "It depends on which tasks are automated and which tools you already use. After a free call you get a written fixed price, monthly care included. I charge no VAT under the German small business rule (§ 19 UStG).",
      },
      {
        q: "Is the automation GDPR compliant?",
        a: "It can be, and I set it up for that: EU hosting, data processing agreements with every provider involved and only the data the workflow needs. I deliver the technology, not legal advice, so your data protection adviser has the final say.",
      },
      {
        q: "Do you do bookkeeping or tax work?",
        a: "No. I automate how documents arrive, get sorted and reach your accountant, but I don't post entries, file taxes or give tax advice. Your accountant stays in charge.",
      },
      {
        q: "Does an AI read my invoices?",
        a: "Only if you want it to. My invoice reminder system works without sending invoices to an AI. Where AI helps, for example with photos of letters, I use providers with a data processing agreement and tell you which ones.",
      },
      {
        q: "What happens if an automation breaks?",
        a: "I get an alert and start on it the same evening or the next business day. Workflows mostly break when a provider changes its interface, which is why monitoring is part of the monthly fee.",
      },
      {
        q: "Can you connect the tools we already use?",
        a: "Usually, yes. Mailboxes, spreadsheets, accounting software and CRMs can often be connected through their interfaces or with n8n or Make. I check your tools in the first call before I name a price.",
      },
      {
        q: "Can you take over automations someone else built?",
        a: "Yes, after I have reviewed them. If they run on n8n or Make, I can take over monitoring and repairs as a monthly care plan, priced after the review.",
      },
      {
        q: "Can the invoice inbox handle German e-invoices?",
        a: "Yes, it collects them from your inbox like any other invoice. Businesses in Germany have had to be able to receive e-invoices since 2025, and an email inbox is enough for that. Whether and when you must issue e-invoices yourself is a question for your tax adviser.",
      },
    ],
    related: ["web-apps", "ki-chatbot", "ki-telefon"],
    thema: "Business automation",
  },

  // ------------------------------------------------------------ Multilingual websites
  {
    key: "mehrsprachige-websites",
    lang: "en",
    slug: "multilingual-websites",
    label: "Multilingual websites",
    familie: "Growth",
    metaTitle: "Multilingual websites in German, English and Russian",
    metaDescription:
      "Multilingual websites in German, English and Russian, checked in every language by one person who speaks all three. From €990, AI chatbot from €500.",
    eyebrow: "Websites · Growth",
    h1: "Multilingual websites in German, English and Russian",
    intro:
      "I build multilingual websites in German, English and Russian, and I speak all three, so every language version is read by a person, not only by a translation tool. It suits businesses in the EU and Israel with Russian-speaking customers, and international companies that need a German website. A custom website in up to three languages starts at €990, with an optional AI chatbot in all languages from €500.",
    preise: [
      { betrag: "from €990", wofuer: "custom website in up to three languages (German, English, Russian)" },
      { betrag: "from €500", wofuer: "optional AI chatbot in all languages" },
    ],
    fuer: [
      "Russian-speaking business owners in the EU and Israel",
      "International companies in Germany",
      "Firms with Russian-speaking clients",
      "B2B suppliers and manufacturers",
      "Hotels and holiday rentals",
    ],
    sections: [
      {
        title: "Three languages, one person who speaks them",
        text: "I speak German, English and Russian. I draft with AI tools and then read every page myself, so the wording sounds natural and prices, names and facts match in every language. You don't coordinate three translators, and a change is made in all languages in one go.",
      },
      {
        title: "Why a Russian version can matter",
        text: "In Germany alone, around 1.9 million people mainly speak Russian at home, according to Mediendienst Integration. If your customers are among them, or among Russian speakers elsewhere in the EU or in Israel, a Russian version lets them read your offer in their own language.",
      },
      {
        title: "Built for search in every language",
        bullets: [
          "Each language gets its own address and the language tags search engines use (hreflang), as on this website.",
          "Page titles, descriptions and headings are written for each language, not translated word for word.",
          "Fast, mobile-first pages with SEO basics in every language.",
          "No ranking promises, because nobody can keep them.",
        ],
      },
      {
        title: "One AI chatbot for all languages",
        text: "The optional AI chatbot answers in German, English and Russian from the same approved content as your website. It says it is an AI in its first message, as the EU AI Act requires, and sends enquiries to you by email or Telegram.",
      },
    ],
    ablauf: [
      "Free call: We decide which languages and pages you need and who your visitors are.",
      "Design and texts: You send the key facts, I design the site and write the texts in all languages.",
      "Review and launch: You approve every language version, then the site goes live with its own address per language.",
      "Chatbot, if you want it: The AI chatbot uses the same content and answers in all three languages.",
    ],
    faqs: [
      {
        q: "How much does a multilingual website cost?",
        a: "A custom website in up to three languages (German, English, Russian) starts at €990. An AI chatbot that answers in all three languages costs from €500 on top. I charge no VAT under the German small business rule (§ 19 UStG).",
      },
      {
        q: "Do you use machine translation?",
        a: "I draft with AI tools and then check every language myself, because I speak German, English and Russian. That way the wording sounds natural and prices, names and facts match across all versions.",
      },
      {
        q: "Can you add other languages?",
        a: "I only promise languages I can check myself: German, English and Russian. The site can be built to take more languages, but a native speaker on your side would need to review those texts.",
      },
      {
        q: "Will each language version rank on Google?",
        a: "Nobody can guarantee rankings, and I don't promise them. What I take care of is the technical basis: each language gets its own pages, titles and language tags (hreflang), so search engines can show the right version.",
      },
      {
        q: "Who writes the texts?",
        a: "I do, from the key facts you send me, and you check them before launch. If you already have texts in one language, I build the other versions from them.",
      },
      {
        q: "Do you work with businesses in Israel?",
        a: "Yes, businesses in Israel are welcome. We work remotely, by video call and in writing, in English or Russian. Israel is usually one hour ahead of Germany, so early evening calls work for both sides.",
      },
      {
        q: "Do you work with companies based in Russia?",
        a: "No. EU sanctions prohibit IT and AI services to companies based in Russia, so I don't offer them. Before a project with a link to Russia or Belarus, I check the company register, the owners and the EU sanctions lists.",
      },
    ],
    related: ["ki-chatbot", "white-label", "ki-telefon"],
    thema: "Multilingual website",
  },

  // ------------------------------------------------------------ White-label development
  {
    key: "white-label",
    lang: "en",
    slug: "white-label-development",
    label: "White-label development for agencies",
    familie: "Growth",
    metaTitle: "White-label development for agencies | fixed prices",
    metaDescription:
      "White-label development for agencies: web apps, AI automations and multilingual sites built under your name, under NDA, at a fixed price per project.",
    eyebrow: "Agencies · Growth",
    h1: "White-label development for agencies, built under your name",
    intro:
      "I build web apps, AI automations and multilingual websites that your agency sells under its own name. You get a fixed price per project, coordination in writing and no contact with your client unless you want it. I'm based in Germany, work with GDPR in mind and communicate in English, German or Russian.",
    preise: [{ betrag: "Fixed price per project", wofuer: "quoted after a short call, built under your agency's name" }],
    fuer: [
      "Web design agencies",
      "Marketing agencies",
      "Digital studios without in-house developers",
      "Agencies with German-speaking clients",
      "Freelancers with more work than time",
    ],
    sections: [
      {
        title: "What I build for agencies",
        text: "Specialist work rather than standard brochure sites:",
        bullets: [
          "AI automations and assistants, such as invoice workflows, website chatbots and phone assistants.",
          "Web apps and portals with login, roles and payments, including marketplaces with Stripe Connect.",
          "Mobile apps with React Native and Expo.",
          "3D hero sections with three.js, like the one on this website's home page.",
          "German-language and multilingual projects that need GDPR care.",
        ],
      },
      {
        title: "Your name, your client, your rules",
        bullets: [
          "Everything is delivered under your agency's name.",
          "No contact with your client unless you want it.",
          "I sign your NDA, and I review non-solicitation clauses before we start.",
          "White-label projects stay out of my portfolio unless you allow it.",
          "Coordination in writing, so every decision is documented.",
        ],
      },
      {
        title: "Clear contracts on both sides",
        text: "I have no contract with your client, so the terms between us need to be clear. The contract fixes scope and price, a deposit before work starts, payment on acceptance and the transfer of rights once the invoice is paid. Non-solicitation and NDA terms are reviewed before signing, so both sides know where they stand.",
      },
      {
        title: "EU-based and GDPR-minded",
        text: "I'm based in Germany. Hosting is in the EU by default, data processing agreements are part of the setup, and I write and check German, English and Russian myself. That helps when your client is in Europe or needs German-language work.",
      },
    ],
    ablauf: [
      "Brief and terms: You send the brief and your contract terms, including NDA and non-solicitation.",
      "Fixed price: I reply with a written scope and a fixed price. Work starts after the deposit.",
      "Build under your name: I build, you review in writing, and your client only ever sees your agency.",
      "Acceptance and handover: You accept the work and pay the final invoice, then rights, code and documentation pass to you.",
    ],
    faqs: [
      {
        q: "Do you work with agencies under NDA?",
        a: "Yes. I sign your NDA after reading it and review non-solicitation and portfolio clauses before we start. White-label projects stay out of my portfolio unless you allow it.",
      },
      {
        q: "How much does white-label development cost?",
        a: "Every project gets a fixed price based on a written brief, quoted after a short call and agreed before work starts. I charge no VAT under the German small business rule (§ 19 UStG).",
      },
      {
        q: "Will you contact my client?",
        a: "No, unless you want me to. I work through you, in writing, and your client only sees your agency's name. If a call with your client helps, we agree it beforehand and I join as part of your team.",
      },
      {
        q: "What are your payment terms?",
        a: "A deposit before work starts and the rest on acceptance. Rights to the work pass to you once the invoice is paid. I use these terms because I have no contract with your client and can't chase a late payment there.",
      },
      {
        q: "Which time zone do you work in?",
        a: "I'm in Germany (CET) and work on agency projects in the evenings and at weekends. My evening hours overlap with the business day on the US East Coast. Most coordination runs in writing, and I reply the same evening or the next business day.",
      },
      {
        q: "What kind of projects do you take?",
        a: "Specialist work rather than standard brochure sites: AI automations and assistants, web apps and portals, apps with Stripe payments, 3D hero sections and German-language GDPR projects. Send me the brief and I'll tell you honestly whether it fits.",
      },
      {
        q: "Who owns the code after the project?",
        a: "Your agency, or your client if you prefer, once the invoice is paid. You get the code, the access and handover documentation, so your team can maintain it.",
      },
      {
        q: "Can you look after the project after launch?",
        a: "Yes, under your name, as a monthly plan for hosting, updates and security checks. The monthly price depends on the project and is agreed together with the fixed price.",
      },
    ],
    related: ["web-apps", "buero-automatisierung", "mehrsprachige-websites"],
    thema: "White label development",
  },
];

/** Internationaler Katalog: alle Angebote, die sich aus der Ferne liefern lassen. Preise ohne eigene Seite aus dem Bericht abgeleitet. */
export const katalogEn: KatalogFamilie[] = [
  {
    titel: "Reachability",
    warum: "Missed calls and unanswered questions cost you work, so these offers take enquiries even when you can't.",
    angebote: [
      {
        name: "AI phone assistant",
        was: "Answers inbound calls, asks the questions your business needs and sends you a summary by email or Telegram.",
        preis: "from €490 + from €99/month",
        seite: "ki-telefon",
        hinweis: "Inbound calls only",
      },
      {
        name: "AI website chatbot",
        was: "Answers visitors from content you have approved, takes enquiries and sends them to you.",
        preis: "from €500 + from €29/month",
        seite: "ki-chatbot",
      },
      {
        name: "WhatsApp service bot",
        was: "Appointment confirmations, status updates and reminders on WhatsApp, with Meta's message fees passed on at cost.",
        preis: "from €490 + from €29/month",
      },
      {
        name: "Request funnel with price calculator",
        was: "A step-by-step enquiry form with photo upload and an instant price range, so requests arrive with the details you need.",
        preis: "from €790 + from €49/month",
      },
    ],
  },
  {
    titel: "Workflows",
    warum: "Paper, spreadsheets and group chats make work hard to track, so these apps give every job one place.",
    angebote: [
      {
        name: "Custom web app or PWA",
        was: "A web app built around your process that your team can install on their phones, with the code in your name.",
        preis: "from €3,000 + from €49/month",
        seite: "web-apps",
      },
      {
        name: "Client and status portal",
        was: "Clients place orders with photos, follow the status online and download reports as PDF.",
        preis: "from €3,000 + from €49/month",
        seite: "web-apps",
      },
      {
        name: "Mobile app with Stripe payments",
        was: "A mobile app built with React Native and Expo, with payments via Stripe and marketplace payouts via Stripe Connect.",
        preis: "from €3,500 + from €49/month",
      },
    ],
  },
  {
    titel: "Automation",
    warum: "Invoices, reminders and repetitive admin eat time, so these automations do the routine while you keep the final say.",
    angebote: [
      {
        name: "Invoice inbox and payment reminders",
        was: "Collects invoices from your mailbox, tracks due dates and sends payment reminders after your approval.",
        preis: "from €490 + from €29/month",
        seite: "buero-automatisierung",
      },
      {
        name: "Back-office automation",
        was: "Voice notes and photos of letters become tasks, deadlines and receipts, with an overview every morning.",
        preis: "from €1,500 + from €49/month",
        seite: "buero-automatisierung",
      },
      {
        name: "Automation care plan",
        was: "Monitoring and repairs for your existing n8n or Make workflows, with an alert when one breaks.",
        preis: "from €49/month",
      },
    ],
  },
  {
    titel: "Growth",
    warum: "Growing means reaching customers in their own language and delivering more than your own team can build.",
    angebote: [
      {
        name: "Multilingual website",
        was: "A custom website in up to three languages (German, English, Russian), each version checked by me.",
        preis: "from €990, AI chatbot from €500",
        seite: "mehrsprachige-websites",
      },
      {
        name: "Website care plan",
        was: "Technical maintenance, updates and small changes to copy and images, so your site stays current.",
        preis: "from €49/month",
      },
      {
        name: "Template website",
        was: "A ready-made design, adapted to your business, colours and logo.",
        preis: "from €490",
      },
      {
        name: "White-label development",
        was: "Web apps, AI automations and multilingual websites built for your agency and delivered under your name.",
        preis: "from €990 per project",
        seite: "white-label",
        hinweis: "For agencies",
      },
    ],
  },
];
