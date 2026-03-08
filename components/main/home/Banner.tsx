import { MoneyPreferenceDialog } from "./MoneyPreference";

export function Banner(){
  return(
    <section className="banner">
      <MoneyPreferenceDialog />
      <p
      className='text-center text-5xl font-extrabold'
      >P 10,000</p>
    </section>
  );
}
