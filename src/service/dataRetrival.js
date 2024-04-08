const axios = require('axios');

const publicAPI = "https://api.publicapis.org/entries";

const fetchData = async (categoryArray, limit, skip) => {
    try {
        const response = await axios.get(publicAPI);
        const { entries } = response.data;

        let filteredData = [];
        entries.forEach((entry) => {
            let found = false;
            categoryArray.forEach((category) => {
                if (category.includes(entry.Category)) {
                    found = true;
                }
            });
            if (found) {
                filteredData.push(entry);
            }
        });

        filteredData.splice(0, skip)
        const limitData = filteredData.filter((entry, index) => index < limit)
        return limitData;
    } catch (err) {
        console.error("Error fetching data:", err);
        throw new Error("Error fetching data");
    }
}

module.exports = { fetchData };