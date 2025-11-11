export const jsonParser = (str: string | null | undefined) => {
  try {
    const parsedObject = JSON.parse(str ?? "{}");
    return parsedObject;
  } catch (err) {
    console.log(`Error while parsing ${str}, err: ${err} `);
    return {};
  }
};
