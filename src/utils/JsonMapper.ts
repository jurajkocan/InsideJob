const people = {
  ooohuwhao: "count",
  whwokao: "next",
  akrcwohoahoohuc: "previous",
  rcwochuanaoc: "results",

  whrascwo: "name",
  acwoahrracao: "height",
  scracc: "mass",
  acraahrc_oaooanoorc: "hair_color",
  corahwh_oaooanoorc: "skin_color",
  worowo_oaooanoorc: "eye_color",
  rhahrcaoac_roworarc: "birth_year",
  rrwowhwaworc: "gender",
  hurcan: "url",
};

export const remapJson = (json: { [key: string]: any }) => {
  const keysToBeRename = Object.keys(json) as Array<keyof typeof people>;

  for (let key of keysToBeRename) {
    if (Array.isArray(json[key])) {
      json[people[key]] = (json[key] as any[]).map((element) => {
        return element !== null && typeof element === "object"
          ? remapJson(element)
          : element;
      });
    } else if (typeof json[key] === "object") {
      json[people[key]] = json[key] !== null ? remapJson(json[key]) : null;
    } else {
      json[people[key]] = json[key];
    }

    delete json[key];
  }

  return json;
};
