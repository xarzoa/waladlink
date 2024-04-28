'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQ() {
  const faqs = [
    {
      question: 'What is WalAd?',
      answer: `WalAd is a platform for crypto enthusiasts, creators, developers and
      everyone who uses crypto wallets. Unargueablly the best and better
      way to share your crypto wallet addresses. The customizable, tiny,
      unique link for all your everyday using crytpo wallet addresses.
      Share them with anyone who got access to a browser and a internet
      connection.`,
    },
    {
      question: 'Why "WalAd" ? kinda weird name??',
      answer: `Nope, It's not the Arabic word. Kinda look like it but it really
      means Wallet Address. You may ask "how come?", Easy, "Wal"let "Ad"dress.`,
    },
    {
      question: 'How many wallet addresses can I add?',
      answer: `How many cryptocurrencies out there? How many you can add? How many
      do you use? Yeah, Exactly, That much. (Free accounts are capped to
      just 10 addresses. Premium users can add as much as they want.)`,
    },
    {
      question: 'How things work?',
      answer: `You just add your wallet addresses to your
      page, you share the unique url with
      someone, They copy the wallet address
      they need, They send you the money, No Middleman!`,
    },
  ];
  return (
    <div className="bg-gradient-to-b from-neutral-900 to-black rounded-none font-gabarito">
      <div>
        <Accordion
          type="single"
          collapsible
          className="w-full grid grid-cols-1 md:grid-cols-2 p-6 gap-6"
        >
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index + 1}`} key={index}>
              <AccordionTrigger className="text-start font-semibold text-neutral-300">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-neutral-400">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
