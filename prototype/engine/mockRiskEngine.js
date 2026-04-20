/**
 * Demo risk engine (deterministic + demo overrides)
 * - DNI 00000000: always approve (demo)
 * - DNI 99999999: always reject (demo)
 * - Reject if amount > 2500 (hard rule demo)
 * - Else approve/reject based on DNI last digit + months
 */
export async function assessRisk({ dni, amount, months }) {
  await new Promise((r) => setTimeout(r, 900));

  if (dni === "00000000") return { approved: true, reason: "" };
  if (dni === "99999999") return { approved: false, reason: "DNI marcado como rechazo demo" };

  if (amount > 2500) {
    return { approved: false, reason: "Monto excede el límite demo (S/ 2500)" };
  }

  const last = Number(dni[dni.length - 1]);
  const score = (last + months) % 10;

  const threshold = months === 12 ? 7 : (months === 6 ? 6 : 5);

  if (score >= threshold) return { approved: true, reason: "" };
  return { approved: false, reason: "Score demo insuficiente" };
}