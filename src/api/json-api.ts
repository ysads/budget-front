import { Deserializer } from 'jsonapi-serializer';

const JSONAPIDeserializer = new Deserializer({ keyForAttribute: 'camelCase' });

export default {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async parse(payload: any): Promise<any | undefined> {
    if (!payload) return;

    const parsedData = await JSONAPIDeserializer.deserialize(payload);
    if (payload.meta) {
      parsedData.meta = payload.meta;
    }

    return parsedData;
  },
};
