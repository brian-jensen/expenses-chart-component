const handleFetch = async () => {
  const res = await fetch("./data.json");
  const data = await res.json();
  const day = data.map((item) => item.day);
  const amount = data.map((item) => item.amount);
  buildChart(day, amount);
};

const buildChart = (day, amount) => {
  const today = new Intl.DateTimeFormat("en-US", { weekday: "short" })
    .format(new Date())
    .toLowerCase();

  const bgColor = day.map((item) =>
    item === today ? "hsl(186, 34.3%, 60%)" : "hsl(10.1, 79%, 64.5%)"
  );

  const bgHover = day.map((item) =>
    item === today ? "hsl(186.1, 48.5%, 80.2%)" : "hsl(10.4, 100%, 76.3%)"
  );

  const data = {
    labels: day,
    datasets: [
      {
        data: amount,
        barThickness: 33,
        borderRadius: 3,
        borderSkipped: false,
        backgroundColor: bgColor,
        hoverBackgroundColor: bgHover,
      },
    ],
  };

  let fontSize = 14;

  const config = {
    type: "bar",
    data: data,
    options: {
      maintainAspectRatio: false,
      aspectRatio: 1.275,
      onHover: (e, bar) => {
        e.native.target.style.cursor = bar[0] ? "pointer" : "default";
      },
      interaction: {
        mode: "x",
      },
      layout: {
        padding: {
          left: -10,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            color: "hsl(27.5, 9.9%, 52.5%)",
          },
        },
        y: {
          max: 70,
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          yAlign: "bottom",
          displayColors: false,
          caretSize: 0,
          caretPadding: 6,
          bodyColor: "hsla(30, 100%, 98%, 1)",
          backgroundColor: "hsl(25, 47.4%, 14.9%)",
          cornerRadius: 5,
          padding: {
            top: 10,
            right: 8,
            bottom: 7,
            left: 8,
          },
          bodyFont: {
            family: "DM Sans",
            size: fontSize,
            weight: 400,
          },
          callbacks: {
            title: () => {
              return "";
            },
            label: (tooltip) => {
              return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(Number(tooltip.formattedValue));
            },
          },
        },
      },
    },
  };

  new Chart(document.getElementById("chart"), config);
};

handleFetch();
