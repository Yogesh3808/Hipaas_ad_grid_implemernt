import Urls from "./Urls";

export const getDetails = async (key) => {
    let query = `{
        Trading_PartnerList(RecType :"Inbound", Transaction:"`+ key + `") {
            Trading_Partner_Name 
        }
    }`

    return fetch(Urls.common_data, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ query: query })
    })
        .then(res => res.json())
        .then(res => {
            if (res.data) {
                return res.data.Trading_PartnerList
            }
        })
        .catch(err => {
            console.log(err)
        });
}

export const getProviders = async (recType, input_query) => {
    let query = `{
        ProviderList(Transaction: "Claim837RT", RecType: "${recType}", Provider: "${input_query}") {
          Provider
        }
    }`

    return fetch(Urls.common_data, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ query: query })
    })
        .then(res => res.json())
        .then(res => {
            if (res.data) {
                let data = []
                res.data.ProviderList.forEach(item => {
                    data.push(item.Provider)
                })
                return data
            }
        })
        .catch(err => {
            console.log(err)
        });
}

export const getStates = async () => {
        let query = `{
                StateList  (UserId:0 Flag:0) {
                State
                StateCode
            }
        }`
        console.log(query)
        return fetch(Urls.common_data, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query: query })
        })
            .then(res => res.json())
            .then(res => {
                let data = []
                res.data.StateList.forEach(item => {
                    data.push(item.State)
                })
                return data
            })
            .catch(err => {
                console.log(err)
            })
    }