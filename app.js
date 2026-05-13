"use strict";

const STORAGE_KEY = "cresio-control-acuerdos-v1";
const PDF_DB = "cresio-acuerdos-pdf-db";
const PDF_STORE = "pdfs";

const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const CATALOGS = {
  periodicity: ["MENSUAL", "BIMESTRAL", "TRIMESTRAL", "CUATRIMESTRAL", "SEMESTRAL", "ANUAL"],
  negotiationType: [
    "Rebate",
    "Promociones",
    "PMC",
    "R.U.",
    "Incentivo Temporada",
    "Pronto Pago",
    "Bonificacion",
  ],
  paymentMethod: ["NOTA DE CREDITO", "FACTURA", "BONIFICACION PRODUCTO", "GIFT CARD", "TRANSFERENCIA"],
  status: ["Vigente", "Renegociacion", "Cancelado", "Suspendido", "Por iniciar"],
  recoveryStatus: ["Pagado", "Pendiente de Pago", "Parcial", "No reportado", "Reclamado"],
  alertStatus: ["Abierta", "En proceso", "Cerrada", "Escalada"],
  documentType: ["Factura", "Nota de Credito", "Bonificacion", "Memo"],
};

const SEED_AGREEMENTS = [
  {
    id: "AC-2026-001",
    number: "1",
    status: "Vigente",
    laboratory: "ABBOT",
    line: "ALIANZA ABBOTT.FARMA",
    distributors: ["1 a varios"],
    negotiationType: "Rebate",
    periodicity: "ANUAL",
    collectionType: "ANUAL",
    basis: "NETA",
    manager: "",
    rebate: 0.0135,
    hasScale: "Si",
    scale: "",
    objectives: [3332564.58, 3455992.9],
    exceptionText: "NO SE TOMAN EN CONSIDERACION COMPRAS POR APROMED.",
    observations: "",
    quickPayment: "No",
    quickPaymentPercent: null,
    flags: flagDefaults(),
    paymentMethod: "NOTA DE CREDITO",
    validFrom: "2026-01-01",
    validTo: "2026-12-31",
    description: "",
  },
  {
    id: "AC-2026-002",
    number: "2",
    status: "Vigente",
    laboratory: "ABBOT",
    line:
      "ALIANZA ABBOTT.NUTRI - COMPLEMENTOS / ALIANZA ABBOTT.NUTRI - REHIDRATANTES / ALIANZA ABBOTT.NUTRI - FORMULAS",
    distributors: ["1 a varios"],
    negotiationType: "Rebate",
    periodicity: "ANUAL",
    collectionType: "ANUAL",
    basis: "NETA",
    manager: "",
    rebate: 0.01,
    hasScale: "No",
    scale: "",
    objectives: [3993320],
    exceptionText:
      "[66042] NEPRO AP LIQ 1.8KCAL VAINILLA BOTx220ML, [65816] NEPRO BP 1.8K LIQ VAINILLA BOTx220ML, [65807] PULMOCARE 1.5KCAL VAINILLA LATAx250ML, [64940] VITAL 1.5 KCAL LIQ VAINILLA BOTx220ML",
    observations: "",
    quickPayment: "No",
    quickPaymentPercent: null,
    flags: flagDefaults(),
    paymentMethod: "NOTA DE CREDITO",
    validFrom: "2026-01-01",
    validTo: "2026-12-31",
    description: "",
  },
  {
    id: "AC-2026-003",
    number: "3",
    status: "Vigente",
    laboratory: "ACINO",
    line: "ACINO PHARMA",
    distributors: ["1 a varios"],
    negotiationType: "Rebate",
    periodicity: "ANUAL",
    collectionType: "ANUAL",
    basis: "NETA",
    manager: "",
    rebate: 0.03,
    hasScale: "Si",
    scale: "",
    objectives: [683698.82, 696598.8, 709498.78],
    exceptionText: "LAS COMPRAS POR DIFARE SOLO SERAN ACEPTADAS POR FERIA COMERCIAL, BAJO PREVIA AUTORIZACION.",
    observations: "",
    quickPayment: "No",
    quickPaymentPercent: null,
    flags: flagDefaults(),
    paymentMethod: "NOTA DE CREDITO",
    validFrom: "2026-01-01",
    validTo: "2026-12-31",
    description: "",
  },
  {
    id: "AC-2026-004",
    number: "4",
    status: "Vigente",
    laboratory: "ALCON",
    line: "ALIANZA ALCON OTC",
    distributors: ["1 a varios"],
    negotiationType: "Rebate",
    periodicity: "ANUAL",
    collectionType: "ANUAL",
    basis: "NETA",
    manager: "",
    rebate: 0.03,
    hasScale: "No",
    scale: "",
    objectives: [409076],
    exceptionText: "",
    observations: "SOLO DIFARE Y FARMAENLACE.",
    quickPayment: "No",
    quickPaymentPercent: null,
    flags: flagDefaults(),
    paymentMethod: "NOTA DE CREDITO",
    validFrom: "2026-01-01",
    validTo: "2026-12-31",
    description: "",
  },
  {
    id: "AC-2026-005",
    number: "5",
    status: "Vigente",
    laboratory: "ALIANZA J.J.",
    line: "ALIANZA J.J. OTC - ALIANZA J.J. INFANTIL - ALIANZA J.J. CONSUMO - ALIANZA J.J. NEUTROGENA",
    distributors: ["1 a varios"],
    negotiationType: "Rebate",
    periodicity: "TRIMESTRAL",
    collectionType: "TRIMESTRAL",
    basis: "NETA",
    manager: "",
    rebate: 0.04,
    hasScale: "No",
    scale: "",
    objectives: [370000],
    exceptionText: "ALIANZA J.J. MEDICAL",
    observations:
      "LOS FALTANTES DE LA ULTIMA SEMANA DEL MES HASTA UN LIMITE DEL 0,48% DE LA CUOTA SERAN CONSIDERADOS PARA EL CALCULO DEL CUMPLIMIENTO, PERO SE PAGARA EN BASE A LA FACTURACION REAL.",
    quickPayment: "No",
    quickPaymentPercent: null,
    flags: flagDefaults(),
    paymentMethod: "NOTA DE CREDITO",
    validFrom: "2026-01-01",
    validTo: "2026-12-31",
    description: "",
  },
  {
    id: "AC-2026-007",
    number: "7",
    status: "Vigente",
    laboratory: "BABYS",
    line: "BABYS-BABYS / BABYS-DISNEY / BABYS-NUBY / BABYS - DR. TALBOTS",
    distributors: ["1 a varios"],
    negotiationType: "Rebate",
    periodicity: "ANUAL",
    collectionType: "TRIMESTRAL",
    basis: "NETA",
    manager: "",
    rebate: 0.04,
    hasScale: "Si",
    scale: "",
    objectives: [327307, 342184, 357062, 371940],
    exceptionText: "BABYS - ACAST",
    observations: "",
    quickPayment: "No",
    quickPaymentPercent: null,
    flags: flagDefaults(),
    paymentMethod: "NOTA DE CREDITO",
    validFrom: "2026-01-01",
    validTo: "2026-12-31",
    description: "",
  },
  {
    id: "AC-2026-009",
    number: "9",
    status: "Vigente",
    laboratory: "BASSA",
    line: "BASSA COSMETICOS / BASSA FARMA",
    distributors: ["1 a varios"],
    negotiationType: "Rebate",
    periodicity: "ANUAL",
    collectionType: "ANUAL",
    basis: "NETA",
    manager: "",
    rebate: 0.015,
    hasScale: "No",
    scale: "",
    objectives: [1285000],
    exceptionText: "",
    observations:
      "SI LA COMPRA NETA ANUAL DE LOS PRODUCTOS DEL ANEXO A ALCANZA 56000 USD HABRA UN REBATE ADICIONAL DEL 2%.",
    quickPayment: "No",
    quickPaymentPercent: null,
    flags: flagDefaults(),
    paymentMethod: "NOTA DE CREDITO",
    validFrom: "2026-01-01",
    validTo: "2026-12-31",
    description: "",
  },
  {
    id: "AC-2026-010",
    number: "10",
    status: "Vigente",
    laboratory: "BASSA",
    line: "BASSA COSMETICOS / BASSA FARMA",
    distributors: ["1 a varios"],
    negotiationType: "Rebate",
    periodicity: "ANUAL",
    collectionType: "ANUAL",
    basis: "NETA",
    manager: "",
    rebate: 0.02,
    hasScale: "No",
    scale: "",
    objectives: [526000],
    exceptionText: "",
    observations:
      "SI LA COMPRA NETA ANUAL DE LOS PRODUCTOS DEL ANEXO A ALCANZA 56000 USD SE DARA UN REBATE DEL 2%. SOLO HAY CODIFICADOS 26 PRODUCTOS.",
    quickPayment: "No",
    quickPaymentPercent: null,
    flags: flagDefaults(),
    paymentMethod: "NOTA DE CREDITO",
    validFrom: "2026-01-01",
    validTo: "2026-12-31",
    description: "",
  },
  {
    id: "AC-2026-019",
    number: "19",
    status: "Vigente",
    laboratory: "CHEFAR / INFABI",
    line: "CHEFAR / INFABI",
    distributors: ["1 a varios"],
    negotiationType: "Rebate",
    periodicity: "ANUAL",
    collectionType: "ANUAL",
    basis: "NETA",
    manager: "",
    rebate: 0.03,
    hasScale: "No",
    scale: "",
    objectives: [201105.68],
    exceptionText: "",
    observations:
      "HAY UN 3% DE REBATE PARA SELL OUT QUE NO CONSIDERA LOS PRODUCTOS CON MAS DEL 40% DE DESCUENTO EN CONDICION FINANCIERA DE COMPRA.",
    quickPayment: "No",
    quickPaymentPercent: null,
    flags: flagDefaults(),
    paymentMethod: "NOTA DE CREDITO",
    validFrom: "2026-01-01",
    validTo: "2026-12-31",
    description: "",
  },
  {
    id: "AC-2026-024",
    number: "24",
    status: "Vigente",
    laboratory: "DYVENPRO DISTRIBUCION Y VENTA DE PRODUCTOS SOCIEDAD ANONIMA",
    line:
      "DYVENPRO FARMA COMERCIAL 1 / DYVENPRO FARMA COMERCIAL 2 / DYVENPRO FARMA COMERCIAL 3 / DYVENPRO OTC-CONSUMO 1 / DYVENPRO OTC-CONSUMO 2 / DYVENPRO OTC-CONSUMO 3 / DYVENPRO OTC-CONSUMO 4 / DYVENPRO OTC-CONSUMO 5 / DYVENPRO FARMA ETICOS 1 / DYVENPRO FARMA ETICOS 2 / DYVENPRO FARMA ETICOS 3 / DYVENPRO REPRESENTACION ORGANON / DYVENPRO ARAPHARMA / DYVENPRO IDELIFE / DYVENPRO ECUAGEN",
    distributors: ["1 a varios"],
    negotiationType: "Rebate",
    periodicity: "ANUAL",
    collectionType: "TRIMESTRAL",
    basis: "NETA",
    manager: "",
    rebate: 0.03,
    hasScale: "Si",
    scale: "",
    objectives: [5261033, 5359371, 5457708, 5556045, 5654382],
    exceptionText:
      "DYVENPRO REPRESENTACION ASTRA ZENECA, DYVENPRO ESPECIALIDADES OPTHA, DYVENPRO ESPECIALIDADES NEUROCIENCIAS, DYVENPRO GENERAL, DYVENPRO REPRESENTACION ORGANON CARDIO, DYVENPRO REPRESENTACION PHARMALYS",
    observations: "",
    quickPayment: "No",
    quickPaymentPercent: null,
    flags: flagDefaults(),
    paymentMethod: "NOTA DE CREDITO",
    validFrom: "2026-01-01",
    validTo: "2026-12-31",
    description: "",
  },
  {
    id: "AC-2026-025",
    number: "25",
    status: "Vigente",
    laboratory: "ECUAQUIMICA",
    line: "ECUAQUIMICA - NUTRICIA",
    distributors: ["1 a varios"],
    negotiationType: "Rebate",
    periodicity: "ANUAL",
    collectionType: "ANUAL",
    basis: "NETA",
    manager: "",
    rebate: 0.03,
    hasScale: "Si",
    scale: "",
    objectives: [1273029, 1320179],
    exceptionText: "",
    observations: "PAGO EN TARJETAS PACIFICARD.",
    quickPayment: "No",
    quickPaymentPercent: null,
    flags: flagDefaults(),
    paymentMethod: "NOTA DE CREDITO",
    validFrom: "2026-01-01",
    validTo: "2026-12-31",
    description: "",
  },
  {
    id: "AC-2026-026",
    number: "26",
    status: "Vigente",
    laboratory: "ECUAQUIMICA",
    line: "ECUAQUIMICA - GENERICOS - ECUAQUIMICA",
    distributors: ["1 a varios"],
    negotiationType: "Rebate",
    periodicity: "ANUAL",
    collectionType: "ANUAL",
    basis: "NETA",
    manager: "",
    rebate: 0.11,
    hasScale: "No",
    scale: "",
    objectives: [258551],
    exceptionText: "",
    observations: "",
    quickPayment: "No",
    quickPaymentPercent: null,
    flags: flagDefaults(),
    paymentMethod: "NOTA DE CREDITO",
    validFrom: "2026-01-01",
    validTo: "2026-12-31",
    description: "",
  },
  {
    id: "AC-2026-029",
    number: "29",
    status: "Vigente",
    laboratory: "ETHICAL NUTRITION",
    line: "LETERAGO - ETHICAL NUTRITION",
    distributors: ["1 a varios"],
    negotiationType: "Rebate",
    periodicity: "ANUAL",
    collectionType: "ANUAL",
    basis: "NETA",
    manager: "",
    rebate: 0.01,
    hasScale: "Si",
    scale: "",
    objectives: [1659447.4052, 1675102.57, 1690757.73],
    exceptionText: "",
    observations:
      "RESALTAN IMPORTANCIA QUE CERRANDO CADA TRIMESTRE SE EVIDENCIE QUE LAS COMPRAS MENSUALES ALCANCEN COMO MINIMO EL 85% DE LO QUE COMPRA EN PROMEDIO.",
    quickPayment: "No",
    quickPaymentPercent: null,
    flags: flagDefaults(),
    paymentMethod: "NOTA DE CREDITO",
    validFrom: "2026-01-01",
    validTo: "2026-12-31",
    description: "",
  },
  {
    id: "AC-2026-030",
    number: "30",
    status: "Vigente",
    laboratory: "EUROSTAGA",
    line: "EUROSTAGA",
    distributors: ["1 a varios"],
    negotiationType: "Rebate",
    periodicity: "ANUAL",
    collectionType: "SEMESTRAL",
    basis: "NETA",
    manager: "",
    rebate: 0.02,
    hasScale: "Si",
    scale: "",
    objectives: [704557.44, 717604.8, 750223.2],
    exceptionText: "",
    observations: "",
    quickPayment: "No",
    quickPaymentPercent: null,
    flags: flagDefaults(),
    paymentMethod: "NOTA DE CREDITO",
    validFrom: "2026-01-01",
    validTo: "2026-12-31",
    description: "",
  },
  {
    id: "AC-2026-031",
    number: "31",
    status: "Vigente",
    laboratory: "EVEREADY",
    line: "EVEREADY ENERGIZER",
    distributors: ["1 a varios"],
    negotiationType: "Rebate",
    periodicity: "TRIMESTRAL",
    collectionType: "TRIMESTRAL",
    basis: "NETA",
    manager: "",
    rebate: 0.035,
    hasScale: "No",
    scale: "",
    objectives: [8000],
    exceptionText: "",
    observations: "PRIMER TRIMESTRE 2026",
    quickPayment: "No",
    quickPaymentPercent: null,
    flags: flagDefaults(),
    paymentMethod: "NOTA DE CREDITO",
    validFrom: "2026-01-01",
    validTo: "2026-12-31",
    description: "",
  },
  {
    id: "AC-2026-032",
    number: "32",
    status: "Vigente",
    laboratory: "FAES FARMA",
    line: "LETERAGO - FAES FARMA",
    distributors: ["1 a varios"],
    negotiationType: "Rebate",
    periodicity: "ANUAL",
    collectionType: "ANUAL",
    basis: "NETA",
    manager: "",
    rebate: 0.0333,
    hasScale: "No",
    scale: "",
    objectives: [1298341.8],
    exceptionText: "",
    observations: "",
    quickPayment: "No",
    quickPaymentPercent: null,
    flags: flagDefaults(),
    paymentMethod: "NOTA DE CREDITO",
    validFrom: "2026-01-01",
    validTo: "2026-12-31",
    description: "",
  },
  {
    id: "AC-2026-033",
    number: "33",
    status: "Vigente",
    laboratory: "FARMAYALA PHARMACEUTICAL COMPANY S.A. FPC",
    line:
      "FARMAYALA - ITALFARMA / FARMAYALA - MENARINI INTERNACIONAL / FARMAYALA - ZAMBON GROUP / FARMAYALA - FPC / FARMAYALA - NUTRACEUTICOS",
    distributors: ["1 a varios"],
    negotiationType: "Rebate",
    periodicity: "ANUAL",
    collectionType: "ANUAL",
    basis: "NETA",
    manager: "",
    rebate: 0.03,
    hasScale: "No",
    scale: "",
    objectives: [2000000],
    exceptionText: "",
    observations: "",
    quickPayment: "No",
    quickPaymentPercent: null,
    flags: flagDefaults(),
    paymentMethod: "NOTA DE CREDITO",
    validFrom: "2026-01-01",
    validTo: "2026-12-31",
    description: "",
  },
  {
    id: "AC-2026-034",
    number: "34",
    status: "Vigente",
    laboratory: "GARCOS S.A.",
    line: "GARCOS - PROSIRIOS",
    distributors: ["1 a varios"],
    negotiationType: "Rebate",
    periodicity: "ANUAL",
    collectionType: "ANUAL",
    basis: "NETA",
    manager: "",
    rebate: 0.04,
    hasScale: "Si",
    scale: "",
    objectives: [657674.4, 685078, 739884],
    exceptionText: "",
    observations: "",
    quickPayment: "No",
    quickPaymentPercent: null,
    flags: flagDefaults(),
    paymentMethod: "NOTA DE CREDITO",
    validFrom: "2026-01-01",
    validTo: "2026-12-31",
    description: "",
  },
  {
    id: "AC-2026-035",
    number: "35",
    status: "Vigente",
    laboratory: "GARCOS S.A.",
    line: "GARCOS - OTC",
    distributors: ["1 a varios"],
    negotiationType: "Rebate",
    periodicity: "ANUAL",
    collectionType: "ANUAL",
    basis: "NETA",
    manager: "",
    rebate: 0.04,
    hasScale: "Si",
    scale: "",
    objectives: [488925, 503025, 517150],
    exceptionText:
      "BICARZOL CAPx10/600MGx28 / FINALIN GRIPE GRAx500/10/5MGx50 / FINALIN JBEx160MG/5MLx120ML / FINALIN MUJER TAB-RECx325/300MGx50 / FINALIN MUSCULAR TAB-RECx300/275MGx20 / FINALIN-INF TAB-MASTx160MGx30",
    observations:
      "SOLO CONTEMPLA FINALIN FORTE GRAx500/65MGx100 (08577). EL CONVENIO ESTA PLANTEADO POR 19557 CAJAS, LA CUOTA SE PROYECTA DE ACUERDO AL COSTO ACTUAL DE 25 USD.",
    quickPayment: "No",
    quickPaymentPercent: null,
    flags: flagDefaults(),
    paymentMethod: "NOTA DE CREDITO",
    validFrom: "2026-01-01",
    validTo: "2026-12-31",
    description: "",
  },
  {
    id: "AC-2026-036",
    number: "36",
    status: "Vigente",
    laboratory: "GARCOS S.A.",
    line: "GARCOS - OTC",
    distributors: ["1 a varios"],
    negotiationType: "Rebate",
    periodicity: "ANUAL",
    collectionType: "ANUAL",
    basis: "NETA",
    manager: "",
    rebate: 0.04,
    hasScale: "Si",
    scale: "",
    objectives: [108286, 111409, 114533],
    exceptionText: "FINALIN FORTE GRAx500/65MGx100 (08577)",
    observations:
      "BICARZOL CAPx10/600MGx28 / FINALIN GRIPE GRAx500/10/5MGx50 / FINALIN JBEx160MG/5MLx120ML / FINALIN MUJER TAB-RECx325/300MGx50 / FINALIN MUSCULAR TAB-RECx300/275MGx20 / FINALIN-INF TAB-MASTx160MGx30",
    quickPayment: "No",
    quickPaymentPercent: null,
    flags: flagDefaults(),
    paymentMethod: "NOTA DE CREDITO",
    validFrom: "2026-01-01",
    validTo: "2026-12-31",
    description: "",
  },
];

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: iconSvg("dashboard") },
  { id: "agreements", label: "Convenios", icon: iconSvg("file") },
  { id: "tracking", label: "Seguimiento", icon: iconSvg("trend") },
  { id: "quickPay", label: "Pronto pago", icon: iconSvg("clock") },
  { id: "accounting", label: "Contabilidad NC", icon: iconSvg("ledger") },
  { id: "alerts", label: "Alertas", icon: iconSvg("alert") },
  { id: "reports", label: "Reportes", icon: iconSvg("report") },
];

const VIEW_COPY = {
  dashboard: ["Dashboard", "Resumen ejecutivo de acuerdos, cumplimiento, valor a recuperar y alertas."],
  agreements: ["Registro de convenio", "Formulario maestro con versionamiento, multiples proveedores y adjunto PDF."],
  tracking: ["Seguimiento mensual", "Carga de compras y ventas por mes con calculo automatico de cumplimiento y rebate."],
  quickPay: ["Pronto pago", "Control de facturas sujetas a descuento por pago anticipado."],
  accounting: ["Contabilidad / NC", "Consulta de valor esperado, recibido, saldo pendiente y estado de recuperacion."],
  alerts: ["Excepciones y alertas", "Riesgos por cumplimiento, excepciones, observaciones y convenios proximos a vencer."],
  reports: ["Reportes", "Generacion y exportacion CSV de maestro, cumplimiento, contabilidad y alertas."],
};

let state = loadState();

function flagDefaults() {
  return {
    pmc: "No",
    promotions: "No",
    purchaseReturns: "No",
    expiryReturns: "No",
    ru: "No",
    season: "No",
    infoSale: "No",
  };
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function makeInitialState() {
  const agreements = clone(SEED_AGREEMENTS).map((agreement) => ({
    ...agreement,
    version: 1,
    history: [],
    pdf: null,
  }));

  return {
    agreements,
    monthly: Object.fromEntries(agreements.map((agreement) => [agreement.id, emptyMonthlyRows()])),
    quickPayments: [],
    alertStatus: {},
    ui: {
      view: "dashboard",
      role: "compras",
      selectedAgreementId: agreements[0]?.id || "",
      selectedTrackingId: agreements[0]?.id || "",
      reportType: "maestro",
      filters: {
        query: "",
        laboratory: "Todos",
        status: "Todos",
      },
    },
  };
}

function emptyMonthlyRows() {
  return MONTHS.map((month) => ({
    month,
    sellIn: 0,
    sellOut: 0,
  }));
}

function loadState() {
  const fallback = makeInitialState();
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return fallback;
    const parsed = JSON.parse(stored);
    return normalizeState(parsed, fallback);
  } catch {
    return fallback;
  }
}

function normalizeState(parsed, fallback) {
  const merged = { ...fallback, ...parsed };
  merged.agreements = Array.isArray(parsed.agreements) ? parsed.agreements : fallback.agreements;
  merged.monthly = parsed.monthly && typeof parsed.monthly === "object" ? parsed.monthly : fallback.monthly;
  merged.quickPayments = Array.isArray(parsed.quickPayments) ? parsed.quickPayments : [];
  merged.alertStatus = parsed.alertStatus && typeof parsed.alertStatus === "object" ? parsed.alertStatus : {};
  merged.ui = { ...fallback.ui, ...(parsed.ui || {}) };

  for (const agreement of merged.agreements) {
    agreement.flags = { ...flagDefaults(), ...(agreement.flags || {}) };
    agreement.distributors = Array.isArray(agreement.distributors) ? agreement.distributors : [];
    agreement.objectives = Array.isArray(agreement.objectives) ? agreement.objectives : [];
    agreement.history = Array.isArray(agreement.history) ? agreement.history : [];
    if (!merged.monthly[agreement.id]) merged.monthly[agreement.id] = emptyMonthlyRows();
  }

  return merged;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function render() {
  renderNav();
  renderRoleSwitch();
  renderHeader();

  const view = state.ui.view;
  if (view === "dashboard") renderDashboard();
  if (view === "agreements") renderAgreements();
  if (view === "tracking") renderTracking();
  if (view === "quickPay") renderQuickPay();
  if (view === "accounting") renderAccounting();
  if (view === "alerts") renderAlerts();
  if (view === "reports") renderReports();
}

function renderNav() {
  const nav = document.querySelector("#mainNav");
  nav.innerHTML = NAV_ITEMS.map(
    (item) => `
      <button type="button" class="nav-item ${item.id === state.ui.view ? "is-active" : ""}" data-view="${item.id}">
        ${item.icon}<span>${item.label}</span>
      </button>
    `,
  ).join("");
}

function renderRoleSwitch() {
  document.querySelectorAll("[data-role]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.role === state.ui.role);
  });
}

function renderHeader() {
  const [title, subtitle] = VIEW_COPY[state.ui.view] || VIEW_COPY.dashboard;
  document.querySelector("#viewTitle").textContent = title;
  document.querySelector("#viewSubtitle").textContent =
    state.ui.role === "contabilidad" ? `${subtitle} Modo solo consulta activo.` : subtitle;
}

function renderDashboard() {
  const metrics = getDashboardMetrics();
  const rows = filteredAgreements().map((agreement) => renderAgreementRow(agreement)).join("");

  content().innerHTML = `
    <div class="grid cols-4">
      ${metricCard("Convenios activos", metrics.active, "Estado Vigente", "ok")}
      ${metricCard("Valor a recuperar", money(metrics.recoverable), "Rebate estimado + pronto pago", "ok")}
      ${metricCard("Cumplimiento promedio", percent(metrics.avgCompliance), "Base Sell In registrada", metrics.avgCompliance >= 0.95 ? "ok" : "warn")}
      ${metricCard("Acuerdos en peligro", metrics.risk, "Cumplimiento menor al 95%", metrics.risk ? "danger" : "ok")}
    </div>

    <div class="panel">
      <div class="panel-header">
        <div>
          <h2>Resumen de convenios y cumplimiento</h2>
          <p>Incluye linea de laboratorio, tipo como variable de negociacion y evidencia PDF.</p>
        </div>
        ${filtersMarkup()}
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Laboratorio / linea</th>
              <th>Tipo</th>
              <th>Distribuidores</th>
              <th>Cumplimiento</th>
              <th>Valor a recuperar</th>
              <th>PDF</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>${rows || emptyRow(8, "No hay convenios con los filtros seleccionados.")}</tbody>
        </table>
      </div>
    </div>
  `;
}

function renderAgreements() {
  const selected = getSelectedAgreement();
  const readonly = isReadOnly();
  const agreement = selected || makeBlankAgreement();
  const disabled = readonly ? "disabled" : "";

  content().innerHTML = `
    <div class="toolbar">
      <div class="pill-row">
        <span class="pill violet">Maestro de acuerdos</span>
        <span class="pill ${readonly ? "amber" : "green"}">${readonly ? "Solo consulta" : "Edicion Compras"}</span>
      </div>
      <button type="button" class="primary-button" data-action="new-agreement" ${disabled}>Nuevo convenio</button>
    </div>
    ${readonlyBanner()}
    <form id="agreementForm" class="stack">
      <div class="form-section">
        <header>
          <div>
            <h2>Identificacion</h2>
            <p>Datos base del convenio y variable de negociacion.</p>
          </div>
        </header>
        <div class="section-body field-grid">
          ${inputField("id", "Codigo acuerdo", agreement.id, "text", "required")}
          ${selectField("status", "Estado", agreement.status, CATALOGS.status)}
          ${inputField("laboratory", "Laboratorio", agreement.laboratory, "text", "required")}
          ${inputField("line", "Linea laboratorio", agreement.line, "text", "required")}
          ${selectField("negotiationType", "Tipo / variable de negociacion", agreement.negotiationType, CATALOGS.negotiationType)}
          ${selectField("periodicity", "Periodicidad", agreement.periodicity, CATALOGS.periodicity)}
          ${selectField("collectionType", "Tipo cobro", agreement.collectionType, CATALOGS.periodicity)}
          ${inputField("basis", "Tipo compra / venta", agreement.basis, "text")}
          ${inputField("manager", "Gestor", agreement.manager, "text")}
          ${inputField("rebatePercent", "% Rebate", toInputPercent(agreement.rebate), "number", 'step="0.0001" min="0"')}
          ${inputField("validFrom", "Vigencia desde", agreement.validFrom, "date")}
          ${inputField("validTo", "Vigencia hasta", agreement.validTo, "date")}
          <div class="field full">
            <span class="field-label">Distribuidores / proveedores</span>
            <input type="hidden" name="distributors" value="${escapeAttr((agreement.distributors || []).join("|"))}">
            <div id="distributorTags" class="tag-list">${distributorTags(agreement.distributors || [], readonly)}</div>
            <div class="tag-input">
              <input id="distributorInput" type="text" placeholder="Agregar proveedor o distribuidor" ${disabled}>
              <button type="button" class="secondary-button" data-action="add-distributor" ${disabled}>Agregar</button>
            </div>
          </div>
        </div>
      </div>

      <div class="grid cols-2">
        <div class="form-section">
          <header>
            <div>
              <h2>Escala y objetivos</h2>
              <p>Objetivos por escala; el primer objetivo se usa como base de cumplimiento.</p>
            </div>
          </header>
          <div class="section-body field-grid">
            ${selectField("hasScale", "Tiene escala", agreement.hasScale, ["Si", "No"])}
            ${inputField("scale", "Escala seleccionada", agreement.scale, "text")}
            <div class="field full">
              <label for="objectives">Objetivos</label>
              <textarea id="objectives" name="objectives" ${disabled}>${escapeHtml((agreement.objectives || []).join(", "))}</textarea>
            </div>
          </div>
        </div>

        <div class="form-section">
          <header>
            <div>
              <h2>Pronto pago y forma de recuperacion</h2>
              <p>Condiciones pactadas para descuento y nota de credito.</p>
            </div>
          </header>
          <div class="section-body field-grid">
            ${selectField("quickPayment", "Pronto pago", agreement.quickPayment, ["Si", "No"])}
            ${inputField("quickPaymentPercent", "% Pronto pago", toInputPercent(agreement.quickPaymentPercent), "number", 'step="0.0001" min="0"')}
            ${selectField("paymentMethod", "Forma de pago", agreement.paymentMethod, CATALOGS.paymentMethod)}
            <div class="field full">
              <span class="field-label">Acuerdo comercial PDF</span>
              <div class="upload-zone">
                <input id="pdfFile" type="file" accept="application/pdf" ${disabled}>
                <div class="pill-row">
                  ${agreement.pdf ? `<span class="pill green">${escapeHtml(agreement.pdf.name)}</span>` : `<span class="pill amber">Sin PDF adjunto</span>`}
                  <button type="button" class="secondary-button" data-action="view-pdf" data-id="${escapeAttr(agreement.id)}" ${agreement.pdf ? "" : "disabled"}>Ver PDF</button>
                  <button type="button" class="danger-button" data-action="remove-pdf" data-id="${escapeAttr(agreement.id)}" ${agreement.pdf && !readonly ? "" : "disabled"}>Quitar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="form-section">
        <header>
          <div>
            <h2>Deducciones y excepciones</h2>
            <p>Campos grises del maquetado: condiciones que restan o modifican la base.</p>
          </div>
        </header>
        <div class="section-body field-grid">
          ${selectField("flag_pmc", "Considera PMC", agreement.flags.pmc, ["Si", "No"])}
          ${selectField("flag_promotions", "Considera promociones", agreement.flags.promotions, ["Si", "No"])}
          ${selectField("flag_purchaseReturns", "Devol. compra", agreement.flags.purchaseReturns, ["Si", "No"])}
          ${selectField("flag_expiryReturns", "Devol. vencim.", agreement.flags.expiryReturns, ["Si", "No"])}
          ${selectField("flag_ru", "Considera RU", agreement.flags.ru, ["Si", "No"])}
          ${selectField("flag_season", "Considera temporada", agreement.flags.season, ["Si", "No"])}
          ${selectField("flag_infoSale", "Venta informacion", agreement.flags.infoSale, ["Si", "No"])}
          <div></div>
          <div class="field span-2">
            <label for="exceptionText">Excepciones</label>
            <textarea id="exceptionText" name="exceptionText" ${disabled}>${escapeHtml(agreement.exceptionText || "")}</textarea>
          </div>
          <div class="field span-2">
            <label for="observations">Observaciones</label>
            <textarea id="observations" name="observations" ${disabled}>${escapeHtml(agreement.observations || "")}</textarea>
          </div>
          <div class="field full">
            <label for="description">Descripcion convenio</label>
            <textarea id="description" name="description" ${disabled}>${escapeHtml(agreement.description || "")}</textarea>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button type="button" class="secondary-button" data-action="go-dashboard">Volver al resumen</button>
        <button type="submit" class="primary-button" ${disabled}>Guardar convenio</button>
      </div>
    </form>

    <div class="panel">
      <div class="panel-header">
        <div>
          <h2>Tabla maestra</h2>
          <p>No se elimina informacion; la vigencia se controla por estado.</p>
        </div>
      </div>
      <div class="table-wrap">${agreementTable()}</div>
    </div>
  `;
}

function renderTracking() {
  const selected = getAgreement(state.ui.selectedTrackingId) || state.agreements[0];
  state.ui.selectedTrackingId = selected?.id || "";
  const readonly = isReadOnly();
  const disabled = readonly ? "disabled" : "";
  const rows = selected ? monthlyRows(selected.id) : [];
  const summary = selected ? trackingSummary(selected.id) : emptySummary();

  content().innerHTML = `
    ${readonlyBanner()}
    <div class="panel">
      <div class="panel-header">
        <div>
          <h2>Carga mensual de cumplimiento</h2>
          <p>El valor estimado se calcula sobre compra Sell In registrada x % rebate.</p>
        </div>
        <select id="trackingAgreement">
          ${state.agreements.map((a) => option(a.id, `${a.id} - ${a.laboratory}`, selected?.id)).join("")}
        </select>
      </div>
      ${
        selected
          ? `
        <div class="panel-body stack">
          <div class="summary-strip">
            ${summaryItem("Linea", selected.line)}
            ${summaryItem("Objetivo base", money(objectiveBase(selected)))}
            ${summaryItem("% Rebate", percent(selected.rebate))}
            ${summaryItem("Cumplimiento", percent(summary.compliance))}
          </div>
          <form id="trackingForm" class="stack">
            <div class="month-grid">
              ${rows.map((row, index) => monthCard(row, index, selected, disabled)).join("")}
            </div>
            <div class="summary-strip">
              ${summaryItem("Total compra", money(summary.sellIn))}
              ${summaryItem("Total venta", money(summary.sellOut))}
              ${summaryItem("Rebate estimado", money(summary.expectedRebate))}
              ${summaryItem("Estado", riskPill(summary.compliance))}
            </div>
            <div class="form-actions">
              <button type="submit" class="primary-button" ${disabled}>Guardar seguimiento</button>
            </div>
          </form>
        </div>
      `
          : `<div class="empty-state">No existen convenios registrados.</div>`
      }
    </div>
  `;
}

function renderQuickPay() {
  const readonly = isReadOnly();
  const disabled = readonly ? "disabled" : "";
  const rows = state.quickPayments.map((payment) => quickPayRow(payment)).join("");

  content().innerHTML = `
    ${readonlyBanner()}
    <div class="grid cols-2">
      <form id="quickPayForm" class="form-section">
        <header>
          <div>
            <h2>Registro de factura</h2>
            <p>Calcula dias transcurridos, cumplimiento y valor a recuperar.</p>
          </div>
        </header>
        <div class="section-body field-grid">
          ${selectField("agreementId", "Convenio", state.agreements[0]?.id || "", state.agreements.map((a) => ({ value: a.id, label: `${a.id} - ${a.laboratory}` })))}
          ${inputField("conditionDays", "Condicion PP dias", "30", "number", 'min="0"')}
          ${inputField("invoiceNumber", "N factura", "", "text")}
          ${inputField("invoiceDate", "Fecha factura", "", "date")}
          ${inputField("subtotal", "Subtotal factura", "", "number", 'step="0.01" min="0"')}
          ${inputField("percent", "% PP", "", "number", 'step="0.0001" min="0"')}
          ${inputField("paymentDate", "Fecha pago", "", "date")}
          ${selectField("status", "Estado", "Pendiente de Pago", CATALOGS.recoveryStatus)}
          <div class="field full">
            <label for="quickObservation">Observacion</label>
            <textarea id="quickObservation" name="observation" ${disabled}></textarea>
          </div>
        </div>
        <div class="section-body form-actions">
          <button type="submit" class="primary-button" ${disabled}>Guardar pronto pago</button>
        </div>
      </form>

      <div class="panel">
        <div class="panel-header">
          <div>
            <h2>Control operativo</h2>
            <p>Indicadores derivados de las facturas registradas.</p>
          </div>
        </div>
        <div class="panel-body summary-strip">
          ${summaryItem("Registros", state.quickPayments.length)}
          ${summaryItem("Pendientes", state.quickPayments.filter((p) => p.status === "Pendiente de Pago").length)}
          ${summaryItem("Valor a recuperar", money(quickPayTotal()))}
          ${summaryItem("Cumplen PP", state.quickPayments.filter((p) => p.complies).length)}
        </div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header">
        <div>
          <h2>Historial de pronto pago</h2>
          <p>Base de estado para seguimiento con Compras y Tesoreria.</p>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Convenio</th>
              <th>Factura</th>
              <th>Subtotal</th>
              <th>Dias</th>
              <th>Cumple</th>
              <th>Valor recuperar</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${rows || emptyRow(8, "Sin facturas registradas.")}</tbody>
        </table>
      </div>
    </div>
  `;

  document.querySelectorAll("#quickPayForm input, #quickPayForm select, #quickPayForm textarea").forEach((field) => {
    if (readonly) field.disabled = true;
  });
}

function renderAccounting() {
  const rows = state.agreements
    .map((agreement) => {
      const summary = trackingSummary(agreement.id);
      const received = accountingReceived(agreement.id);
      const pending = Math.max(summary.expectedRebate - received, 0);
      return `
        <tr>
          <td><strong>${escapeHtml(agreement.id)}</strong></td>
          <td>${escapeHtml(agreement.laboratory)}<br><span class="muted">${escapeHtml(agreement.line)}</span></td>
          <td>${escapeHtml(agreement.periodicity)}</td>
          <td>${money(summary.sellIn)}</td>
          <td>${percent(agreement.rebate)}</td>
          <td>${money(summary.expectedRebate)}</td>
          <td>${money(received)}</td>
          <td>${money(pending)}</td>
          <td>${escapeHtml(agreement.paymentMethod)}</td>
          <td>${recoveryPill(pending)}</td>
          <td class="truncate">${escapeHtml(agreement.observations || agreement.exceptionText || "")}</td>
        </tr>
      `;
    })
    .join("");

  content().innerHTML = `
    <div class="readonly-banner">
      <span>Modulo de consulta para Contabilidad: no modifica el maestro ni el seguimiento registrado por Compras.</span>
    </div>
    <div class="panel">
      <div class="panel-header">
        <div>
          <h2>Notas de credito esperadas</h2>
          <p>Base para revisar devengado, recibido, saldo pendiente y forma de recuperacion.</p>
        </div>
        <button type="button" class="secondary-button" data-action="export-accounting">Exportar CSV</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Laboratorio / linea</th>
              <th>Periodo</th>
              <th>Base calculo</th>
              <th>% Rebate</th>
              <th>Valor esperado</th>
              <th>Valor recibido</th>
              <th>Saldo</th>
              <th>Forma pago</th>
              <th>Estado</th>
              <th>Observacion</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>
  `;
}

function renderAlerts() {
  const readonly = isReadOnly();
  const rows = getAlerts()
    .map(
      (alert) => `
        <tr>
          <td><strong>${escapeHtml(alert.code)}</strong></td>
          <td>${escapeHtml(alert.laboratory)}<br><span class="muted">${escapeHtml(alert.line)}</span></td>
          <td>${alertTypePill(alert.type)}</td>
          <td class="truncate">${escapeHtml(alert.description)}</td>
          <td>${escapeHtml(alert.action)}</td>
          <td>
            <select data-action="change-alert-status" data-key="${escapeAttr(alert.key)}" ${readonly ? "disabled" : ""}>
              ${CATALOGS.alertStatus.map((status) => option(status, status, alert.status)).join("")}
            </select>
          </td>
        </tr>
      `,
    )
    .join("");

  content().innerHTML = `
    ${readonlyBanner()}
    <div class="panel">
      <div class="panel-header">
        <div>
          <h2>Alertas abiertas</h2>
          <p>Se generan por excepciones, observaciones, bajo cumplimiento y vencimientos cercanos.</p>
        </div>
        <span class="pill red">${getAlerts().filter((alert) => alert.status !== "Cerrada").length} activas</span>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Laboratorio / linea</th>
              <th>Tipo alerta</th>
              <th>Descripcion</th>
              <th>Accion requerida</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>${rows || emptyRow(6, "No hay alertas generadas.")}</tbody>
        </table>
      </div>
    </div>
  `;
}

function renderReports() {
  const report = buildReport(state.ui.reportType);

  content().innerHTML = `
    <div class="panel">
      <div class="panel-header">
        <div>
          <h2>Generador de reportes</h2>
          <p>Filtra, consulta en pantalla, exporta CSV o imprime el resultado.</p>
        </div>
        <div class="toolbar">
          <select id="reportType">
            ${[
              ["maestro", "Maestro de acuerdos"],
              ["seguimiento", "Seguimiento mensual"],
              ["contabilidad", "Contabilidad / NC"],
              ["alertas", "Excepciones y alertas"],
              ["prontoPago", "Pronto pago"],
            ]
              .map(([value, label]) => option(value, label, state.ui.reportType))
              .join("")}
          </select>
          <button type="button" class="secondary-button" data-action="export-report">Exportar CSV</button>
          <button type="button" class="primary-button" data-action="print-report">Imprimir</button>
        </div>
      </div>
      <div class="panel-body">
        <div class="summary-strip">
          ${summaryItem("Registros", report.rows.length)}
          ${summaryItem("Valor total", money(report.total || 0))}
          ${summaryItem("Generado", new Date().toLocaleDateString("es-EC"))}
          ${summaryItem("Rol", state.ui.role === "compras" ? "Compras" : "Contabilidad")}
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr>${report.headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr></thead>
          <tbody>
            ${
              report.rows
                .map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(String(cell ?? ""))}</td>`).join("")}</tr>`)
                .join("") || emptyRow(report.headers.length, "Sin registros para este reporte.")
            }
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function getDashboardMetrics() {
  const active = state.agreements.filter((agreement) => agreement.status === "Vigente").length;
  const summaries = state.agreements.map((agreement) => trackingSummary(agreement.id));
  const recoverable = summaries.reduce((sum, item) => sum + item.expectedRebate, 0) + quickPayTotal();
  const avgCompliance = summaries.length
    ? summaries.reduce((sum, item) => sum + item.compliance, 0) / summaries.length
    : 0;
  const risk = summaries.filter((item) => item.compliance < 0.95).length;
  return { active, recoverable, avgCompliance, risk };
}

function filteredAgreements() {
  const query = normalizeText(state.ui.filters.query);
  return state.agreements.filter((agreement) => {
    const text = normalizeText(
      [agreement.id, agreement.laboratory, agreement.line, agreement.negotiationType, agreement.distributors.join(" ")].join(" "),
    );
    const matchesQuery = !query || text.includes(query);
    const matchesLab = state.ui.filters.laboratory === "Todos" || agreement.laboratory === state.ui.filters.laboratory;
    const matchesStatus = state.ui.filters.status === "Todos" || agreement.status === state.ui.filters.status;
    return matchesQuery && matchesLab && matchesStatus;
  });
}

function filtersMarkup() {
  return `
    <div class="toolbar">
      <input id="filterQuery" type="search" placeholder="Buscar acuerdo, laboratorio o linea" value="${escapeAttr(state.ui.filters.query)}">
      <select id="filterLab">
        ${["Todos", ...unique(state.agreements.map((a) => a.laboratory))].map((lab) => option(lab, lab, state.ui.filters.laboratory)).join("")}
      </select>
      <select id="filterStatus">
        ${["Todos", ...CATALOGS.status].map((status) => option(status, status, state.ui.filters.status)).join("")}
      </select>
    </div>
  `;
}

function renderAgreementRow(agreement) {
  const summary = trackingSummary(agreement.id);
  const risk = riskClass(summary.compliance);
  return `
    <tr data-action="edit-agreement" data-id="${escapeAttr(agreement.id)}">
      <td><strong>${escapeHtml(agreement.id)}</strong><br><span class="muted">Version ${agreement.version || 1}</span></td>
      <td class="truncate">${escapeHtml(agreement.laboratory)}<br><span class="muted">${escapeHtml(agreement.line)}</span></td>
      <td>${escapeHtml(agreement.negotiationType)}</td>
      <td>${escapeHtml((agreement.distributors || []).join(", "))}</td>
      <td>
        <div class="progress">
          <div class="bar ${risk}" style="--value:${Math.min(summary.compliance * 100, 100)}%"><span></span></div>
          <small>${percent(summary.compliance)} de ${money(objectiveBase(agreement))}</small>
        </div>
      </td>
      <td>${money(summary.expectedRebate)}</td>
      <td>${agreement.pdf ? `<span class="pill green">Adjunto</span>` : `<span class="pill amber">Pendiente</span>`}</td>
      <td>${statusPill(agreement.status)}</td>
    </tr>
  `;
}

function agreementTable() {
  const rows = filteredAgreements()
    .map(
      (agreement) => `
      <tr>
        <td><strong>${escapeHtml(agreement.id)}</strong></td>
        <td>${escapeHtml(agreement.laboratory)}</td>
        <td class="truncate">${escapeHtml(agreement.line)}</td>
        <td>${escapeHtml(agreement.periodicity)}</td>
        <td>${percent(agreement.rebate)}</td>
        <td>${statusPill(agreement.status)}</td>
        <td><button type="button" class="secondary-button" data-action="edit-agreement" data-id="${escapeAttr(agreement.id)}">Editar</button></td>
      </tr>
    `,
    )
    .join("");

  return `
    <table>
      <thead>
        <tr>
          <th>Codigo</th>
          <th>Laboratorio</th>
          <th>Linea</th>
          <th>Periodicidad</th>
          <th>% Rebate</th>
          <th>Estado</th>
          <th></th>
        </tr>
      </thead>
      <tbody>${rows || emptyRow(7, "Sin convenios.")}</tbody>
    </table>
  `;
}

function getSelectedAgreement() {
  return getAgreement(state.ui.selectedAgreementId);
}

function getAgreement(id) {
  return state.agreements.find((agreement) => agreement.id === id);
}

function makeBlankAgreement() {
  const next = Math.max(0, ...state.agreements.map((agreement) => Number(agreement.number) || 0)) + 1;
  return {
    id: `AC-2026-${String(next).padStart(3, "0")}`,
    number: String(next),
    status: "Vigente",
    laboratory: "",
    line: "",
    distributors: [],
    negotiationType: "Rebate",
    periodicity: "ANUAL",
    collectionType: "ANUAL",
    basis: "NETA",
    manager: "",
    rebate: 0,
    hasScale: "No",
    scale: "",
    objectives: [],
    exceptionText: "",
    observations: "",
    quickPayment: "No",
    quickPaymentPercent: null,
    flags: flagDefaults(),
    paymentMethod: "NOTA DE CREDITO",
    validFrom: "2026-01-01",
    validTo: "2026-12-31",
    description: "",
    version: 1,
    history: [],
    pdf: null,
  };
}

function monthlyRows(agreementId) {
  if (!state.monthly[agreementId]) state.monthly[agreementId] = emptyMonthlyRows();
  return state.monthly[agreementId];
}

function trackingSummary(agreementId) {
  const agreement = getAgreement(agreementId);
  if (!agreement) return emptySummary();
  const rows = monthlyRows(agreementId);
  const sellIn = rows.reduce((sum, row) => sum + numeric(row.sellIn), 0);
  const sellOut = rows.reduce((sum, row) => sum + numeric(row.sellOut), 0);
  const objective = objectiveBase(agreement);
  const compliance = objective > 0 ? sellIn / objective : 0;
  const expectedRebate = sellIn * numeric(agreement.rebate);
  return { sellIn, sellOut, objective, compliance, expectedRebate };
}

function emptySummary() {
  return { sellIn: 0, sellOut: 0, objective: 0, compliance: 0, expectedRebate: 0 };
}

function objectiveBase(agreement) {
  return numeric((agreement.objectives || [])[0]);
}

function monthCard(row, index, agreement, disabled) {
  const monthlyTarget = objectiveBase(agreement) / 12;
  const compliance = monthlyTarget > 0 ? numeric(row.sellIn) / monthlyTarget : 0;
  return `
    <div class="month-card">
      <strong>${row.month}<span>${riskPill(compliance)}</span></strong>
      <div class="mini-grid">
        <div class="field">
          <label for="sellIn-${index}">Compra</label>
          <input id="sellIn-${index}" name="sellIn-${index}" type="number" step="0.01" min="0" value="${escapeAttr(row.sellIn)}" ${disabled}>
        </div>
        <div class="field">
          <label for="sellOut-${index}">Venta</label>
          <input id="sellOut-${index}" name="sellOut-${index}" type="number" step="0.01" min="0" value="${escapeAttr(row.sellOut)}" ${disabled}>
        </div>
      </div>
      <small class="muted">Cumplimiento mes: ${percent(compliance)}</small>
    </div>
  `;
}

function getAlerts() {
  const alerts = [];
  const today = new Date();
  for (const agreement of state.agreements) {
    const summary = trackingSummary(agreement.id);
    if (summary.compliance < 0.95) {
      alerts.push({
        key: `${agreement.id}-risk`,
        code: agreement.id,
        laboratory: agreement.laboratory,
        line: agreement.line,
        type: "Incumplimiento",
        description: `Cumplimiento acumulado ${percent(summary.compliance)} frente a objetivo base ${money(summary.objective)}.`,
        action: "Revisar avance con Compras y validar plan de recuperacion.",
        status: state.alertStatus[`${agreement.id}-risk`] || "Abierta",
      });
    }
    if (agreement.exceptionText) {
      alerts.push({
        key: `${agreement.id}-exception`,
        code: agreement.id,
        laboratory: agreement.laboratory,
        line: agreement.line,
        type: "Excepcion de producto/proveedor",
        description: agreement.exceptionText,
        action: "Validar con Compras / Contabilidad.",
        status: state.alertStatus[`${agreement.id}-exception`] || "Abierta",
      });
    }
    if (agreement.observations) {
      alerts.push({
        key: `${agreement.id}-observation`,
        code: agreement.id,
        laboratory: agreement.laboratory,
        line: agreement.line,
        type: "Observacion especial",
        description: agreement.observations,
        action: "Revisar impacto en calculo y negociacion.",
        status: state.alertStatus[`${agreement.id}-observation`] || "Abierta",
      });
    }
    if (agreement.validTo) {
      const due = new Date(`${agreement.validTo}T00:00:00`);
      const days = Math.ceil((due - today) / 86400000);
      if (days >= 0 && days <= 45) {
        alerts.push({
          key: `${agreement.id}-due`,
          code: agreement.id,
          laboratory: agreement.laboratory,
          line: agreement.line,
          type: "Proximo a vencer",
          description: `Vigencia hasta ${agreement.validTo}. Faltan ${days} dias.`,
          action: "Preparar cierre o renegociacion.",
          status: state.alertStatus[`${agreement.id}-due`] || "Abierta",
        });
      }
    }
  }
  return alerts;
}

function buildReport(type) {
  if (type === "seguimiento") {
    const rows = state.agreements.map((agreement) => {
      const summary = trackingSummary(agreement.id);
      return [
        agreement.id,
        agreement.laboratory,
        agreement.line,
        agreement.periodicity,
        money(summary.objective),
        money(summary.sellIn),
        money(summary.sellOut),
        percent(summary.compliance),
        money(summary.expectedRebate),
      ];
    });
    return {
      headers: ["Codigo", "Laboratorio", "Linea", "Periodicidad", "Objetivo", "Compra", "Venta", "% cumplimiento", "Rebate estimado"],
      rows,
      total: state.agreements.reduce((sum, agreement) => sum + trackingSummary(agreement.id).expectedRebate, 0),
    };
  }

  if (type === "contabilidad") {
    const rows = state.agreements.map((agreement) => {
      const summary = trackingSummary(agreement.id);
      const received = accountingReceived(agreement.id);
      return [
        agreement.id,
        agreement.laboratory,
        agreement.line,
        agreement.paymentMethod,
        money(summary.expectedRebate),
        money(received),
        money(Math.max(summary.expectedRebate - received, 0)),
        recoveryLabel(Math.max(summary.expectedRebate - received, 0)),
      ];
    });
    return {
      headers: ["Codigo", "Laboratorio", "Linea", "Forma pago", "Valor esperado", "Valor recibido", "Saldo", "Estado"],
      rows,
      total: state.agreements.reduce((sum, agreement) => sum + trackingSummary(agreement.id).expectedRebate, 0),
    };
  }

  if (type === "alertas") {
    const alerts = getAlerts();
    return {
      headers: ["Codigo", "Laboratorio", "Linea", "Tipo alerta", "Descripcion", "Accion", "Estado"],
      rows: alerts.map((alert) => [alert.code, alert.laboratory, alert.line, alert.type, alert.description, alert.action, alert.status]),
      total: alerts.length,
    };
  }

  if (type === "prontoPago") {
    return {
      headers: ["Convenio", "Factura", "Fecha factura", "Fecha pago", "Dias", "% PP", "Valor recuperar", "Estado"],
      rows: state.quickPayments.map((payment) => [
        payment.agreementId,
        payment.invoiceNumber,
        payment.invoiceDate,
        payment.paymentDate,
        payment.days,
        percent(payment.percent),
        money(payment.valueRecover),
        payment.status,
      ]),
      total: quickPayTotal(),
    };
  }

  const rows = state.agreements.map((agreement) => [
    agreement.id,
    agreement.status,
    agreement.laboratory,
    agreement.line,
    (agreement.distributors || []).join(", "),
    agreement.negotiationType,
    agreement.periodicity,
    percent(agreement.rebate),
    money(objectiveBase(agreement)),
    agreement.paymentMethod,
    agreement.pdf ? "PDF adjunto" : "Sin PDF",
  ]);
  return {
    headers: [
      "Codigo",
      "Estado",
      "Laboratorio",
      "Linea",
      "Distribuidores",
      "Tipo",
      "Periodicidad",
      "% Rebate",
      "Objetivo base",
      "Forma pago",
      "Evidencia",
    ],
    rows,
    total: rows.length,
  };
}

function saveAgreement(form) {
  const data = new FormData(form);
  const id = text(data.get("id"));
  const previous = getAgreement(id);
  const distributors = text(data.get("distributors"))
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);
  const nextNumber = previous?.number || String(Math.max(0, ...state.agreements.map((a) => Number(a.number) || 0)) + 1);
  const base = previous || makeBlankAgreement();
  const updated = {
    ...base,
    id,
    number: nextNumber,
    status: text(data.get("status")),
    laboratory: text(data.get("laboratory")),
    line: text(data.get("line")),
    distributors,
    negotiationType: text(data.get("negotiationType")),
    periodicity: text(data.get("periodicity")),
    collectionType: text(data.get("collectionType")),
    basis: text(data.get("basis")),
    manager: text(data.get("manager")),
    rebate: numeric(data.get("rebatePercent")) / 100,
    hasScale: text(data.get("hasScale")),
    scale: text(data.get("scale")),
    objectives: parseNumberList(text(data.get("objectives"))),
    exceptionText: text(data.get("exceptionText")),
    observations: text(data.get("observations")),
    quickPayment: text(data.get("quickPayment")),
    quickPaymentPercent: data.get("quickPaymentPercent") === "" ? null : numeric(data.get("quickPaymentPercent")) / 100,
    flags: {
      pmc: text(data.get("flag_pmc")),
      promotions: text(data.get("flag_promotions")),
      purchaseReturns: text(data.get("flag_purchaseReturns")),
      expiryReturns: text(data.get("flag_expiryReturns")),
      ru: text(data.get("flag_ru")),
      season: text(data.get("flag_season")),
      infoSale: text(data.get("flag_infoSale")),
    },
    paymentMethod: text(data.get("paymentMethod")),
    validFrom: text(data.get("validFrom")),
    validTo: text(data.get("validTo")),
    description: text(data.get("description")),
  };

  if (previous) {
    const commercialFieldsChanged =
      previous.rebate !== updated.rebate ||
      previous.periodicity !== updated.periodicity ||
      objectiveBase(previous) !== objectiveBase(updated);
    updated.version = commercialFieldsChanged ? (previous.version || 1) + 1 : previous.version || 1;
    updated.history = [
      ...(previous.history || []),
      ...(commercialFieldsChanged
        ? [
            {
              date: new Date().toISOString(),
              reason: "Cambio de condiciones comerciales desde formulario web.",
              previousRebate: previous.rebate,
              nextRebate: updated.rebate,
            },
          ]
        : []),
    ];
    state.agreements = state.agreements.map((agreement) => (agreement.id === id ? updated : agreement));
  } else {
    state.agreements.push(updated);
    state.monthly[id] = emptyMonthlyRows();
  }

  state.ui.selectedAgreementId = id;
  state.ui.selectedTrackingId = id;
  saveState();
  toast(previous ? "Convenio actualizado." : "Convenio creado.");
  render();
}

function saveTracking(form) {
  const id = state.ui.selectedTrackingId;
  state.monthly[id] = MONTHS.map((month, index) => ({
    month,
    sellIn: numeric(form.elements[`sellIn-${index}`]?.value),
    sellOut: numeric(form.elements[`sellOut-${index}`]?.value),
  }));
  saveState();
  toast("Seguimiento mensual guardado.");
  render();
}

function saveQuickPay(form) {
  const data = new FormData(form);
  const invoiceDate = text(data.get("invoiceDate"));
  const paymentDate = text(data.get("paymentDate"));
  const subtotal = numeric(data.get("subtotal"));
  const percentDecimal = numeric(data.get("percent")) / 100;
  const days = daysBetween(invoiceDate, paymentDate);
  const conditionDays = numeric(data.get("conditionDays"));
  const complies = days >= 0 && days <= conditionDays;
  const valueRecover = complies ? subtotal * percentDecimal : 0;

  state.quickPayments.push({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    agreementId: text(data.get("agreementId")),
    conditionDays,
    invoiceNumber: text(data.get("invoiceNumber")),
    invoiceDate,
    subtotal,
    percent: percentDecimal,
    paymentDate,
    days,
    complies,
    valueRecover,
    status: text(data.get("status")),
    observation: text(data.get("observation")),
  });
  form.reset();
  saveState();
  toast("Pronto pago registrado.");
  render();
}

function quickPayRow(payment) {
  const readonly = isReadOnly();
  return `
    <tr>
      <td><strong>${escapeHtml(payment.agreementId)}</strong></td>
      <td>${escapeHtml(payment.invoiceNumber)}</td>
      <td>${money(payment.subtotal)}</td>
      <td>${payment.days}</td>
      <td>${payment.complies ? `<span class="pill green">Si</span>` : `<span class="pill red">No</span>`}</td>
      <td>${money(payment.valueRecover)}</td>
      <td>${escapeHtml(payment.status)}</td>
      <td><button type="button" class="danger-button" data-action="delete-payment" data-id="${escapeAttr(payment.id)}" ${readonly ? "disabled" : ""}>Quitar</button></td>
    </tr>
  `;
}

function quickPayTotal() {
  return state.quickPayments.reduce((sum, payment) => sum + numeric(payment.valueRecover), 0);
}

function accountingReceived(agreementId) {
  return state.quickPayments
    .filter((payment) => payment.agreementId === agreementId && payment.status === "Pagado")
    .reduce((sum, payment) => sum + numeric(payment.valueRecover), 0);
}

async function handlePdfUpload(input) {
  const agreement = getSelectedAgreement();
  if (!agreement) {
    toast("Guarda primero el convenio antes de adjuntar PDF.");
    input.value = "";
    return;
  }

  const file = input.files?.[0];
  if (!file) return;
  if (file.type !== "application/pdf") {
    toast("Solo se aceptan archivos PDF.");
    input.value = "";
    return;
  }

  await putPdf(agreement.id, file);
  agreement.pdf = {
    name: file.name,
    size: file.size,
    type: file.type,
    updatedAt: new Date().toISOString(),
  };
  saveState();
  toast("PDF adjuntado al convenio.");
  render();
}

function openPdf(id) {
  getPdf(id).then((record) => {
    if (!record) {
      toast("No hay PDF guardado para este convenio.");
      return;
    }
    const url = URL.createObjectURL(record.blob);
    window.open(url, "_blank", "noopener");
  });
}

async function removePdf(id) {
  await deletePdf(id);
  const agreement = getAgreement(id);
  if (agreement) agreement.pdf = null;
  saveState();
  toast("PDF retirado del convenio.");
  render();
}

function openPdfDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(PDF_DB, 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore(PDF_STORE, { keyPath: "id" });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function putPdf(id, file) {
  const db = await openPdfDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(PDF_STORE, "readwrite");
    tx.objectStore(PDF_STORE).put({
      id,
      blob: file,
      name: file.name,
      type: file.type,
      size: file.size,
      updatedAt: new Date().toISOString(),
    });
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function getPdf(id) {
  const db = await openPdfDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(PDF_STORE, "readonly");
    const request = tx.objectStore(PDF_STORE).get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function deletePdf(id) {
  const db = await openPdfDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(PDF_STORE, "readwrite");
    tx.objectStore(PDF_STORE).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

function downloadReport() {
  const report = buildReport(state.ui.reportType);
  const csv = [report.headers, ...report.rows].map((row) => row.map(csvCell).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `reporte-${state.ui.reportType}-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function csvCell(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function exportAccounting() {
  const previous = state.ui.reportType;
  state.ui.reportType = "contabilidad";
  downloadReport();
  state.ui.reportType = previous;
}

function addDistributor() {
  const form = document.querySelector("#agreementForm");
  const input = document.querySelector("#distributorInput");
  const hidden = form?.elements.distributors;
  if (!form || !input || !hidden || !input.value.trim()) return;
  const list = hidden.value ? hidden.value.split("|").filter(Boolean) : [];
  list.push(input.value.trim());
  hidden.value = unique(list).join("|");
  input.value = "";
  document.querySelector("#distributorTags").innerHTML = distributorTags(unique(list), false);
}

function removeDistributor(value) {
  const form = document.querySelector("#agreementForm");
  const hidden = form?.elements.distributors;
  if (!hidden) return;
  const list = hidden.value.split("|").filter(Boolean).filter((item) => item !== value);
  hidden.value = list.join("|");
  document.querySelector("#distributorTags").innerHTML = distributorTags(list, false);
}

function resetDemo() {
  state = makeInitialState();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  toast("Datos restaurados desde la matriz base.");
  render();
}

function setView(view) {
  state.ui.view = view;
  saveState();
  render();
}

function setRole(role) {
  state.ui.role = role;
  saveState();
  render();
}

function isReadOnly() {
  return state.ui.role === "contabilidad";
}

function content() {
  return document.querySelector("#content");
}

function metricCard(label, value, helper, tone) {
  return `
    <article class="metric ${tone}">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(String(value))}</strong>
      <small>${escapeHtml(helper)}</small>
    </article>
  `;
}

function summaryItem(label, value) {
  return `
    <div class="summary-item">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(String(value))}</strong>
    </div>
  `;
}

function readonlyBanner() {
  if (!isReadOnly()) return "";
  return `
    <div class="readonly-banner">
      <span>Modo Contabilidad activo: puedes consultar informacion y generar reportes, pero no guardar cambios.</span>
    </div>
  `;
}

function inputField(name, label, value, type = "text", attrs = "") {
  const disabled = isReadOnly() ? "disabled" : "";
  return `
    <div class="field">
      <label for="${escapeAttr(name)}">${escapeHtml(label)}</label>
      <input id="${escapeAttr(name)}" name="${escapeAttr(name)}" type="${escapeAttr(type)}" value="${escapeAttr(value ?? "")}" ${attrs} ${disabled}>
    </div>
  `;
}

function selectField(name, label, value, options) {
  const disabled = isReadOnly() ? "disabled" : "";
  const normalized = options.map((item) => (typeof item === "string" ? { value: item, label: item } : item));
  if (value && !normalized.some((item) => item.value === value)) normalized.unshift({ value, label: value });
  return `
    <div class="field">
      <label for="${escapeAttr(name)}">${escapeHtml(label)}</label>
      <select id="${escapeAttr(name)}" name="${escapeAttr(name)}" ${disabled}>
        ${normalized.map((item) => option(item.value, item.label, value)).join("")}
      </select>
    </div>
  `;
}

function option(value, label, selected) {
  return `<option value="${escapeAttr(value)}" ${value === selected ? "selected" : ""}>${escapeHtml(label)}</option>`;
}

function distributorTags(distributors, readonly) {
  if (!distributors.length) return `<span class="pill amber">Sin distribuidores definidos</span>`;
  return distributors
    .map(
      (item) => `
        <span class="tag">
          ${escapeHtml(item)}
          ${readonly ? "" : `<button type="button" data-action="remove-distributor" data-value="${escapeAttr(item)}" aria-label="Quitar ${escapeAttr(item)}">x</button>`}
        </span>
      `,
    )
    .join("");
}

function statusPill(status) {
  const tone = status === "Vigente" ? "green" : status === "Renegociacion" ? "amber" : "red";
  return `<span class="pill ${tone}">${escapeHtml(status)}</span>`;
}

function riskPill(value) {
  const cls = riskClass(value);
  const text = value >= 0.95 ? "OK" : value >= 0.7 ? "Obs." : "Peligro";
  return `<span class="pill ${cls === "green" ? "green" : cls === "amber" ? "amber" : "red"}">${text}</span>`;
}

function riskClass(value) {
  if (value >= 0.95) return "green";
  if (value >= 0.7) return "amber";
  return "red";
}

function recoveryPill(pending) {
  return `<span class="pill ${pending <= 0 ? "green" : "amber"}">${recoveryLabel(pending)}</span>`;
}

function recoveryLabel(pending) {
  return pending <= 0 ? "Pagado" : "Pendiente de Pago";
}

function alertTypePill(type) {
  const cls = type === "Incumplimiento" ? "red" : type === "Proximo a vencer" ? "amber" : "violet";
  return `<span class="pill ${cls}">${escapeHtml(type)}</span>`;
}

function emptyRow(columns, message) {
  return `<tr><td colspan="${columns}"><div class="empty-state">${escapeHtml(message)}</div></td></tr>`;
}

function parseNumberList(value) {
  return value
    .split(/[,;\n]/)
    .map((part) => numeric(part.trim()))
    .filter((number) => number > 0);
}

function numeric(value) {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  if (value == null || value === "") return 0;
  const normalized = String(value).replace(/\s/g, "").replace(",", ".");
  const result = Number(normalized);
  return Number.isFinite(result) ? result : 0;
}

function text(value) {
  return String(value ?? "").trim();
}

function money(value) {
  return new Intl.NumberFormat("es-EC", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(numeric(value));
}

function percent(value) {
  return new Intl.NumberFormat("es-EC", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(numeric(value));
}

function toInputPercent(value) {
  if (value == null || value === "") return "";
  return String(Math.round(numeric(value) * 1000000) / 10000);
}

function daysBetween(start, end) {
  if (!start || !end) return -1;
  const a = new Date(`${start}T00:00:00`);
  const b = new Date(`${end}T00:00:00`);
  return Math.round((b - a) / 86400000);
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}

function toast(message) {
  const node = document.querySelector("#toast");
  node.textContent = message;
  node.classList.add("is-visible");
  window.clearTimeout(toast.timer);
  toast.timer = window.setTimeout(() => node.classList.remove("is-visible"), 2600);
}

function iconSvg(name) {
  const paths = {
    dashboard: '<path d="M4 13h6V4H4v9Zm10 7h6V4h-6v16ZM4 20h6v-3H4v3Z"/>',
    file: '<path d="M7 3h7l5 5v13H7V3Z"/><path d="M14 3v6h5"/><path d="M9 14h8M9 18h5"/>',
    trend: '<path d="M4 17 10 11l4 4 6-8"/><path d="M15 7h5v5"/>',
    clock: '<path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"/><path d="M12 7v6l4 2"/>',
    ledger: '<path d="M6 3h12v18H6z"/><path d="M9 7h6M9 11h6M9 15h3"/>',
    alert: '<path d="M12 3 2.5 20h19L12 3Z"/><path d="M12 9v5M12 17h.01"/>',
    report: '<path d="M4 19V5"/><path d="M8 19V9"/><path d="M12 19V7"/><path d="M16 19v-5"/><path d="M20 19V3"/><path d="M3 21h18"/>',
  };
  return `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">${paths[name] || ""}</svg>`;
}

document.addEventListener("click", (event) => {
  const navButton = event.target.closest("[data-view]");
  if (navButton) {
    setView(navButton.dataset.view);
    return;
  }

  const roleButton = event.target.closest("[data-role]");
  if (roleButton) {
    setRole(roleButton.dataset.role);
    return;
  }

  const actionTarget = event.target.closest("[data-action]");
  if (!actionTarget) return;
  const action = actionTarget.dataset.action;

  if (action === "reset-demo") resetDemo();
  if (action === "go-dashboard") setView("dashboard");
  if (action === "new-agreement") {
    state.ui.selectedAgreementId = "";
    renderAgreements();
  }
  if (action === "edit-agreement") {
    state.ui.selectedAgreementId = actionTarget.dataset.id;
    state.ui.view = "agreements";
    saveState();
    render();
  }
  if (action === "add-distributor") addDistributor();
  if (action === "remove-distributor") removeDistributor(actionTarget.dataset.value);
  if (action === "view-pdf") openPdf(actionTarget.dataset.id);
  if (action === "remove-pdf") removePdf(actionTarget.dataset.id);
  if (action === "delete-payment") {
    state.quickPayments = state.quickPayments.filter((payment) => payment.id !== actionTarget.dataset.id);
    saveState();
    toast("Registro retirado.");
    render();
  }
  if (action === "export-report") downloadReport();
  if (action === "print-report") window.print();
  if (action === "export-accounting") exportAccounting();
});

document.addEventListener("submit", (event) => {
  if (event.target.id === "agreementForm") {
    event.preventDefault();
    if (isReadOnly()) return;
    saveAgreement(event.target);
  }
  if (event.target.id === "trackingForm") {
    event.preventDefault();
    if (isReadOnly()) return;
    saveTracking(event.target);
  }
  if (event.target.id === "quickPayForm") {
    event.preventDefault();
    if (isReadOnly()) return;
    saveQuickPay(event.target);
  }
});

document.addEventListener("change", (event) => {
  if (event.target.id === "trackingAgreement") {
    state.ui.selectedTrackingId = event.target.value;
    saveState();
    renderTracking();
  }
  if (event.target.id === "reportType") {
    state.ui.reportType = event.target.value;
    saveState();
    renderReports();
  }
  if (event.target.id === "filterLab") {
    state.ui.filters.laboratory = event.target.value;
    saveState();
    renderDashboard();
  }
  if (event.target.id === "filterStatus") {
    state.ui.filters.status = event.target.value;
    saveState();
    renderDashboard();
  }
  if (event.target.id === "pdfFile") {
    handlePdfUpload(event.target);
  }
  if (event.target.dataset.action === "change-alert-status") {
    state.alertStatus[event.target.dataset.key] = event.target.value;
    saveState();
    renderAlerts();
  }
});

document.addEventListener("input", (event) => {
  if (event.target.id === "filterQuery") {
    state.ui.filters.query = event.target.value;
    saveState();
    renderDashboard();
  }
});

render();
