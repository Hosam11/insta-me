

export default class ApiRequests {
    // 1- fetch  call {fetch} contain stringfuy 

    fetchPrimary = (apiCall, body) => {
        console.log('ApiRequests >> fetchPrimary')
        let d = JSON.stringify(body)

        return fetch(`http://todoapp.ahmedrohym.com/api.php?apicall=${apiCall}`, {
            method: "POST",
            body: d
        })

    }
    fetchDataLogin = (body, response, error) => {
        console.log('ApiRequests >> fetchDataLogin')

        //  console.log('ApiRquests >>  fetchDataLogin body >> ', JSON.stringify(body))
        return this.fetchPrimary("login", body)
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.message === 'Login successfull') {
                    response(resJson);
                } else {
                    error(resJson.message);
                }
            })
            .catch((err) => {
                error(err);
            });
    }

    fetchDataSignUp = (body, response, error) => {
        console.log('ApiRequests >> fetchDataSignUp')
        return this.fetchPrimary("signup", body)
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.message === 'User registered successfully') {
                    response(resJson);
                } else {
                    error(resJson.message);
                }
            })
            .catch((err) => {
                error(err);
            });
    }
}