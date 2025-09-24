import {
  INodeType,
  INodeTypeDescription,
  INodeExecutionData,
  IExecuteFunctions,
} from 'n8n-workflow';
import axios from 'axios';

export class Random implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Random',
    name: 'random',
    icon: 'file:./src/icon.svg',
    group: ['transform'],
    version: 1,
    description: 'Gera um número aleatório usando Random.org',
    defaults: {
      name: 'Random',
      color: '#00AAFF',
    },
    inputs: ['main'],
    outputs: ['main'],
    properties: [
      {
        displayName: 'Min',
        name: 'min',
        type: 'number',
        default: 0,
        required: true,
        description: 'Valor mínimo (incluso)',
      },
      {
        displayName: 'Max',
        name: 'max',
        type: 'number',
        default: 0,
        required: true,
        description: 'Valor máximo (incluso)',
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      const min = this.getNodeParameter('min', i) as number;
      const max = this.getNodeParameter('max', i) as number;

      if (!Number.isInteger(min) || !Number.isInteger(max)) {
        throw new Error('Números mínimos e máximos devem ser inteiros.');
      }
      if (min > max) {
        throw new Error('O número mínimo não pode ser maior que o máximo.');
      }

      const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;

      const res = await axios.get(url);
      const text = String(res.data).trim();
      const randomNumber = parseInt(text, 10);

      if (Number.isNaN(randomNumber)) {
        throw new Error('Resposta do Random.org não contém um número válido.');
      }

      returnData.push({
        json: {
          random: randomNumber,
          min,
          max,
          source: 'random.org',
          urlUsed: url,
        },
      });
    }


    return this.prepareOutputData(returnData);
  }
}
