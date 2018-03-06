import AppConfig from "../config/appConfig";

export default class TripApi {
    /**
     *
     * @param {ObjectMember} locationState
     */
    getAllTripsData(locationState) {
        let url = `${AppConfig.API_URL}/${locationState.userId}`;

        return fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + locationState.token
            }
        }).then(res => {
            if (res.ok === true) {
                return res.json();
            } else {
                return Promise.resolve([]);
            }
        });
    }

    delTripData(locationState,trip) {
        console.log('locationstate', locationState);
        let url = `"https://fototripr.com/api/v1/Trips/"${trip.id}`;

        return fetch(url, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + locationState.token
            }
        }).then(res => {
            if (res.ok === true) {
                return res.json();
            } else {
                return Promise.resolve([]);
            }
        });
    }
    repTripData(locationState, trip) {

        debugger;
        console.log(locationState);
        console.log(trip);

        const { isLoggedIn, token, userId } = locationState;
        let url = "https://fototripr.com/api/v1/Trips";

        return fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + locationState.token
            },
            body: JSON.stringify({
                isLoggedIn: isLoggedIn,
                userId: userId,
                token: token,
                trip: trip
              })
        }).then(res => {
            if (res.ok === true) {
                return res.json();
            } else {
                return Promise.resolve([]);
            }
        });
    }
    handleChange(e, id, locationState){
        const isChecked = e.target.checked;
        let active;
        if(isChecked){
            active = "true";
        } else{
            active = "false";
        }

        const { isLoggedIn, token, userId } = locationState;
        let url = `"https://fototripr.com/api/v1/Trips/"${id}`;

        return fetch(url, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + locationState.token
            },
            body: JSON.stringify({
                isLoggedIn: isLoggedIn,
                userId: userId,
                active:active
              })
        }).then(res => {
            if (res.ok === true) {
                return res.json();
            } else {
                return Promise.resolve([]);
            }
        });
    }
}