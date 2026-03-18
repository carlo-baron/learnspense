"use client";
import { MoneyPreferenceDialog } from "./MoneyPreference";
import { useState } from "react";

export function Banner() {
  const [money, setMoney] = useState<number>(0);

  return (
    <section className="banner">
      <MoneyPreferenceDialog onMoneyChange={(newMoney) => setMoney(newMoney)} />
      <p
        className='text-center text-5xl font-extrabold'
      >P {money}</p>
    </section>
  );
}
