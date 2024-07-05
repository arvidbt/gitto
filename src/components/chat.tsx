"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

let seeds = [
  { user: "them", text: "Hey! What's up?" },
  { user: "me", text: "Nm dude. Wrapping up work soon" },
  { user: "them", text: "Nice" },
  { user: "me", text: "Want to lift tonight?" },
  { user: "them", text: "Yep just about finishing up work" },
  { user: "them", text: "Can you give me like 10" },
  { user: "me", text: "Perf" },
  { user: "me", text: "We hitting shoulders today?" },
  { user: "them", text: "Yep" },
  { user: "me", text: "Awesome!" },
  { user: "me", text: "See you soon 💪" },
];

seeds = seeds.map((seed, i) => ({ ...seed, id: i + 1 }));

export function Chat() {
  const [messages, setMessages] = useState(seeds);
  const [lastRemovedIndex, setLastRemovedIndex] = useState(null);

  const animatingMessages =
    lastRemovedIndex !== null ? messages.slice(lastRemovedIndex) : [];

  return (
    <div className="flex max-w-7xl flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-4xl font-black">
          Share your private repositories with a link, not with an invite.
        </h1>
        <div></div>
      </div>
    </div>
  );
}
