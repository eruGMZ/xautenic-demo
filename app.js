const routes = {
  dashboard: renderDashboard,
  eventos: renderEventos,
  control: renderControlInterno,
  integracion: renderIntegracion,
  finanzas: renderFinanzas
};

const mockData = {
  metrics: [
    { label: 'Eventos esta semana', value: '9', foot: '+2 vs semana anterior' },
    { label: 'Ocupacion hotel', value: '78%', foot: 'Meta: 80%' },
    { label: 'Tareas pendientes', value: '23', foot: '7 criticas' },
    { label: 'Ingreso proyectado', value: '$436,800', foot: 'Eventos + hospedaje' }
  ],
  eventos: [
    { nombre: 'Boda Hernandez', cliente: 'Familia Hernandez', salon: 'Salon Cumbre', fecha: '17 mayo', estado: 'Confirmado', habitaciones: 24, personal: 13 },
    { nombre: 'Congreso Cafetalero', cliente: 'Camara Regional', salon: 'Salon Niebla', fecha: '21 mayo', estado: 'Logistica', habitaciones: 12, personal: 8 },
    { nombre: 'Retiro Empresarial', cliente: 'Nativa Tech', salon: 'Terraza Xico', fecha: '28 mayo', estado: 'Cotizacion', habitaciones: 18, personal: 6 }
  ],
  tareas: [
    { tarea: 'Montaje audiovisual - Salon Cumbre', responsable: 'Luis M.', estado: 'En curso', prioridad: 'warn' },
    { tarea: 'Revision de habitaciones bloqueadas', responsable: 'Recepcion', estado: 'Pendiente', prioridad: 'danger' },
    { tarea: 'Checklist de banquete 17 mayo', responsable: 'Chef Ana', estado: 'Completado', prioridad: 'ok' }
  ],
  incidencias: [
    { item: 'Aire acondicionado Salon Niebla', seguimiento: 'Mantenimiento asignado 14:30', nivel: 'warn' },
    { item: 'Cambio de montaje por clima', seguimiento: 'Reubicado a interior', nivel: 'info' },
    { item: 'Ajuste de personal nocturno', seguimiento: 'Aprobacion pendiente', nivel: 'danger' }
  ],
  finanzas: {
    eventos: 285000,
    habitaciones: 151800,
    gastos: 96400
  },
  eventoDetalle: {
    'Boda Hernandez': {
      timeline: [
        '08:00 - Montaje de salon (equipo A&B)',
        '10:00 - Prueba de audio y video',
        '13:00 - Llegada de florista',
        '15:00 - Check-in bloque habitaciones VIP',
        '17:00 - Ceremonia - Salon Cumbre',
        '20:00 - Cena y recepcion'
      ],
      checklist: [
        { item: 'Montaje de salon', done: true },
        { item: 'Prueba de audio', done: false },
        { item: 'Habitaciones VIP asignadas', done: true },
        { item: 'Menu confirmado con chef', done: false },
        { item: 'Personal nocturno aprobado', done: false },
        { item: 'Coordinacion con florista', done: true }
      ],
      financiero: { salon: 85000, hospedaje: 72000, banquete: 62000, extras: 18000 }
    },
    'Congreso Cafetalero': {
      timeline: [
        '07:30 - Preparacion audiovisual',
        '09:00 - Registro de asistentes',
        '09:30 - Sesion inaugural',
        '13:00 - Comida ejecutiva',
        '15:00 - Mesas de trabajo',
        '18:00 - Cierre y networking'
      ],
      checklist: [
        { item: 'Audiovisual listo', done: false },
        { item: 'Credenciales impresas', done: true },
        { item: 'Catering confirmado', done: true },
        { item: 'Habitaciones bloqueadas', done: true },
        { item: 'Transporte coordinado', done: false }
      ],
      financiero: { salon: 45000, hospedaje: 36000, banquete: 28000, extras: 9000 }
    },
    'Retiro Empresarial': {
      timeline: [
        '10:00 - Bienvenida y registro',
        '10:30 - Sesion de estrategia',
        '13:30 - Almuerzo en Terraza Xico',
        '15:00 - Actividades team building',
        '18:00 - Cocktail de cierre'
      ],
      checklist: [
        { item: 'Propuesta de actividades aprobada', done: false },
        { item: 'Menu y catering cotizado', done: false },
        { item: 'Transporte contratado', done: false },
        { item: 'Habitaciones cotizadas', done: true }
      ],
      financiero: { salon: 38000, hospedaje: 54000, banquete: 22000, extras: 12000 }
    }
  }
};

function getCurrentRoute() {
  const hash = window.location.hash || '#/dashboard';
  return hash.replace('#/', '');
}

function updateActiveNav(route) {
  document.querySelectorAll('#main-nav a').forEach((link) => {
    link.classList.toggle('active', link.dataset.route === route);
  });
}

function setTitle(route) {
  const titleMap = {
    dashboard: 'Dashboard operativo',
    eventos: 'Gestion de eventos',
    control: 'Control interno',
    integracion: 'Integracion conceptual con Zavia',
    finanzas: 'Vista financiera basica'
  };

  document.getElementById('view-title').textContent = titleMap[route] || 'Dashboard operativo';
}

function renderMetrics(container, metrics) {
  const template = document.getElementById('metric-card-template');
  const row = document.createElement('div');
  row.className = 'grid-4';

  metrics.forEach((metric, index) => {
    const node = template.content.cloneNode(true);
    node.querySelector('.metric-label').textContent = metric.label;
    node.querySelector('.metric-value').textContent = metric.value;
    node.querySelector('.metric-foot').textContent = metric.foot;
    node.querySelector('.metric-card').style.animationDelay = `${index * 80}ms`;
    row.appendChild(node);
  });

  container.appendChild(row);
}

function badgeClassByText(text) {
  if (/confirmado|completado/i.test(text)) {
    return 'ok';
  }
  if (/pendiente|critico/i.test(text)) {
    return 'danger';
  }
  if (/curso|logistica/i.test(text)) {
    return 'warn';
  }
  return 'info';
}

function renderDashboard() {
  const wrap = document.createElement('div');
  renderMetrics(wrap, mockData.metrics);

  wrap.insertAdjacentHTML(
    'beforeend',
    `
      <div class="grid-2" style="margin-top: 12px;">
        <article class="panel reveal" style="animation-delay: 120ms;">
          <h3>Proximos eventos</h3>
          <ul class="list">
            ${mockData.eventos
              .map(
                (event) => `
                <li>
                  <div>
                    <strong>${event.nombre}</strong><br />
                    <small>${event.fecha} · ${event.salon}</small>
                  </div>
                  <span class="badge ${badgeClassByText(event.estado)}">${event.estado}</span>
                </li>`
              )
              .join('')}
          </ul>
        </article>

        <article class="panel reveal" style="animation-delay: 220ms;">
          <h3>Actividad reciente</h3>
          <ul class="timeline">
            <li>08:10 - Se confirmo bloqueo de 24 habitaciones para Boda Hernandez.</li>
            <li>09:25 - Mantenimiento atiende incidencia en Salon Niebla.</li>
            <li>10:00 - Finanzas actualiza costo estimado de banquete premium.</li>
            <li>10:40 - Gerencia valida plantilla de personal para fin de semana.</li>
          </ul>
        </article>
      </div>

      <div class="grid-2" style="margin-top: 12px;">
        <article class="panel reveal" style="animation-delay: 280ms;">
          <h3>Alertas operativas</h3>
          <ul class="list">
            <li><span>7 tareas criticas sin cerrar</span><span class="badge danger">Alto</span></li>
            <li><span>2 cambios de logistica por clima</span><span class="badge warn">Medio</span></li>
            <li><span>Ocupacion bajo meta semanal</span><span class="badge info">Seguimiento</span></li>
          </ul>
        </article>

        <article class="panel reveal" style="animation-delay: 340ms;">
          <h3>Resumen financiero rapido</h3>
          <div class="kpi-total">
            <div>
              <small>Margen operativo estimado</small>
              <p style="margin: 4px 0 0; font-size: 1.4rem; font-family: 'Space Grotesk', sans-serif;">$340,400</p>
            </div>
            <span class="badge ok">+11% mensual</span>
          </div>
        </article>
      </div>
    `
  );

  return wrap;
}

function renderEventos() {
  const wrap = document.createElement('div');

  const filterBar = document.createElement('div');
  filterBar.className = 'filter-bar';
  [['Todos', 'todos'], ['Confirmado', 'confirmado'], ['Logistica', 'logistica'], ['Cotizacion', 'cotizacion']].forEach(([label, val], i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'filter-btn' + (i === 0 ? ' active' : '');
    btn.textContent = label;
    btn.dataset.filter = val;
    filterBar.appendChild(btn);
  });
  wrap.appendChild(filterBar);

  const mainPanel = document.createElement('article');
  mainPanel.className = 'panel reveal';
  const h3 = document.createElement('h3');
  h3.textContent = 'Agenda y operacion de eventos';
  mainPanel.appendChild(h3);

  const eventList = document.createElement('ul');
  eventList.className = 'list';
  mockData.eventos.forEach((event) => {
    const li = document.createElement('li');
    li.dataset.estado = event.estado.toLowerCase();
    li.innerHTML = `
      <div>
        <strong>${event.nombre}</strong><br />
        <small>${event.cliente} · ${event.fecha} · ${event.salon}</small><br />
        <small>Habitaciones: ${event.habitaciones} · Personal: ${event.personal}</small>
      </div>
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
        <span class="badge ${badgeClassByText(event.estado)}">${event.estado}</span>
        <button class="action-btn btn-ver-operacion" type="button" data-evento="${event.nombre}">Ver operacion</button>
      </div>
    `;
    eventList.appendChild(li);
  });
  mainPanel.appendChild(eventList);
  wrap.appendChild(mainPanel);

  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    filterBar.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    eventList.querySelectorAll('li').forEach((li) => {
      li.style.display = filter === 'todos' || li.dataset.estado.startsWith(filter) ? '' : 'none';
    });
  });

  eventList.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-ver-operacion');
    if (btn) openEventoModal(btn.dataset.evento);
  });

  wrap.insertAdjacentHTML(
    'beforeend',
    `
      <div class="grid-2" style="margin-top: 12px;">
        <article class="panel reveal" style="animation-delay: 100ms;">
          <h3>Checklist operativo - Boda Hernandez</h3>
          <ul class="list">
            <li><span>Montaje de salon</span><span class="badge ok">Listo</span></li>
            <li><span>Prueba de audio</span><span class="badge warn">En curso</span></li>
            <li><span>Asignacion de habitaciones VIP</span><span class="badge ok">Listo</span></li>
            <li><span>Confirmacion de menu final</span><span class="badge danger">Pendiente</span></li>
          </ul>
        </article>

        <article class="panel reveal" style="animation-delay: 180ms;">
          <h3>Vista tipo calendario (semanal)</h3>
          <ul class="timeline">
            <li>Mar 14: Congreso Cafetalero - Logistica</li>
            <li>Jue 16: Boda Hernandez - Montaje final</li>
            <li>Sab 18: Boda Hernandez - Evento principal</li>
            <li>Mie 22: Retiro Empresarial - Definicion de paquete</li>
          </ul>
        </article>
      </div>
    `
  );

  return wrap;
}

function renderControlInterno() {
  const wrap = document.createElement('div');

  wrap.insertAdjacentHTML(
    'beforeend',
    `
      <div class="grid-2">
        <article class="panel reveal">
          <h3>Tareas y responsables</h3>
          <ul class="list">
            ${mockData.tareas
              .map(
                (task) => `
                <li>
                  <div>
                    <strong>${task.tarea}</strong><br />
                    <small>Responsable: ${task.responsable}</small>
                  </div>
                  <span class="badge ${task.prioridad}">${task.estado}</span>
                </li>`
              )
              .join('')}
          </ul>
        </article>

        <article class="panel reveal" style="animation-delay: 140ms;">
          <h3>Incidencias y seguimiento</h3>
          <ul class="list">
            ${mockData.incidencias
              .map(
                (issue) => `
                <li>
                  <div>
                    <strong>${issue.item}</strong><br />
                    <small>${issue.seguimiento}</small>
                  </div>
                  <span class="badge ${issue.nivel}">Seguimiento</span>
                </li>`
              )
              .join('')}
          </ul>
        </article>
      </div>

      <article class="panel reveal" style="margin-top: 12px; animation-delay: 220ms;">
        <h3>Supervision operativa centralizada</h3>
        <ul class="timeline">
          <li>Jefatura visualiza tareas por area y nivel de riesgo en una sola vista.</li>
          <li>Recepcion y eventos comparten estatus de habitaciones vinculadas a cada evento.</li>
          <li>Mantenimiento y A&B notifican incidencias sin salir del flujo operativo.</li>
          <li>Gerencia detecta cuellos de botella antes de afectar al cliente final.</li>
        </ul>
      </article>
    `
  );

  return wrap;
}

function renderIntegracion() {
  const wrap = document.createElement('div');

  wrap.insertAdjacentHTML(
    'beforeend',
    `
      <article class="panel reveal">
        <h3>Flujo conceptual con Zavia (sin API real)</h3>
        <div class="flow" style="margin-top: 12px;">
          <div class="flow-step">
            <p><strong>1. Reserva en Zavia</strong></p>
            <small>Origen PMS / BE / OTA</small>
          </div>
          <div class="flow-step">
            <p><strong>2. Evento relacionado</strong></p>
            <small>Se vincula cliente y fechas</small>
          </div>
          <div class="flow-step">
            <p><strong>3. Asignacion de salon</strong></p>
            <small>Capacidad y logistica</small>
          </div>
          <div class="flow-step">
            <p><strong>4. Personal y tareas</strong></p>
            <small>Checklist + responsables</small>
          </div>
          <div class="flow-step">
            <p><strong>5. Impacto financiero</strong></p>
            <small>Ingreso y costo operativo</small>
          </div>
        </div>
      </article>

      <div class="grid-2" style="margin-top: 12px;">
        <article class="panel reveal" style="animation-delay: 120ms;">
          <h3>Que resuelve esta capa</h3>
          <ul class="list">
            <li><span>No reemplaza sistemas actuales</span><span class="badge info">Estrategico</span></li>
            <li><span>Centraliza operacion de eventos</span><span class="badge ok">Valor</span></li>
            <li><span>Conecta hotel + salon + personal</span><span class="badge ok">Integracion</span></li>
            <li><span>Da trazabilidad para decisiones</span><span class="badge warn">Gerencial</span></li>
          </ul>
        </article>

        <article class="panel reveal" style="animation-delay: 200ms;">
          <h3>Lectura para reunion Discovery</h3>
          <ul class="timeline">
            <li>La demo representa una extension operativa, no un ERP nuevo.</li>
            <li>Permite mostrar friccion real entre eventos y hoteleria.</li>
            <li>Muestra como escalar por modulos sin sobreingenieria.</li>
            <li>El enfoque es visualizar impacto operativo y financiero.</li>
          </ul>
        </article>
      </div>
    `
  );

  return wrap;
}

function money(value) {
  return value.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });
}

function renderFinanzas() {
  const wrap = document.createElement('div');
  const total = mockData.finanzas.eventos + mockData.finanzas.habitaciones - mockData.finanzas.gastos;

  wrap.insertAdjacentHTML(
    'beforeend',
    `
      <div class="grid-3">
        <article class="metric-card reveal">
          <p class="metric-label">Ingresos por eventos</p>
          <p class="metric-value">${money(mockData.finanzas.eventos)}</p>
          <p class="metric-foot">Salones + paquetes</p>
        </article>

        <article class="metric-card reveal" style="animation-delay: 100ms;">
          <p class="metric-label">Habitaciones relacionadas</p>
          <p class="metric-value">${money(mockData.finanzas.habitaciones)}</p>
          <p class="metric-foot">Bloques y upgrades</p>
        </article>

        <article class="metric-card reveal" style="animation-delay: 180ms;">
          <p class="metric-label">Gasto operativo</p>
          <p class="metric-value">${money(mockData.finanzas.gastos)}</p>
          <p class="metric-foot">Personal + insumos</p>
        </article>
      </div>

      <article class="panel reveal" style="margin-top: 12px; animation-delay: 240ms;">
        <h3>Resumen general</h3>
        <div class="kpi-total">
          <div>
            <small>Resultado operativo estimado</small>
            <p style="margin: 4px 0 0; font-size: 1.5rem; font-family: 'Space Grotesk', sans-serif;">${money(total)}</p>
          </div>
          <span class="badge ok">Escenario base</span>
        </div>
        <ul class="timeline" style="margin-top: 12px;">
          <li>Los eventos incrementan ocupacion en fechas valle.</li>
          <li>El control interno reduce costos por incidencias tardias.</li>
          <li>La trazabilidad mejora la planeacion de personal.</li>
        </ul>
      </article>
    `
  );

  return wrap;
}

function renderRoute() {
  const route = getCurrentRoute();
  const renderer = routes[route] || routes.dashboard;
  const mount = document.getElementById('app-view');

  setTitle(route);
  updateActiveNav(route);
  mount.innerHTML = '';
  mount.appendChild(renderer());
}

function updateClock() {
  const btn = document.getElementById('today-btn');
  if (!btn) return;
  const now = new Date();
  const time = now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
  const date = now.toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });
  btn.textContent = date + '  ·  ' + time;
}

function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
}

function openEventoModal(nombre) {
  const evento = mockData.eventos.find((e) => e.nombre === nombre);
  const detalle = mockData.eventoDetalle[nombre];
  if (!evento || !detalle) return;

  const done = detalle.checklist.filter((c) => c.done).length;
  const total = detalle.checklist.length;
  const pct = Math.round((done / total) * 100);
  const totalFin = Object.values(detalle.financiero).reduce((a, b) => a + b, 0);
  const checkBadgeClass = pct === 100 ? 'ok' : pct >= 50 ? 'warn' : 'danger';

  const timelineItems = detalle.timeline.map((t) => `<li>${t}</li>`).join('');
  const checklistItems = detalle.checklist
    .map((c) => `<li><span>${c.item}</span><span class="badge ${c.done ? 'ok' : 'danger'}">${c.done ? 'Listo' : 'Pendiente'}</span></li>`)
    .join('');

  document.getElementById('modal-content').innerHTML = `
    <div class="modal-header">
      <div>
        <span class="modal-kicker">Operacion del evento</span>
        <h3>${evento.nombre}</h3>
        <p>${evento.cliente} &middot; ${evento.salon} &middot; ${evento.fecha}</p>
      </div>
      <span class="badge ${badgeClassByText(evento.estado)} badge-lg">${evento.estado}</span>
    </div>
    <div class="modal-grid">
      <div class="modal-section">
        <h4>Timeline del dia</h4>
        <ul class="timeline">${timelineItems}</ul>
      </div>
      <div class="modal-section">
        <h4>Checklist operativo <span class="badge ${checkBadgeClass}">${done}/${total} listos</span></h4>
        <div class="progress-wrap"><div class="progress-bar" style="width:${pct}%"></div></div>
        <ul class="list" style="margin-top:10px;">${checklistItems}</ul>
      </div>
    </div>
    <div class="modal-section" style="margin-top:16px;">
      <h4>Impacto financiero estimado</h4>
      <div class="grid-4" style="margin-top:8px;">
        <article class="metric-card">
          <p class="metric-label">Salon</p>
          <p class="metric-value">${money(detalle.financiero.salon)}</p>
          <p class="metric-foot">Renta de espacio</p>
        </article>
        <article class="metric-card">
          <p class="metric-label">Hospedaje</p>
          <p class="metric-value">${money(detalle.financiero.hospedaje)}</p>
          <p class="metric-foot">${evento.habitaciones} habitaciones</p>
        </article>
        <article class="metric-card">
          <p class="metric-label">Banquete</p>
          <p class="metric-value">${money(detalle.financiero.banquete)}</p>
          <p class="metric-foot">Alimentos y Bebidas</p>
        </article>
        <article class="metric-card" style="background:linear-gradient(160deg,#0f766e,#115e59);color:#f0fdfa;">
          <p class="metric-label" style="color:#99f6e4;">Total evento</p>
          <p class="metric-value">${money(totalFin)}</p>
          <p class="metric-foot" style="color:#5eead4;">Ingreso bruto</p>
        </article>
      </div>
    </div>
  `;
  document.getElementById('modal-overlay').classList.remove('hidden');
}

function initTopbarInteractions() {
  updateClock();
  setInterval(updateClock, 1000);

  const notifBtn = document.getElementById('notif-btn');
  const notifDropdown = document.getElementById('notif-dropdown');

  notifBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    notifDropdown.classList.toggle('hidden');
    document.getElementById('notif-badge').style.display = 'none';
  });
  document.addEventListener('click', () => notifDropdown.classList.add('hidden'));
  notifDropdown.addEventListener('click', (e) => e.stopPropagation());

  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-overlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modal-overlay')) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

window.addEventListener('hashchange', renderRoute);
window.addEventListener('DOMContentLoaded', () => {
  renderRoute();
  initTopbarInteractions();
});
