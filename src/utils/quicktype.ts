import { quicktype, InputData, jsonInputForTargetLanguage } from 'quicktype-core';
import { isJsonStr } from './is';
async function quicktypeJSON(
  targetLanguage: string,
  typeName: string,
  jsonString: string | AnyObject
) {
  const jsonInput = jsonInputForTargetLanguage(targetLanguage);

  // We could add multiple samples for the same desired
  // type, or many sources for other types. Here we're
  // just making one type from one piece of sample JSON.
  await jsonInput.addSource({
    name: typeName,
    samples: [isJsonStr(jsonString) ? <string>jsonString : JSON.stringify(jsonString)]
  });

  const inputData = new InputData();
  inputData.addInput(jsonInput);

  return await quicktype({
    inputData,
    lang: targetLanguage,
    rendererOptions: {
      'just-types': 'true',
      'runtime-typecheck': 'false'
    }
  });
}

export async function generate(jsonString: unknown) {
  if (!jsonString) return;
  const { lines: schema } = await quicktypeJSON(
    'typescript',
    'QuickType',
    jsonString as string | AnyObject
  );
  console.log(schema.join('\n'));
}
