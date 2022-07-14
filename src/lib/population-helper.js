const { axiosInstance: axios } = require("./axios-helper");
const { Countries } = require("./country-helper");

exports.getCountryPopulation = async function getCountryPopulation(_countries, _date, sort) {
  // remove duplicate names if any
  const countries = Array.from(new Set(_countries));

  // Validate list provided valid Country Names or not
  const real_names = await Countries.getCountries();
  const validated_countries = countries.filter((country) => real_names.includes(country));
  if (validated_countries.length < countries.length) throw new Error("Invalid Country Name Provided");

  // Prepare the population data
  const date = `${_date.getFullYear()}-${_date.getMonth()}-${_date.getDate()}`;
  const promises = countries.map((country) =>
    axios
      .get(`/population/${country}/${date}`)
      .then(({ data }) => {
        return { country, population: data.total_population.population };
      })
      .catch((err) => {
        throw err.response.data.detail;
      })
  );

  return Promise.all(promises).then((list) => {
    let countries = [];
    if (sort === "asc") {
      countries = list.sort((a, b) => a.population - b.population);
    } else if (sort === "desc") {
      countries = list.sort((a, b) => b.population - a.population);
    } else {
      countries = list;
    }
    return countries;
  });
};
