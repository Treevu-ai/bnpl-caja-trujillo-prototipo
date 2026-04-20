import { assessRisk } from "./engine/mockRiskEngine.js";
import { buildMonthlySchedule, formatMoney } from "./engine/schedule.js";

let selectedMonths = null;

const $ = (id) => document.getElementById(id);

const amountEl = $("amount");
const dniEl = $("dni");
const statusEl = $("status");
const summaryEl = $("summary");
const scheduleEl = $("schedule");
const approveBtn = $("btnApprove");

function parseAmount() {
  const raw = (amountEl.value || "").replace(",", ".").trim();
  const v = Number(raw);
  return Number.isFinite(v) ? v : NaN;
}

function setStatus(html, kind = "info") {
  statusEl.className = "";
  statusEl.innerHTML = html;
  if (kind === "approved") statusEl.classList.add("approved");
  if (kind === "rejected") statusEl.classList.add("rejected");
}

function clearOutputs() {
  summaryEl.innerHTML = "";
  scheduleEl.innerHTML = "";
}

function renderSchedule(items) {
  if (!items?.length) {
    scheduleEl.innerHTML = "<p class='hint'>Solicita aprobación para ver el cronograma.</p>";
    return;
  }

  const rows = items.map(i => `
    <tr>
      <td>${i.n}</td>
      <td>${i.dueDate}</td>
      <td>${formatMoney(i.amount)}</td>
    </tr>
  `).join("");

  scheduleEl.innerHTML = `
    <table class="schedule-table">
      <thead>
        <tr><th>#</th><th>Vencimiento</th><th>Monto</th></tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function attachOptionHandlers() {
  document.querySelectorAll("button.opt").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("button.opt").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      selectedMonths = Number(btn.dataset.months);
      setStatus(`<p>Cuotas seleccionadas: <strong>${selectedMonths}</strong>. Ahora simula la aprobación.</p>`);
      clearOutputs();
    });
  });
}

approveBtn.addEventListener("click", async () => {
  const amount = parseAmount();
  const dni = (dniEl.value || "").trim();

  if (!Number.isFinite(amount) || amount <= 0) {
    setStatus("<p>Ingresa un monto válido mayor a 0.</p>", "rejected");
    clearOutputs();
    return;
  }
  if (!selectedMonths) {
    setStatus("<p>Selecciona 3, 6 o 12 cuotas.</p>", "rejected");
    clearOutputs();
    return;
  }
  if (!/^\d{8}$/.test(dni)) {
    setStatus("<p>Ingresa un DNI válido de 8 dígitos (demo).</p>", "rejected");
    clearOutputs();
    return;
  }

  setStatus("<p>Evaluando… (demo ~1s)</p>");
  clearOutputs();

  const decision = await assessRisk({ dni, amount, months: selectedMonths });

  if (!decision.approved) {
    setStatus(`
      <h3>❌ Rechazado (demo)</h3>
      <p>Motivo: <strong>${decision.reason}</strong></p>
      <p class="hint">Tip: cambia el último dígito del DNI para variar el resultado.</p>
    `, "rejected");
    return;
  }

  // Fee simple (demo):
  // - 3 cuotas: 0%
  // - 6 cuotas: 4% del monto
  // - 12 cuotas: 9% del monto
  const feeRate = selectedMonths === 6 ? 0.04 : (selectedMonths === 12 ? 0.09 : 0);
  const fee = amount * feeRate;
  const totalToRepay = amount + fee;

  const schedule = buildMonthlySchedule({
    amount: totalToRepay,
    months: selectedMonths,
    firstDueInDays: 30
  });

  setStatus(`
    <h3>✅ Aprobado por Caja Trujillo (demo)</h3>
    <p>Liquidación al comercio (demo): <strong>${formatMoney(amount)}</strong></p>
    <p>Fee (demo): <strong>${formatMoney(fee)}</strong> (${(feeRate * 100).toFixed(0)}%)</p>
    <p>Total a pagar: <strong>${formatMoney(totalToRepay)}</strong></p>
  `, "approved");

  summaryEl.innerHTML = `
    <ul>
      <li>Cuotas: <strong>${selectedMonths}</strong></li>
      <li>Primera cuota: <strong>en 30 días</strong></li>
      <li>Canales de pago: App Caja Trujillo / Yape / Plin</li>
    </ul>
  `;

  renderSchedule(schedule);
});

attachOptionHandlers();
setStatus("<p>Selecciona cuotas para comenzar.</p>");
renderSchedule(null);