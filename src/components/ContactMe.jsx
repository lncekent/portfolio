import BentoCard from "./BentoCard";
import { Phone } from "lucide-react";

function ContactMe({ wrapperClass = "", animKey = "contact-m" }) {
  return (
    <div className="">
      <BentoCard
        title="Contact Me"
        icon={<Phone className="stroke-black" />}
        className="h-full"
      >
        <div
          key={animKey}
          className={`flex flex-col justify-between gap-[clamp(1.5rem,2vw,8rem)] h-full ${wrapperClass}`}
        >
          <ul className="flex gap-[clamp(0.75rem,1vw,4rem)] w-full flex-wrap">
            <li className="w-[clamp(2.25rem,2.5vw,8rem)]">
              <a
                href="https://github.com/lncekent"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/contact-icons/github.svg"
                  alt="Github Logo"
                  className="dark:invert w-full"
                />
              </a>
            </li>
            <li className="w-[clamp(2.25rem,2.5vw,8rem)]">
              <a
                href="https://www.facebook.com/lance.kent.geoffrey/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/contact-icons/facebook.svg"
                  alt="Facebook Logo"
                  className="dark:invert w-full"
                />
              </a>
            </li>
            <li className="w-[clamp(2.25rem,2.5vw,8rem)]">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=lancemagollado46@gmail.com&su=Hi,%20Let%20us%20connect!"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/contact-icons/email.svg"
                  alt="Email Logo"
                  className="dark:invert w-full"
                />
              </a>
            </li>
            <li className="w-[clamp(2.25rem,2.5vw,8rem)]">
              <a
                href="viber://chat?number=%2B639263226163"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/contact-icons/viber.svg"
                  alt="WhatsApp Logo"
                  className="dark:invert w-full"
                />
              </a>
            </li>
            <li className="w-[clamp(2.25rem,2.5vw,8rem)]">
              <a
                href="https://www.instagram.com/lncekent/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/contact-icons/instagram.svg"
                  alt="Instagram Logo"
                  className="dark:invert w-full"
                />
              </a>
            </li>
            <li className="w-[clamp(2.25rem,2.5vw,8rem)]">
              <a
                href="https://www.linkedin.com/in/lancemagollado/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/contact-icons/linkedin.svg"
                  alt="LinkedIn Logo"
                  className="dark:invert w-full"
                />
              </a>
            </li>
            <li className="w-[clamp(2.25rem,2.5vw,8rem)]">
              <a
                href="https://api.whatsapp.com/send?phone=639263226163&text=Hi%20Lance!%20I%20saw%20your%20portfolio"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/contact-icons/whatsapp.svg"
                  alt="LinkedIn Logo"
                  className="dark:invert w-full"
                />
              </a>
            </li>
          </ul>
          <span className="text-[clamp(13px,1vw,5rem)] leading-relaxed text-zinc-600 dark:text-zinc-400 font-light">
            If you have any concerns, just contact me in with these social
            medias.
          </span>
        </div>
      </BentoCard>
    </div>
  );
}

export default ContactMe;
