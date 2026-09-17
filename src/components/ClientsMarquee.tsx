"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import { clients } from "@/lib/data/team";

export default function ClientsMarquee() {
  return (
    <Marquee speed={40} gradient={false}  className="edge-fade ">
      {clients.map((client) => (
        <div
          key={client.name}
          className="mx-4 flex h-20 w-40 shrink-0 items-center justify-center   bg-white p-1 shadow-sm transition-shadow hover:shadow-md"
        >
          <Image
            src={client.logo}
            alt={client.name}
            width={140}
            height={64}
            className="h-full w-full object-contain"
          />
        </div>
      ))}
    </Marquee>
  );
}