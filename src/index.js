import 'babel-polyfill';
import { prepareData, renderData } from './solution';

fetch('https://api.spacexdata.com/v3/launches/past')
  .then(async (resp) => await resp.json())
  .then(respJson => {
    const formattedData = prepareData(respJson);
    renderData(formattedData);
  });
