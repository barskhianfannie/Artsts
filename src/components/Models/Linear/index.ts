
import { createModel, convertToTensor, trainModel, testModel } from '../../../utils/sequential';
import { pts, Response } from '../../Results';
export const Sequential = async ({data}:{data:Response[]})=>{
  const values= data.map(d => ({
    x: d.volumeChange,
    y: d.priceChange,
  }));

  const model = createModel(true);

  const tensorData = convertToTensor(values as pts);
const {inputs, labels} = tensorData;

// Train the model
const promise = await trainModel(model, inputs, labels);
const [originalPoints, predictedPoints] = testModel(model, data, tensorData);
return {original:originalPoints, predicted:predictedPoints};
}