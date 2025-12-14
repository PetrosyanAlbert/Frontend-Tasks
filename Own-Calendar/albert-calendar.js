class AlbertCalendar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const todayDate = today.getDate();

    const firstDay = new Date(year, month, 1).getDay() || 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let days = "";

    for (let i = 1; i < firstDay; i++) {
      days += `<div class="empty"></div>`;
    }

    for (let j = 1; j <= daysInMonth; j++) {
      const isToday =
      j === todayDate &&
      month === today.getMonth() &&
      year === today.getFullYear();   
      days += `<div class="day ${isToday ? "today" : ""}">${j}</div>`;
    }


    this.shadowRoot.innerHTML = `
      <style>
        .calendar {
          width: 280px;
          border: 1px solid #ccc;
          padding: 10px;
          font-family: sans-serif;
          border-radius: 8px;
        }

        .header {
          text-align: center;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
          text-align: center;
        }

        .day {
          padding: 6px;
          cursor: pointer;
          border-radius: 4px;
        }

        .day:hover {
          background: #eee;
        }

        .empty {
          visibility: hidden;
        }

        .today {
          background: #4f46e5;
          color: white;
          font-weight: bold;
        }

      </style>

      <div class="calendar">
        <div class="header">${year} / ${month + 1}</div>

        <div class="grid">
          <div>Mon</div><div>Tue</div><div>Wed</div>
          <div>Thu</div><div>Fri</div><div>Sat</div><div>Sun</div>
          ${days}
        </div>
      </div>
    `;
  }
}

customElements.define("albert-calendar", AlbertCalendar);
