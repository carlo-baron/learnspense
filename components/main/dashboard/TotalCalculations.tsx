export function TotalCalculations() {
  return (
    <section className="totals flex gap-4 w-full justify-center">
      <div className="total-expenses">
        <h2>Total Expenses</h2>
        <p className='font-extrabold text-2xl text-center'>P 1,000</p>
      </div>
      <div className="total-savings">
        <h2>Total Savings</h2>
        <p className='font-extrabold text-2xl text-center'>P 100</p>
      </div>
    </section>
  );
}
