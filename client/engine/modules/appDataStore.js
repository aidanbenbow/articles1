export const dataStore = {
    reports: [],
    setReports(reports) {
        this.reports = reports;
    }
}

async function fetchReports() {
    return fetch('/api/reports')
        .then(res => res.json())
        .then(data => {
            dataStore.setReports(data);
        })
        .catch(error => {
            console.error('Error fetching reports:', error);
        });
}

export async function initializeDataStore() {
  await fetchReports();
 return dataStore
}