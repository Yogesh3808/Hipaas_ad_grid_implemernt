let base_url = 'http://localhost:4000' //local
// let base_url = 'http://10.0.1.71:30506' //sql
//  let base_url = 'http://10.0.1.248:30508'  //graph
//  let base_url = 'http://10.229.4.247:30108' //molina
const Urls = {
    base_url : 'http://localhost:4000/graphQl', //local
    // base_url : 'http://10.0.1.71:30506/graphQl', //sql
    // base_url : 'http://10.0.1.248:30508/graphQl', //graph
    // base_url : 'http://10.229.4.247:30108/graphQl', //molina
    eligibility_url : base_url + '/eligibility',
    common_data : base_url + '/common_data',
    claimstatus : base_url + '/claimstatus',
    claims_837 : base_url + '/claims_837',
    claim_details : base_url + '/claim_details',
    match_claims : base_url + '/match_claims',
    users : base_url + '/users',
    enrollment : base_url + '/enrollment',
    enrollment_details : base_url + '/enrollment_details',
    full_file : base_url + '/full_file',
    real_time_claim : base_url + '/real_time_claim',
    claim_processing : base_url + '/claim_processing',
    real_time_claim_details : base_url + '/real_time_claim_details',
    tradingPartner : base_url + '/tradingPartner',
    TradingPartner : base_url + '/TradingPartner',
    customEdits: base_url + '/customEdits',
}

export default Urls;