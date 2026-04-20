function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function addMonths(date, months) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

function toISODate(date) {
  return new Date(date).toISOString().slice(0, 10);
}

export function formatMoney(value) {
  return `S/ ${Number(value).toFixed(2)}`;
}

/**
 * Simple equal-installment schedule.
 * First due date: today + firstDueInDays.
 */
export function buildMonthlySchedule({ amount, months, firstDueInDays = 30 }) {
  const per = amount / months;
  const firstDue = addDays(new Date(), firstDueInDays);

  const items = [];
  for (let i = 0; i < months; i++) {
    const due = addMonths(firstDue, i);
    items.push({
      n: i + 1,
      dueDate: toISODate(due),
      amount: per
    });
  }

  // Fix rounding on last installment so totals match exactly
  const total = items.reduce((s, x) => s + x.amount, 0);
  const diff = amount - total;
  items[items.length - 1].amount += diff;

  return items;
}