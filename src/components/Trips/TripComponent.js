import React from 'react';
import {
    Form,
    Checkbox,
    Button
} from 'react-formik-ui';
import { Link } from 'react-router-dom';


class TripComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            checked: false,
            checkBoxesAmenities: [
                { name: 'allMealsIncluded', text: 'All meals', value: false },
                { name: 'transfersIncluded', text: 'Transfers', value: false },
                { name: 'alcoholIncluded', text: 'Alcoholic Beverages', value: false },
                { name: 'flightsIncluded', text: 'Flights', value: false },
                { name: 'gratuitiesIncluded', text: 'Gratitude', value: false }
            ]
        };

    }


    componentDidMount() {

    }
    handleChange(event) {
        this.props.handleChange(event, this.props.trip.id);
    }

    render() {

        const { trip,
            isLoggedIn,
            token,
            userId
        } = this.props;
        // const { isLoggedIn, token, userId } = this.props.history.location.state;
        // console.log("trip: " + trip);


        const coverPhotos = trip.gallery.filter(g => g.isCoverPhoto);
        let imgUrl = null;
        if (coverPhotos.length > 0) {
            imgUrl = "https://fototripr.com/api/v1/Images?name=" + coverPhotos[0].photoKey;
        }
        return (
            <React.Fragment>
                <Form className="trip-ui">
                    <Link
                        to={{
                        pathname: '/update-trip',
                        search: '?id=' + this.props.trip.id,
                        state: {
                            isLoggedIn: isLoggedIn,
                            userId: userId,
                            token: token,
                            trip: {
                            ...trip
                            }
                        }
                        }}>
                        {imgUrl ? <img src={imgUrl} alt ="Cover" width="100%" height="150px" className="trip__list-item__image" /> : null}
                    </Link>
                    
                    <Checkbox
                        key={trip.title}
                        checked={trip.active === "true" ? true : false}
                        name={trip.title}
                        text={trip.title}
                        onChange={(event) => this.handleChange(event)}
                    />

                    <Button className="col " padding="auto" onClick={() => this.props.triggerDelete(trip, token)}>Delete</Button>

                    <Button className="col " padding="auto" onClick={() => this.props.triggerReplicate(trip, token)}>Replicate</Button>
                </Form>

            </React.Fragment>
        );
    }
}

export default TripComponent;
