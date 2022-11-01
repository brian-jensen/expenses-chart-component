
const handleFetch = async() => {
    const res = await fetch('./data.json');
    const data = await res.json();
    const day = data.map(item => item.day);
    const amount = data.map(item => item.amount);
    buildChart(day, amount);
}

const buildChart = (day, amount) => {
  console.log(day, amount);
}


handleFetch();