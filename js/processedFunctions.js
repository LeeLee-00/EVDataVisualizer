// 1. Distribution of Electric Vehicle Types
export function processEvTypeData(evData) {
    return evData.reduce((acc, item) => {
        const evType = item.ev_type;
        acc[evType] = (acc[evType] || 0) + 1;
        return acc;
    }, {});
}


// 2. Electric Vehicle Count by Year
export function processEvCountByYearData(evData) {
    return evData.reduce((acc, item) => {
        const year = item.model_year.toString();
        acc[year] = (acc[year] || 0) + 1;
        return acc;
    }, {});
}


// 3. Top Electric Vehicle Makes and Models
export function processTopEvMakesModelsData(evData) {
    const makesModelsCounts = evData.reduce((acc, item) => {
        const makeModel = `${item.make} ${item.model}`;
        acc[makeModel] = (acc[makeModel] || 0) + 1;
        return acc;
    }, {});

    return Object.entries(makesModelsCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10) // Select top 10
        .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
}