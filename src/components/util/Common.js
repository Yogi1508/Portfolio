export const calcTotalExperience = (experienceArray) => {
  let formattedTotalExperience = "";
  try {
    const activeExperiences = experienceArray.filter(
      (experience) => experience.isActive
    );

    if (activeExperiences.length === 0) {
      return "";
    }

    let totalExperienceInMonths = 0;

    activeExperiences.forEach((experience) => {
      const startDate = new Date(experience.startDate);
      let endDate;

      if (experience.endDate.toLowerCase() === "present") {
        endDate = new Date();
      } else {
        endDate = new Date(experience.endDate);
      }

      const experienceInMonths =
        (endDate - startDate) / (1000 * 60 * 60 * 24 * 30.44); // Approximate number of days in a month

      totalExperienceInMonths += experienceInMonths;
    });

    const years = Math.floor(totalExperienceInMonths / 12);
    const months = Math.floor(totalExperienceInMonths % 12);

    formattedTotalExperience = `${years} yr`;

    if (months > 0) {
      formattedTotalExperience += ` +`;
    }
  } catch (error) {
    formattedTotalExperience = "";
  }

  return formattedTotalExperience;
};

export const CalcExp = (startDate, endDate) => {
  let result = "";
  try {
    const parseDate = (date) => {
      if (date === "Present") {
        const currentDate = new Date();
        return {
          year: currentDate.getFullYear(),
          month: currentDate.getMonth() + 1, // January is 0
        };
      }

      const [month, year] = date.split("-");
      return {
        year: parseInt(year, 10),
        month: new Date(Date.parse(`${month} 1, ${year}`)).getMonth() + 1,
      };
    };

    const start = parseDate(startDate);
    const end = parseDate(endDate);

    let yearDiff = end.year - start.year;
    let monthDiff = end.month - start.month + 1;

    if (monthDiff < 0) {
      yearDiff -= 1;
      monthDiff += 12;
    }

    result = "";
    if (yearDiff > 0) {
      result += `${yearDiff}yr `;
    }
    if (monthDiff > 0) {
      result += `${monthDiff}mos`;
    }

    return result;
  } catch (error) {
    return "";
  }
};

export const IsEmptyOrNull = (value) => {
  try {
    if (value === null || value === undefined) {
      return true;
    }

    if (typeof value === "object") {
      return Object.keys(value).length === 0;
    }

    return value === "" || (Array.isArray(value) && value.length === 0);
  } catch (error) {
    return true;
  }
};
