// Check that some customer includes NASA as substring
const hasNasaPayloadCheck = val => val.customers.some(cust => (cust.includes('NASA')));

const prepareData = (payload) => (
  payload.filter(launch => launch.launch_year === '2018')
  // Sort in reverse chron order
  .sort((firstVal, secondVal) => {
    const firstDate = new Date(firstVal.launch_date_utc);
    const secondDate = new Date(secondVal.launch_date_utc);
    if (firstDate > secondDate) return -1;
    if (firstDate < secondDate) return 1;
    return 0;
  })
  // build formatted list of launches that have NASA as customer of payload
  .reduce((acc, launch) => {
    const payloads = launch.rocket.second_stage.payloads;
    // Check payload has NASA as customer
    const hasNasaPayload = payloads.some(hasNasaPayloadCheck); 
    if (hasNasaPayload) {
      acc.push({
        flight_number: launch.flight_number,
        mission_name: launch.mission_name,
        payloads_count: payloads.length,
      });
    }
    return acc;
  }, [])
  // Sort launches with most payloads to the top
  .sort((firstVal, secondVal) => {
    if (firstVal.payloads_count > secondVal.payloads_count) return -1;
    if (firstVal.payloads_count < secondVal.payloads_count) return 1;
    return 0;
  })
);

const renderData = (data) => {
  const formattedText = JSON.stringify(data, null, 2);
  document.getElementById('out').innerHTML = formattedText;
}

module.exports = {
  prepareData,
  renderData,
};
