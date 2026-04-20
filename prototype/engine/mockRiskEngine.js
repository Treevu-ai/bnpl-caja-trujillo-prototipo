/**
 * Demo risk engine (deterministic):
 * - Reject if amount > 2500 (hard rule demo)
 * - Else approve/reject based on DNI last digit + months
 */
export async function assessRisk({ dni, amount, months }) {
  await new Promise(r => setTimeout(r, 900));

  if (amount > 2500) {
    return { approved: false, reason: "Monto excede el límite demo (S/ 2500)" };
  }

  const last = Number(dni[dni.length - 1]);
  const score = (last + months) % 10;

  // More strict as term increases
  const threshold = months === 12 ? 7 : (months === 6 ? 6 : 5);

  if (score >= threshold) return { approved: true, reason: "" };
  return { approved: false, reason: "Score demo insuficiente" };
}