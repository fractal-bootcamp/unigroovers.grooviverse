export interface CreatePromptFnArgs {
  objectType: string;
  parentType?: string;
  sizeUnit: string;
  ageUnit: string;
}

export interface PromptFnArgs {
  parentDescription?: string;
  ageMin: number;
  ageMax: number;
  sizeMin: number;
  sizeMax: number;
}

function createPromptFn({ objectType, parentType, sizeUnit, ageUnit }: CreatePromptFnArgs): ({ parentDescription, ageMin, ageMax, sizeMin, sizeMax }: PromptFnArgs) => string {
  return ({ parentDescription, ageMin, ageMax, sizeMin, sizeMax }: PromptFnArgs): string => {
    const str0 = `Generate a ${objectType} with following properties: name, age, and size. The name will start with a random letter. The name need not be easy to pronounce. You are strongly encouraged to use non-English characters, but be sure the name is readable to English speakers. The name should not contain any substrings (length 4 or greater) that are valid English words. The age of the ${objectType} should be a totally random number between ${ageMin} and ${ageMax} with up to 2 decimal places. Specifically some random number of "${ageUnit}" - do not use any other unit. The size of the ${objectType} should be a totally random number between ${sizeMin} and ${sizeMax}. It may have up to 2 decimal places, and must have the unit "${sizeUnit}". Please also provide a description of the ${objectType}. Be sure to include some information on the history of the ${objectType}, suggesting at a larger storyline. Do not make it sound like a realistic documentary.`;
    const str1 = `For context, this ${objectType} belongs to a larger ${parentType}. Here's some information about that ${parentType}: ${parentDescription}`;
    if (parentType !== undefined && parentDescription !== undefined) {
      return str0 + str1;
    } else {
      return str0;
    }
  };
}

const universeCreatePromptFnArgs: CreatePromptFnArgs = {
  objectType: 'universe',
  sizeUnit: 'parsecs',
  ageUnit: 'billions of billions of years'
};
const galaxyCreatePromptFnArgs: CreatePromptFnArgs = {
  objectType: 'galaxy',
  parentType: 'universe',
  sizeUnit: 'parsecs',
  ageUnit: 'billions of billions of years'
};
const solarSystemCreatePromptFnArgs: CreatePromptFnArgs = {
  objectType: 'solar system',
  parentType: 'galaxy',
  sizeUnit: 'parsecs',
  ageUnit: 'billions of billions of years'
};
const planetCreatePromptFnArgs: CreatePromptFnArgs = {
  objectType: 'planet',
  parentType: 'solar system',
  sizeUnit: 'miles',
  ageUnit: 'billions of years'
};
const houseCreatePromptFnArgs: CreatePromptFnArgs = {
  objectType: 'house',
  parentType: 'planet',
  sizeUnit: 'square feet',
  ageUnit: 'years'
};

export const universePrompt = createPromptFn(universeCreatePromptFnArgs);
export const galaxyPrompt = createPromptFn(galaxyCreatePromptFnArgs);
export const solarSystemPrompt = createPromptFn(solarSystemCreatePromptFnArgs);
export const planetPrompt = createPromptFn(planetCreatePromptFnArgs);
export const housePrompt = createPromptFn(houseCreatePromptFnArgs);