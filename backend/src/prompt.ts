export interface CreatePromptFnArgs {
  objectType: string;
  childType: string;
}

export interface PromptFnArgs {
  bodiesMin: number;
  bodiesMax: number;
  radiusMin: number;
  radiusMax: number;
}

function createPromptFn({ objectType, childType }: CreatePromptFnArgs): ({ bodiesMin, bodiesMax }: PromptFnArgs) => string {
  return ({ bodiesMin, bodiesMax, radiusMin, radiusMax }: PromptFnArgs): string => {
    const str0 = `Generate a ${objectType} with following properties: name, ${childType} count, and radius. The name will start with a random letter. The name need not be easy to pronounce. You are strongly encouraged to use non-English characters, but be sure the name is readable to English speakers. The name should not contain any substrings (length 4 or greater) that are valid English words. The ${childType} count of the ${objectType} should be a totally random number between ${bodiesMin} and ${bodiesMax} and must be a whole number. The radius of the ${objectType} should be a totally random number between ${radiusMin} and ${radiusMax}. It may have up to 2 decimal places. Please also provide a description of the ${objectType}. Be sure to include some information on the history of the ${objectType}, suggesting at a larger storyline. Do not make it sound like a realistic documentary.`;
    return str0;
  };
}

const universeCreatePromptFnArgs: CreatePromptFnArgs = {
  objectType: 'universe',
  childType: 'star'
};
const galaxyCreatePromptFnArgs: CreatePromptFnArgs = {
  objectType: 'galaxy',
  childType: 'star'
};
const solarSystemCreatePromptFnArgs: CreatePromptFnArgs = {
  objectType: 'solar system',
  childType: 'planet'
};

export const universePrompt = createPromptFn(universeCreatePromptFnArgs);
export const galaxyPrompt = createPromptFn(galaxyCreatePromptFnArgs);
export const solarSystemPrompt = createPromptFn(solarSystemCreatePromptFnArgs);