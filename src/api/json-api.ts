import { Deserializer } from 'jsonapi-serializer';

const JSONAPIDeserializer = new Deserializer({ keyForAttribute: 'camelCase' });

export default {
  async parse(payload: any) {
    if (!payload) return;

    const parsedData = await JSONAPIDeserializer.deserialize(payload);
    if (payload.meta) {
      parsedData.meta = payload.meta;
    }

    return parsedData;
  },
};
